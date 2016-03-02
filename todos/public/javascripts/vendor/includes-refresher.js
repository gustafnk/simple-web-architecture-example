var IncludesRefresher = {
  refresh: function(eventNames){

    function check(element, eventName){
      if (element.localName === 'h-include') {

        var attribute = element.getAttribute('update-on');

        if (attribute) {
          var tokens = attribute.split(',');

          return tokens.some(function(token){
            var topic = token.trim();
            return topic === eventName;
          });
        }
      }
    }

    var subscribers = document.querySelectorAll('[update-on]');

    for(var i = 0; i < subscribers.length; ++i) {
      eventNames.forEach(function(eventName){
        if (check(subscribers[i], eventName)) {
          subscribers[i].refresh();
        }
      });
    };
  }
}