var mongoose = require("mongoose");
var Entity = require("../models/Entity");

var entityController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

entityController.management = function (req, res) {
  num = 0;
  
  (async () => {
    try {
     num = await Entity.countDocuments({});
      console.log('Número total de documentos:', num);
    } catch (error) {
      console.error('Ocorreu um erro ao contar os documentos:', error);
    }
  })();

  Entity.find()
    .then((entity) => {
      res.render("../views/gestaoInstituicoes", { entities: entity,number:num });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

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
      res.redirect("/users/gerirInstituicoes" /*+ entity._id*/);
    })
    .catch((err) => {
      console.error(err);
      res.render("../views/entities/create");
    });
};

entityController.edit = function (req, res) {
  Entity.findOne({ _id: req.params.id })
    .then((entity) => {
      res.render("../views/utilizadores/editarinstituicao", { entity: entity });
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
        phone:req.body.phone,
        address: req.body.address,
        description: req.body.description,
        email: req.body.email,
        city: req.body.city,
        postCode: req.body.postCode,
      },
    },
    { new: true }
  )
    .then((entity) => {
      res.redirect("/users/gerirInstituicoes" /*+ entity._id*/);
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/utilizadores/editarinstituicao", { entity: req.body });
    });
};

entityController.delete = function (req, res) {
  Entity.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Entity detected!");
      res.redirect("/users/gerirInstituicoes");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = entityController;
