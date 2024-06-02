var mongoose = require("mongoose");
var Points = require("../models/Points");

var pointsController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));
/*
pointsController.create = function (req, res) {
  res.render("../views/pontos",{username: req.session.username,
    userId: req.session.userId,});
};*/

pointsController.save = function (req, res) {
  const point = new Points(req.body);
  point
    .save()
    .then(() => {
      console.log("Successfully created points.");
      res.json({
        point: req.body,
        username: req.session.username,
        userId: req.session.userId,
      });
      //res.render("../views/pontos");
    })
    .catch((err) => {
      console.error(err);
      res.json({ username: req.session.username, userId: req.session.userId });
      //res.render("/pontos");
    });
};

pointsController.edit = function (req, res) {
  Points.findOne()
    .then((point) => {
      res.json({
        point: point,
        username: req.session.username,
        userId: req.session.userId,
      });
      //res.render("../views/pontos");
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

pointsController.get = function (req, res) {
  Points.findOne()
    .then((points) => {
      res.json({
        points: points,
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
      res.redirect("/RestPoints");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/RestPoints");
    });
};

pointsController.simulate = function (req, res) {
  Points.findOne()
    .then((point) => {
      let id = req.params.id;
      res.json({
        point: point,
        id: id,
        username: req.session.username,
        userId: req.session.userId,
      })
      //res.render("../views/donations/doar");
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

module.exports = pointsController;
