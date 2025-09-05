// src/features/Login/components/LoginForm.tsx
import { useState } from "react";
import { useAuth } from "../hooks";

export default function LoginForm() {
  const { handleLogin, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await handleLogin({ email, password });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && <p className="text-red-500 text-base">{error}</p>}

      {/* Campo Correo */}
      <div>
        <label
          htmlFor="email"
          className="block text-base font-medium"
        >
          Correo
        </label>
        <input
          id="email"
          type="email"
          placeholder="Ingresa un correo de contraseña válido"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border-0 border-b border-gray-400 focus:border-primary focus:ring-0 placeholder:text-gray-400"
        />
      </div>

      {/* Campo Contraseña */}
      <div>
        <label
          htmlFor="password"
          className="block text-base font-medium text-gray-700"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border-0 border-b border-gray-400 focus:border-primary focus:ring-0 placeholder:text-gray-400"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/80 transition-colors disabled:opacity-50"
      >
        {loading ? "Cargando..." : "Ingresar"}
      </button>
    </form>
  );
}
