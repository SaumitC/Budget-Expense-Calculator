const expenseService = require('../services/expenseService');

// Create a new expense
const createExpense = async (req, res) => {
    try {
        const { amount, description, name, budgetId ,date} = req.body;

        const newExpense = await expenseService.createExpense({
            amount,
            description,
            name,
            budget: budgetId,
            date: date,
        });
        res.status(201).json({ message: 'Expense created successfully', data: newExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create expense' });
    }
};

// Get all expenses
const getAllExpenses = async (req, res) => {
    try {
        const userId = req.userId; // From authMiddleware
        const expenses = await expenseService.getAllExpenses(userId);
        res.status(200).json({ message: 'Expenses retrieved successfully', data: expenses });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to retrieve expenses' });
    }
};

// Get a specific expense by ID
const getExpenseById = async (req, res) => {
    try {
        const userId = req.userId; // From authMiddleware
        const expense = await expenseService.getExpenseById(req.params.id, userId);

        res.status(200).json({ message: 'Expense retrieved successfully', data: expense });
    } catch (error) {
        console.error(error.message);
        res.status(404).json({ error: 'Expense not found' });
    }
};

// Update an expense by ID
const updateExpenseById = async (req, res) => {
    try {
      
        console.log(req.body);
        const updatedExpense = await expenseService.updateExpenseById(
            req.params.id,
            req.body
        );

        res.status(200).json({ message: 'Expense updated successfully', data: updatedExpense });
    } catch (error) {
        console.error(error.message);
        res.status(404).json({ error: 'Failed to update expense' });
    }
};

// Delete an expense by ID
const deleteExpenseById = async (req, res) => {
    try {
        await expenseService.deleteExpenseById(req.params.id);

        res.status(204).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(404).json({ error: 'Failed to delete expense' });
    }
};

const getMonthlyExpenses = async (req, res) => {
    try {
      const userId = req.userId; // Adjust this based on how you store user information in your application
      const monthlyExpenses = await expenseService.getMonthlyExpenses(userId);
        res.status(200).json({ message: 'Monthly expenses retrieved successfully', data: monthlyExpenses });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Failed to retrieve monthly expenses' });
    }
  };
module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpenseById,
    deleteExpenseById,
    getMonthlyExpenses
};
