const employeeService = require("../services/employeeService");
const express = require('express');

const  router = express.Router();

router.get('/', (req, res) => {
    let employees = new employeeService().getAllEmployees();
    res.render('employees', {employees})
});

router.get('/view/:id', (req, res) => {
    console.log("TODO");
});

module.exports = router;