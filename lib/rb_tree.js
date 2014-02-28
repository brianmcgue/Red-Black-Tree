(function (root) {
	var RB = root.RB = root.RB || {}
	
	var Tree = RB.Tree = function () {
		this.root = null;
	};
	
	Tree.prototype = {
		blackUncle: function () {
			
		},
		
		cases: function () {
			
		},
		
		insert: function (node) {
			this.rootCase(node);
		},
		
		insertVal: function (val) {
			var node = new Node(val);
			this.insert(val)
		},
		
		rbInsert: function (node) {
			this.treeInsert(node);
			while (node !== this.root && node.parent.color == "red") {
				uncle = node.parentIsLeftChild ? node.rightUncle() : node.leftUncle();
				node = this.cases(node, uncle);
				this.root.color = "black";
			}
		},
		
		recolor: function () {
			
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