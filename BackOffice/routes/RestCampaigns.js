var express = require("express");
var router = express.Router();
var campaign = require("../controllers/RestCampaignController.js");
const loginController = require("../controllers/RestLoginController.js");
// Get all campaigns
/*
router.get("/",loginController.verifyLoginUser, function (req, res) {
  campaign.management(req, res);
});*/

router.get("/get",loginController.verifyLoginUser, function (req, res) {
  campaign.getCampaigns(req, res);
});

router.get("/get/:partnerId",loginController.verifyLoginUser, function (req, res) {
  campaign.getPartnerCampaigns(req, res);
});

router.get("/show/:id",loginController.verifyLoginUser, function (req, res) {
  campaign.show(req, res);
});

router.get("/show/:id/:donatorId",loginController.verifyDonatorUser, function (req, res) {
  campaign.buyMenu(req, res);
});

router.post("/save",loginController.verifyPartnerUser, function (req, res) {
  campaign.save(req, res);
});

router.get("/delete/:id",loginController.verifyPartnerUser, function (req, res, next) {
  campaign.delete(req, res);
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

/*
router.get(
  "/searchByPartner1",
  loginController.verifyLoginUser,
  function (req, res) {
    campaign.management1(req, res);
  }
);*/

/*
// Create campaign
router.get("/create/:partnerId",loginController.verifyLoginUser, function (req, res) {
  campaign.create(req, res);
});
*/

module.exports = router;
