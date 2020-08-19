/*!
 * jQuery photoGrid v1.0.0
 * Justified Grid like Flickr or Google+ and Google Imagesearch
 * by Marco Krage
 * MIT License (see http://marco.mit-license.org)
 */
(function ( $ ) {
 
  $.fn.photoGrid = function( options ) {
 
    var settings = $.extend({
      itemSelector: ".item",
      resize: true,
      rowHeight: $(window).height() / 2,
      callback: function() {}
    }, options );
    
    // Private Functions
    _layout = function($container, itemSelector, callback) {  
      // Based on http://www.crispymtn.com/stories/the-algorithm-for-a-perfectly-balanced-photo-gallery
      var ideal_height, index, partition, row_buffer, rows, summed_width, containerWidth, weights;

      var photos = $container.find(itemSelector).toArray();
      
      containerWidth = $container.width();

      ideal_height = parseInt(settings.rowHeight);

      summed_width = photos.reduce((function(sum, p) {
        return sum += aspect_ratio(p) * ideal_height;
      }), 0);

      rows = Math.round(summed_width / containerWidth);

      if (rows < 1) {
        width = parseInt(ideal_height * aspect_ratio(photos));
        height = ideal_height;
        $(photos).css({        
          width: width - parseInt($(photos).css('marginLeft')) * 2,
          height: height - parseInt($(photos).css('marginTop')) * 2
        });      
      } else {
        weights = photos.map(function(p) {
          return parseInt(aspect_ratio(p) * 100);
        });
        partition = linear_partition(weights, rows);
        index = 0;
        row_buffer = [];
        $.each(partition, function(i, row) {
          var summed_ratios;
          row_buffer = [];
          $.each(row, function() {
            return row_buffer.push(photos[index++]);
          });
          summed_ratios = row_buffer.reduce((function(sum, p) {
            return sum += aspect_ratio(p);
          }), 0);
          return $.each(row_buffer,function(index, photo) {
            width = parseInt(containerWidth / summed_ratios * aspect_ratio(photo));
            height = parseInt(containerWidth / summed_ratios);
            $(photo).css({        
              width: width - parseInt($(photo).css('marginLeft')) * 2,
              height: height - parseInt($(photo).css('marginTop')) * 2
            });
          });
        });
      } 
      
      callback && callback();
    }

    aspect_ratio = function(p) {
      // aspect ratio incl. margins
      return $(p).outerWidth(true) / $(p).outerHeight(true);
    }

    // Source https://github.com/crispymtn/linear-partition
    // Modified by Marco Krage to remove underscore.js dependency
    linear_partition = function(seq, k) {
      // underscore.js dependencys
      var nativeIsArray = Array.isArray;
      var nativeForEach = Array.prototype.forEach;
      var _ = {};
      
      var each = _.each = _.forEach = function(obj, iterator, context) {
        if (obj == null) return obj;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, length = obj.length; i < length; i++) {
            if (iterator.call(context, obj[i], i, obj) === breaker) return;
          }
        } else {
          var keys = _.keys(obj);
          for (var i = 0, length = keys.length; i < length; i++) {
            if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
          }
        }
        return obj;
      };      
      _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) == '[object Array]';
      };
      _.max = function(obj, iterator, context) {
        var result = -Infinity, lastComputed = -Infinity,
            value, computed;
        if (!iterator && _.isArray(obj)) {
          for (var i = 0, length = obj.length; i < length; i++) {
            value = obj[i];
            if (value > result) {
              result = value;
            }
          }
        } else {
          each(obj, function(value, index, list) {
            computed = iterator ? iterator.call(context, value, index, list) : value;
            if (computed > lastComputed) {
              result = value;
              lastComputed = computed;
            }
          });
        }
        return result;
      };  
      _.min = function(obj, iterator, context) {
        var result = Infinity, lastComputed = Infinity,
            value, computed;
        if (!iterator && _.isArray(obj)) {
          for (var i = 0, length = obj.length; i < length; i++) {
            value = obj[i];
            if (value < result) {
              result = value;
            }
          }
        } else {
          each(obj, function(value, index, list) {
            computed = iterator ? iterator.call(context, value, index, list) : value;
            if (computed < lastComputed) {
              result = value;
              lastComputed = computed;
            }
          });
        }
        return result;
      };
      // END: underscore.js dependencys
    
      var ans, i, j, m, n, solution, table, x, y, _i, _j, _k, _l;
      n = seq.length;
      if (k <= 0) {
        return [];
      }
      if (k > n) {
        return seq.map(function(x) {
          return [x];
        });
      }
      table = (function() {
        var _i, _results;
        _results = [];
        for (y = _i = 0; 0 <= n ? _i < n : _i > n; y = 0 <= n ? ++_i : --_i) {
          _results.push((function() {
            var _j, _results1;
            _results1 = [];
            for (x = _j = 0; 0 <= k ? _j < k : _j > k; x = 0 <= k ? ++_j : --_j) {
              _results1.push(0);
            }
            return _results1;
          })());
        }
        return _results;
      })();
      solution = (function() {
        var _i, _ref, _results;
        _results = [];
        for (y = _i = 0, _ref = n - 1; 0 <= _ref ? _i < _ref : _i > _ref; y = 0 <= _ref ? ++_i : --_i) {
          _results.push((function() {
            var _j, _ref1, _results1;
            _results1 = [];
            for (x = _j = 0, _ref1 = k - 1; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
              _results1.push(0);
            }
            return _results1;
          })());
        }
        return _results;
      })();
      for (i = _i = 0; 0 <= n ? _i < n : _i > n; i = 0 <= n ? ++_i : --_i) {
        table[i][0] = seq[i] + (i ? table[i - 1][0] : 0);
      }
      for (j = _j = 0; 0 <= k ? _j < k : _j > k; j = 0 <= k ? ++_j : --_j) {
        table[0][j] = seq[0];
      }
      for (i = _k = 1; 1 <= n ? _k < n : _k > n; i = 1 <= n ? ++_k : --_k) {
        for (j = _l = 1; 1 <= k ? _l < k : _l > k; j = 1 <= k ? ++_l : --_l) {
          m = _.min((function() {
            var _m, _results;
            _results = [];
            for (x = _m = 0; 0 <= i ? _m < i : _m > i; x = 0 <= i ? ++_m : --_m) {
              _results.push([_.max([table[x][j - 1], table[i][0] - table[x][0]]), x]);
            }
            return _results;
          })(), function(o) {
            return o[0];
          });
          table[i][j] = m[0];
          solution[i - 1][j - 1] = m[1];
        }
      }
      n = n - 1;
      k = k - 2;
      ans = [];
      while (k >= 0) {
        ans = [
          (function() {
            var _m, _ref, _ref1, _results;
            _results = [];
            for (i = _m = _ref = solution[n - 1][k] + 1, _ref1 = n + 1; _ref <= _ref1 ? _m < _ref1 : _m > _ref1; i = _ref <= _ref1 ? ++_m : --_m) {
              _results.push(seq[i]);
            }
            return _results;
          })()
        ].concat(ans);
        n = solution[n - 1][k];
        k = k - 1;
      }
      return [
        (function() {
          var _m, _ref, _results;
          _results = [];
          for (i = _m = 0, _ref = n + 1; 0 <= _ref ? _m < _ref : _m > _ref; i = 0 <= _ref ? ++_m : --_m) {
            _results.push(seq[i]);
          }
          return _results;
        })()
      ].concat(ans);
    }

    return this.each(function() {
      $container = $(this);

      // Start grid layout
      _layout($container, settings.itemSelector, settings.callback);
      
      // Window resize event
      if(settings.resize) {
        var resizeTimer;
        function resizeFunction() {
          _layout($container, settings.itemSelector);
        };
        $(window).resize(function() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(resizeFunction, 250);
        });  
      }
    });
 
  };
 
}( jQuery ));
/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});