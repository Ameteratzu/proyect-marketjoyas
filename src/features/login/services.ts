// Importamos axios para hacer peticiones HTTP
// Importamos los tipos definidos en ./types para que las funciones estén tipadas
import axios from "axios";
import type { LoginCredentials, RegisterData, User } from "./types";


// URL base de la API
const API_URL = import.meta.env.VITE_API_URL+"/auth";

// Servicio para iniciar sesión
export async function login(credentials: LoginCredentials): Promise<User> {
  const { data } = await axios.post<User>(`${API_URL}/login`, credentials);
  return data;
}

// Servicio para registrarse
export async function register(payload: RegisterData): Promise<User> {
  const { data } = await axios.post<User>(`${API_URL}/register`, payload);
  return data;
}

// Servicio para cerrar sesión

export async function logout(): Promise<void> {
  await axios.post(`${API_URL}/logout`);
}


// Servio para consultar ID 

export async function checkUsernameUnique(username: string): Promise<boolean> {
  const { data } = await axios.post<{ unique: boolean }>(
    `${API_URL}/check-username`,
    { username }
  );
  return data.unique;
}