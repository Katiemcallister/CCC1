const employeesService = require("../services/employeesService");
const express = require('express');

const  router = express.Router();

router.get('/list', (req, res) => {
    let employees = new employeesService().getAllEmployees();
    res.render('employeeList', {employees})
});

router.get('/view/:id', (req, res) => {
    console.log("TODO");
});

module.exports = router;