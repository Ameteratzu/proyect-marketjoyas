import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useAuth } from "../hooks";
import {validateDNI, validateEmail, validatePassword, validatePhone,} from "../validations";

export default function RegisterForm() {
  const { t } = useTranslation("login");
  const { handleRegister, loading, error } = useAuth();
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    documentType: "",
    phone: "",
    password: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const errors: {[key: string]: string} = {};
    
    if (touched.email) {
      const emailError = validateEmail(form.email);
      if (emailError) errors.email = t(`errors.${emailError}`);
    }
    
    if (touched.fullName && !form.fullName) {
      errors.fullName = t("errors.fullNameRequired");
    }
    
    if (touched.documentType) {
      const dniError = validateDNI(form.documentType);
      if (dniError) errors.documentType = t(`errors.${dniError}`);
    }
    
    if (touched.phone) {
      const phoneError = validatePhone(form.phone);
      if (phoneError) errors.phone = t(`errors.${phoneError}`);
    }
    
    if (touched.password) {
      const passError = validatePassword(form.password);
      if (passError) errors.password = t(`errors.${passError}`);
    }
    
    if (touched.agreeToTerms && !agreeToTerms) {
      errors.agreeToTerms = t("errors.termsRequired");
    }
    
    setValidationErrors(errors);
  }, [form, agreeToTerms, touched, t]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setAgreeToTerms(checked);
      setTouched(prev => ({ ...prev, agreeToTerms: true }));
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const errors = {
      email: validateEmail(form.email),
      fullName: form.fullName ? null : "fullNameRequired",
      documentType: validateDNI(form.documentType),
      phone: validatePhone(form.phone),
      password: validatePassword(form.password),
      agreeToTerms: agreeToTerms ? null : "termsRequired"
    };
    
    const hasErrors = Object.values(errors).some(error => error !== null);
    if (hasErrors) {
      const errorMessages: {[key: string]: string} = {};
      
      Object.entries(errors).forEach(([key, value]) => {
        if (value) errorMessages[key] = t(`errors.${value}`);
      });
      
      setValidationErrors(errorMessages);
      setTouched({
        email: true, 
        fullName: true, 
        documentType: true, 
        phone: true, 
        password: true,
        agreeToTerms: true
      });
      return;
    }
    
    await handleRegister(form);
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2 -mr-2">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-base">{error}</p>
          </div>
        )}

        {/* Campos en grid de 2 columnas para pantallas grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t("register.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={t("register.emailPlaceholder")}
              value={form.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              className={`input-base ${validationErrors.email ? 'border-red-500' : ''}`}
              aria-invalid={!!validationErrors.email}
            />
            {validationErrors.email && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.email}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              {t("register.fullName")}
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder={t("register.fullNamePlaceholder")}
              value={form.fullName}
              onChange={handleChange}
              onBlur={() => handleBlur("fullName")}
              className={`input-base ${validationErrors.fullName ? 'border-red-500' : ''}`}
              aria-invalid={!!validationErrors.fullName}
            />
            {validationErrors.fullName && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-1">
              {t("register.dni")}
            </label>
            <input
              id="documentType"
              name="documentType"
              type="text"
              placeholder={t("register.dniPlaceholder")}
              value={form.documentType}
              onChange={handleChange}
              onBlur={() => handleBlur("documentType")}
              className={`input-base ${validationErrors.documentType ? 'border-red-500' : ''}`}
              aria-invalid={!!validationErrors.documentType}
            />
            {validationErrors.documentType && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.documentType}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t("register.phone")}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder={t("register.phonePlaceholder")}
              value={form.phone}
              onChange={handleChange}
              onBlur={() => handleBlur("phone")}
              className={`input-base ${validationErrors.phone ? 'border-red-500' : ''}`}
              aria-invalid={!!validationErrors.phone}
            />
            {validationErrors.phone && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.phone}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t("register.password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder={t("register.passwordPlaceholder")}
              value={form.password}
              onChange={handleChange}
              onBlur={() => handleBlur("password")}
              className={`input-base ${validationErrors.password ? 'border-red-500' : ''}`}
              aria-invalid={!!validationErrors.password}
            />
            {validationErrors.password && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.password}</p>
            )}
          </div>
        </div>

        {/* Información de contraseña - Solo se muestra cuando el campo está enfocado o tiene error */}
        {(touched.password || validationErrors.password) && (
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className="text-xs font-medium text-blue-800 mb-1">{t("register.passwordRequirements")}</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                {t("register.passwordReq1")}
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                {t("register.passwordReq2")}
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                {t("register.passwordReq3")}
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                {t("register.passwordReq4")}
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                {t("register.passwordReq5")}
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                {t("register.passwordReq6")}
              </li>
            </ul>
          </div>
        )}

        {/* Checkbox términos y condiciones */}
        <div className="flex items-start pt-2">
          <div className="flex items-center h-5 mt-0.5">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={handleChange}
              onBlur={() => handleBlur("agreeToTerms")}
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              aria-invalid={!!validationErrors.agreeToTerms}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToTerms" className="text-gray-600">
              <Trans 
                i18nKey="login:register.agreeToTerms"
                components={{
                  1: <a href="#" className="text-primary hover:underline" />,
                  2: <a href="#" className="text-primary hover:underline" />
                }}
              />
            </label>
            {validationErrors.agreeToTerms && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.agreeToTerms}</p>
            )}
          </div>
        </div>

        {/* Botón de registro */}
        <div className="pt-2">
          <button 
            type="submit" 
            disabled={loading || Object.keys(validationErrors).length > 0}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-2.5"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t("register.loading")}
              </div>
            ) : (
              t("register.submit")
            )}
          </button>
        </div>
      </form>
    </div>
  );
}