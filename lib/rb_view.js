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
      $("#submit").on("click", function (event) {
        event.preventDefault();
        var val = $("#new_node").val();
        that.newNode(parseInt(val));
      });
    },

    newNode: function (val) {
      // Won't run if val is NaN
      if (val === val) {
        var uiNode = new RB.UINode(val);
        this.tree.insertVal({
          value: val,
          uiNode: uiNode
        });
      }
      $("#new_node").val("");
    },
    
    render: function () {
      if (this.tree.root) {
        // this.tree.root.render(this.ctx, , 50, 1);
      }
    },
  };
})(this);