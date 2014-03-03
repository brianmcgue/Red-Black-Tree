(function (root) {
	var RB = root.RB = root.RB || {}
	
	var View = RB.View = function () {
		this.tree = new RB.Tree();
		this.addSubmitListener();
		this.render();
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
			var canvas = document.getElementById("container");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 50;
      var context = canvas.getContext('2d');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = 15;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			context.font = "16px sans-serif";
			context.fillText("15", centerX, centerY);
      context.lineWidth = 5;
      context.strokeStyle = "black";
      context.stroke();
		},
	};
})(this);