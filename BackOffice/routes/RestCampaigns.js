var express = require("express");
var router = express.Router();
var campaign = require("../controllers/RestCampaignController.js");
const loginController = require("../controllers/RestLoginController.js");
// Get all campaigns
router.get("/",loginController.verifyLoginUser, function (req, res) {
  campaign.management(req, res);
});

router.get("/get",loginController.verifyLoginUser, function (req, res) {
  campaign.getCampaigns(req, res);
});

router.get("/get/:partnerId", function (req, res) {
  campaign.getPartnerCampaigns(req, res);
});

// Get single campaign by id
router.get("/show/:id", function (req, res) {
  campaign.show(req, res);
});

router.get("/show/:id/:donatorId",loginController.verifyLoginUser, function (req, res) {
  campaign.buyMenu(req, res);
});

// Create campaign
router.get("/create/:partnerId",loginController.verifyLoginUser, function (req, res) {
  campaign.create(req, res);
});

// Save campaign
router.post("/save", function (req, res) {
  campaign.save(req, res);
});
/*
// Edit campaign
router.get("/edit/:id",loginController.verifyLoginUser, function (req, res) {
  campaign.edit(req, res);
});

 Edit update
router.post("/update/:id",loginController.verifyLoginUser, function (req, res) {
  campaign.update(req, res);
});*/

// Edit update
router.get("/delete/:id", function (req, res, next) {
  campaign.delete(req, res);
});

router.get(
  "/searchByPartner1",
  loginController.verifyLoginUser,
  function (req, res) {
    campaign.management1(req, res);
  }
);

module.exports = router;
