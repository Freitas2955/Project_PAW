var express = require("express");
var router = express.Router();
var campaign = require("../controllers/CampaignController.js");

// Get all campaigns
router.get("/", function (req, res) {
  campaign.list(req, res);
});

// Get single campaign by id
router.get("/show/:id", function (req, res) {
  campaign.show(req, res);
});

// Create campaign
router.get("/create/:partnerId", function (req, res) {
  campaign.create(req, res);
});

// Save campaign
router.post("/save/:partnerId/:partnerName", function (req, res) {
  campaign.save(req, res);
});

// Edit campaign
router.get("/edit/:id", function (req, res) {
  campaign.edit(req, res);
});

// Edit update
router.post("/update/:id", function (req, res) {
  campaign.update(req, res);
});

// Edit update
router.post("/delete/:id", function (req, res, next) {
  campaign.delete(req, res);
});


module.exports = router;
