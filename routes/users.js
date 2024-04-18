var express = require('express');
var router = express.Router();
var employee = require("../controllers/EmployeeController.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/gerir', function(req, res, next) {
  employee.management(req,res);
  
});


module.exports = router;
