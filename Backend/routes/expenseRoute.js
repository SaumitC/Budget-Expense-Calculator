const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

// Create a new expense
router.post('/expenses/', expenseController.createExpense);

// Get all expenses
router.get('/expenses/', expenseController.getAllExpenses);

// Get a specific expense by ID
router.get('/expenses/:id', expenseController.getExpenseById);

// Update an expense by ID
router.put('/expenses/:id', expenseController.updateExpenseById);

// Delete an expense by ID
router.delete('/expenses/:id', expenseController.deleteExpenseById);

// TODO: Add a route to get monthly expenses
router.get('/expenses-monthly', expenseController.getMonthlyExpenses);

module.exports = router;
