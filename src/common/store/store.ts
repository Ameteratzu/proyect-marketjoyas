import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Tipos para usar en hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
