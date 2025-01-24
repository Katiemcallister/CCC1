var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const UserService = require('../services/userService');
const userService = new UserService();

// Serve the users page
router.get('/', function(req, res, next) {
  const users = userService.getAllUsers();
  res.render('users', { users: users });
});

// Handle user registration
router.post('/register', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../users.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading users file');
    }
    let users = JSON.parse(data);
    let newUser = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    users.push(newUser);
    fs.writeFile(path.join(__dirname, '../users.json'), JSON.stringify(users, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).send('Error writing users file');
      }
      res.status(200).send('User registered successfully');
    });
  });
});

// Handle user login
router.post('/login', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../users.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading users file');
    }
    let users = JSON.parse(data);
    let user = users.find(u => u.email === req.body.email && u.password === req.body.password);
    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

// Create a new user form
router.get('/add', (req, res) => {
  res.render('addUser');
});

// Create a new user submit
router.post('/add', (req, res) => {
  const newUser = req.body;
  const createdUser = userService.createUser(newUser);
  res.redirect('/user/' + createdUser.id);
});

// Read a user by ID
router.get('/:id', (req, res) => {
  const user = userService.getUserById(parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.render('user', { user: user });
});

// Update a user by ID form
router.get('/update/:id', (req, res) => {
  const user = userService.getUserById(parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.render('updateUser', { user: user });
});

// Update a user by ID
router.post('/update/:id', (req, res) => {
  const updatedUser = userService.updateUser(parseInt(req.params.id), req.body);
  if (!updatedUser) return res.status(404).send('User not found');
  res.redirect('/user/' + updatedUser.id);
});

// Delete a user by ID form
router.get('/delete/:id', (req, res) => {
  const user = userService.getUserById(parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.render('deleteUser', { user: user });
});

// Delete a user by ID
router.post('/delete/:id', (req, res) => {
  const deletedUser = userService.deleteUser(parseInt(req.params.id));
  if (!deletedUser) return res.status(404).send('User not found');
  res.redirect('/user');
});

module.exports = router;
