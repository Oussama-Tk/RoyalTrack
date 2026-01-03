import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transfers: [
    { id: 1, to: 'Alice Smith', amount: 120.00, date: '2023-11-01', status: 'Completed' },
    { id: 2, to: 'Savings Account', amount: 500.00, date: '2023-11-05', status: 'Completed' },
  ],
};

const transfersSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {
    addTransfer: (state, action) => {
      state.transfers.push({ 
        id: Date.now(), 
        ...action.payload, 
        date: new Date().toISOString().split('T')[0],
        status: 'Completed' 
      });
    },
  },
});

export const { addTransfer } = transfersSlice.actions;
export default transfersSlice.reducer;