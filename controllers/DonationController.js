var mongoose = require("mongoose");
var Donation = require("../models/Donation");

var donationController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

donationController.management = function (req, res) {
  let num;
  
  (async () => {
    try {
     num = await Donation.countDocuments({});
      console.log('Número total de documentos:', num);
    } catch (error) {
      console.error('Ocorreu um erro ao contar os documentos:', error);
    }
  })();

  Donation.find()
    .then((donation) => {
      res.render("../views/donationManagement", { donations: donation,number:num});
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

donationController.list = function (req, res) {
  Donation.find()
    .then((donation) => {
      res.render("../views/donations/showAll", { donations: donation });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

donationController.show = function (req, res) {
  Donation.findOne({ _id: req.params.id })
    .then((donation) => {
      res.render("../views/donations/show", { donation: donation });
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

donationController.create = function (req, res) {
  res.render("../views/donations/create");
};

donationController.save = function (req, res) {
  const donation = new Donation(req.body);
  donation
    .save()
    .then(() => {
      console.log("Successfully created an donation.");
      res.redirect("show/" + donation._id);
    })
    .catch((err) => {
      console.error(err);
      res.render("../views/donations/create");
    });
};

donationController.edit = function (req, res) {
  Donation.findOne({ _id: req.params.id })
    .then((donation) => {
      res.render("../views/donations/edit", { donation: donation });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

donationController.update = function (req, res) {
  Donation.findByIdAndUpdate(
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
    .then((donation) => {
      res.redirect("/donations/show/" + donation._id);
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/donations/edit", { donation: req.body });
    });
};

donationController.delete = function (req, res) {
  Donation.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Donation detected!");
      res.redirect("/donations");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = donationController;
