// src/common/api/auth.api.ts

import axios from "axios";
import type { LoginCredentials, User, RegisterData } from "./types/auth.types";
import { AUTH_URL } from "../constants/urls";

export async function login(credentials: LoginCredentials): Promise<User> {
  const { data } = await axios.post<User>(`${AUTH_URL}/login`, credentials);
  return data;
}

// Servicio para registrarse
export async function register(credentials: RegisterData): Promise<User> {
  const { data } = await axios.post<User>(`${AUTH_URL}/register`, credentials);
  return data;
}
