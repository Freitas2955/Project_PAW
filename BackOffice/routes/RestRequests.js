var express = require("express");
var router = express.Router();
var request = require("../controllers/RestRequestController.js");
const loginController = require("../controllers/LoginController.js");

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

/*
// Create request
router.get("/create",loginController.verifyLoginUser, function (req, res) {
  request.create(req, res);
});
*/

// Save request
router.post("/save/:id",loginController.verifyLoginUser, function (req, res) {
  request.save(req, res);
});

/*
// Edit request
router.get("/edit/:id",loginController.verifyLoginUser, function (req, res) {
  request.edit(req, res);
});

// Edit update
router.post("/update/:id",loginController.verifyLoginUser, function (req, res) {
  request.update(req, res);
});*/


router.post("/delete/:id",loginController.verifyLoginUser, function (req, res, next) {
  request.delete(req, res);
});

router.post("/approve/:id",loginController.verifyLoginUser, function (req, res, next) {
  request.approve(req, res);
});

router.get("/approve/:id",loginController.verifyLoginUser, function (req, res, next) {
  request.approve(req, res);
});

router.get(
  "/searchByCity1",
  loginController.verifyLoginUser,
  function (req, res) {
    request.management1Find(req, res);
  }
);

router.get(
  "/searchByCity2",
  loginController.verifyLoginUser,
  function (req, res) {
    request.management2Find(req, res);
  }
);


module.exports = router;
