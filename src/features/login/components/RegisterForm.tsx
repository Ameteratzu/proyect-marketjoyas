// src/features/Login/components/RegisterForm.tsx
import { useState } from "react";
import { useAuth } from "../hooks";

export default function RegisterForm() {
  const { handleRegister, loading, error } = useAuth();
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    documentType: "",
    phone: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await handleRegister(form);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && <p className="text-red-500 text-base">{error}</p>}

      {/* Correo */}
      <div>
        <label htmlFor="email" className="block text-base font-medium text-gray-700">
          Correo
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Ingresa un correo válido"
          value={form.email}
          onChange={handleChange}
          className="mt-1 block w-full border-0 border-b border-gray-400 focus:border-primary focus:ring-0 placeholder:text-gray-400"
        />
      </div>

      {/* Nombre */}
      <div>
        <label htmlFor="fullName" className="block text-base font-medium text-gray-700">
          Nombre y apellido
        </label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Ingresa tu nombre completo"
          value={form.fullName}
          onChange={handleChange}
          className="mt-1 block w-full border-0 border-b border-gray-400 focus:border-primary focus:ring-0 placeholder:text-gray-400"
        />
      </div>

      {/* Documento */}
      <div>
        <label htmlFor="documentType" className="block text-base font-medium text-gray-700">
          Tipo de documento
        </label>
        <input
          id="documentType"
          type="text"
          name="documentType"
          placeholder="DNI, Pasaporte, etc."
          value={form.documentType}
          onChange={handleChange}
          className="mt-1 block w-full border-0 border-b border-gray-400 focus:border-primary focus:ring-0 placeholder:text-gray-400"
        />
      </div>

      {/* Celular */}
      <div>
        <label htmlFor="phone" className="block text-base font-medium text-gray-700">
          Celular
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="Ingresa tu número"
          value={form.phone}
          onChange={handleChange}
          className="mt-1 block w-full border-0 border-b border-gray-400 focus:border-primary focus:ring-0 placeholder:text-gray-400"
        />
      </div>

      {/* Contraseña */}
      <div>
        <label htmlFor="password" className="block text-base font-medium text-gray-700">
          Contraseña
        </label>
        <p className="mt-1 text-xs text-gray-500">
          Debe incluir al menos: 6 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial.
        </p>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Mín. 6 caracteres, 1 mayúscula, 1 número"
          value={form.password}
          onChange={handleChange}
          className="mt-1 block w-full border-0 border-b border-gray-400 focus:border-primary focus:ring-0 placeholder:text-gray-400"
        />
        
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/80 transition-colors disabled:opacity-50"
      >
        {loading ? "Registrando..." : "Registrarte"}
      </button>
    </form>
  );
}
