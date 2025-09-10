import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { validateEmail } from "../validations";

type Props = {
  onBack: () => void;
};

export default function ResetPasswordModal({ onBack }: Props) {
  const { t } = useTranslation("login");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setError(t(`errors.${emailError === "El correo es obligatorio" ? "emailRequired" : "emailInvalid"}`));
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Aquí iría la llamada real al servicio
      console.log("Enviar link de recuperación a:", email);
      
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
    } catch (err: any) {
      setError(t("errors.resetError"));
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-medium text-gray-900">{t("resetPassword.successTitle")}</h2>
        <p className="mt-2 text-sm text-gray-600">
          <Trans 
            i18nKey="login:resetPassword.successMessage" 
            values={{ email }}
            components={{ 1: <strong /> }}
          />
        </p>
        <button
          onClick={onBack}
          className="mt-6 w-full btn-primary"
        >
          {t("resetPassword.backToLogin")}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t("resetPassword.title")}</h2>
      <p className="text-sm text-gray-600 mb-6">
        {t("resetPassword.instruction")}
      </p>

      <form onSubmit={onSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="resetEmail" className="block text-base font-medium text-gray-700">
            {t("resetPassword.email")}
          </label>
          <input
            id="resetEmail"
            type="email"
            placeholder={t("resetPassword.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-base"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t("resetPassword.loading") : t("resetPassword.submit")}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full mt-2 text-sm text-gray-600 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 py-2"
        >
          ← {t("resetPassword.backToLogin")}
        </button>
      </form>
    </div>
  );
}