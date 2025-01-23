var express = require('express');
var router = express.Router();
var path = require('path');

// Serve static files from the "frontend" directory
router.use(express.static(path.join(__dirname, '')));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '', 'index.html'));
});

module.exports = router;