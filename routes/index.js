var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Employees */
router.get('/employees', function(req, res) {
  res.render('employees', { title: 'Employees' });
});


/* Users */
router.get('/users', function(req, res) {
  res.render('users', { title: 'Users' });
});

module.exports = router;