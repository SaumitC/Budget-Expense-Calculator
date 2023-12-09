const budgetService = require('../services/budgetService');
const expenseService = require('../services/expenseService');
async function createBudget(req, res) {
  try {
    const { amount, title } = req.body;
    const user = req.user; // Assume you've added the user to the request during authentication
    const newBudget = await budgetService.createBudget(user, amount, title);
    res.status(201).json({ message: 'Budget created successfully', data: newBudget });
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
    res.json({ message: 'Budget updated successfully', data: updatedBudget });
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
    res.json({ message: 'Budgets retrieved successfully', data: budgets });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
async function getBudgetById(req, res) {
  try {
    const user = req.user; // Assume you've added the user to the request during authentication
    const { budgetId } = req.params;
    const budget = await budgetService.getBudgetById(budgetId, user);
    console.log(budget);
    res.json({ message: 'Budget retrieved successfully', data: budget });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
async function getBudgetsPieChart(req, res) {
  try {
    const user = req.user; // Assume you've added the user to the request during authentication
    const budgets = await budgetService.getBudgetsPieChart(user);
    res.json({ message: 'Budgets Pie chart data retrieved successfully', data: budgets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
async function getBudgetsBarChart(req, res) {
  try {
    const user = req.user; // Assume you've added the user to the request during authentication
    const budgets = await budgetService.getBudgetsBarChart(user);
    res.json({ message: 'Budgets Bar chart data retrieved successfully', data: budgets });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports = {
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgets,
  getBudgetById,
  getBudgetsPieChart,
  getBudgetsBarChart
};
