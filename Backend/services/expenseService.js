const ExpenseModel = require('../models/Expense');
const BudgetModel = require('../models/Budget');
const { ObjectId } = require('mongoose').Types;
// Create a new expense
const createExpense = async (expenseData) => {
    try {
        const newExpense = new ExpenseModel({
            ...expenseData,
            createdAt: new Date(),
            modifiedAt: new Date(),
        });
        const savedExpense = await newExpense.save();

        // Add the expense's ID to the corresponding budget
        const updatedBudget = await BudgetModel.findByIdAndUpdate(
            expenseData.budget,
            { $push: { expenses: savedExpense._id } },
            { new: true }
        );
        console.log(updatedBudget);
        return savedExpense;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create expense');
    }
};

// Get all expenses
const getAllExpenses = async (userId) => {
    try {
        console.log(userId);
        let expenses = await ExpenseModel.find().populate('budget', 'createdBy title amount _id').sort('-createdAt');
        console.log(expenses);
        let usersExpense = expenses.filter((expense) => {
            console.log(expense);
            return expense.budget.createdBy.toString() === userId.toString();
        });
        return usersExpense;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve expenses');
    }
};

const getExpenseById = async (expenseId, userId) => {
    try {
        const expense = await ExpenseModel.findOne({
            _id: expenseId,
        }).populate('budget');

        if (!expense) {
            throw new Error('Expense not found');
        }

        return expense;
    } catch (error) {
        throw new Error('Failed to retrieve expense by ID');
    }
};


// Update an expense by ID
const updateExpenseById = async (expenseId, expenseData) => {
    try {
        const updatedExpense = await ExpenseModel.findByIdAndUpdate(
            expenseId,
            {
                ...expenseData,
                modifiedAt: new Date(),
            },
            { new: true }
        );

        if (!updatedExpense) {
            throw new Error('Expense not found for update');
        }

        return updatedExpense;
    } catch (error) {
        throw new Error('Failed to update expense by ID');
    }
};

// Delete an expense by ID
const deleteExpenseById = async (expenseId) => {
    try {
        const deletedExpense = await ExpenseModel.findByIdAndDelete(expenseId);

        if (!deletedExpense) {
            throw new Error('Expense not found for deletion');
        }

        return deletedExpense;
    } catch (error) {
        throw new Error('Failed to delete expense by ID');
    }
};

// TODO: Implement this function
const getMonthlyExpenses = async (userId) => {
    try {
        // Aggregate to group expenses by month
        const monthlyExpenses = await ExpenseModel.aggregate([
            {
                $match: {
                    'budget.createdBy': userId,
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                    },
                    expenses: { $push: '$$ROOT' },
                },
            },
        ]);

        return monthlyExpenses;
    } catch (error) {
        throw new Error('Failed to retrieve monthly expenses');
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
