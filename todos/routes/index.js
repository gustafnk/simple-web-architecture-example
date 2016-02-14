var express = require('express');
var router = express.Router();

var todos = [
  {id: 1, name: "First" },
  {id: 2, name: "Second" },
  {id: 3, name: "Third" }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Todos", todos: todos});
});

module.exports = router;
