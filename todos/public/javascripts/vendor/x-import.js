function createHtmlImport(url, onload) {
  var link = document.createElement('link');
  link.rel = 'import';
  link.href = url + '?bust=' + new Date().getTime(); // TODO Fix possible param quirk
  link.onload = onload;
  document.head.appendChild(link);
}

var XImportPrototype = Object.create(HTMLElement.prototype);

XImportPrototype.attachedCallback = function() {
  var container = this;
  var href = this.getAttribute('href');

  function onload() {
    var fragment = this.import.querySelector("body > *");
    container.innerHTML = '';

    container.appendChild(fragment.cloneNode(true));
  }

  createHtmlImport(href, onload);
};

XImportPrototype.onMessage = function(message) {
  if (message.topic !== 'counter-changed') return;

  console.log('onMessage() called with ', message);

  $.pjax({
    url: this.getAttribute('href'),
    container: '#' + this.getAttribute('id'),
    fragment: '.content',
    push: false,
    maxCacheLength: 0
  });
};

var XImport = document.registerElement('x-import', {
  prototype: XImportPrototype
});

