var mongoose = require("mongoose");
var Entity = require("../models/Entity");

var entityController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

entityController.list = function (req, res) {
  Entity.find()
    .then((entity) => {
      res.render("../views/entities/showAll", { entities: entity });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

entityController.show = function (req, res) {
  Entity.findOne({ _id: req.params.id })
    .then((entity) => {
      res.render("../views/entities/show", { entity: entity });
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

entityController.create = function (req, res) {
  res.render("../views/entities/create");
};

entityController.save = function (req, res) {
  const entity = new Entity(req.body);
  entity
    .save()
    .then(() => {
      console.log("Successfully created an entity.");
      res.redirect("show/" + entity._id);
    })
    .catch((err) => {
      console.error(err);
      res.render("../views/entities/create");
    });
};

entityController.edit = function (req, res) {
  Entity.findOne({ _id: req.params.id })
    .then((entity) => {
      res.render("../views/entities/edit", { entity: entity });
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
        address: req.body.address,
        position: req.body.position,
      },
    },
    { new: true }
  )
    .then((entity) => {
      res.redirect("/entities/show/" + entity._id);
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/entities/edit", { entity: req.body });
    });
};

entityController.delete = function (req, res) {
  Entity.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Entity detected!");
      res.redirect("/entities");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = entityController;