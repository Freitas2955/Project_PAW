var mongoose = require("mongoose");
var Request = require("../models/Request");
var Donator = require("../models/Donator");
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

requestController.management1 = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Request.countDocuments({done:true});
      console.log("Número total de documentos:", num);
      Request.find({done:true})
        .then((request) => {
          console.log(req.session.userId);
          res.render("../views/gestaoPedidosTerminados", {
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


requestController.management2 = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Request.countDocuments({done:false});
      console.log("Número total de documentos:", num);
      Request.find({done:false})
        .then((request) => {
          console.log(req.session.userId);
          res.render("../views/gestaoPedidosNaoTerminados", {
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


/*
requestController.list = function (req, res) {
  Request.find()
    .then((request) => {
      res.render("../views/requests/showAll", { requests: request });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};
*/

/*
requestController.show = function (req, res) {
  Request.findOne({ _id: req.params.id })
    .then((request) => {
      res.render("../views/requests/show", { request: request });
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};
*/

/*
requestController.create = function (req, res) {
  res.render("../views/requests/create", {
    username: req.session.username,
    userId: req.session.userId,
  });
};*/

requestController.save = function (req, res) {
  Donator.findById({ _id: req.body.donatorId })
    .then((donator) => {
      const data = {
        donatorName: donator.name,
        donationId: req.params.id,
        address: donator.address,
        postCode: donator.postCode,
        city: donator.city,
        done: false,
      };
      const request = new Request(data);
      request.save().then((savedRequest) => {
        console.log("Successfully created an Request.");
        res.redirect("/users/gerirPedidos");
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users/gerirPedidos");
    });
};
/*
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
*/

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

requestController.approve = function (req, res) {
  Request.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        done:true
      },
    },
    { new: true }
  )
    .then((request) => {
      res.redirect("/donations/show/"+request.donationId);
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/users/gerirPedidos");
    });
};

module.exports = requestController;
