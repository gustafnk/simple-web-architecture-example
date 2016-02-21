var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Moniker = require('moniker')

var names = Moniker.generator([Moniker.adjective, Moniker.noun]);

var todos = [
  {id: 1, name: names.choose() },
  {id: 2, name: names.choose() },
  {id: 3, name: names.choose() }
];

router.get('/', function (req, res) {
  res.renderPjax('index', { title: "Todos", todos: todos, pjax: req.pjax});
});

router.get('/new', function(req, res) {
  res.renderPjax('new', { title: "New Todo", defaultName: names.choose(), pjax: req.pjax });
});

router.post('/new', function(req, res) {
  var newId = _.chain(todos).pluck('id').max().value();
  var name = req.body.name

  todos.push({
    id: newId,
    name: name
  });

  req.xhr ? res.send({url: '/'}) : res.redirect('/');
});

module.exports = router;
