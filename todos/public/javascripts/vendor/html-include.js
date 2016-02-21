/*jslint browser: true, indent: 2*/
/*global Event*/

// Forked from https://github.com/chris-l/html-include/

(function (window) {
  'use strict';
  var proto;

  function xhr(that, uri) {

    if (that.getAttribute('only-update') !== null && !that.skipFirst) {
      that.skipFirst = true;
      return;
    }

    var r = new XMLHttpRequest();

    if (that.preventCache || that.getAttribute('cache-bust') !== null) {
      uri += (/\?/.test(uri) ? '&' : '?') + (new Date().getTime());
    }

    r.open("GET", uri, true);
    r.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    r.onreadystatechange = function () {
      var response;
      if (r.readyState !== 4) {
        return;
      }
      response = r.responseText || '';

      // It is already attached?
      if (that.parentNode !== null) {
        that.innerHTML = response;
      } else {
        //It is not, save the content.
        that.content = response;
      }
    };
    r.send();
  }

  proto = Object.create(window.HTMLElement.prototype);

  /*jslint unparam:true*/
  proto.attributeChangedCallback = function (attr, oldVal, newVal) {
    if (attr === 'src') {
      this.src = newVal;
    }
  };
  /*jslint unparam:false*/

  proto.attachedCallback = function () {
    // If it already has content, just replace it.
    if (this.content) {
      this.innerHTML = this.content;
    }
  };

  proto.createdCallback = function () {
    var that = this, src;
    src = this.src || this.getAttribute('src') || false;

    if (src) {
      xhr(this, src);
      return;
    }

    Object.defineProperty(this, 'src', {
      set : function (val) {
        xhr(that, val);
      },
      get : function () {
        return that.getAttribute('src') || '';
      }
    });
  };

  proto.onMessage = function(message){
    var that = this;
    var attribute = this.getAttribute('update-on');

    if (attribute) {
      var tokens = attribute.split(',');

      tokens.forEach(function(token){
        var topic = token.trim();

        if (topic === token) {
          that.createdCallback()
        }
      });
    }
  }

  document.registerElement('html-include', {
    prototype : proto
  });
}(this));
