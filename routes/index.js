var express = require("express");
var router = express.Router();
var point = require("../controllers/PointsController.js");
const loginController = require("../controllers/LoginController");
/*
router.get('/',  authController.verifyLoginUser, function(req, res, next) {
  res.render('index', );
});
////Nao sei se o anterior esta bem 

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login/login");
});

router.get("/recuperar", function (req, res, next) {
  res.render("login/recuperar");
});

router.get("/pass", function (req, res, next) {
  res.render("login/pass");
});

router.get("/pontos",loginController.verifyLoginUser, function (req, res, next) {
  res.render("pontos", {
    username: req.session.username,
    userId: req.session.userId,
  });
});

router.get("/doar/:id",loginController.verifyLoginUser, function (req, res, next) {
  point.simulate(req, res);
});
/*
router.get("/registardoador", function (req, res, next) {
  res.render("utilizadores/registardoador", {
    username: req.session.username,
    userId: req.session.userId,
  });
});

router.get("/registarfuncionario", function (req, res, next) {
  res.render("utilizadores/registarfuncionario", {
    username: req.session.username,
    userId: req.session.userId,
  });
});

router.get("/registarinstituicao", function (req, res, next) {
  res.render("utilizadores/registarinstituicao", {
    username: req.session.username,
    userId: req.session.userId,
  });
});

router.get("/registarparceiro", function (req, res, next) {
  res.render("utilizadores/registarparceiro", {
    username: req.session.username,
    userId: req.session.userId,
  });
});

router.get("/editarutilizador", function (req, res, next) {
  res.render("utilizadores/editarutilizador", {
    username: req.session.username,
    userId: req.session.userId,
  });
});

router.get("/editarfuncionario", function (req, res, next) {
  res.render("utilizadores/editarfuncionario", {
    username: req.session.username,
    userId: req.session.userId,
  });
});

router.get("/editarinstituicao", function (req, res, next) {
  res.render("utilizadores/editarinstituicao", {
    username: req.session.username,
    userId: req.session.userId,
  });
});

router.get("/editarparceiro", function (req, res, next) {
  res.render("utilizadores/editarparceiro", {
    username: req.session.username,
    userId: req.session.userId,
  });
});

var campaign = require("../controllers/CampaignController.js");
router.get("/gerirCampanhas", function (req, res, next) {
  campaign.management(req,res);
});
*/
router.get("/dashboard",loginController.verifyLoginUser, function (req, res, next) {
  res.render("dashboard", {
    username: req.session.username,
    userId: req.session.userId,
  });
});



router.get("/shop/:donatorId",loginController.verifyLoginUser, function (req, res, next) {
  campaign.shop(req,res);
});

module.exports = router;
