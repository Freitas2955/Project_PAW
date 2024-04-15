var mongoose = require("mongoose");
var Donator = require("../models/Donator");

var donatorController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

donatorController.list = function (req, res) {
  Donator.find()
    .then((donator) => {
      res.render("../views/donators/showAll", { donators: donator });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

donatorController.show = function (req, res) {
  Donator.findOne({ _id: req.params.id })
    .then((donator) => {
      res.render("../views/donators/show", { donator: donator });
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

donatorController.create = function (req, res) {
  res.render("../views/donators/create");
};

donatorController.save = function (req, res) {
  const donator = new Donator(req.body);
  donator
    .save()
    .then(() => {
      console.log("Successfully created an donator.");
      res.redirect("show/" + donator._id);
    })
    .catch((err) => {
      console.error(err);
      res.render("../views/donators/create");
    });
};

donatorController.edit = function (req, res) {
  Donator.findOne({ _id: req.params.id })
    .then((donator) => {
      res.render("../views/donators/edit", { donator: donator });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

donatorController.update = function (req, res) {
  Donator.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        address: req.body.address,
        position: req.body.position,
      },
    },
    { new: true }
  )
    .then((donator) => {
      res.redirect("/donators/show/" + donator._id);
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/donators/edit", { donator: req.body });
    });
};

donatorController.delete = function (req, res) {
  Donator.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Donator detected!");
      res.redirect("/donators");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = donatorController;