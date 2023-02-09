import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth.js";

export const editor = configureStore({
  reducer: {
    auth: authReducer
  },
});
