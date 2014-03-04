(function (root) {
  var RB = root.RB = root.RB || {}
  
  var View = RB.View = function () {
    this.tree = new RB.Tree();
    this.addSubmitListener();
    RB.moves = [];
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
      this.render();
    },
    
    render: function () {
      console.log(RB.moves);
      while (RB.moves.length > 0) {
        RB.moves.shift()();
      }
    },
  };
})(this);