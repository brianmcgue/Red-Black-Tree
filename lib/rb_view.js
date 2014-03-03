(function (root) {
  var RB = root.RB = root.RB || {}
  
  var View = RB.View = function () {
    this.tree = new RB.Tree();
    this.canvas = document.getElementById("container");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 50;
    this.ctx = this.canvas.getContext('2d');
    RB.width = this.canvas.width;
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
      this.render()
    },
    
    render: function () {
      if (this.tree.root) {
        this.ctx.clearRect(0, 0, RB.width, this.canvas.height);
        this.tree.root.render(this.ctx, RB.width / 2, 50, 1);
      }
    },
  };
})(this);