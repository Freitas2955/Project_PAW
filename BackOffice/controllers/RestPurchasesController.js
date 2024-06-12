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
  Purchase.find({ donatorId: req.params.id })
    .then((purchases) => {
      res.status(200).json({
        purchases: purchases,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Erro interno do servidor");
    });
};

purchasesController.getPartnerPurchases = function (req, res) {
  Purchase.find({ partnerId: req.params.id })
    .then((purchases) => {
      res.status(200).json({
        purchases: purchases,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Erro interno do servidor");
    });
};

module.exports = purchasesController;
