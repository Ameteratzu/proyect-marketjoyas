// src/common/hooks/useLogin.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginApi } from "../api/auth.api";
import { setUser } from "../store/user.slice";
import { validateEmail } from "../validation/validations";
import type { LoginCredentials, User } from "../api/types/auth.types";

export function useLogin() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleLogin = async (credentials: LoginCredentials): Promise<User | null> => {
    // Validaciones locales
    const emailError = validateEmail(credentials.email);
    const passwordError = !credentials.password ? "Password requerido" : null;

    if (emailError || passwordError) {
      setFormErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      });
      return null;
    }

    setFormErrors({});
    setLoading(true);
    setApiError(null);

    try {
      // Llamada a la API
      const response: User = await loginApi(credentials);

      // Guardar en Redux
      dispatch(setUser(response));

      // Guardar en localStorage
      localStorage.setItem("user", JSON.stringify(response));

      // Retornar el User tal como lo devuelve la API
      return response;
    } catch (err: any) {
      // Manejo detallado de errores
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setApiError("Solicitud incorrecta");
            break;
          case 401:
            setApiError("Email o contraseña incorrectos");
            break;
          case 403:
            setApiError("No tienes permisos");
            break;
          case 404:
            setApiError("Recurso no encontrado");
            break;
          case 500:
            setApiError("Error interno del servidor");
            break;
          default:
            setApiError("Error desconocido");
        }
      } else if (err.request) {
        setApiError("No se pudo conectar con el servidor");
      } else {
        setApiError("Error inesperado");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, formErrors, apiError };
}
