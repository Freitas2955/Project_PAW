var mongoose = require("mongoose");
var Purchase = require("../models/Purchase");
var path = require("path");
var fs = require("fs");
var purchasesController = {};
const bcrypt = require("bcryptjs");

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

purchasesController.getDonatorPurchases = function (req, res) {
  Purchase.find({ donatorId: req.params.id }).then((purchases) => {
    res.json({
      purchases: purchases,
    });
  }).catch((err)=>{console.log(err)});
};

purchasesController.getPartnerPurchases = function (req, res) {
  Purchase.find({ partnerId: req.params.id }).then((purchases) => {
    res.json({
      purchases: purchases,
    });
  }).catch((err)=>{console.log(err)});
};

module.exports = purchasesController;
