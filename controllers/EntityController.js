var mongoose = require("mongoose");
var Entity = require("../models/Entity");
var path = require('path');
var fs = require("fs");

var entityController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

entityController.management = function (req, res) {
  let num;
  
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

entityController.save = function(req, res) {
  /*
  if (!isValidEmail(req.body.email)) {
    console.log('Email inválido.');
    return res.render('../views/entities/create', { error: 'Email inválido' });
  }*/

  var entity = new Entity(req.body);

  entity.save()
    .then(savedEntity => {
      console.log('Successfully created an entity.');

      var fileDestination = path.join(__dirname, "..", "images", savedEntity._id.toString() + ".jpg");
      fs.readFile(req.file.path, function(err, data) {
        if (err) {
          console.error("Error reading file:", err);
          return res.status(500).send("Error reading file");
        }

        fs.writeFile(fileDestination, data, function(err) {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Error writing file");
          }
          fs.unlink(req.file.path, function(err) {
            if (err) {
              console.error("Erro ao remover o arquivo da pasta 'tmp':", err);
            }
          });
            //posso apagar esta linha certo?
            res.redirect("show/" + savedEntity._id);
          });
        });
      })
    .catch(err => {
      console.log(err);
      res.render('../views/entities/create');
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
/*
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
      res.redirect("/users/gerirInstituicoes" /*+ entity._id*//*);
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/utilizadores/editarinstituicao", { entity: req.body });
    });
};
*/
//////////////////////////////////////------Nao esta a dar nao sei porque-------------

entityController.update = function (req, res) {
  // Primeiro, verifique se uma nova imagem foi fornecida na solicitação
  if (req.file) {
    // Se sim, leia o arquivo da nova imagem
    fs.readFile(req.file.path, function (err, data) {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Error reading file");
      }

      // Determine o caminho para salvar a nova imagem
      var fileDestination = path.join(__dirname, "..", "images", req.params.id + ".jpg");

      // Escreva o arquivo da nova imagem
      fs.writeFile(fileDestination, data, function (err) {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Error writing file");
        }

        // Se a escrita do arquivo for bem-sucedida, atualize os outros campos da entidade
        updateEntity(req, res);
      });
    });
  } else {
    // Se nenhuma nova imagem foi fornecida, apenas atualize os outros campos da entidade
    updateEntity(req, res);
  }
};

function updateEntity(req, res) {
  Entity.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        description: req.body.description,
        email: req.body.email,
        city: req.body.city,
        postCode: req.body.postCode,
      },
    },
    { new: true }
  )
    .then((updatedEntity) => {
      console.log('Successfully updated an entity.');

      // Aqui você pode adicionar lógica adicional, se necessário, após a atualização do objeto

      res.redirect("/users/gerirInstituicoes" /*+ updatedEntity._id*/);
    })
    .catch((err) => {
      console.error(err);
      res.render("../views/utilizadores/editarinstituicao", { entity: req.body });
    });
}

///////////////////////////////////

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
