
$(function(){

  // Register popup-container pjax, without back-button support
  $(document).pjax('a.popup', '#popup-container', {
    push: false
  });

  // Register body-container pjax, using no cache
  $(document).pjax('a:not(.popup)', '#body-container', {
    maxCacheLength: 0
  });

  // Clear popup container on body-container navigation
  $(document).on('pjax:complete', function(event) {
    if ($(event.target).is('#body-container')) {
      $('#popup-container').empty();
    }
  });

  // Send form over ajax, refresh client-side includes,
  //   and navigate to response url in body-container
  $(document).on('submit', 'form[data-pjax]', function(event) {
    event.preventDefault();

    SimpleForm.serialize(event, function(response) {

      IncludesRefresher.refresh(response.events);

      // Call pjax manually
      $.pjax({
        url: response.url,
        container: '#body-container',
        replace: true
      });
    });
  });
});