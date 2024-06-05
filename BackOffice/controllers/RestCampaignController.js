var mongoose = require("mongoose");
var Campaign = require("../models/Campaign");
var Partner = require("../models/Partner");
const bcrypt = require("bcryptjs");
var path = require("path");
var fs = require("fs");
var campaignController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

campaignController.shop = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Campaign.countDocuments({});
      console.log("Número total de documentos:", num);
      Campaign.find()
        .then((campaign) => {
          res.json({
            campaigns: campaign,
            number: num,
            username: req.session.username,
            userId: req.session.userId,
            donatorId: req.params.donatorId,
          });
          res.render("../views/campaigns/selecionarCampanha");
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } catch (error) {
      console.error("Ocorreu um erro ao contar os documentos:", error);
    }
  })();
};

campaignController.getCampaigns = function (req, res) {
  let num;

  (async () => {
    try {
      Campaign.find()
        .then((campaign) => {
          res.json({
            campaigns: campaign,
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

campaignController.getPartnerCampaigns = function (req, res) {
  (async () => {
    try {
      Campaign.find({partnerId:req.params.partnerId})
        .then((campaign) => {
          res.json({
            campaigns: campaign,
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


campaignController.shop1 = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Campaign.countDocuments({
        partnerName: req.query.partnerName,
      });
      console.log("Número total de documentos:", num);
      Campaign.find({ partnerName: req.query.partnerName })
        .then((campaign) => {
          res.json({
            campaigns: campaign,
            number: num,
            username: req.session.username,
            userId: req.session.userId,
            donatorId: req.params.donatorId,
          });
          res.render("../views/campaigns/selecionarCampanha");
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } catch (error) {
      console.error("Ocorreu um erro ao contar os documentos:", error);
    }
  })();
};

campaignController.management = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Campaign.countDocuments({});
      console.log("Número total de documentos:", num);
      Campaign.find()
        .then((campaign) => {
          res.json({
            campaigns: campaign,
            number: num,
            username: req.session.username,
            userId: req.session.userId,
          });
          res.render("../views/campaigns/gestaoCampanhas");
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } catch (error) {
      console.error("Ocorreu um erro ao contar os documentos:", error);
    }
  })();
};

campaignController.management1 = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Campaign.countDocuments({
        partnerName: req.query.partnerName,
      });
      console.log("Número total de documentos:", num);
      Campaign.find({ partnerName: req.query.partnerName })
        .then((campaign) => {
          res.json({
            campaigns: campaign,
            number: num,
            username: req.session.username,
            userId: req.session.userId,
          });
          res.render("../views/campaigns/gestaoCampanhas");
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
campaignController.list = function (req, res) {
  Campaign.find()
    .then((campaign) => {
      res.render("../views/campaigns/showAll", { campaigns: campaign });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};
*/

campaignController.show = function (req, res) {
  Campaign.findOne({ _id: req.params.id })
    .then((campaign) => {
      res.json({
        campaign: campaign,
      });
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

campaignController.buyMenu = function (req, res) {
  Campaign.findOne({ _id: req.params.id })
    .then((campaign) => {
      res.json({
        campaign: campaign,
        username: req.session.username,
        userId: req.session.userId,
        donatorId: req.params.donatorId,
      });
      res.render("../views/campaigns/comprarcampanha");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

campaignController.create = function (req, res) {
  Partner.findOne({ _id: req.params.partnerId })
    .then((partner) => {
      console.log(partner);
      res.json({
        username: req.session.username,
        userId: req.session.userId,
        partner: partner,
      });
      res.render("../views/campaigns/registarCampanha");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

campaignController.save = function (req, res) {
  const data = {
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    partnerId: req.params.partnerId,
    partnerName: req.params.partnerName,
  };
  const campaign = new Campaign(data);
  var sc;
  campaign
    .save()
    .then((savedCampaign) => {
      sc = savedCampaign;
      console.log("Successfully created an Campaign.");

      var fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "campaigns",
        savedCampaign._id.toString() + ".jpg"
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
          res.redirect("/restcampaigns/");
        });
      });
    })
    .catch((err) => {
      Campaign.findOne({ _id: sc._id }).then((savedCampaign) => {
        if (savedCampaign) {
          var fileDestination = path.join(
            __dirname,
            "..",
            "images",
            "campaigns",
            savedCampaign._id.toString() + ".jpg"
          );

          var fileOrigin = path.join(
            __dirname,
            "..",
            "images",
            "campaigns",
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
        }
      });

      res.redirect("/restcampaigns/");
    });
};

/*
campaignController.edit = function (req, res) {
  Campaign.findOne({ _id: req.params.id })
    .then((campaign) => {
      res.render("../views/campaigns/editarcampanha", {
        campaign: campaign,
        username: req.session.username,
        userId: req.session.userId,
      });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};*/

campaignController.update = function (req, res) {
  Campaign.findByIdAndUpdate(
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
    .then((savedCampaign) => {
      console.log("Successfully created an Campaign.");

      var fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "campaigns",
        savedCampaign._id.toString() + ".jpg"
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
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

campaignController.delete = function (req, res) {
  Campaign.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Campaign detected!");

      var fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "campaigns",
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
      res.redirect("/restcampaigns/");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = campaignController;
