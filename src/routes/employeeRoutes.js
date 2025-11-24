const express = require('express');
const router = express.Router();
const { getEmployees, addEmployee, deleteEmployee } = require('../controllers/employeeController');

router.get('/', getEmployees);       // View all employees
router.post('/', addEmployee);       // Add new employee
router.delete('/:id', deleteEmployee); // Delete employee

module.exports = router;
