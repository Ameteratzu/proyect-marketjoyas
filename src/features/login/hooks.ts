import { useState } from "react";

// Importamos funciones que hacen llamadas al backend (login, logout, register)
import { login, logout, register } from "./services";

// Importamos los tipos TypeScript que definimos en types.ts
import type { LoginCredentials, RegisterData, User } from "./types";

//Hook principal de autenticación
export function useAuth() {
  // Estado con la información del usuario autenticado (o null si no está logueado)
  const [user, setUser] = useState<User | null>(null);

  // Estado para saber si hay una petición en proceso (loading spinner, deshabilitar botones, etc.)
  const [loading, setLoading] = useState(false);

  // Estado para mostrar errores si algo falla
  const [error, setError] = useState<string | null>(null);

  // 📌 LOGIN
  async function handleLogin(credentials: LoginCredentials) {
    setLoading(true); // activa loading
    setError(null);   // limpia errores previos
    try {
      // Llama al backend con email y password
      const loggedUser = await login(credentials);

      // Si responde OK, guardamos el usuario en el estado
      setUser(loggedUser);

      // Persistimos en localStorage para mantener sesión al refrescar
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (err: any) {
      // Si hay error, lo mostramos
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false); // siempre desactiva loading al terminar
    }
  }

  // 📌 REGISTER
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

  // 📌 LOGOUT
  async function handleLogout() {
    await logout(); // avisa al backend si es necesario
    setUser(null);  // limpia usuario
    localStorage.removeItem("user"); // elimina sesión guardada
  }

  // Retornamos todo lo que necesitamos en formularios y componentes
  return { user, loading, error, handleLogin, handleRegister, handleLogout };
}
