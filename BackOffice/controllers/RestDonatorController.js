var mongoose = require("mongoose");
var Donator = require("../models/Donator");
var Campaign = require("../models/Campaign");
var Donation = require("../models/Donation");
var Request = require("../models/Request");
var path = require("path");
var fs = require("fs");
var donatorController = {};
const bcrypt = require("bcryptjs");
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
      console.log("Número total de documentos:", num);
      Donator.find()
        .then((donator) => {
          res.json({
            donators: donator,
            number: num,
            username: req.session.username,
            userId: req.session.userId,
          });
          //res.render("../views/donators/gestaoDoadores" );
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
donatorController.list = function (req, res) {
  Donator.find()
    .then((donator) => {
      res.render("../views/donators/showAll", { donators: donator });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};*/

donatorController.show = function (req, res) {
  Donator.findOne({ _id: req.params.id })
    .then((donator) => {
      res.json({
        donator: donator,
        username: req.session.username,
        userId: req.session.userId,
      });
      //res.render("../views/donators/verdoador");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

donatorController.buy = function (req, res) {
  Donator.findOne({ _id: req.params.donatorId })
    .then((donator) => {
      Campaign.findOne({ _id: req.params.campaignId }).then((campaign) => {
        if (donator.points > campaign.cost) {
          Donator.findByIdAndUpdate(
            req.params.donatorId,
            {
              $inc: {
                points: -campaign.cost,
              },
            },
            { new: true }
          ).then((donator) => {
            res.json({
              donator: donator,
              username: req.session.username,
              userId: req.session.userId,
            });
            //res.render("../views/donators/verdoador", );
          });
        } else {
          /*
          // Redireciona para a página de detalhes do doador com a mensagem de erro na URL
          const errorMessage = encodeURIComponent('Pontos insuficientes para comprar esta campanha.');
          res.redirect("/buy/"+campaign._id+"/" + donator._id + errorMessage);*/
          res.redirect("/donators/show/" + donator._id);
        }
      });
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

/*
donatorController.create = function (req, res) {
  res.render("../views/donators/registarDoador", {
    username: req.session.username,
    userId: req.session.userId,
  });
};*/

donatorController.save = function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var city = req.body.city;
  regCity = city.charAt(0).toUpperCase() + city.slice(1);
  const data = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    postCode: req.body.postCode,
    city: regCity,
    password: hashedPassword,
    points: 0,
  };
  const donatorSave = new Donator(data);
  Donator.findOne({ email: req.body.email })
    .then((donator) => {
      if (donator) {
        res.json({
          donator: donator,
          username: req.session.username,
          userId: req.session.userId,
        });
        //res.render("../views/donators/verdoador");
      } else {
        donatorSave
          .save()
          .then((savedDonator) => {
            console.log("Successfully created an Donator.");

            var fileDestination = path.join(
              __dirname,
              "..",
              "images",
              "donators",
              savedDonator._id.toString() + ".jpg"
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
            Donator.findOne({ email: req.body.email }).then((savedDonator) => {
              var fileDestination = path.join(
                __dirname,
                "..",
                "images",
                "donators",
                savedDonator._id.toString() + ".jpg"
              );

              var fileOrigin = path.join(
                __dirname,
                "..",
                "images",
                "employees",
                "default" + ".jpg"
              );
              fs.readFile(fileOrigin, function (err, data) {
                if (err) {
                }
                fs.writeFile(fileDestination, data, function (err) {
                  if (err) {
                  }
                });
              });
            });

            res.redirect("/RestDonators/");
          });
      }
    })
    .catch((err) => {
      res.redirect("/RestDonators/");
    });
};

donatorController.edit = function (req, res) {
  Donator.findOne({ _id: req.params.id })
    .then((donator) => {
      res.json({
        donator: donator,
        username: req.session.username,
        userId: req.session.userId,
      });
      //res.render("../views/donators/editarDoador");
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
        city: req.body.city,
      },
    },
    { new: true }
  )
    .then((savedDonator) => {
      console.log("Successfully created an Donator.");

      var fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "donators",
        savedDonator._id.toString() + ".jpg"
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
              console.error("Erro ao remover o arquivo da pasta 'tmp':", err);
            }
          });
          res.redirect("/RestDonators/");
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/RestDonators/");
    });
};

donatorController.delete = function (req, res) {
  Donator.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Donator detected!");

      var fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "donators",
        req.params.id + ".jpg"
      );

      fs.access(fileDestination, fs.constants.F_OK, (err) => {
        if (err) {
          console.error("O arquivo não existe:", err);
          return;
        }

        fs.unlink(fileDestination, (err) => {
          if (err) {
            console.error("Erro ao apagar o arquivo:", err);
            return;
          }
          console.log("A imagem foi apagada com sucesso!");
        });
      });

      Donation.find({ donatorId: req.params.id })
        .then((donations) => {
          donations.forEach(function (donation) {
            Donation.deleteOne({ _id: donation._id.toString() }).then(() => {
              console.log("Doação apagada");
            });
            Request.find({ donationId: donation._id.toString() }).then(
              (requests) => {
                requests.forEach(function (request) {
                  Request.deleteOne({ _id: request._id.toString() }).then(
                    () => {
                      console.log("Pedido apagado");
                    }
                  );
                });
              }
            );
          });
          res.redirect("/RestDonations/");
        })
        .catch((err) => {
          console.log(err);
        });
      res.redirect("/RestDonators/");
    })
    .catch((err) => {
      console.log(err);
    });
};

donatorController.searchByemail = function (req, res) {
  Donator.findOne({ email: req.query.email })
    .then((donator) => {
      if (!donator) {
        console.log("Doador não encontrado");
      } else {
        res.json({
          donator: donator,
          username: req.session.username,
          userId: req.session.userId,
        });
        //res.render("../views/donators/verdoador");
      }
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(500).send("Internal Server Error");
    });
};

module.exports = donatorController;
