import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks";
import { validateEmail } from "../validations";

type Props = {
  onForgot: () => void;
};

export default function LoginForm({ onForgot }: Props) {
  const { t } = useTranslation("login");
  const { handleLogin, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [remember, setRemember] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRemember(true);
    }
  }, []);

  useEffect(() => {
    const errors: {[key: string]: string} = {};
    
    if (touched.email) {
      const emailError = validateEmail(formData.email);
      if (emailError) errors.email = t(`errors.${emailError === "El correo es obligatorio" ? "emailRequired" : "emailInvalid"}`);
    }
    
    if (touched.password && !formData.password) {
      errors.password = t("errors.passwordRequired");
    }
    
    setValidationErrors(errors);
  }, [formData, touched, t]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const errors = {
      email: validateEmail(formData.email),
      password: formData.password ? null : "passwordRequired"
    };
    
    const hasErrors = Object.values(errors).some(error => error !== null);
    if (hasErrors) {
      setValidationErrors({
        email: errors.email ? t(`errors.${errors.email === "El correo es obligatorio" ? "emailRequired" : "emailInvalid"}`) : "",
        password: errors.password ? t(`errors.${errors.password}`) : ""
      });
      setTouched({ email: true, password: true });
      return;
    }
    
    const success = await handleLogin(formData);
    
    if (success && remember) {
      localStorage.setItem("rememberEmail", formData.email);
    } else if (!remember) {
      localStorage.removeItem("rememberEmail");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {(error || validationErrors.general) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-base">{error || validationErrors.general}</p>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-base font-medium text-gray-700">
          {t("login.email")}
        </label>
        <input
          id="email"
          type="email"
          placeholder={t("login.emailPlaceholder")}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onBlur={() => handleBlur("email")}
          className={`input-base ${validationErrors.email ? 'border-red-500' : ''}`}
          aria-invalid={!!validationErrors.email}
          aria-describedby={validationErrors.email ? "email-error" : undefined}
        />
        {validationErrors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-base font-medium text-gray-700">
          {t("login.password")}
        </label>
        <input
          id="password"
          type="password"
          placeholder={t("login.passwordPlaceholder")}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          onBlur={() => handleBlur("password")}
          className={`input-base ${validationErrors.password ? 'border-red-500' : ''}`}
          aria-invalid={!!validationErrors.password}
          aria-describedby={validationErrors.password ? "password-error" : undefined}
        />
        {validationErrors.password && (
          <p id="password-error" className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
        )}
      </div>

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
            {t("login.remember")}
          </label>
        </div>

        <button
          type="button"
          onClick={onForgot}
          className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {t("login.forgotPassword")}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || Object.keys(validationErrors).length > 0}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            {t("login.loading")}
          </div>
        ) : (
          t("login.submit")
        )}
      </button>
    </form>
  );
}