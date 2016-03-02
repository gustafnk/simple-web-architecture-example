var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Moniker = require('moniker');
var Chance = require('chance');
var chance = new Chance();

var names = Moniker.generator([Moniker.adjective, Moniker.noun]);

var severeties = ['default', 'primary', 'success', 'info', 'warning', 'danger'];
var actions = ['created', 'edited', 'removed', 'assigned'];

function renderActivity(req, res, options) {

  var events = [
    {id: 1, name: chance.first() + " " + _.sample(actions) + " " + names.choose(), severity: _.sample(severeties) },
    {id: 2, name: chance.first() + " " + _.sample(actions) + " " + names.choose(), severity: _.sample(severeties) },
    {id: 3, name: chance.first() + " " + _.sample(actions) + " " + names.choose(), severity: _.sample(severeties) }
  ];
  res.render('index', { title: "Activity", events: events, layout: options.layout });
}

router.get('/', function(req, res){
  renderActivity(req, res, { title: 'Activities', layout: true }); 
});

router.get('/widget', function(req, res){
  renderActivity(req, res, { title: 'Activities', layout: false }); 
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
      name: chance.first() + " " + _.sample(actions) + " " + names.choose(),
      severity: _.sample(severeties)
    };

    // TODO Read file
    var template = '<li><span class=\\"label label-<%= severity %>\\"><%= name %></span></li>';
    var html = _.template(template)(message);

    res.write('data: {"eventHTML": "' + html + '"}\n\n');
  }, 3000);
});

module.exports = router;
