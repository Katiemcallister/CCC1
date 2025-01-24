var express = require('express');
var router = express.Router();
var path = require('path');

// Serve static files from the "frontend" directory
router.use(express.static(path.join(__dirname, '')));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '', 'index.html'));
});

// Include the users route
router.use('/user', require('./users'));

// Include the employees route
router.use('/employees', require('./employees'));

module.exports = router;