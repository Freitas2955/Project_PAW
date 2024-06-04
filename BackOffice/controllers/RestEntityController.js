var mongoose = require("mongoose");
var Donator = require("../models/Donator");
var Partner = require("../models/Partner");
var Entity = require("../models/Entity");
var path = require("path");
var fs = require("fs");
const bcrypt = require("bcryptjs");
var entityController = {};
var Employee = require("../models/Employee");
const transporter = require("./mailer");


mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

entityController.management1 = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Entity.countDocuments({ approved: true });
      console.log("Número total de documentos:", num);
      Entity.find({ approved: true })
        .then((entity) => {
          res.json({
            entities: entity,
            number: num,
            username: req.session.username,
            userId: req.session.userId,
          });
          //res.render("../views/entities/gestaoInstituicoesAprovadas");
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } catch (error) {
      console.error("Ocorreu um erro ao contar os documentos:", error);
    }
  })();
};

entityController.management2 = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Entity.countDocuments({ approved: false });
      console.log("Número total de documentos:", num);
      Entity.find({ approved: false })
        .then((entity) => {
          res.json({
            entities: entity,
            number: num,
            username: req.session.username,
            userId: req.session.userId,
          });
          //res.render("../views/entities/gestaoInstituicoesNaoAprovadas");
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
entityController.list = function (req, res) {
  Entity.find()
    .then((entity) => {
      res.render("../views/entities/showAll", { entities: entity });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};
*/

entityController.show = function (req, res) {
  Entity.findOne({ _id: req.params.id })
    .then((entity) => {
      res.json({
        entity: entity,
        username: req.session.username,
        userId: req.session.userId,
      });
      //res.render("../views/entities/verinstituicao");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

entityController.approve = function (req, res) {
  Entity.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        approved: true,
      },
    },
    { new: true }
  )
    .then((entity) => {
      res.json({
        entity: entity,
        username: req.session.username,
        userId: req.session.userId,
      });
      //res.render("../views/entities/verinstituicao");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/RestEntities/");
    });
};

entityController.create = function (req, res) {
  res.render("../views/entities/registarInstituicao", {
    username: req.session.username,
    userId: req.session.userId,
  });
};

entityController.save = function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var city = req.body.city;
  regCity = city.charAt(0).toUpperCase() + city.slice(1);
  const data = {
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    city: regCity,
    postCode: req.body.postCode,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    approved: false,
  };
  var entitySave = new Entity(data);
  Entity.findOne({ email: req.body.email })
    .then((entity) => {
      if (entity) {
        console.log("Instituicao ja existe");
        res.json({ exists: true });
      } else {
        Partner.findOne({ email: req.body.email }).then((partner) => {
          if (partner) {
            res.json({ exists: true });
          } else {
            Donator.findOne({ email: req.body.email }).then((donator) => {
              if (donator) {
                res.json({ exists: true });
              } else {
                entitySave
                  .save()
                  .then(async (savedEntity) => {
                    console.log("Successfully created an entity.");

                    const admins = await Employee.find();
                    const adminEmails = admins.map((admin) => admin.email);

                    /*for (let i = 0; i < 740; i++) {*/
                      const mailOptions = {
                        from: "recilatextil5@gmail.com",
                        to:  adminEmails,                    /*"8220147@estg.ipp.pt",*/
                        subject: "Nova Entidade Registada",
                        text: `A entidade ${savedEntity.name} registou-se e está à espera para ser aceita.`,
                      };
                      transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log("Email enviado: " + info.response);
                        }
                      });
                    /*}*/

                    var fileDestination = path.join(
                      __dirname,
                      "..",
                      "images",
                      "entities",
                      savedEntity._id.toString() + ".jpg"
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
                      });
                    });
                    res.json(savedEntity);
                  })
                  .catch((err) => {
                    Entity.findOne({ email: req.body.email }).then(
                      (savedEntity) => {
                        if (savedEntity) {
                          var fileDestination = path.join(
                            __dirname,
                            "..",
                            "images",
                            "entities",
                            savedEntity._id.toString() + ".jpg"
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
                        }
                      }
                    );

                    res.json(err);
                  });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

entityController.edit = function (req, res) {
  Entity.findOne({ _id: req.params.id })
    .then((entity) => {
      res.json({
        entity: entity,
        username: req.session.username,
        userId: req.session.userId,
      });
      //res.render("../views/entities/editarinstituicao");
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

entityController.update = function (req, res) {
  var city = req.body.city;
  var regCity = city.charAt(0).toUpperCase() + city.slice(1);

  Entity.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        description: req.body.description,
        email: req.body.email,
        city: regCity,
        postCode: req.body.postCode,
      },
    },
    { new: true }
  )
    .then((savedEntity) => {
      console.log("Successfully updated an entity.");

      if (req.file) {
        var fileDestination = path.join(
          __dirname,
          "..",
          "images",
          "entities",
          savedEntity._id.toString() + ".jpg"
        );

        fs.readFile(req.file.path, (err, data) => {
          if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
          }

          fs.writeFile(fileDestination, data, (err) => {
            if (err) {
              console.error("Error writing file:", err);
              return res.status(500).send("Error writing file");
            }

            fs.unlink(req.file.path, (err) => {
              if (err) {
                console.error("Error removing file from 'tmp' folder:", err);
              }
            });

            res.status(200).json(savedEntity);
          });
        });
      } else {
        console.log("Non-image file detected, skipping file save.");
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error removing file from 'tmp' folder:", err);
          }
        });
        res.status(200).json(savedEntity);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error updating entity");
    });
};

entityController.delete = function (req, res) {
  Entity.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Entity detected!");

      var fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "entities",
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
      res.redirect("/RestEntities/");
    })
    .catch((err) => {
      console.log(err);
    });
};

entityController.searchByemail = function (req, res) {
  Entity.findOne({ email: req.query.email })
    .then((entity) => {
      if (!entity) {
        console.log("Instituicao não encontrada");
      } else {
        res.json({
          entity: entity,
          username: req.session.username,
          userId: req.session.userId,
        });
        //res.render("../views/entities/verinstituicao" );
      }
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(500).send("Internal Server Error");
    });
};

module.exports = entityController;
