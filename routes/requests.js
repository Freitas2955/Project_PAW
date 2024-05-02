var express = require("express");
var router = express.Router();
var request = require("../controllers/RequestController.js");
const loginController = require("../controllers/LoginController");

router.get("/",loginController.verifyLoginUser, function (req, res) {
  request.management1(req, res);
});

router.get("/naoTerminados",loginController.verifyLoginUser, function (req, res) {
  request.management2(req, res);
});

// Get single request by id
router.get("/show/:id",loginController.verifyLoginUser, function (req, res) {
  request.show(req, res);
});

// Create request
router.get("/create",loginController.verifyLoginUser, function (req, res) {
  request.create(req, res);
});

// Save request
router.post("/save/:id",loginController.verifyLoginUser, function (req, res) {
  request.save(req, res);
});

// Edit request
router.get("/edit/:id",loginController.verifyLoginUser, function (req, res) {
  request.edit(req, res);
});

// Edit update
router.post("/update/:id",loginController.verifyLoginUser, function (req, res) {
  request.update(req, res);
});

// Edit update
router.post("/delete/:id",loginController.verifyLoginUser, function (req, res, next) {
  request.delete(req, res);
});

router.post("/approve/:id",loginController.verifyLoginUser, function (req, res, next) {
  request.approve(req, res);
});

module.exports = router;
