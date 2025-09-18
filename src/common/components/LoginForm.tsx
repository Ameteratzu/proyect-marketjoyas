// src/common/components/LoginForm.tsx

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLogin } from "../hooks/useLogin";
import type { User } from "../api/types/auth.types";

type Props = {
  onForgot: () => void;
  onSuccess: (user: User) => void;
};

export default function LoginForm({ onForgot, onSuccess }: Props) {
  const { t } = useTranslation("login");
  const { handleLogin, loading, formErrors, apiError } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // Cargar email recordado
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRemember(true);
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleLogin({ email, password });
    
    if (!success) return;

    if (remember) {
      localStorage.setItem("rememberEmail", email);
    } else {
      localStorage.removeItem("rememberEmail");
    }

    // Llamar callback de login exitoso
    onSuccess(success);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {apiError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-base">{apiError}</p>
        </div>
      )}

      <div>
        <label htmlFor="email">{t("login.email")}</label>
        <input
          id="email"
          type="email"
          placeholder="Enter a valid email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`input-base ${formErrors.email ? "border-red-500" : ""}`}
        />
        {formErrors.email && <p className="text-red-600">{formErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">{t("login.password")}</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`input-base ${formErrors.password ? "border-red-500" : ""}`}
        />
        {formErrors.password && <p className="text-red-600">{formErrors.password}</p>}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember" className="ml-2">{t("login.remember")}</label>
        </div>

        <button type="button" onClick={onForgot}>{t("login.forgotPassword")}</button>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? t("login.loading") : t("login.submit")}
      </button>
    </form>
  );
}
