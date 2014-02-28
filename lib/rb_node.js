(function (root) {
	var RB = root.RB = root.RB || {}
	
	var Node = RB.Node = function (value) {
		this.value = value;
		this.color = "red";
		this.parent = null;
		this.left = null;
		this.right = null;
	};
	
	Node.prototype.getChild = function (dir) {
		return dir === "left" ? return "left" : return "right";
	};	

	Node.prototype.grandparent = function () {
		return this.parent === null ? null : this.parent.parent;
	};
	
	
})(this);