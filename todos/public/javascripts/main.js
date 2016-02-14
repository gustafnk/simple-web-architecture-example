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
      success: function(redirectUrl) {
        $('#popup-container').empty();
        $.pjax({url: redirectUrl, container: '#body-container'});
      }
    });
  });
});