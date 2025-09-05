// src/features/Login/hooks.ts
import { useState } from "react";
import { login, logout, register } from "./services";
import type { LoginCredentials, RegisterData, User } from "./types";


export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(credentials: LoginCredentials ) {
    setLoading(true);
    setError(null);
    try {
      const loggedUser = await login(credentials);
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(data: RegisterData) {
    setLoading(true);
    setError(null);
    try {
      const newUser = await register(data);
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await logout();
    setUser(null);
    localStorage.removeItem("user");
  }

  return { user, loading, error, handleLogin, handleRegister, handleLogout };
}
