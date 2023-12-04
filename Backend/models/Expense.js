const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    budget: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Budget',
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    modifiedAt: {
        type: Date,
        required: true,
    },
    }, { timestamps: true });

const ExpenseModel = mongoose.model('Expense', expenseSchema);

module.exports = ExpenseModel;