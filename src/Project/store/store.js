import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from '../features/expensesSlice';
import authReducer from '../features/authSlice';
import todoReducer from '../features/todoSlice';     
import transfersReducer from '../features/transfersSlice'; 

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    auth: authReducer,
    todos: todoReducer,       
    transfers: transfersReducer, 
  },
});