var express = require('express');
var router = express.Router();
var employee = require("../controllers/RestEmployeeController.js");
const loginController = require("../controllers/RestLoginController.js");
// Get all employees
router.get('/',loginController.verifyLoginUser, function(req, res) {
  employee.management(req, res);
});

// Get single employee by id
router.get('/show/:id',loginController.verifyLoginUser, function(req, res) {
  employee.show(req, res);
});

// Create employee
router.get('/create',loginController.verifyLoginUser, function(req, res) {
  employee.create(req, res);
});

// Save employee
router.post('/save',loginController.verifyLoginUser, function(req, res) {
  employee.save(req, res);
});

// Edit employee
router.get('/edit/:id',loginController.verifyLoginUser, function(req, res) {
  employee.edit(req, res);
});

// Edit update
router.post('/update/:id',loginController.verifyLoginUser, function(req, res) {
  employee.update(req, res);
});

// Edit update
router.post('/delete/:id',loginController.verifyLoginUser, function(req, res, next) {
  employee.delete(req, res);
});

// Obter uma entidade através do email
router.get('/searchByemail',loginController.verifyLoginUser, function(req, res) {
  employee.searchByemail(req, res);
});

module.exports = router;