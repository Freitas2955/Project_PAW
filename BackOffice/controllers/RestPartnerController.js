var mongoose = require("mongoose");
var Donator = require("../models/Donator");
var Partner = require("../models/Partner");
var Entity = require("../models/Entity");
var path = require("path");
var fs = require("fs");
var partnerController = {};
const bcrypt = require("bcryptjs");
const Campaign = require("../models/Campaign");
const mime = require("mime-types");
const { exists } = require("../models/Donation");
mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

partnerController.getPartners = function (req, res) {
  let num;
  (async () => {
    try {
      console.log("Número total de documentos:", num);
      Partner.find()
        .then((partner) => {
          res.json({
            partners: partner,
          });
          //res.render("../views/partners/gestaoParceiros");
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
partnerController.list = function (req, res) {
  Partner.find()
    .then((partner) => {
      res.render("../views/partners/showAll", { partners: partner });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};*/

partnerController.show = function (req, res) {
  Partner.findOne({ _id: req.params.id })
    .then((partner) => {
      res.json({
        partner: partner,
        username: req.session.username,
        userId: req.session.userId,
      });
      //res.render("../views/partners/verparceiro");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

partnerController.create = function (req, res) {
  res.render("../views/partners/registarparceiro", {
    username: req.session.username,
    userId: req.session.userId,
  });
};

partnerController.save = function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var city = req.body.city;
  var regCity = city.charAt(0).toUpperCase() + city.slice(1);
  const data = {
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    description: req.body.description,
    postCode: req.body.postCode,
    email: req.body.email,
    city: regCity,
    password: hashedPassword,
    approved: false,
  };
  const partnerSave = new Partner(data);

  Partner.findOne({ email: req.body.email })
    .then((partner) => {
      if (partner) {
        res.json({ exists: true });
      } else {
        Donator.findOne({ email: req.body.email }).then((donator) => {
          if (donator) {
            res.json({ exists: true });
          } else {
            Entity.findOne({ email: req.body.email }).then((entity) => {
              if (entity) {
                res.json({ exists: true });
              } else {
                partnerSave
                  .save()
                  .then((savedPartner) => {
                    console.log("Successfully created a Partner.");

                    const file = req.file;
                    const defaultFileOrigin = path.join(__dirname, "..", "images", "employees", "default.jpg");
                    const fileDestination = path.join(
                      __dirname,
                      "..",
                      "images",
                      "partners",
                      savedPartner._id.toString() + ".jpg"
                    );

                    if (file) {
                      const mimeType = mime.lookup(file.originalname);
                      if (mimeType && mimeType.startsWith('image/')) {
                        fs.readFile(file.path, function (err, data) {
                          if (err) {
                            console.error("Error reading file:", err);
                            return res.status(500).send("Error reading file");
                          }

                          fs.writeFile(fileDestination, data, function (err) {
                            if (err) {
                              console.error("Error writing file:", err);
                              return res.status(500).send("Error writing file");
                            }
                            fs.unlink(file.path, function (err) {
                              if (err) {
                                console.error("Error removing file from 'tmp' folder:", err);
                              }
                            });
                            res.redirect("/RestPartners/");
                          });
                        });
                      } else {
                        console.warn("Uploaded file is not an image, using default image.");
                        useDefaultImage();
                      }
                    } else {
                      console.warn("No file uploaded, using default image.");
                      useDefaultImage();
                    }

                    function useDefaultImage() {
                      fs.readFile(defaultFileOrigin, function (err, data) {
                        if (err) {
                          console.error("Error reading default image:", err);
                          return res.status(500).send("Error reading default image");
                        }
                        fs.writeFile(fileDestination, data, function (err) {
                          if (err) {
                            console.error("Error writing default image:", err);
                            return res.status(500).send("Error writing default image");
                          }
                          res.redirect("/RestPartners/");
                        });
                      });
                    }
                  })
                  .catch((err) => {
                    console.error("Error saving partner:", err);
                    res.status(500).send("Error saving partner");
                  });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send("Error finding partner");
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
        city: req.body.city,
      },
    },
    { new: true }
  )
    .then((updatedPartner) => {
      console.log("Successfully updated the Partner.");

      const file = req.file;

      if (file) {
        const mimeType = mime.lookup(file.originalname);
        if (mimeType && mimeType.startsWith('image/')) {
          const fileDestination = path.join(
            __dirname,
            "..",
            "images",
            "partners",
            updatedPartner._id.toString() + ".jpg"
          );

          fs.readFile(file.path, function (err, data) {
            if (err) {
              console.error("Error reading file:", err);
              return res.status(500).send("Error reading file");
            }

            fs.writeFile(fileDestination, data, function (err) {
              if (err) {
                console.error("Error writing file:", err);
                return res.status(500).send("Error writing file");
              }

              fs.unlink(file.path, function (err) {
                if (err) {
                  console.error("Error removing file from 'tmp' folder:", err);
                }
              });

              res.redirect("/RestPartners/");
            });
          });
        } else {
          console.warn("Uploaded file is not an image, skipping file save.");
          fs.unlink(file.path, function (err) {
            if (err) {
              console.error("Error removing file from 'tmp' folder:", err);
            }
          });
          res.status(200).json({partner:updatedPartner});
        }
      } else {
        res.status(200).json({partner:updatedPartner});
      }
    })
    .catch((err) => {
      console.error("Error updating Partner:", err);
      res.status(500).send("Error updating Partner");
    });
};

partnerController.delete = function (req, res) {
  Partner.deleteOne({ _id: req.params.id })
    .then((partner) => {
      console.log("Partner detected!");

      var fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "partners",
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

      Campaign.find({ partnerId: req.params.id })
        .then((campaigns) => {
          campaigns.forEach(function (campaign) {
            console.log(campaign._id.toString());
            Campaign.deleteOne({ _id: campaign._id.toString() }).then(() => {
              console.log("apagado");
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      res.redirect("/RestPartners/");
    })
    .catch((err) => {
      console.log(err);
    });
};

partnerController.searchByemail = function (req, res) {
  Partner.findOne({ email: req.query.email })
    .then((partner) => {
      if (!partner) {
        console.log("Parceiro não encontrado");
      } else {
        res.json({
          partner: partner,
          username: req.session.username,
          userId: req.session.userId,
        });
        //res.render("../views/partners/verparceiro");
      }
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(500).send("Internal Server Error");
    });
};

module.exports = partnerController;
