
$(function(){
  $(document).pjax('a.popup', '#popup-container', {
    push: false
  });

  $(document).pjax('a:not(.popup)', '#body-container', {
    maxCacheLength: 0
  });

  $(document).on('submit', 'form[data-pjax]', function(event) {
    event.preventDefault();

    SimpleForm.serialize(event, function(response) {
      $('#popup-container').empty();

      IncludesRefresher.refresh(response.events);

      $.pjax({
        url: response.url,
        container: '#body-container',
        replace: true
      });
    });
  });
});