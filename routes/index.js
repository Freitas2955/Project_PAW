var express = require('express');
var router = express.Router();
var point= require("../controllers/PointsController.js")
const authController = require('../controllers/LoginController')
/*
router.get('/',  authController.verifyLoginUser, function(req, res, next) {
  res.render('index', );
});
////Nao sei se o anterior esta bem 

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

router.get('/doar/:id', function(req, res, next) {
  point.simulate(req,res);
});

router.get('/registardoador', function(req, res, next) {
  res.render('utilizadores/registardoador', { title: 'Express' });
});

router.get('/registarfuncionario', function(req, res, next) {
  res.render('utilizadores/registarfuncionario', { title: 'Express' });
});

router.get('/registarinstituicao', function(req, res, next) {
  res.render('utilizadores/registarinstituicao', { title: 'Express' });
});

router.get('/registarparceiro', function(req, res, next) {
  res.render('utilizadores/registarparceiro', { title: 'Express' });
});

router.get('/editarutilizador', function(req, res, next) {
  res.render('utilizadores/editarutilizador', { title: 'Express' });
});

router.get('/editarfuncionario', function(req, res, next) {
  res.render('utilizadores/editarfuncionario', { title: 'Express' });
});

router.get('/editarinstituicao', function(req, res, next) {
  res.render('utilizadores/editarinstituicao', { title: 'Express' });
});

router.get('/editarparceiro', function(req, res, next) {
  res.render('utilizadores/editarparceiro', { title: 'Express' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;
