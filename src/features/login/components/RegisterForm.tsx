// Importamos hooks necesarios
import { useState } from "react";
import { useAuth } from "../hooks"; // Hook de autenticación (login/register)
import {
  validateDNI,
  validateEmail,
  validatePassword,
  validatePhone,
} from "../validations";

// Componente de formulario de registro
export default function RegisterForm() {
  // Hook de autenticación: maneja errores, loading y llamada al backend
  const { handleRegister, loading, error } = useAuth();

  // Estado del formulario con todos los campos
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    documentType: "",
    phone: "",
    password: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  // Actualiza el estado dinámicamente al cambiar cada input
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Función que se dispara al enviar el formulario
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); // Evita que la página se recargue
    // Validaciones antes de enviar
    const emailError = validateEmail(form.email);
    if (emailError) return setValidationError(emailError);

    const dniError = validateDNI(form.documentType);
    if (dniError) return setValidationError(dniError);

    const phoneError = validatePhone(form.phone);
    if (phoneError) return setValidationError(phoneError);

    const passError = validatePassword(form.password);
    if (passError) return setValidationError(passError);

    setValidationError(null);
    await handleRegister(form); // Llama al backend con todos los datos
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Error global en rojo si el backend devuelve fallo */}
      {(error || validationError) && (
        <p className="text-red-500 text-base">{error || validationError}</p>
      )}

      {/* Campo: Correo */}
      <div>
        <label
          htmlFor="email"
          className="block text-base font-medium text-gray-700"
        >
          Correo
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Ingresa un correo válido"
          value={form.email}
          onChange={handleChange}
          className="input-base"
        />
      </div>

      {/* Campo: Nombre completo */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-base font-medium text-gray-700"
        >
          Nombre y apellido
        </label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Ingresa nombres y apellidos"
          value={form.fullName}
          onChange={handleChange}
          className="input-base"
        />
      </div>

      {/* Campo: Documento */}
      <div>
        <label
          htmlFor="documentType"
          className="block text-base font-medium text-gray-700"
        >
          Tipo de documento
        </label>
        <input
          id="documentType"
          type="text"
          name="documentType"
          placeholder="ingresa un DNI"
          value={form.documentType}
          onChange={handleChange}
          className="input-base"
        />
      </div>

      {/* Campo: Celular */}
      <div>
        <label
          htmlFor="phone"
          className="block text-base font-medium text-gray-700"
        >
          Celular
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="Ingresa un celular"
          value={form.phone}
          onChange={handleChange}
          className="input-base"
        />
      </div>

      {/* Campo: Contraseña */}
      <div>
        <label
          htmlFor="password"
          className="block text-base font-medium text-gray-700 "
        >
          Contraseña
        </label>

        <ul className="mt-1 text-xs text-gray-500 list-disc list-inside columns-3">
          <li>Min. 6 caracteres</li>
          <li>1 número</li>
          <li>1 mayúscula</li>
          <li>1 minúscula</li>
          <li>sin espacio</li>
          <li>1 carácter especial</li>
        </ul>

        <input
          id="password"
          type="password"
          name="password"
          placeholder="Ingrese una contraseña"
          value={form.password}
          onChange={handleChange}
          className="input-base"
        />
      </div>

      {/* ckecbox*/}
      <div>
        <input 
        id="remember" 
        type="checkbox" 
        name="remember" />
        <label htmlFor="remember">Aceptas los términos de condiciones y servicios</label>
      </div>
      

      {/* Botón de registrar */}
      <button type="submit" disabled={loading} className="w-full btn-primary">
        {loading ? "Registrando..." : "Registrarte"}
      </button>
    </form>
  );
}
