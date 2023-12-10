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

async function getBudgetsPieChart(user) {
  try {
    const budgets = await BudgetModel.find({ createdBy: user._id }).populate('expenses', 'amount description name date');
    const currentMonthExpenses = [];
    budgets.forEach((budget) => {
      let currentMonthExpense = budget.expenses.filter((expense) => {
        console.log(expense.date.getFullYear(), new Date().getMonth());
        return expense.date.getFullYear()=== new Date().getFullYear();
      }).map((expense) => {
        return {  title: expense.name, amount: expense.amount , month: expense.date.getMonth() };
      });
      currentMonthExpenses.push(...currentMonthExpense);
    });

    return currentMonthExpenses;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
async function getBudgetsBarChart(user){
  try {
    const budgets = await BudgetModel.find({ createdBy: user._id }).populate('expenses', 'amount description name date');

    const data = [];

    budgets.forEach((budget) => {
      let currentMonthExpense = budget.expenses.filter((expense) => {
        return expense.date.getMonth() === new Date().getMonth();
      });
      const totalExpenseAmount = currentMonthExpense.reduce((acc, expense) => acc + expense.amount, 0);
      data.push({ title: budget.title, amount: totalExpenseAmount, budget: budget.amount });
    });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgets,
  getBudgetById,
  getBudgetsPieChart,
  getBudgetsBarChart,
};
