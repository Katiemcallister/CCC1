var express = require('express');
var router = express.Router();

const EmployeeService = require('../services/employeeService');
const employeeService = new EmployeeService(); // Correct instantiation

// Ensure employees array exists in EmployeeService
employeeService.employees = [];

// Override the createEmployee method in EmployeeService
EmployeeService.prototype.createEmployee = function (newEmployee) {
  const employeeWithId = {
    id: this.employees.length + 1, // Auto-incrementing ID based on array length
    ...newEmployee,
  };

  // Store the new employee
  this.employees.push(employeeWithId);

  return employeeWithId;
};

// Create a new employee form
router.get('/add', (req, res) => {
  res.render('addEmployee');
});

// Create a new employee submit
router.post('/add', (req, res) => {
  const newEmployee = req.body;
  const createdEmployee = employeeService.createEmployee(newEmployee);

  // Redirect to the employees list (not showing ID immediately)
  res.redirect('/employees');
});


// Read all employees
router.get('/', (req, res) => {
  const employees = employeeService.getAllEmployees();
  res.render('employees', { employees: employees });
});

// Read an employee by ID
router.get('/:id', (req, res) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.render('employee', { employee: employee });
});

// Update an employee by ID form
router.get('/update/:id', (req, res) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.render('updateEmployee', { employee: employee });
});

// Update an employee by ID
router.post('/update/:id', (req, res) => {
  const updatedEmployee = employeeService.updateEmployee(parseInt(req.params.id), req.body);
  if (!updatedEmployee) return res.status(404).send('Employee not found');
  res.redirect('/employees/' + updatedEmployee.id);
});

// Delete an employee by ID form
router.get('/delete/:id', (req, res) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.render('deleteEmployee', { employee: employee });
});

// Delete an employee by ID
router.post('/delete/:id', (req, res) => {
  const deletedEmployee = employeeService.deleteEmployee(parseInt(req.params.id));
  if (!deletedEmployee) return res.status(404).send('Employee not found');
  res.redirect('/employees');
});

module.exports = router;
