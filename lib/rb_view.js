(function (root) {
	var RB = root.RB = root.RB || {}
	
	var View = RB.View = function () {
		this.tree = new RB.Tree();
		this.addSubmitListener();
		this.data = {
			nodes: [],
			edges: []
		};
	};
	
	View.prototype = {
		addSubmitListener: function () {
			var that = this;
			document.getElementById("submit").onclick = function (event) {
				event.preventDefault();
				var val = document.getElementById("new_node").value;
				that.newNode(parseInt(val));
			};
		},

		newNode: function (val) {
			// Won't run if val is NaN
			if (val === val) this.tree.insertVal(val);
			document.getElementById("new_node").value = "";
		},
		
		render: function () {
			
		},
		
		updateData: function () {
			
		},
	};
})(this);