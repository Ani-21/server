const employeesDb = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(employeesDb.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: employeesDb.employees.length
      ? employeesDb.employees[employeesDb.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    res.status(400).json({ msg: "First and last names are required" });
  }

  employeesDb.setEmployees([...employeesDb.employees, newEmployee]);

  res.status(201).json(employeesDb.employees);
};

const updateEmployee = (req, res) => {
  const employee = employeesDb.employees.find(
    (empl) => empl.id === parseInt(req.body.id)
  );

  if (!employee)
    return res.status(400).json({ msg: "First and last names are required" });
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  const otherEmployees = employeesDb.employees.filter(
    (empl) => empl.id !== parseInt(req.body.id)
  );
  const unsortedArr = [...otherEmployees, employee];
  const sortedArr = unsortedArr.sort((a, b) =>
    a.id > b.id ? 1 : a.id < b.id ? -1 : 0
  );
  employeesDb.setEmployees([...sortedArr]);
  res.json(employeesDb.employees);
};

const deleteEmployee = (req, res) => {
  const employee = employeesDb.employees.find(
    (empl) => empl.id === parseInt(req.body.id)
  );

  if (!employee) {
    res.status(400);
    res.json({ msg: `No Employee with id:${req.body.id} Was Found` });
  }

  const filteredArr = employeesDb.employees.filter(
    (empl) => empl.id !== parseInt(req.body.id)
  );
  res.json(employeesDb.setEmployees([...filteredArr]));
};

const getEmployee = (req, res) => {
  const employee = employeesDb.employees.find(
    (empl) => empl.id === parseInt(req.params.id)
  );

  if (!employee) {
    res.status(400);
    res.json({ msg: `No Employee with id:${req.body.id} Was Found` });
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
