var express = require("express");
var router = express.Router();
var entity = require("../controllers/RestEntityController.js");
const loginController = require("../controllers/RestLoginController.js");

router.get("/getApproved",loginController.verifyLoginUser, function (req, res) {
  entity.getApproved(req, res);
});

// Get single entity by id
router.get("/show/:id",loginController.verifyLoginUser, function (req, res) {
  entity.show(req, res);
});

// Save entity
router.post("/save", function (req, res) {
  entity.save(req, res);
});

// Edit update
router.post("/update/:id", function (req, res) {
  entity.update(req, res);
});

/*
// Get all entitys
router.get("/",loginController.verifyLoginUser, function (req, res) {
  entity.management1(req, res);
});

router.get("/notApproved",loginController.verifyLoginUser, function (req, res) {
  entity.management2(req, res);
});


// Create entity
router.get("/create",loginController.verifyLoginUser, function (req, res) {
  entity.create(req, res);
});

// Edit entity
router.get("/edit/:id",loginController.verifyLoginUser, function (req, res) {
  entity.edit(req, res);
});

// Edit update
router.post("/delete/:id",loginController.verifyLoginUser, function (req, res, next) {
  entity.delete(req, res);
});

router.post("/approve/:id",loginController.verifyLoginUser, function (req, res, next) {
  entity.approve(req, res);
});

// Obter uma entidade através do email
router.get('/searchByemail',loginController.verifyLoginUser, function(req, res) {
  entity.searchByemail(req, res);
});
*/

module.exports = router;
