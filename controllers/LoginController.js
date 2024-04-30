const mongoose = require('mongoose')
const mongoUser = require('../models/Employee')
const jwt = require('jsonwebtoken')
const config = require('../jwt_secret/config')
const bcrypt = require('bcryptjs')

let loginController = {}

loginController.submittedLogin = function(req, res, next) {
    const emailInput = req.body.email
    const passwordInput = req.body.password

    mongoUser.findOne({email:emailInput})
        .then(function(admin){
            if(!admin) {
                return res.redirect('/'); // e-mail não encontrado
            }
            bcrypt.compare(passwordInput, admin.password)
                .then(function(result){
                    if (result ===true){
                        const loginToken = jwt.sign({ email: admin.email }, config.secret, { expiresIn: 86400 });
                         req.session.username=admin.name;
                         req.session.userId=admin._id.toString();
                        res.cookie('login-token', loginToken, {maxAge: 82000})
                        res.redirect('/users/gerirDoacoes')
                    } else {
                        res.redirect('/')
                    }
                })
        })
        .catch(function(err){
            next(err)
        })
};

loginController.login = function(req, res, next) {
    res.render('login')
};

loginController.logout = function(req, res, next) {
    res.clearCookie('login-token')
    res.redirect('/')
};

loginController.verifyLoginUser = function(req, res, next) {
    const loginToken = req.cookies['login-token']
    if (loginToken){
        jwt.verify(loginToken, config.secret, function(err, decoded) {
            if (err) {
                return res.redirect('/');
            }
            req.userEmail = decoded
            next()
        })
    } else {
        //res.render('error', {message:"not authenticated!", error: {status:"",stack:""}})
        res.redirect('/')
    }
}

module.exports = loginController;
