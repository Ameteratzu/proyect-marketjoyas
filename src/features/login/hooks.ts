import { useState, useEffect } from "react";
import { login, logout, register } from "./services";
import type { LoginCredentials, RegisterData, User } from "./types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Error parsing saved user:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  async function handleLogin(credentials: LoginCredentials) {
    setLoading(true);
    setError(null);
    try {
      const loggedUser = await login(credentials);
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      return true; // Éxito
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Error al iniciar sesión";
      setError(errorMessage);
      return false; // Fallo
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
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Error al registrarse";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("rememberEmail");
    }
  }

  return { user, loading, error, handleLogin, handleRegister, handleLogout };
}