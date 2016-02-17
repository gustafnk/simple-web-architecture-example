var ActivityList = Object.create(HTMLUListElement.prototype);

ActivityList.attachedCallback = function() {
  var that = this;

  var source = new EventSource(this.getAttribute('href'));

  source.addEventListener('message', function(e) {
    var data = JSON.parse(e.data);
    var toPrepend = _.template($('#event-template').html())(data);
    $(that).prepend(toPrepend);

    // Remove an element if too long
    var children = $(that).children();
    if(children.length > 5) {
      children.last().remove();
    }

  }, false);
};

document.registerElement('x-activity-list', {
  prototype: ActivityList,
  extends: 'ul'
});