// src/features/Login/components/LoginForm.tsx
import { useState } from "react";
import { useAuth } from "../hooks";

type Props = {
  onForgot: () => void; // Nueva prop para redirigir a Reset Password
};

export default function LoginForm({ onForgot }: Props) {
  const { handleLogin, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await handleLogin({ email, password });
    if (remember) {
      localStorage.setItem("rememberEmail", email);
    } else {
      localStorage.removeItem("rememberEmail");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && <p className="text-red-500 text-base">{error}</p>}

      {/* Correo */}
      <div>
        <label htmlFor="email" className="block text-base font-medium">
          Correo
        </label>
        <input
          id="email"
          type="email"
          placeholder="Ingresa un correo válido"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-base"
        />
      </div>

      {/* Contraseña */}
      <div>
        <label htmlFor="password" className="block text-base font-medium text-gray-700">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-base"
        />
      </div>

      {/* Recuérdame + Olvidaste tu contraseña */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
            Recuérdame
          </label>
        </div>

        <button
          type="button"
          onClick={onForgot} // <- se usa la prop aquí
          className="text-sm text-primary hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      {/* Botón de ingresar */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary"
      >
        {loading ? "Cargando..." : "Iniciar Sesión"}
      </button>
    </form>
  );
}
