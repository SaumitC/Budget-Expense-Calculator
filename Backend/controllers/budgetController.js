const budgetService = require('../services/budgetService');

async function createBudget(req, res) {
  try {
    const { amount, title } = req.body;
    const user = req.user; // Assume you've added the user to the request during authentication
    const newBudget = await budgetService.createBudget(user, amount, title);
    res.status(201).json({ message: 'Budget created successfully', budget: newBudget });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateBudget(req, res) {
  try {
    const { budgetId } = req.params;
    const updates = req.body;
    const user = req.user; // Assume you've added the user to the request during authentication
    const updatedBudget = await budgetService.updateBudget(user, budgetId, updates);
    res.json({ message: 'Budget updated successfully', budget: updatedBudget });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteBudget(req, res) {
  try {
    const { budgetId } = req.params;
    const user = req.user; // Assume you've added the user to the request during authentication
    const result = await budgetService.deleteBudget(user, budgetId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getBudgets(req, res) {
  try {
    const user = req.user; // Assume you've added the user to the request during authentication
    const budgets = await budgetService.getBudgets(user);
    res.json({ budgets });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgets,
};
