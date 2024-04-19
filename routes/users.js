var express = require('express');
var router = express.Router();
var employee = require("../controllers/EmployeeController.js");
var donation = require("../controllers/DonationController.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/gerir', function(req, res, next) {
  employee.management(req,res);
  
});

router.get('/gerirDoacoes', function(req, res, next) {
  donation.management(req,res);
  
});



module.exports = router;
