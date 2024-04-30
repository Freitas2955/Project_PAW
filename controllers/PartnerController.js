var mongoose = require("mongoose");
var Partner = require("../models/Partner");
var path = require("path");
var fs = require("fs");
var partnerController = {};
const bcrypt = require("bcryptjs");
mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

partnerController.management = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Partner.countDocuments({});
      console.log("Número total de documentos:", num);
      Partner.find()
        .then((partner) => {
          res.render("../views/gestaoParceiros", {
            partners: partner,
            number: num,
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
 // const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const data = {
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    description: req.body.description,
    postCode: req.body.postCode,
    email: req.body.email,
    city: req.body.city,
    //password: hashedPassword,
  };
  const partner = new Partner(data);
  partner
    .save()
    .then((savedPartner) => {
      console.log("Successfully created an Partner.");

      var fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "partners",
        savedPartner._id.toString() + ".jpg"
      );
      fs.readFile(req.file.path, function (err, data) {
        console.log(req.file.path)
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
          res.redirect("/users/gerirParceiros");
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users/gerirParceiros");
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
        city: req.body.city,
      },
    },
    { new: true }
  )
    .then((savedPartner) => {
      console.log("Successfully edited an Partner.");

      var fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "partners",
        savedPartner._id.toString() + ".jpg"
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
          res.redirect("/users/gerirParceiros");
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users/gerirParceiros");
    });
};

partnerController.delete = function (req, res) {
  Partner.deleteOne({ _id: req.params.id })
    .then(() => {
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
      res.redirect("/users/gerirParceiros");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = partnerController;
