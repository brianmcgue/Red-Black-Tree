(function (root) {
  var RB = root.RB = root.RB || {}
  
  var UINode = RB.UINode = function (value) {
    this.$el = $("<div>");
    this.$el.html(value);
    this.$el.addClass("red node");
    this.$el.css({left: 200, top: 20});
    $("body").append(this.$el);
  };

  UINode.prototype = {
    ensureColor: function (color) {
      var deferred = Q.defer();
      var that = this;
      
      RB.final.push(function () {
        that.$el.removeClass("red black").addClass(color);
        deferred.resolve();
        return deferred.promise;
      });
    },

    getXYFromPos: function (pos) {
      var level = pos.toString(2).length;
      var idx = pos - Math.pow(2, level - 1);
      var y = 100 * level - 50;
      var x = (window.innerWidth / Math.pow(2, level)) * ( 2 * idx + 1);
      return [x, y]
    },
    
    makeRootBlack: function () {
      var deferred = Q.defer();
      var that = this;
      RB.final.push(function () {
        that.$el.removeClass("red black").addClass("black");
        deferred.resolve();
        return deferred.promise;
      });
    },
    
    moveToComparePos: function (pos) {
      var xy = this.getXYFromPos(pos);

      var deferred = Q.defer();
      var that = this;

      RB.comparisons.push(function () {
        that.$el.animate({
          left: xy[0] + "px",
          top: xy[1] - 30 + "px"
        }, 1000, deferred.resolve);
        
      return deferred.promise;
      });
    },
    
    moveToPos: function (pos) {
      var xy = this.getXYFromPos(pos);

      var deferred = Q.defer();
      var that = this;

      RB.comparisons.push(function () {
        that.$el.animate({
          left: xy[0] + "px",
          top: xy[1] + "px"
        }, 1000, deferred.resolve);
        
        return deferred.promise;
      });
    },
    
    toggleClass: function (color) {
      var deferred = Q.defer();
      var that = this;
      
      RB.comparisons.push(function () {
        that.$el.removeClass("red black").addClass(color);
        deferred.resolve();
        return deferred.promise;
      });
    },
    
    rotationMove: function (pos) {
      var xy = this.getXYFromPos(pos);

      var deferred = Q.defer();
      var that = this;

      return function () {
        that.$el.animate({
          left: xy[0] + "px",
          top: xy[1] + "px"
        }, 1000, deferred.resolve);
        
        return deferred.promise;
      };
    },
  };
})(this);