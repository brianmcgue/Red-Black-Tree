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
		
		render: function (context, x, y, level, width) {
			var dx = width / Math.pow(2, level + 1), dy = 50;
			this.left && this.left.render(context, x - dx, y + dy, ++level, width);
			context.font = "28px sans-serif";
			context.fillStyle = this.color;
			context.fillText(this.value, x, y);
			this.right && this.right.render(context, x + dx, y + dy, ++level, width);
		},
		
		rightUncle: function () {
			var gp = this.grandparent();
			return gp === null ? null : gp.right;
		},
		
		setChild: function (dir, node) {
			if (dir === "left") {
				this.left = node;
			} else {
				this.right = node;
			}
			if (node !== null) node.parent = this;
		},
		
		whichChild: function () {
			return this.isLeftChild() ? "left" : "right";
		}
	};
})(this);