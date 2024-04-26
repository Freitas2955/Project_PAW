var mongoose = require("mongoose");
var Employee = require("../models/Employee");

var employeeController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

employeeController.management = function (req, res) {
  num = 0;
  
  (async () => {
    try {
     num = await Employee.countDocuments({});
      console.log('Número total de documentos:', num);
    } catch (error) {
      console.error('Ocorreu um erro ao contar os documentos:', error);
    }
  })();

  Employee.find()
    .then((employee) => {
      res.render("../views/gestaoFuncionarios", {
        employees: employee,
        number: num,
      });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

employeeController.list = function (req, res) {
  Employee.find()
    .then((employee) => {
      res.render("../views/employees/showAll", { employees: employee });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

employeeController.show = function (req, res) {
  Employee.findOne({ _id: req.params.id })
    .then((employee) => {
      res.render("../views/employees/show", { employee: employee });
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

employeeController.create = function (req, res) {
  res.render("../views/employees/create");
};

employeeController.save = function (req, res) {
  const employee = new Employee(req.body);
  employee
    .save()
    .then(() => {
      console.log("Successfully created an employee.");
      res.redirect("/users/gerirFuncionarios" /*+ employee._id*/);
    })
    .catch((err) => {
      console.error(err);
      res.render("../views/employees/create");
    });
};

employeeController.edit = function (req, res) {
  Employee.findOne({ _id: req.params.id })
    .then((employee) => {
      res.render("../views/utilizadores/editarfuncionario", {
        employee: employee,
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
    .then((employee) => {
      res.redirect("/users/gerirFuncionarios" /*+ employee._id*/);
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/utilizadores/editarfuncionario", {
        employee: req.body,
      });
    });
};

employeeController.delete = function (req, res) {
  Employee.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Employee detected!");
      res.redirect("/users/gerirFuncionarios");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = employeeController;
