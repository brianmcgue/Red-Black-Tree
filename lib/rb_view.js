(function (root) {
	var RB = root.RB = root.RB || {}
	
	var View = RB.View = function () {
		this.tree = new RB.Tree();
		this.addSubmitListener();
		
	};
	
	View.prototype = {
		addSubmitListener: function () {
			var that = this;
			$("form").on("submit", function (event) {
				event.preventDefault();
				var val = $("#new_node").val();
				that.newNode(parseInt(val));
			});
		},
		
		newNode: function (val) {
			// Won't run if val is NaN
			if (val === val) this.tree.insertVal(val);
			$("#new_node").val("");
		},
	};
})(this);