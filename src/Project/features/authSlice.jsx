import { createSlice } from '@reduxjs/toolkit';

// Predefined Mock Users
const initialState = {
  user: null, // Currently logged in user
  isAuthenticated: false,
  usersList: [
    { email: 'admin@royal.com', password: '123', name: 'Admin User' },
    { email: 'oussama@test.com', password: '123', name: 'Tkitak Oussama' }
  ],
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const foundUser = state.usersList.find(
        u => u.email === email && u.password === password
      );

      if (foundUser) {
        state.user = foundUser;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = "Invalid email or password";
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    register: (state, action) => {
      // Check if email already exists
      const exists = state.usersList.find(u => u.email === action.payload.email);
      if (exists) {
        state.error = "User already exists!";
      } else {
        state.usersList.push(action.payload);
        state.error = null;
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { login, logout, register, clearError } = authSlice.actions;
export default authSlice.reducer;