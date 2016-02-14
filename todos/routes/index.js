var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Moniker = require('moniker')

var todos = [
  {id: 1, name: "First" },
  {id: 2, name: "Second" },
  {id: 3, name: "Third" }
];

router.get('/', function(req, res) {
  res.render('index', { title: "Todos", todos: todos});
});

router.get('/new', function(req, res) {
  var names = Moniker.generator([Moniker.adjective, Moniker.noun]);
  res.render('new', { title: "New Todo", defaultName: names.choose() });
});

router.post('/new', function(req, res) {
  var newId = _.chain(todos).pluck('id').max().value();
  var name = req.body.name

  todos.push({
    id: newId,
    name: name
  });

  res.redirect('/');
});

module.exports = router;
