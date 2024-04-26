var mongoose = require("mongoose");
var Donator = require("../models/Donator");

var donatorController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

  donatorController.management = function (req, res) {
    let num;
  
  (async () => {
    try {
     num = await Donator.countDocuments({});
      console.log('Número total de documentos:', num);
    } catch (error) {
      console.error('Ocorreu um erro ao contar os documentos:', error);
    }
  })();

    Donator.find()
      .then((donator) => {
        res.render("../views/gestaoDoadores", { donators: donator,number:num });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

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
      res.redirect("/users/gerirdoadores" /*+ donator._id*/);
    })
    .catch((err) => {
      console.error(err);
      res.render("../views/donators/create");
    });
};

donatorController.edit = function (req, res) {
  Donator.findOne({ _id: req.params.id })
    .then((donator) => {
      res.render("../views/utilizadores/editarDoador", { donator: donator });
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
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        postCode: req.body.postCode,
        city: req.body.city
      },
    },
    { new: true }
  )
    .then((donator) => {
      res.redirect("/users/gerirdoadores" /*+ donator._id*/);
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/utilizadores/editardoador", { donator: req.body });
    });
};

donatorController.delete = function (req, res) {
  Donator.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Donator detected!");
      res.redirect("/users/gerirDoadores");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = donatorController;