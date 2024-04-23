var express = require("express");
var router = express.Router();
var partner = require("../controllers/PartnerController.js");

// Get all partners
router.get("/", function (req, res) {
  partner.list(req, res);
});

// Get single partner by id
router.get("/show/:id", function (req, res) {
  partner.show(req, res);
});

// Create partner
router.get("/create", function (req, res) {
  partner.create(req, res);
});

// Save partner
router.post("/save", function (req, res) {
  partner.save(req, res);
});

// Edit partner
router.get("/edit/:id", function (req, res) {
  partner.edit(req, res);
});

// Edit update
router.post("/update/:id", function (req, res) {
  partner.update(req, res);
});

// Edit update
router.post("/delete/:id", function (req, res, next) {
  partner.delete(req, res);
});

module.exports = router;
