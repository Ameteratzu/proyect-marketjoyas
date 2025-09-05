// src/features/Login/components/ResetPasswordModal.tsx
import { useState } from "react";

type Props = {
  onBack: () => void; // Nueva prop para volver al login
};

export default function ResetPasswordModal({ onBack }: Props) {
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Enviar link de recuperación a:", email);
    // Aquí llamarías al servicio de recuperación de contraseña
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="resetEmail" className="block text-base font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            id="resetEmail"
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-base"
          />
        </div>

        <button type="submit" className="w-full btn-primary">
          Enviar enlace de recuperación
        </button>

        <button
          type="button"
          onClick={onBack} // <- se usa la prop aquí
          className="w-full mt-2 text-sm text-gray-600 hover:underline"
        >
          ← Volver al login
        </button>
      </form>
    </div>
  );
}
