var express = require("express");
var router = express.Router();
var request = require("../controllers/RequestController.js");

// Get all entitys
router.get("/", function (req, res) {
  request.list(req, res);
});

// Get single request by id
router.get("/show/:id", function (req, res) {
  request.show(req, res);
});

// Create request
router.get("/create", function (req, res) {
  request.create(req, res);
});

// Save request
router.post("/save/:id", function (req, res) {
  request.save(req, res);
});

// Edit request
router.get("/edit/:id", function (req, res) {
  request.edit(req, res);
});

// Edit update
router.post("/update/:id", function (req, res) {
  request.update(req, res);
});

// Edit update
router.post("/delete/:id", function (req, res, next) {
  request.delete(req, res);
});

router.post("/approve/:id", function (req, res, next) {
  request.approve(req, res);
});

module.exports = router;
