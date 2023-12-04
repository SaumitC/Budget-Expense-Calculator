const BudgetModel = require('../models/Budget');

async function createBudget(user, amount, title) {
  try {
    const newBudget = new BudgetModel({
      amount,
      title,
      createdBy: user._id,
      modifiedBy: user._id,
    });
    await newBudget.save();
    return newBudget;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateBudget(user, budgetId, updates) {
  try {
    const budget = await BudgetModel.findById(budgetId);

    if (!budget) {
      throw new Error('Budget not found');
    }

    // Check if the user has the right to modify this budget
    if (budget.createdBy.toString() !== user._id.toString()) {
      throw new Error('Unauthorized to modify this budget');
    }

    // Update the budget fields
    Object.assign(budget, updates);
    budget.modifiedBy = user._id;

    await budget.save();
    return budget;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteBudget(user, budgetId) {
  try {
    const budget = await BudgetModel.findById(budgetId);

    if (!budget) {
      throw new Error('Budget not found');
    }

    // Check if the user has the right to delete this budget
    if (budget.createdBy.toString() !== user._id.toString()) {
      throw new Error('Unauthorized to delete this budget');
    }

    await budget.deleteOne();
    return { message: 'Budget deleted successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getBudgets(user) {
  try {
    const budgets = await BudgetModel.find({ createdBy: user._id }).populate( 'expenses', 'amount description name');
    return budgets;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getBudgetById(budgetId, user) {
  try {
    const budget = await BudgetModel.findOne({
      _id: budgetId,
      createdBy: user._id,
    }).populate('expenses', 'amount description name');

    if (!budget) {
      throw new Error('Budget not found');
    }

    return budget;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgets,
  getBudgetById
};
