const db = require("../utils/dbConn.js");
const express = require('express');

const  router = express.Router();

// Create a new user form
router.get('/list', (req, res) => {
    db.query("SELECT * FROM employee;", [], (_, employees) => {
        res.render('employeeList', {employees})
    });
});

module.exports = router;