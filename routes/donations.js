var express = require("express");
var router = express.Router();
var donation = require("../controllers/DonationController.js");

// Get all donations
router.get("/", function (req, res) {
  donation.list(req, res);
});

// Get single donation by id
router.get("/show/:id", function (req, res) {
  donation.show(req, res);
});

// Create donation
router.get("/create", function (req, res) {
  donation.create(req, res);
});

// Save donation
router.post("/save/:id", function (req, res) {
  donation.save(req, res);
});

// Edit donation
router.get("/edit/:id", function (req, res) {
  donation.edit(req, res);
});

// Edit update
router.post("/update/:id", function (req, res) {
  donation.update(req, res);
});

// Edit update
router.post("/delete/:id", function (req, res, next) {
  donation.delete(req, res);
});

module.exports = router;
