var mongoose = require("mongoose");
var Employee = require("../models/Employee");

var employeeController = {};

mongoose
  .connect(
    "mongodb+srv://user:user@basepaw.e8ypv1l.mongodb.net/trabalhoPaw?retryWrites=true&w=majority&appName=BASEPAW"
  )
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

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
      res.redirect("show/" + employee._id);
    })
    .catch((err) => {
      console.error(err);
      res.render("../views/employees/create");
    });
};

employeeController.edit = function (req, res) {
  Employee.findOne({ _id: req.params.id })
    .then((employee) => {
      res.render("../views/employees/edit", { employee: employee });
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
        address: req.body.address,
        position: req.body.position,
      },
    },
    { new: true }
  )
    .then((employee) => {
      res.redirect("/employees/show/" + employee._id);
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/employees/edit", { employee: req.body });
    });
};

employeeController.delete = function (req, res) {
  Employee.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Employee detected!");
      res.redirect("/employees");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = employeeController;
