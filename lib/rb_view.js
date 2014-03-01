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
				console.log(val)
				if (val !== "") that.tree.insertVal(val);
				$("#new_node").val("");
			});
		},
	};
})(this);