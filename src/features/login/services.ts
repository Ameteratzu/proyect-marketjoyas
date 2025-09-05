// src/features/Login/services.ts
import axios from "axios";
import type { LoginCredentials, RegisterData, User } from "./types";


const API_URL = "";

export async function login(credentials: LoginCredentials): Promise<User> {
  const { data } = await axios.post<User>(`${API_URL}/login`, credentials);
  return data;
}

export async function register(payload: RegisterData): Promise<User> {
  const { data } = await axios.post<User>(`${API_URL}/register`, payload);
  return data;
}

export async function logout(): Promise<void> {
  await axios.post(`${API_URL}/logout`);
}
