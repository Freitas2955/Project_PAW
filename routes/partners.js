var express = require("express");
var router = express.Router();
var partner = require("../controllers/PartnerController.js");
const loginController = require("../controllers/LoginController");
// Get all partners
router.get("/",loginController.verifyLoginUser, function (req, res) {
  partner.management(req, res);
});

// Get single partner by id
router.get("/show/:id",loginController.verifyLoginUser, function (req, res) {
  partner.show(req, res);
});

// Create partner
router.get("/create",loginController.verifyLoginUser, function (req, res) {
  partner.create(req, res);
});

// Save partner
router.post("/save",loginController.verifyLoginUser, function (req, res) {
  partner.save(req, res);
});

// Edit partner
router.get("/edit/:id",loginController.verifyLoginUser, function (req, res) {
  partner.edit(req, res);
});

// Edit update
router.post("/update/:id",loginController.verifyLoginUser, function (req, res) {
  partner.update(req, res);
});

// Edit update
router.post("/delete/:id",loginController.verifyLoginUser, function (req, res, next) {
  partner.delete(req, res);
});

// Obter uma entidade através do telefone
router.get('/searchByemail',loginController.verifyLoginUser, function(req, res) {
  partner.searchByemail(req, res);
});

module.exports = router;
