import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../api/types/auth.types";

interface UserState {
  user: User | null; // tipo exacto de la API
  token: string | null;
}

// Cargar usuario desde localStorage si existe
const savedUser = typeof window !== "undefined" 
  ? JSON.parse(localStorage.getItem("user") || "null")
  : null;

const initialState: UserState = {
  user: savedUser,
  token: savedUser?.access_token || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { payload: User }) => {
      state.user = action.payload;
      state.token = action.payload.access_token;
      // Guardar también en localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
