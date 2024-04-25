var express = require('express');
var router = express.Router();
var employee = require("../controllers/EmployeeController.js");
var donation = require("../controllers/DonationController.js");
var donator = require("../controllers/DonatorController.js");
var entity = require("../controllers/EntityController.js");
var partner = require("../controllers/PartnerController.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/gerirFuncionarios', function(req, res, next) {
  employee.management(req,res);
});

router.get('/gerirDoadores', function(req, res, next) {
  donator.management(req,res);
});

router.get('/gerirInstituicoes', function(req, res, next) {
  entity.management(req,res);
});

router.get('/gerirParceiros', function(req, res, next) {
  partner.management(req,res);
});

router.get('/gerirDoacoes', function(req, res, next) {
  donation.management(req,res);
  
});



module.exports = router;
