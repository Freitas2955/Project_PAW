var express = require("express");
var router = express.Router();
var point = require("../controllers/RestPointsController.js");
const loginController = require("../controllers/RestLoginController.js");
// Save donation
router.get("/",loginController.verifyLoginUser, function (req, res) {
    point.edit(req, res);
});
/*
// Save donation
router.post("/save",loginController.verifyLoginUser, function (req, res) {
    point.save(req, res);
});


// Edit donation
router.get("/edit/:id",loginController.verifyLoginUser, function (req, res) {
    point.edit(req, res);
});
*/

router.get("/get", function (req, res) {
    point.get(req, res);
});

// Edit update
router.post("/update/:id",loginController.verifyLoginUser, function (req, res) {
    point.update(req, res);
});

module.exports = router;
