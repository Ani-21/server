const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) return res.status(204).json({ msg: "No employee found" });
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req.body.firstname || !req.body.lastname)
    return res.send(400).json({ msg: "First and last names are required" });

  try {
    const newEmployee = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json(newEmployee);
  } catch (err) {
    console.log(err);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res.send(400).json({ msg: "ID parametr is required" });

  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee)
    return res
      .status(204)
      .json({ msg: `No employee ID matches ${req.body.id}.` });

  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res.send(400).json({ msg: "ID parametr is required" });

  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    res.status(400);
    res.json({ msg: `No Employee with id:${req.body.id} Was Found` });
  }

  const result = await Employee.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id)
    return res.send(400).json({ msg: "ID parametr is required" });
  const employee = await Employee.findOne({ _id: req.params.id }).exec();

  if (!employee) {
    res.status(400);
    res.json({ msg: `No Employee with id:${req.params.id} Was Found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
