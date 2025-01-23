var express = require('express');
var router = express.Router();

const EmployeeService = require('../services/employeeService');
const employeeService = new EmployeeService(); // Corrected instantiation

// Initialize an in-memory counter for unique IDs
let employeeIdCounter = 1;

// Extend EmployeeService with ID generation logic
employeeService.createEmployee = function (newEmployee) {
  const employeeWithId = {
    id: employeeIdCounter++, // Auto-incrementing ID
    ...newEmployee,
  };

  // Store the new employee in the service
  this.employees.push(employeeWithId);

  return employeeWithId;
};

// Extend EmployeeService with methods if necessary
employeeService.employees = []; // Simulated in-memory employee storage

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

class EmployeeService {
    constructor() {
      this.employees = [];
    }
  
    getAllEmployees() {
      return this.employees;
    }
  
    getEmployeeById(id) {
      return this.employees.find((employee) => employee.id === id);
    }
  
    updateEmployee(id, updatedData) {
      const index = this.employees.findIndex((employee) => employee.id === id);
      if (index === -1) return null;
  
      this.employees[index] = { ...this.employees[index], ...updatedData };
      return this.employees[index];
    }
  
    deleteEmployee(id) {
      const index = this.employees.findIndex((employee) => employee.id === id);
      if (index === -1) return null;
  
      return this.employees.splice(index, 1)[0];
    }
  }
  
  module.exports = EmployeeService;