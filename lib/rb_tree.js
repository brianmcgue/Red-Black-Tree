(function (root) {
  var RB = root.RB = root.RB || {}
  
  var Tree = RB.Tree = function () {
    this.root = null;
  };
  
  Tree.prototype = {
    blackUncle: function (node, uncle) {
      if (node.whichChild() !== node.parent.whichChild()) {
        node = node.parent;
        this.rotate(node, node.whichChild());
      }
      node.parent.toggleColor("black");
      node.grandparent().toggleColor("red");
      var opp_dir = node.whichChild() === "left" ? "right" : "left";
      this.rotate(node.grandparent(), opp_dir);
      return node.grandparent() === null ? node.parent : node.grandparent();
    },
    
    cases: function (node, uncle) {
      if (uncle === null || uncle.color === "black") {
        return this.blackUncle(node, uncle);
      } else {
        return this.recolor(node, uncle);
      }
    },
    
    insert: function (node) {
      this.rootCase(node);
    },
    
    insertVal: function (data) {
      var node = new RB.Node(data);
      this.insert(node);
    },
    
    rbInsert: function (node) {
      this.treeInsert(node);
      while (!(node === this.root || node.parent.color === "black")) {
        var uncle = node.isParentLeftChild() ? node.rightUncle() : node.leftUncle();
        node = this.cases(node, uncle);
        this.root.toggleColor("black", true);
      }
    },
    
    recolor: function (node, uncle) {
      node.parent.toggleColor("black");
      uncle.toggleColor("black");
      node.grandparent().toggleColor("red");
      node = node.grandparent();
      return node
    },
    
    rootCase: function (node) {
      if (this.root === null) {
        this.root = node;
        node.position = 1;
        node.toggleColor("black", true);
        var uiNode = node.data.uiNode;
        RB.moves.push(uiNode.moveToPos.bind(uiNode, 1));
        return
      }
      this.rbInsert(node);
    },
    
    rotate: function (parent, dir1) {
      var dir2 = dir1 === "left" ? "right" : "left";
      var child = parent.getChild(dir2);
      parent.setChild(dir2, child.getChild(dir1));
      if (parent === this.root) {
        child.parent = null;
        this.root = child;
      } else {
        parent.parent.setChild(parent.whichChild(), child);
      }
      child.setChild(dir1, parent);
      this.root.setPositions(1);
      RB.moves.push(this.root.makeRotations.bind(this.root));
    },
    
    treeInsert: function (node, root) {
      root = root || this.root;
      var uiNode = node.data.uiNode;
      RB.moves.push(uiNode.moveToComparePos.bind(uiNode, root.position));
      var dir = node.data.value < root.data.value ? "left" : "right";
      if (root.getChild(dir) === null) {
        root.setChild(dir, node);
        RB.moves.push(uiNode.moveToPos.bind(uiNode, node.position));
      } else {
        this.treeInsert(node, root.getChild(dir));
      }
    }
  };
})(this);