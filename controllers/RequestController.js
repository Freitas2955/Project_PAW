var mongoose = require("mongoose");
var Request = require("../models/Request");
const bcrypt = require("bcryptjs");
var path = require("path");
var fs = require("fs");
var requestController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

requestController.management = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Request.countDocuments({});
      console.log("Número total de documentos:", num);
      Request.find()
        .then((request) => {
          console.log(req.session.userId);
          res.render("../views/gestaoPedidos", {
            requests: request,
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

requestController.list = function (req, res) {
  Request.find()
    .then((request) => {
      res.render("../views/requests/showAll", { requests: request });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

requestController.show = function (req, res) {
  Request.findOne({ _id: req.params.id })
    .then((request) => {
      res.render("../views/requests/show", { request: request });
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

requestController.create = function (req, res) {
  res.render("../views/requests/create",{username: req.session.username,
  userId: req.session.userId,});
};

requestController.save = function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const data = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    postCode: req.body.postCode,
    city: req.body.city,
    password: hashedPassword,
  };
  const request = new Request(data);

  request
    .save()
    .then((savedRequest) => {
      console.log("Successfully created an Request.");

      var fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "requests",
        savedRequest._id.toString() + ".jpg"
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
          res.redirect("/users/gerirPedidos");
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users/gerirPedidos");
    });
};

requestController.edit = function (req, res) {
  Request.findOne({ _id: req.params.id })
    .then((request) => {
      res.render("../views/utilizadores/editarpedido", {
        request: request,
        username: req.session.username,
            userId: req.session.userId,
      });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

requestController.update = function (req, res) {
  Request.findByIdAndUpdate(
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
    .then((savedRequest) => {
      console.log("Successfully created an Request.");

      res.redirect("/users/gerirPedidos");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users/gerirPedidos");
    });
};

requestController.delete = function (req, res) {
  Request.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Request detected!");
      res.redirect("/users/gerirPedidos");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = requestController;
