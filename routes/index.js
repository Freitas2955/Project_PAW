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

router.get('/pontos', function(req, res, next) {
  res.render('pontos', { title: 'Express' });
});

router.get('/doar', function(req, res, next) {
  res.render('doar', { title: 'Express' });
});

router.get('/registarutilizador', function(req, res, next) {
  res.render('registarutilizador', { title: 'Express' });
});

module.exports = router;
