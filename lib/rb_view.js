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
      $("#submit").onclick = function (event) {
        event.preventDefault();
        var val = $("#new_node").value;
        that.newNode(parseInt(val));
      };
    },

    newNode: function (val) {
      // Won't run if val is NaN
      if (val === val) this.tree.insertVal(val);
      $("#new_node").value = "";
    },
    
    render: function () {
      if (this.tree.root) {
        // this.tree.root.render(this.ctx, , 50, 1);
      }
    },
  };
})(this);