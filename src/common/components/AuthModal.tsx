// src/common/components/AuthModal.tsx

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import WelcomeModal from "./WelcomeModal";
import ResetPasswordModal from "./ResetPasswordModal";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Tab = "login" | "register" | "reset";

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      className={`flex-1 py-3 text-center font-medium transition-colors ${active ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"
        }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

export default function AuthModal({ open, onClose }: Props) {
  const { t } = useTranslation("login");
  const [tab, setTab] = useState<Tab>("login");
  const [isVisible, setIsVisible] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Obtener nombre del usuario logeado desde Redux
  const user = useSelector((state: RootState) => state.user.user);

  // Animación de apertura/cierre
  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Cerrar modal con tecla Esc
  useEffect(() => {
    const handleKey = (e: KeyboardEvent | KeyboardEventInit) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey as any);
    return () => window.removeEventListener("keydown", handleKey as any);
  }, [open, onClose]);

  if (!open && !isVisible) return null;

  // Función para login exitoso
  const handleLoginSuccess = () => {
    setShowWelcome(true); // abrir modal de bienvenida primero

  
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <div
          className={`bg-white rounded-xl shadow-lg w-full max-w-md relative p-6 transform transition-transform duration-300 ${isVisible ? "scale-100" : "scale-95"
            }`}
        >
          {/* Botón de cierre */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={t("common:close")}
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Tabs */}
          {tab !== "reset" && (
            <div className="flex border-b mb-6">
              <TabButton label={t("login.title")} active={tab === "login"} onClick={() => setTab("login")} />
              <TabButton label={t("register.title")} active={tab === "register"} onClick={() => setTab("register")} />
            </div>
          )}

          {/* Contenido según tab */}
          <div className="min-h-[300px]">
            {tab === "login" && <LoginForm onForgot={() => setTab("reset")} onSuccess={handleLoginSuccess} />}
            {tab === "register" && <RegisterForm />}
            {tab === "reset" && <ResetPasswordModal onBack={() => setTab("login")} />}
          </div>
        </div>
      </div>

      <WelcomeModal
  open={showWelcome}
  onClose={() => {
    setShowWelcome(false); // cerrar modal de bienvenida
    onClose();             // cerrar AuthModal
  }}
  fullName={user?.user.fullName || ""}
/>

    </>
  );
}
