// src/features/Login/components/AuthModal.tsx
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordModal from "./ResetPasswordModal"; // Nombre correcto

type Props = {
  open: boolean;       // Controla si el modal se muestra o no
  onClose: () => void; // Función que se ejecuta al cerrar el modal
};

export default function AuthModal({ open, onClose }: Props) {
  // Estado para manejar la vista activa: "login", "register" o "reset"
  const [tab, setTab] = useState<"login" | "register" | "reset">("login");

  // Si el modal no está abierto, no renderizamos nada
  if (!open) return null;

  return (
    // Fondo semitransparente que ocupa toda la pantalla
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      {/* Caja blanca del modal */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative p-6">
        
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Ocultamos pestañas si estamos en reset */}
        {tab !== "reset" && (
          <div className="flex border-b mb-4">
            {/* Botón pestaña Ingresar */}
            <button
              className={`flex-1 py-2 text-center ${
                tab === "login" ? "border-b-2 border-primary font-semibold" : ""
              }`}
              onClick={() => setTab("login")}
            >
              Ingresar
            </button>

            {/* Botón pestaña Registrarse */}
            <button
              className={`flex-1 py-2 text-center ${
                tab === "register"
                  ? "border-b-2 border-primary font-semibold"
                  : ""
              }`}
              onClick={() => setTab("register")}
            >
              Registrarse
            </button>
          </div>
        )}

        {/* Render dinámico */}
        {tab === "login" && <LoginForm onForgot={() => setTab("reset")} />}
        {tab === "register" && <RegisterForm />}
        {tab === "reset" && <ResetPasswordModal onBack={() => setTab("login")} />}
      </div>
    </div>
  );
}
