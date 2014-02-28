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
		
		rotate: function () {
			
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