// src/features/Login/components/AuthModal.tsx
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: Props) {
  const [tab, setTab] = useState<"login" | "register">("login");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <div className="flex border-b mb-4">
          <button
            className={`flex-1 py-2 text-center ${
              tab === "login" ? "border-b-2 border-primary font-semibold" : ""
            }`}
            onClick={() => setTab("login")}
          >
            Ingresar
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              tab === "register" ? "border-b-2 border-primary font-semibold" : ""
            }`}
            onClick={() => setTab("register")}
          >
            Registrarse
          </button>
        </div>

        {tab === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
