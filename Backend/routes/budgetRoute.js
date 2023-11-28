const express = require('express');
const BudgetController = require('../controllers/budgetController');


const router = express.Router();

// Create a budget
router.post('/budgets', BudgetController.createBudget);

// Update a budget
router.put('/budgets/:budgetId', BudgetController.updateBudget);

// Delete a budget
router.delete('/budgets/:budgetId', BudgetController.deleteBudget);

// Get all budgets for the authenticated user
router.get('/budgets', BudgetController.getBudgets);

module.exports = router;
