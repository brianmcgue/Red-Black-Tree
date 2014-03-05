(function (root) {
  var RB = root.RB = root.RB || {}
  
  var View = RB.View = function () {
    this.tree = new RB.Tree();
    this.addSubmitListener();
    RB.comparisons = [];
    RB.rotations = [];
    RB.final = [];
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
      var result = Q();

      RB.comparisons.forEach(function(comparison) {
        result = result.then(comparison);
      });
      RB.rotations.forEach(function (rotation) {
        result = result.then(function () {
          rotation.forEach(function (f) {
            f();
          });
        });
      });
      RB.final.forEach(function (f) {
        result = result.then(f);
      });
      
      RB.comparisons = [];
      RB.rotations = [];
      RB.final = [];

      result.fail(function() {console.log(arguments)});
      return result;
    },
  };
})(this);