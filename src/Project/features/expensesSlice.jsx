import { createSlice } from '@reduxjs/toolkit';

// 1. Predefined JSON Array (Mock Data)
const initialState = {
  transactions: [
    { id: 1, title: 'Grocery Run', amount: 45.50, category: 'Food', date: '2023-10-25' },
    { id: 2, title: 'Uber to Work', amount: 15.00, category: 'Transport', date: '2023-10-26' },
    { id: 3, title: 'Gym Membership', amount: 30.00, category: 'Health', date: '2023-10-01' },
    { id: 4, title: 'Netflix', amount: 12.00, category: 'Entertainment', date: '2023-10-15' },
    { id: 5, title: 'Pharmacy', amount: 25.00, category: 'Health', date: '2023-10-27' },
  ],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTransaction, deleteTransaction } = expensesSlice.actions;
export default expensesSlice.reducer;