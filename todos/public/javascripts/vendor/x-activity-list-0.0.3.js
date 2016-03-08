var ActivityList = Object.create(HTMLUListElement.prototype);

ActivityList.attachedCallback = function() {
  var that = this;

  var source = new EventSource(this.getAttribute('href'));

  source.addEventListener('message', function(e) {
    var data = JSON.parse(e.data);
    $(that).prepend(data.eventHTML);

    // Remove an element if too long
    var children = $(that).children();
    if(children.length > 5) {
      children.last().remove();
    }

  }, false);
};

document.registerElement('activity-list', {
  prototype: ActivityList
});