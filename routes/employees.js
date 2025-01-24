const EmployeeService = require("../services/employeeService");
const employeeService = new EmployeeService();
const express = require('express');

const router = express.Router();

// Serve the employees page
router.get('/', (req, res) => {
    let employees = employeeService.getAllEmployees();
    res.render('employees', { employees: employees });
});

// Create a new employee form
router.get('/add', (req, res) => {
    res.render('addEmployee');
});

// Create a new employee submit
router.post('/add', (req, res) => {
    const newEmployee = req.body;
    const createdEmployee = employeeService.createEmployee(newEmployee);
    res.redirect('/employees/' + createdEmployee.id);
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