// src/common/hooks/useRegister.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../api/auth.api"; // tu endpoint de registro
import { setUser } from "../store/user.slice";
import {
  validateEmail,
  validatePassword,
  validateFullName,
  validatePhone,
  validateDNI
} from "../validation/validations";
import type { RegisterData, User } from "../api/types/auth.types";

export function useRegister() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
    fullName?: string;
    phone?: string;
    documentType?: string;
  }>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleRegister = async (data: RegisterData) => {
    // Validaciones locales
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);
    const fullNameError = validateFullName(data.fullName);
    const phoneError = validatePhone(data.phone);
    const dniError = validateDNI(data.documentType)

    if (emailError || passwordError || fullNameError || phoneError || dniError) {
      setFormErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
        fullName: fullNameError || undefined,
        phone: phoneError || undefined,
        documentType: dniError || undefined,
      });
      return null;
    }

    setFormErrors({});
    setLoading(true);
    setApiError(null);

    try {
      // Llamada a la API
      const user: User = await register(data);

      // Guardar en Redux
      dispatch(setUser(user));

      // Guardar en localStorage
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (err: any) {
      // Manejo detallado de errores HTTP
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setApiError("Solicitud incorrecta");
            break;
          case 401:
            setApiError("No autorizado");
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

  return { handleRegister, loading, formErrors, apiError };
}
