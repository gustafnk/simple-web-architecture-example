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

        IncludesRefresher.refresh(response.events);

        $.pjax({
          url: response.url,
          container: '#body-container',
          replace: true
        });
      }
    });
  });
});