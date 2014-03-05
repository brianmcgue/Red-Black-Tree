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
    ensureColor: function () {
      this.left && this.left.ensureColor();
      this.data.uiNode.ensureColor(this.color);
      this.right && this.right.ensureColor();
    },

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
    
    makeRotations: function () {
      var promiseFunc = [this.data.uiNode.rotationMove(this.position)];
      var left = [], right = [];

      if (!(this.left || this.right)) return promiseFunc;

      if (this.left) left = this.left.makeRotations();
      if (this.right) right = this.right.makeRotations();

      return promiseFunc.concat(left).concat(right);
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
    
    setPositions: function (pos) {
      this.left && this.left.setPositions(2 * pos);
      this.position = pos;
      this.right && this.right.setPositions(2 * pos + 1);
    },
    
    toggleColor: function (color, root) {
      var uiNode = this.data.uiNode;
      this.color = color;
      if (root) {
        uiNode.makeRootBlack();
      } else {
        uiNode.toggleClass(color);
      }
    },
    
    whichChild: function () {
      return this.isLeftChild() ? "left" : "right";
    }
  };
})(this);