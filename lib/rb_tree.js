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
			node.parent.color = "black";
			node.grandparent().color = "red";
			var opp_dir = node.whichChild() === "left" ? "right" : "left";
			this.rotate(node, opp_dir);
			return node.grandparent();
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
		
		insertVal: function (val) {
			var node = new Node(val);
			this.insert(val);
		},
		
		rbInsert: function (node) {
			this.treeInsert(node);
			while (node !== this.root && node.parent.color == "red") {
				uncle = node.parentIsLeftChild() ? node.rightUncle() : node.leftUncle();
				node = this.cases(node, uncle);
				this.root.color = "black";
			}
		},
		
		recolor: function (node, uncle) {
			node.parent.color = "black";
			uncle.color = "black";
			node.grandparent().color = "red";
			node = node.grandparent();
			return node
		},
		
		rootCase: function (node) {
			if (this.root === null) {
				node.color = "black";
				this.root = node;
				return
			}
			this.rbInsert(node);
		},
		
		rotate: function (parent, dir1) {
			var dir2 = dir1 === "left" ? "right" : "left";
			var child = parent.getChild(dir2);
			parent.setChild(dir2, child.getChild(dir1));
			if (child.getChild(dir1) !== null) {
				child.getChild(dir1).parent = parent;
			}
			if (parent === this.root) {
				this.root = child;
			} else {
				child.parent = parent.parent;
				parent.parent.setChild(parent.whichChild(), child);
			}
			parent.parent = child;
			child.setChild(dir1, parent);
		},
		
		treeInsert: function (node, root = this.root) {
			var dir = node.value < root.value ? "left" : "right";
			if (root.getChild(dir) === null) {
				root.setChild(dir, node);
				node.parent = root;
			} else {
				treeInsert(node, root.getChild(dir));
			}
		}
	};
})(this);