(function (root) {
  var RB = root.RB = root.RB || {}
  
  var NodeUI = RB.NodeUI = function () {
    this.$el = $("<div>");
  };

  NodeUI.prototype = {
    moveToPos: function (pos) {
      var width = 100;
      var level = pos.toString(2).length;
      var y = 50 * level;
      var x = pos - Math.pow(2, level - 1);
      console.log("level: " + level + " y: " + y + " x: " + x);
    },
  };
})(this);