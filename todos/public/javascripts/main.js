// Mustache style templates
_.templateSettings = {
  evaluate : /\{\[([\s\S]+?)\]\}/g,
  interpolate : /\{\{([\s\S]+?)\}\}/g
};

$(function(){
  $(document).pjax('a.popup', '#popup-container', {
    push: false // Don't add modals to the browser history
  });

  // TODO Don't hit navigation links
  $(document).pjax('a:not(.popup)', '#body-container', {
    maxCacheLength: 0
  });

  $(document).on('submit', 'form[data-pjax]', function(event) {
    event.preventDefault();

    var $form = $(event.target);

    $.ajax({
      url: $form.attr('action'),
      type: 'POST',
      data: $form.serialize(),
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      success: function(response) {
        $('#popup-container').empty();

        IncludeUpdater.publish(response.events);

        $.pjax({
          url: response.url,
          container: '#body-container',
          replace: true
        });
      }
    });
  });
});

var IncludeUpdater = {
  publish: function(eventNames){

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