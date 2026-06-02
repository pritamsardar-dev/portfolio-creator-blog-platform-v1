import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Sets auth status and stores user data on login
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },

    // Clears auth status and user data on logout
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
