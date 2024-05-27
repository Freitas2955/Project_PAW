var express = require("express");
var router = express.Router();
var donation = require("../controllers/DonationController.js");
const loginController = require("../controllers/LoginController");
// Get all donations
router.get("/", loginController.verifyLoginUser, function (req, res) {
  donation.management(req, res);
});

router.get("/get", loginController.verifyLoginUser, function (req, res) {
  donation.getDonations(req, res);
});

// Get single donation by id
router.get("/show/:id", loginController.verifyLoginUser, function (req, res) {
  donation.show(req, res);
});

router.get("/selectEntity/:id", loginController.verifyLoginUser, function (req, res) {
  donation.select(req, res);
});

// Create donation
router.get("/create/:id/:entityId", loginController.verifyLoginUser, function (req, res) {
  res.redirect("/doar/" + req.params.id+"/"+req.params.entityId);
});

// Save donation
router.post("/save/:id/:entityId", loginController.verifyLoginUser, function (req, res) {
  donation.save(req, res);
});
/*
// Edit donation
router.get("/edit/:id",loginController.verifyLoginUser, function (req, res) {
  donation.edit(req, res);
});

// Edit update
router.post("/update/:id",loginController.verifyLoginUser, function (req, res) {
  donation.update(req, res);
});*/

router.post(
  "/delete/:id",
  loginController.verifyLoginUser,
  function (req, res, next) {
    donation.delete(req, res);
  }
);

router.post(
  "/approve/:id",
  loginController.verifyLoginUser,
  function (req, res, next) {
    donation.approve(req, res);
  }
);

router.get(
  "/searchByDonatorName",
  loginController.verifyLoginUser,
  function (req, res) {
    donation.management2(req, res);
  }
);

module.exports = router;
