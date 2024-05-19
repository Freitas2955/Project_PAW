var express = require("express");
var router = express.Router();
var donator = require("../controllers/RestDonatorController.js");
const loginController = require("../controllers/LoginController.js");
// Get all donators
router.get("/",loginController.verifyLoginUser, function (req, res) {
  donator.management(req, res);
});

// Get single donator by id
router.get("/show/:id",loginController.verifyLoginUser, function (req, res) {
  donator.show(req, res);
});

// Create donator
router.get("/create",loginController.verifyLoginUser, function (req, res) {
  donator.create(req, res);
});

// Save donator
router.post("/save",loginController.verifyLoginUser, function (req, res) {
  donator.save(req, res);
});

// Edit donator
router.get("/edit/:id",loginController.verifyLoginUser, function (req, res) {
  donator.edit(req, res);
});

// Edit update
router.post("/update/:id",loginController.verifyLoginUser, function (req, res) {
  donator.update(req, res);
});

// Edit update
router.post("/delete/:id",loginController.verifyLoginUser, function (req, res, next) {
  donator.delete(req, res);
});

router.get("/buy/:campaignId/:donatorId",loginController.verifyLoginUser, function (req, res, next) {
  donator.buy(req, res);
});

// Obter uma entidade através do email
router.get('/searchByemail',loginController.verifyLoginUser, function(req, res) {
  donator.searchByemail(req, res);
});

module.exports = router;
