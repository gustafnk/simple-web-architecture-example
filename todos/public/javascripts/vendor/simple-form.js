var SimpleForm = {
  serialize: function(event, successCallback){
    var $form = $(event.target);

    $.ajax({
      url: $form.attr('action'),
      type: 'POST',
      data: $form.serialize(),
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      success: function(response) {
        if (successCallback) {
          successCallback(response)
        }
      }
    });
  }
}