(function (root) {
	var RB = root.RB = root.RB || {}
	
	var Node = RB.Node = function (value) {
		this.value = value;
		this.color = "red";
		this.parent = null;
		this.left = null;
		this.right = null;
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
		
		rightUncle: function () {
			var gp = this.grandparent();
			return gp === null ? null : gp.right;
		},
		
		setChild: function (dir, val) {
			if (dir === "left") {
				this.left = val;
			} else {
				this.right = val;
			}
		},
		
		whichChild: function () {
			return this.isLeftChild() ? "left" : "right";
		}
	};
})(this);