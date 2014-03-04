(function (root) {
  var RB = root.RB = root.RB || {}
  
  var Node = RB.Node = function (data) {
    this.data = data;
    this.color = "red";
    this.parent = null;
    this.left = null;
    this.right = null;
    this.position = null;
  };

  Node.prototype = {
    getChild: function (dir) {
      return dir === "left" ? this.left : this.right;
    },
    
    grandparent: function () {
      return this.parent === null ? null : this.parent.parent;
    },
    
    isLeftChild: function () {
      if (this.parent === null) return null;
      return this === this.parent.left;
    },
    
    isParentLeftChild: function () {
      return this.parent.isLeftChild();
    },
    
    leftUncle: function () {
      var gp = this.grandparent();
      return gp === null ? null : gp.left;
    },
    
    render: function (context, x, y, level) {
      var dx = RB.width / Math.pow(2, level + 1), dy = 50;
      this.left && this.left.render(context, x - dx, y + dy, ++level);
      context.font = "28px sans-serif";
      context.fillStyle = this.color;
      context.fillText(this.data.value, x, y);
      this.right && this.right.render(context, x + dx, y + dy, ++level);
    },
    
    rightUncle: function () {
      var gp = this.grandparent();
      return gp === null ? null : gp.right;
    },
    
    setChild: function (dir, node) {
      if (dir === "left") {
        this.left = node;
        if (node) node.position = this.position * 2;
      } else {
        this.right = node;
        if (node) node.position = this.position * 2 + 1;
      }
      if (node) node.parent = this;
    },
    
    toggleColor: function (color, root) {
      var uiNode = this.data.uiNode;
      this.color = color;
      if (root) {
        RB.moves.push(uiNode.makeRootBlack.bind(uiNode));
      } else {
        RB.moves.push(uiNode.toggleClass.bind(uiNode));
      } 
    },
    
    whichChild: function () {
      return this.isLeftChild() ? "left" : "right";
    }
  };
})(this);