var express = require('express');
var router = express.Router();

const JobRoleService = require('../services/jobRoleService');
const jobRoleService = new JobRoleService();

// Create a new jobRole form
router.get('/add', (req, res) => {
  res.render('jobRole/add')
});

// Create a new jobRole submit
router.post('/add', (req, res) => {
  const newJobRole = req.body;
  const createdJobRole = jobRoleService.createJobRole(newJobRole);
  res.redirect('/jobroles/' + createdJobRole.id)
});

// Read all jobRoles
router.get('/', (req, res) => {
  const jobRoles = jobRoleService.getAllJobRoles();
  res.render('jobRole/list', { jobRoles: jobRoles })
});

// Read a jobRole by ID
router.get('/:id', (req, res) => {
  const jobRole = jobRoleService.getJobRoleById(parseInt(req.params.id));
  if (!jobRole) return res.status(404).send('Job Role not found');
  res.render('jobRole/view', { jobRole: jobRole })
});

// Update a jobRole by ID form
router.get('/update/:id', (req, res) => {
  const jobRole = jobRoleService.getJobRoleById(parseInt(req.params.id));
  if (!jobRole) return res.status(404).send('Job Role not found');
  res.render('jobRole/update', {jobRole: jobRole})
});

// Update a jobRole by ID
router.post('/update/:id', (req, res) => {
  const updatedJobRole = jobRoleService.updateJobRole(parseInt(req.params.id), req.body);
  if (!updatedJobRole) return res.status(404).send('Job Role not found');
  res.redirect('/jobroles/' + updatedJobRole.id)
});

// Delete a jobRole by ID form
router.get('/delete/:id', (req, res) => {
  const jobRole = jobRoleService.getJobRoleById(parseInt(req.params.id));
  if (!jobRole) return res.status(404).send('Job Role not found');
  res.render('jobRole/delete', {jobRole: jobRole})
});

// Delete a jobRole by ID
router.post('/delete/:id', (req, res) => {
  const deletedJobRole = jobRoleService.deleteJobRole(parseInt(req.params.id));
  if (!deletedJobRole) return res.status(404).send('Job Role not found');
  res.redirect('/jobroles')
});

module.exports = router;
