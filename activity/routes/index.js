var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Moniker = require('moniker')

var names = Moniker.generator([Moniker.adjective, Moniker.noun]);

function renderActivity(req, res, options) {

  var events = [
    {id: 1, name: names.choose() },
    {id: 2, name: names.choose() },
    {id: 3, name: names.choose() }
  ];
  res.render('index', { title: "Activity", events: events, layout: options.layout });
}

router.get('/', function(req, res){
  renderActivity(req, res, { layout: true }); 
});

router.get('/widget', function(req, res){
  renderActivity(req, res, { layout: false }); 
});

router.get('/event-stream', function(req, res){
  var counter = 0;

  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  setInterval(function(){
    var message = {
      id: ++counter,
      name: names.choose()
    };

    res.write('data: {"event": '+ JSON.stringify(message) +'}\n\n');
  }, 1000);
});

module.exports = router;
