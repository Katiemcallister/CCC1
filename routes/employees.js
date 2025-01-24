const EmployeeService = require("../services/employeeService");
const employeeService = new EmployeeService();
const express = require('express');

const  router = express.Router();

router.get('/', (req, res) => {
    let employees = employeeService.getAllEmployees();
    res.render('employees', {employees})
});

// Create a new employees form
router.get('/add', (req, res) => {
    res.render('addEmployee')
});
  
// Create a new employees submit
router.post('/add', (req, res) => {
    const newEmployees = req.body;
    const createdEmployees = employeeService.createEmployee(newEmployees);
    res.redirect('/employees/' + createdEmployees.id)
});
  
  // Read a employees by ID
router.get('/:id', (req, res) => {
    const employee = employeeService.getEmployeeById(parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employees not found');
    res.render('employee', { employee })
});
  
  // Update a employees by ID form
router.get('/update/:id', (req, res) => {
    const employee = employeeService.getEmployeeById(parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employees not found');
    res.render('updateEmployee', {employee})
});
  
  // Update a employees by ID
router.post('/update/:id', (req, res) => {
    const updatedEmployee = employeeService.updateEmployee(parseInt(req.params.id), req.body);
    if (!updatedEmployee) return res.status(404).send('Employees not found');
    res.redirect('/employees/' + updatedEmployee.id)
});
  
  // Delete a employees by ID form
router.get('/delete/:id', (req, res) => {
    const employee = employeeService.getEmployeeById(parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employees not found');
    res.render('deleteEmployee', {employee})
});
  
  // Delete a employees by ID
router.post('/delete/:id', (req, res) => {
    const deletedEmployee = employeeService.deleteEmployee(parseInt(req.params.id));
    if (!deletedEmployee) return res.status(404).send('Employees not found');
    res.redirect('/employees')
});

module.exports = router;