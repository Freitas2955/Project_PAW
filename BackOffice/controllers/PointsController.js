var mongoose = require("mongoose");
var Points = require("../models/Points");

var pointsController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

pointsController.create = function (req, res) {
  res.render("../views/pontos",{username: req.session.username,
    userId: req.session.userId,});
};

pointsController.save = function (req, res) {
  const point = new Points(req.body);
  point
    .save()
    .then(() => {
      console.log("Successfully created points.");
      res.render("../views/pontos", {
        point: req.body,
        username: req.session.username,
        userId: req.session.userId,
      });
    })
    .catch((err) => {
      console.error(err);
      res.render("/pontos",{username: req.session.username,
        userId: req.session.userId,});
    });
};

pointsController.edit = function (req, res) {
  Points.findOne()
    .then((point) => {
      res.render("../views/pontos", {
        point: point,
        username: req.session.username,
        userId: req.session.userId,
      });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

pointsController.update = function (req, res) {
  Points.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        camisola: req.body.camisola,
        acessorios: req.body.acessorios,
        casaco: req.body.casaco,
        calcas: req.body.calcas,
        sapatos: req.body.sapatos,
        roupainterior: req.body.roupainterior,
        dinheiro: req.body.dinheiro,
      },
    },
    { new: true }
  )
    .then((point) => {
      res.redirect("/points");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/points");
    });
};

pointsController.simulate = function (req, res) {
  Points.findOne()
    .then((point) => {
      let id = req.params.id;
      let entityId = req.params.entityId;
      res.render("../views/donations/doar", {
        point: point,
        id: id,
        entityId:entityId,
        username: req.session.username,
        userId: req.session.userId,
      });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

module.exports = pointsController;
