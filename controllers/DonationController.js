var mongoose = require("mongoose");
var Donation = require("../models/Donation");
var Points = require("../models/Points");
var Request = require("../models/Request");
var path = require("path");
var fs = require("fs");
var donationController = {};
var Donator = require("../models/Donator");
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
      console.log("Número total de documentos:", num);
      Donation.find()
        .then((donation) => {
          res.render("../views/donations/gestaoDoacoes", {
            donations: donation,
            number: num,
            username: req.session.username,
            userId: req.session.userId,
          });
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } catch (error) {
      console.error("Ocorreu um erro ao contar os documentos:", error);
    }
  })();
};
/*
donationController.list = function (req, res) {
  Donation.find()
    .then((donation) => {
      res.redirect("/donations/gerirDoacoes");
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};*/

donationController.show = function (req, res) {
  Request.findOne({ donationId: req.params.id })
    .then((request) => {
      if (!request) {
        Donation.findOne({ _id: req.params.id })
          .then((donation) => {
            res.render("../views/donations/verdoacao", {
              donation: donation,
              username: req.session.username,
              userId: req.session.userId,
              requested: false,
            });
          })
          .catch((err) => {
            console.error("Error:", err);
          });
      } else {
        Donation.findOne({ _id: req.params.id })
          .then((donation) => {
            res.render("../views/donations/verdoacao", {
              donation: donation,
              username: req.session.username,
              userId: req.session.userId,
              requested: true,
            });
          })
          .catch((err) => {
            console.error("Error:", err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/donations/");
    });
};
/*
donationController.create = function (req, res) {
  res.render("../views/donations/reg");
};*/

donationController.save = function (req, res) {
  Points.findOne().then((point) => {
    Donator.findOne({ _id: req.params.id }).then((donator) => {
      const totalPoints =
        req.body.camisolas * point.camisola +
        req.body.casacos * point.casaco +
        req.body.calcas * point.calcas +
        req.body.sapatos * point.sapatos +
        req.body.acessorios * point.acessorios +
        req.body.interior * point.roupainterior +
        req.body.dinheiro * point.dinheiro;
      let donatorId = req.params.id;
      const donationParams = {
        camisolas: req.body.camisolas,
        casacos: req.body.casacos,
        calcas: req.body.calcas,
        sapatos: req.body.sapatos,
        acessorios: req.body.acessorios,
        interior: req.body.interior,
        dinheiro: req.body.dinheiro,
        donatorId: donatorId,
        donatorName: donator.name,
        points: totalPoints,
        approved: false,
      };
      const donation = new Donation(donationParams);
      donation
        .save()
        .then((savedDonation) => {
          console.log("Successfully created an donation.");

          var fileDestination = path.join(
            __dirname,
            "..",
            "images",
            "donations",
            savedDonation._id.toString() + ".jpg"
          );
          fs.readFile(req.file.path, function (err, data) {
            if (err) {
              console.error("Error reading file:", err);
              return res.status(500).send("Error reading file");
            }

            fs.writeFile(fileDestination, data, function (err) {
              if (err) {
                console.error("Error writing file:", err);
                return res.status(500).send("Error writing file");
              }
              fs.unlink(req.file.path, function (err) {
                if (err) {
                  console.error(
                    "Erro ao remover o arquivo da pasta 'tmp':",
                    err
                  );
                }
              });
              res.redirect("/donators/");
            });
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/donators/");
        });
    });
  });
};

donationController.delete = function (req, res) {
  Donation.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Donation detected!");
      res.redirect("/donations/");
    })
    .catch((err) => {
      console.log(err);
    });
};

donationController.approve = function (req, res) {
  Donation.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        approved: true,
      },
    },
    { new: true }
  )
    .then((donation) => {
      console.log(donation);
      Donator.findByIdAndUpdate(
        donation.donatorId,
        {
          $inc: {
            points: donation.points,
          },
        },
        { new: true }
      )
        .then((updatedDonator) => {
          Request.findOne({ donationId: donation._id })
            .then((request) => {
              res.redirect("/requests/approve/" + request._id);
            })
            .catch((err) => {
              console.log(err);
              res.redirect("/donations");
            });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/donations");
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/donations");
    });
};

module.exports = donationController;
