var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*router.get('/gerirFuncionarios',loginController.verifyLoginUser, function(req, res, next) {
  employee.management(req,res);
});

router.get('/gerirDoadores',loginController.verifyLoginUser,  function(req, res, next) {
  donator.management(req,res);
});

router.get('/gerirInstituicoes',loginController.verifyLoginUser,  function(req, res, next) {
  entity.management1(req,res);
});

router.get('/gerirInstituicoesN',loginController.verifyLoginUser,  function(req, res, next) {
  entity.management2(req,res);
});

router.get('/gerirParceiros',loginController.verifyLoginUser,  function(req, res, next) {
  partner.management(req,res);
});

router.get('/gerirDoacoes',loginController.verifyLoginUser,  function(req, res, next) {
  donation.management(req,res);
});

router.get('/gerirPedidos',loginController.verifyLoginUser,  function(req, res, next) {
  request.management1(req,res);
});

router.get('/gerirPedidosN',loginController.verifyLoginUser,  function(req, res, next) {
  request.management2(req,res);
});
*/

module.exports = router;
