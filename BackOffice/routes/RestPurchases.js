var express = require("express");
var router = express.Router();
var purchase= require("../controllers/RestPurchasesController")
const loginController = require("../controllers/RestLoginController.js");
// Get all campaigns

router.get("/getPartnerPurchases/:id",loginController.verifyPartnerUser, function (req, res) {
  purchase.getPartnerPurchases(req, res);
});
router.get("/getDonatorPurchases/:id",loginController.verifyDonatorUser, function (req, res) {
  purchase.getDonatorPurchases(req, res);
});

module.exports = router;
