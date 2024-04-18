var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/login', { title: 'Express' });
});

router.get('/recuperar', function(req, res, next) {
  res.render('login/recuperar', { title: 'Express' });
});

router.get('/pass', function(req, res, next) {
  res.render('login/pass', { title: 'Express' });
});

module.exports = router;
