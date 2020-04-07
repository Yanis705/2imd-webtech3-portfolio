var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/updatestats', function(req, res, next) {
  res.render('updateStats', { title: 'Express' });
});

module.exports = router;
