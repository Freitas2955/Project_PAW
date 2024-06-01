var express = require("express");
var router = express.Router();
var partner = require("../controllers/RestPartnerController.js");
const loginController = require("../controllers/LoginController.js");

router.get("/get", function (req, res) {
  partner.getPartners(req, res);
});

// Get all partners
router.get("/",loginController.verifyLoginUser, function (req, res) {
  partner.management(req, res);
});

// Get single partner by id
router.get("/show/:id", function (req, res) {
  partner.show(req, res);
});

// Create partner
router.get("/create",loginController.verifyLoginUser, function (req, res) {
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
router.post("/delete/:id",loginController.verifyLoginUser, function (req, res, next) {
  partner.delete(req, res);
});

// Obter uma entidade através do email
router.get('/searchByemail',loginController.verifyLoginUser, function(req, res) {
  partner.searchByemail(req, res);
});

module.exports = router;
