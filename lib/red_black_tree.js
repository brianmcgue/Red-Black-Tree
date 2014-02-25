(function (root) {
	var RB = root.RB = root.RB || {}
	
	var Node = RB.Node = function (value) {
		this.value = value;
		this.color = "red";
		this.parent = null;
		this.left = null;
		this.right = null;
	};
	
	Node.prototype.grandparent = function () {
		this.parent == null ? return null : return this.parent.parent;
	};
	
	var Tree = RB.Tree = function () {
		this.root = null;
	};
	
})(this);