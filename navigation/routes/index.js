var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', item: req.query.item });
});

router.get('/widget', function(req, res, next) {
  res.render('index', { title: 'Express', item: req.query.item, layout: false });
});

module.exports = router;
