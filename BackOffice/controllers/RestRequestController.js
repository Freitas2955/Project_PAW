var mongoose = require("mongoose");
var Request = require("../models/Request");
var Donation = require("../models/Donation");
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

  requestController.getDonatorRequests = function (req, res) {
    let pedidos = [];
  
    Donation.find({ donatorId: req.params.id }).then((donations) => {
      let requestPromises = donations.map((donation) => {
        return Request.findOne({ donationId: donation._id }).then((request) => {
          if (request != null) {
            pedidos.push(request);
          }
        });
      });

      return Promise.all(requestPromises);
    }).then(() => {
      console.log("pedidos", pedidos);
      res.status(200).json({ requests: pedidos });
    }).catch((err) => {
      console.error(err);
      res.status(500).send("Erro interno do servidor");
    });
  };
  

  requestController.getEntityRequests = function (req, res) {
    let pedidos = [];
    Donation.find({ entityId: req.params.id }).then((donations) => {
      let requestPromises = donations.map((donation) => {
        return Request.findOne({ donationId: donation._id }).then((request) => {
          if (request != null) {
            pedidos.push(request);
          }
        });
      });

      return Promise.all(requestPromises);
    }).then(() => {
      console.log(pedidos);
      res.status(200).json({ requests: pedidos });
    }).catch((err) => {
      console.error(err);
      res.status(500).send("Erro no servidor");
    });
  };
  


requestController.management2 = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Request.countDocuments({ done: false });
      console.log("Número total de documentos:", num);
      Request.find({ done: false })
        .then((request) => {
          console.log(req.session.userId);
          res.json({
            requests: request,
            number: num,
            username: req.session.username,
            userId: req.session.userId,
          });
          //res.render("../views/requests/gestaoPedidosNaoTerminados");
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } catch (error) {
      console.error("Ocorreu um erro ao contar os documentos:", error);
    }
  })();
};

requestController.management1Find = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Request.countDocuments({ done: true, city: req.query.city });
      console.log("Número total de documentos:", num);
      Request.find({ done: true, city: req.query.city })
        .then((request) => {
          console.log(req.session.userId);
          res.json({
            requests: request,
            number: num,
            username: req.session.username,
            userId: req.session.userId,
          });
          //res.render("../views/requests/gestaoPedidosTerminados");
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } catch (error) {
      console.error("Ocorreu um erro ao contar os documentos:", error);
    }
  })();
};

requestController.management2Find = function (req, res) {
  let num;

  (async () => {
    try {
      num = await Request.countDocuments({ done: false, city: req.query.city });
      console.log("Número total de documentos:", num);
      Request.find({ done: false, city: req.query.city })
        .then((request) => {
          console.log(req.session.userId);
          res.json({
            requests: request,
            number: num,
            username: req.session.username,
            userId: req.session.userId,
          });
          //res.render("../views/requests/gestaoPedidosNaoTerminados");
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

requestController.show = function (req, res) {
  Request.findOne({ _id: req.params.id })
    .then((request) => {
      res.json({
        request: request,
      });
      //res.render("../views/requests/verpedido");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

/*
requestController.create = function (req, res) {
  res.render("../views/requests/create", {
    username: req.session.username,
    userId: req.session.userId,
  });
};*/

requestController.save = function (req, res) {
  Request.findOne({ donationId: req.params.id }).then((request) => {
    if (!request) {
      Donator.findById({ _id: req.body.donatorId }).then((donator) => {
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
          res.status(200).json({ savedRequest });
        });
      });
    } else {
      console.log("Ja existe!");
      res.status(400).json({ exists: true });
    }
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
      res.redirect("/RestRequests/");
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
        done: true,
      },
    },
    { new: true }
  )
    .then((request) => {
      res.status(200).json({request:request})
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Erro interno do servidor")
    });
};

module.exports = requestController;
