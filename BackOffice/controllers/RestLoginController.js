const mongoose = require("mongoose");
const Donator = require("../models/Donator");
const Entity = require("../models/Entity");
const Partner = require("../models/Partner");
const jwt = require("jsonwebtoken");
const config = require("../jwt_secret/config");
const bcrypt = require("bcryptjs");

let loginController = {};

async function findUserByEmail(email) {
  let user = await Donator.findOne({ email });
  if (user) return { user, type: "Donator" };

  user = await Entity.findOne({ email, approved: true });
  if (user) return { user, type: "Entity" };

  user = await Partner.findOne({ email });
  if (user) return { user, type: "Partner" };

  return null;
}

loginController.submittedLogin = async function (req, res, next) {
  try {
    const emailInput = req.body.email;
    const passwordInput = req.body.password;

    const userResult = await findUserByEmail(emailInput);
    if (!userResult) {
      return res.status(401).json({ message: "User not found" });
    }

    const { user } = userResult;

    const isPasswordValid = await bcrypt.compare(passwordInput, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const loginToken = jwt.sign({ email: user.email }, config.secret, {
      expiresIn: 86400,
    });
    req.session.username = user.name;
    req.session.userId = user._id.toString();
    res.cookie("login-token", loginToken, { maxAge: 86400000 });

    // Retorne as informações do usuário e o token na resposta
    return res
      .status(200)
      .json({ type: userResult.type, token: loginToken, userId: user._id,username:user.name });
  } catch (err) {
    next(err);
  }
};

loginController.login = function (req, res, next) {
  res.render("login");
};

loginController.logout = function (req, res, next) {
  res.clearCookie("login-token");
  res.status(200).json({ message: "Logged out successfully" });
};

loginController.verifyLoginUser = function (req, res, next) {
  const loginToken = req.cookies["login-token"];
  if (loginToken) {
    jwt.verify(loginToken, config.secret, function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      req.userEmail = decoded.email;
      next();
    });
  } else {
    return res.status(401).json({ message: "Not authenticated" });
  }
};

module.exports = loginController;
