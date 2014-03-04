(function (root) {
  var RB = root.RB = root.RB || {}
  
  var NodeUI = RB.NodeUI = function () {
    this.$el = $("<div>");
  };

  NodeUI.prototype = {
    getXYFromPos: function (pos) {
      var level = pos.toString(2).length;
      var idx = pos - Math.pow(2, level - 1);
      var y = 50 * level;
      var x = (window.innerWidth / Math.pow(2, level)) * ( 2 * idx + 1);
      return [x, y]
    },
    
    moveToPos: function (pos) {
      var xy = this.getXYFromPos(pos);
      // return animate to x, y
    }
  };
})(this);