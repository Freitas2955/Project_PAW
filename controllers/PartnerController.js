var mongoose = require("mongoose");
var Partner = require("../models/Partner");

var partnerController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

partnerController.management = function (req, res) {
  Partner.find()
    .then((partner) => {
      res.render("../views/gestaoParceiros", { partners: partner });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

partnerController.list = function (req, res) {
  Partner.find()
    .then((partner) => {
      res.render("../views/partners/showAll", { partners: partner });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

partnerController.show = function (req, res) {
  Partner.findOne({ _id: req.params.id })
    .then((partner) => {
      res.render("../views/partners/show", { partner: partner });
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

partnerController.create = function (req, res) {
  res.render("../views/partners/create");
};

partnerController.save = function (req, res) {
  const partner = new Partner(req.body);
  partner
    .save()
    .then(() => {
      console.log("Successfully created an partner.");
      res.redirect("show/" + partner._id);
    })
    .catch((err) => {
      console.error(err);
      res.render("../views/partners/create");
    });
};

partnerController.edit = function (req, res) {
  Partner.findOne({ _id: req.params.id })
    .then((partner) => {
      res.render("../views/utilizadores/editarparceiro", { partner: partner });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

partnerController.update = function (req, res) {
  Partner.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        description: req.body.description,
        postCode: req.body.postCode,
        email: req.body.email,
        city:req.body.city
      },
    },
    { new: true }
  )
    .then((partner) => {
      res.redirect("/partners/show/" + partner._id);
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/utilizadores/editarparceiro", { partner: req.body });
    });
};

partnerController.delete = function (req, res) {
  Partner.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Partner detected!");
      res.redirect("/users/gerirParceiros");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = partnerController;
