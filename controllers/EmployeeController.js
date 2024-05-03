var mongoose = require("mongoose");
var Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
var path = require("path");
var fs = require("fs");
var employeeController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

employeeController.management = function (req, res) {
  let num;
  (async () => {
    try {
      num = await Employee.countDocuments({});
      console.log("Número total de documentos:", num);
      Employee.find()
        .then((employee) => {
          res.render("../views/employees/gestaoFuncionarios", {
            employees: employee,
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
employeeController.list = function (req, res) {
  Employee.find()
    .then((employee) => {
      res.render("../views/employees/showAll", { employees: employee });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};
*/

employeeController.show = function (req, res) {
  Employee.findOne({ _id: req.params.id })
    .then((employee) => {
      res.render("../views/employees/verfuncionario", {
        employee: employee,
        username: req.session.username,
        userId: req.session.userId,
      });
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

employeeController.create = function (req, res) {
  res.render("employees/registarfuncionario", {
    username: req.session.username,
    userId: req.session.userId,
  });
};

employeeController.save = function (req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var city = req.body.city;
  regCity = city.charAt(0).toUpperCase() + city.slice(1);
  const data = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    postCode: req.body.postCode,
    city: regCity,
    password: hashedPassword,
  };
  const employeeSave = new Employee(data);
  Employee.findOne({ email: req.body.email })
    .then((employee) => {
      if (employee) {
        console.log("funcionario ja existe");
        res.render("../views/employees/verfuncionario", {
          employee: employee,
          username: req.session.username,
          userId: req.session.userId,
        });
      } else {
        employeeSave
          .save()
          .then((savedEmployee) => {
            console.log("Successfully created an Employee.");

            var fileDestination = path.join(
              __dirname,
              "..",
              "images",
              "employees",
              savedEmployee._id.toString() + ".jpg"
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
                    console.error(
                      "Erro ao remover o arquivo da pasta 'tmp':",
                      err
                    );
                  }
                });
                res.redirect("/employees/");
              });
            });
          })
          .catch((err) => {
            Employee.findOne({ email: req.body.email }).then((savedEmployee)=>{

              var fileDestination = path.join(
                __dirname,
                "..",
                "images",
                "employees",
                savedEmployee._id.toString() + ".jpg"
              );
              var fileOrigin = path.join(
                __dirname,
                "..",
                "images",
                "employees",
                "default" + ".jpg"
              );
              fs.readFile(fileOrigin, function (err, data) {
                if (err) {
                  
                }
                fs.writeFile(fileDestination, data, function (err) {
                  if (err) {
                  
                  }
                //  res.redirect("/employees/");
                });
              });
            })
            res.redirect("/employees/");
          }); 
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};


employeeController.edit = function (req, res) {
  Employee.findOne({ _id: req.params.id })
    .then((employee) => {
      res.render("../views/employees/editarfuncionario", {
        employee: employee,
        username: req.session.username,
        userId: req.session.userId,
      });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

employeeController.update = function (req, res) {
  Employee.findByIdAndUpdate(
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
    .then((savedEmployee) => {
      console.log("Successfully created an Employee.");

      var fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "employees",
        savedEmployee._id.toString() + ".jpg"
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
          res.redirect("/employees/");
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/employees/");
    });
};

employeeController.delete = function (req, res) {
  Employee.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Employee detected!");

      var fileDestination = path.join(
        __dirname,
        "..",
        "images",
        "employees",
        req.params.id + ".jpg"
      );

      fs.access(fileDestination, fs.constants.F_OK, (err) => {
        if (err) {
          console.error("O arquivo não existe:", err);
          return;
        }

        fs.unlink(fileDestination, (err) => {
          if (err) {
            console.error("Erro ao apagar o arquivo:", err);
            return;
          }
          console.log("A imagem foi apagada com sucesso!");
        });
      });
      res.redirect("/employees/");
    })
    .catch((err) => {
      console.log(err);
    });
};

employeeController.searchByemail = function (req, res) {
  Employee.findOne({ email: req.query.email })
    .then((employee) => {
      if (!employee) {
        console.log("Funcionario não encontrado");
      }
      res.render("../views/employees/verfuncionario", {
        employee: employee,
        username: req.session.username,
        userId: req.session.userId,
      });
    })
    .catch((err) => {
      res.redirect("/employees/");
    });
};

module.exports = employeeController;
