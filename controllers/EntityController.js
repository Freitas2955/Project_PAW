var mongoose = require("mongoose");
var Entity = require("../models/Entity");
var path = require("path");
var fs = require("fs");
const bcrypt = require("bcryptjs");
var entityController = {};

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
          res.render("../views/entities/gestaoInstituicoesAprovadas", {
            entities: entity,
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

entityController.management2 = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Entity.countDocuments({ approved: false });
      console.log("Número total de documentos:", num);
      Entity.find({ approved: false })
        .then((entity) => {
          res.render("../views/entities/gestaoInstituicoesNaoAprovadas", {
            entities: entity,
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
      res.render("../views/entities/verinstituicao", {
        entity: entity,
        username: req.session.username,
        userId: req.session.userId,
      });
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
      res.render("../views/entities/verinstituicao", {
        entity: entity,
        username: req.session.username,
        userId: req.session.userId,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/entities/");
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
        res.render("../views/entities/verinstituicao", {
          entity: entity,
          username: req.session.username,
          userId: req.session.userId,
        });
      } else {
        entitySave
          .save()
          .then((savedEntity) => {
            console.log("Successfully created an entity.");

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
                res.redirect("/entities/notApproved");
              });
            });
          })
          .catch((err) => {
            console.log(err);
            res.redirect("/entities/");
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
      res.render("../views/entities/editarinstituicao", {
        entity: entity,
        username: req.session.username,
        userId: req.session.userId,
      });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

entityController.update = function (req, res) {
  Entity.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        description: req.body.description,
        email: req.body.email,
        city: req.body.city,
        postCode: req.body.postCode,
      },
    },
    { new: true }
  )
    .then((savedEntity) => {
      console.log("Successfully created an entity.");

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
              console.error("Erro ao remover o arquivo da pasta 'tmp':", err);
            }
          });
          res.redirect("/entities/");
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/entities/");
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
      res.redirect("/entities/");
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
        res.render("../views/entities/verinstituicao", {
          entity: entity,
          username: req.session.username,
          userId: req.session.userId,
        });
      }
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(500).send("Internal Server Error");
    });
};

module.exports = entityController;
