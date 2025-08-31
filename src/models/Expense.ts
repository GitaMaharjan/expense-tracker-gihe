import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'],
    default: 'Other',
  },
  date: {
    type: Date,
    default: Date.now, // date of expense
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // link expense to a user
    required: true,
  }
});

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
