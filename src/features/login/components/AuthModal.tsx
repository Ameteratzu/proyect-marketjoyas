import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordModal from "./ResetPasswordModal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: Props) {
  const { t } = useTranslation("login");
  const [tab, setTab] = useState<"login" | "register" | "reset">("login");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open && !isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md relative p-6 transform transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={t("common:close")}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {tab !== "reset" && (
          <div className="flex border-b mb-6">
            <button
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                tab === "login" 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setTab("login")}
            >
              {t("login.title")}
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                tab === "register" 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setTab("register")}
            >
              {t("register.title")}
            </button>
          </div>
        )}

        <div className="min-h-[300px]">
          {tab === "login" && <LoginForm onForgot={() => setTab("reset")} />}
          {tab === "register" && <RegisterForm />}
          {tab === "reset" && <ResetPasswordModal onBack={() => setTab("login")} />}
        </div>
      </div>
    </div>
  );
}