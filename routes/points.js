var express = require("express");
var router = express.Router();
var point = require("../controllers/PointsController.js");

// Save donation
router.get("/", function (req, res) {
    point.edit(req, res);
});

// Save donation
router.post("/save", function (req, res) {
    point.save(req, res);
});

// Edit donation
router.get("/edit/:id", function (req, res) {
    point.edit(req, res);
});

// Edit update
router.post("/update/:id", function (req, res) {
    point.update(req, res);
});

module.exports = router;
