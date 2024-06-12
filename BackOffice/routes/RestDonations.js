var express = require("express");
var router = express.Router();
var donation = require("../controllers/RestDonationController.js");
const loginController = require("../controllers/RestLoginController.js");
// Get all donations
router.get("/getEntityDonations/:id",loginController.verifyEntityUser, function (req, res) {
  donation.getEntityDonations(req, res);
});

router.get("/getDonatorDonations/:id",loginController.verifyDonatorUser, function (req, res) {
  donation.getDonatorDonations(req, res);
});

router.get("/show/:id",loginController.verifyLoginUser, function (req, res) {
  donation.show(req, res);
});

router.post("/save/:id", loginController.verifyDonatorUser, function (req, res) {
  donation.save(req, res);
});

router.post(
  "/delete/:id",
  loginController.verifyLoginUser,
  function (req, res, next) {
    donation.delete(req, res);
  }
);

router.post(
  "/approve/:id",loginController.verifyEntityUser,
  function (req, res, next) {
    donation.approve(req, res);
  }
);

/*
router.get("/", function (req, res) {
  donation.management(req, res);
});*/

/*
// Create donation
router.get("/create/:id", loginController.verifyDonatorUser, function (req, res) {
  res.redirect("/doar/" + req.params.id);
});*/
/*
// Edit donation
router.get("/edit/:id",loginController.verifyLoginUser, function (req, res) {
  donation.edit(req, res);
});

// Edit update
router.post("/update/:id",loginController.verifyLoginUser, function (req, res) {
  donation.update(req, res);
});*/
/*
router.get(
  "/searchByDonatorName",
  loginController.verifyLoginUser,
  function (req, res) {
    donation.management2(req, res);
  }
);*/

module.exports = router;
