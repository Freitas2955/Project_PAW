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

entityController.getApproved = function (req, res) {
  let num;
  (async () => {
    try {
      Entity.find({ approved: true })
        .then((entity) => {
          res.json({
            entities: entity,
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

//////////////////////////////////NAO ESTA A DAR//////////////////////////////////////
/*
                    for (let i = 0; i < 40; i++) {
                      const mailOptions = {
                        from: "recilatextilfelgueiras@gmail.com",
                        to:  /*adminEmails,                    "contachipada@gmail.com",
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
                    }
*/
////////////////////////////////////
const mime = require("mime-types");

entityController.save = function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var city = req.body.city;
  var regCity = city.charAt(0).toUpperCase() + city.slice(1);
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

                    const file = req.file;
                    const defaultFileOrigin = path.join(
                      __dirname,
                      "..",
                      "images",
                      "employees",
                      "default.jpg"
                    );
                    const fileDestination = path.join(
                      __dirname,
                      "..",
                      "images",
                      "entities",
                      savedEntity._id.toString() + ".jpg"
                    );

                    if (file) {
                      const mimeType = mime.lookup(file.originalname);
                      if (mimeType && mimeType.startsWith("image/")) {
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
                                console.error(
                                  "Erro ao remover o arquivo da pasta 'tmp':",
                                  err
                                );
                              }
                            });
                            res.json(savedEntity);
                          });
                        });
                      } else {
                        console.warn(
                          "Uploaded file is not an image, using default image."
                        );
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
                          return res
                            .status(500)
                            .send("Error reading default image");
                        }
                        fs.writeFile(fileDestination, data, function (err) {
                          if (err) {
                            console.error("Error writing default image:", err);
                            return res
                              .status(500)
                              .send("Error writing default image");
                          }
                          res.json(savedEntity);
                        });
                      });
                    }
                  })
                  .catch((err) => {
                    console.error("Error saving entity:", err);
                    res.status(500).send("Error saving entity");
                  });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send("Error finding entity");
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
    .then((updatedEntity) => {
      console.log("Successfully updated the entity.");

      const file = req.file;
      const fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "entities",
        updatedEntity._id.toString() + ".jpg"
      );

      if (file) {
        const mimeType = mime.lookup(file.originalname);
        if (mimeType && mimeType.startsWith('image/')) {
          fs.readFile(file.path, (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              return res.status(500).send("Error reading file");
            }

            fs.writeFile(fileDestination, data, (err) => {
              if (err) {
                console.error("Error writing file:", err);
                return res.status(500).send("Error writing file");
              }

              fs.unlink(file.path, (err) => {
                if (err) {
                  console.error("Error removing file from 'tmp' folder:", err);
                }
              });

              res.status(200).json(updatedEntity);
            });
          });
        } else {
          console.warn("Uploaded file is not an image, skipping file save.");
          fs.unlink(file.path, (err) => {
            if (err) {
              console.error("Error removing file from 'tmp' folder:", err);
            }
          });
          res.status(200).json(updatedEntity);
        }
      } else {
        res.status(200).json(updatedEntity);
      }
    })
    .catch((err) => {
      console.error("Error updating entity:", err);
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
