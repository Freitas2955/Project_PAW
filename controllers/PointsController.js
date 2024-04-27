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
  res.render("../views/pontos");
};

pointsController.save = function (req, res) {
  const point = new Points(req.body);
  point.save()
    .then(() => {
      console.log("Successfully created points.");
      res.redirect("show/" + point._id);
    })
    .catch((err) => {
      console.error(err);
      res.render("../pontos");
    });
};

pointsController.edit = function (req, res) {
  Points.findOne()
    .then((point) => {
      res.render("../views/pontos", { point: point });
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
  //tirar isto ne?
    .then((point) => {
      res.redirect("/point/show/" + point._id);
    })
    //tirar isto?
    .catch((err) => {
      console.log(err);
      res.render("../views/points/edit", { point: req.body });
    });
};

pointsController.simulate = function (req, res) {
  Points.findOne()
    .then((point) => {
      let id=req.params.id
      res.render("../views/doar", { point: point,id:id });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

module.exports = pointsController;
