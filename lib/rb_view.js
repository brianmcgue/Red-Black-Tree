(function (root) {
	var RB = root.RB = root.RB || {}
	
	var View = RB.View = function () {
		this.tree = new RB.Tree();
		this.addSubmitListener();
	};
	
	View.prototype = {
		addSubmitListener: function () {
			$("form").on("submit", function (event) {
				event.preventDefault();
				
			});
		},
	};
})(this);