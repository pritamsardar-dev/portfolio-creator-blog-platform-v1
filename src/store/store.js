import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../store/authSlice";

// Redux store with auth slice
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
