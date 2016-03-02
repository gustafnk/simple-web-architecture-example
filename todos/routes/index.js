var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Moniker = require('moniker');
var loremIpsum = require('lorem-ipsum');

var names = Moniker.generator([Moniker.adjective, Moniker.noun]);

var todos = [
  {id: 1, name: names.choose(), shortDescription: loremIpsum({ sentenceLowerBound: 10 }), longDescription: loremIpsum({ sentenceLowerBound: 50 }) },
  {id: 2, name: names.choose(), shortDescription: loremIpsum({ sentenceLowerBound: 10 }), longDescription: loremIpsum({ sentenceLowerBound: 50 }) },
  {id: 3, name: names.choose(), shortDescription: loremIpsum({ sentenceLowerBound: 10 }), longDescription: loremIpsum({ sentenceLowerBound: 50 }) }
];

router.get('/new', function(req, res) {
  res.renderPjax('new', { title: "New Todo", defaultName: names.choose(), count: todos.length, layout: !(req.pjax || req.xhr) });
});

router.get('/', function (req, res) {
  res.renderPjax('index', { title: "Todos", todos: todos, count: todos.length, layout: !(req.pjax || req.xhr) });
});

router.get('/:id', function (req, res) {
  console.log(req.params.name)
  var found = _.find(todos,function(todo){
    return todo.id == req.params.id;
  });
  res.renderPjax('details', { title: "Todo: " + found.name, todo: found, count: todos.length, layout: !(req.pjax || req.xhr) });
});

router.post('/new', function(req, res) {
  var newId = _.chain(todos).pluck('id').max().value();
  var name = req.body.name

  todos.push({
    id: newId,
    name: name,
    shortDescription: loremIpsum({ sentenceLowerBound: 10 }), 
    longDescription: loremIpsum({ sentenceLowerBound: 50 })
  });

  req.xhr ? res.send({url: '/', events: ['new-todo']}) : res.redirect('/');
});

router.get('/widgets/counter', function(req, res){
  res.renderPjax('counter', { title: "TODOs left", count: todos.length, layout: false });
});

// Tabs example
router.get('/tabs-test', function(req, res) {
  res.renderPjax('tabs-test', { title: "Tabs widgets test", menuItem: 'tabs', count: todos.length, layout: !(req.pjax || req.xhr) });
});

router.get('/tabs/tabs-1', function(req, res) {
  res.renderPjax('tabs/tabs-1', { title: "Tabs example", menuItem: 'tabs', count: todos.length, layout: !(req.pjax || req.xhr) });
});

router.get('/tabs/tabs-3', function(req, res) {
  res.renderPjax('tabs/tabs-3', { title: "Tabs example", menuItem: 'tabs', count: todos.length, layout: !(req.pjax || req.xhr) });
});

module.exports = router;
