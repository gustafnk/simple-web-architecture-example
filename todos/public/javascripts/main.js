// Mustache style templates
_.templateSettings = {
  evaluate : /\{\[([\s\S]+?)\]\}/g,
  interpolate : /\{\{([\s\S]+?)\}\}/g
};

$(function(){
  $(document).pjax('a.popup', '#popup-container');

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

        var subscribers = $('[update-on]');

        _.each(subscribers, function(subscriber){
          _.each(response.events, function(e){
            subscriber.onMessage && subscriber.onMessage(e);
          });
        });

        $.pjax({url: response.url, container: '#body-container'});
      }
    });
  });
});