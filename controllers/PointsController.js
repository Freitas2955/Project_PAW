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
  res.render("../views/points/create");
};

pointsController.save = function (req, res) {
  const point = new Points(req.body);
  Points
    .save()
    .then(() => {
      console.log("Successfully created an donator.");
      res.redirect("show/" + point._id);
    })
    .catch((err) => {
      console.error(err);
      res.render("../views/points/create");
    });
};

pointsController.edit = function (req, res) {
  Points.findOne({ _id: req.params.id })
    .then((point) => {
      res.render("../views/points/edit", { point: point });
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
        camisola:req.body.camisola,
        acessorios:req.body.acessorios,
        casaco:req.body.casaco,
        calcas:req.body.calcas,
        sapatos:Numreq.body.sapatos,
        roupainterior:req.body.roupainterior,
        dinheiro:req.body.dinheiro,
      },
    },
    { new: true }
  )
    .then((point) => {
      res.redirect("/point/show/" + point._id);
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/points/edit", { point: req.body });
    });
};

module.exports = pointsController;