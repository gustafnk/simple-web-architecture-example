var ActivityList = Object.create(HTMLUListElement.prototype);

ActivityList.attachedCallback = function() {
  var that = this;

  var source = new EventSource('/event-stream');

  source.addEventListener('message', function(e) {
    var data = JSON.parse(e.data);
    var toPrepend = _.template($('#event-template').html())(data) + " foo";
    $(that).prepend(toPrepend);
  }, false);
};

document.registerElement('x-activity-list', {
  prototype: ActivityList,
  extends: 'ul'
});