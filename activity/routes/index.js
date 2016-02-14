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

module.exports = router;
