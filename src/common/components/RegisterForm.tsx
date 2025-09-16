import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useRegister } from "../hooks/useRegister";
import { validateDNI, validateEmail, validatePassword, validatePhone, validateFullName } from "../validation/validations";

export default function RegisterForm() {
  const { t } = useTranslation("login");
  const { handleRegister, loading, apiError } = useRegister();

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    documentType: "",
    phone: "",
    password: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, form[field as keyof typeof form]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setAgreeToTerms(checked);
      setTouched((prev) => ({ ...prev, agreeToTerms: true }));
      if (!checked) {
        setValidationErrors((prev) => ({ ...prev, agreeToTerms: t("errors.termsRequired") }));
      } else {
        setValidationErrors((prev) => {
          const { agreeToTerms, ...rest } = prev;
          return rest;
        });
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (touched[name]) validateField(name, value);
    }
  };

  const validateField = (field: string, value: string) => {
    let error: string | null = null;

    switch (field) {
      case "email":
        error = validateEmail(value);
        break;
      case "fullName":
        error = validateFullName(value);
        break;
      case "documentType":
        error = validateDNI(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      default:
        break;
    }

    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      if (error) newErrors[field] = t(`errors.${error}`);
      else delete newErrors[field];
      return newErrors;
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación completa
    const errors: { [key: string]: string | null } = {
      email: validateEmail(form.email),
      fullName: validateFullName(form.fullName),
      documentType: validateDNI(form.documentType),
      phone: validatePhone(form.phone),
      password: validatePassword(form.password),
      agreeToTerms: agreeToTerms ? null : "termsRequired",
    };

    const errorMessages: { [key: string]: string } = {};
    Object.entries(errors).forEach(([key, value]) => {
      if (value) errorMessages[key] = t(`errors.${value}`);
    });

    if (Object.keys(errorMessages).length > 0) {
      setValidationErrors(errorMessages);
      setTouched({
        email: true,
        fullName: true,
        documentType: true,
        phone: true,
        password: true,
        agreeToTerms: true,
      });
      return;
    }

    // Llamar hook de registro
    const user = await handleRegister(form);
    if (user) {
      // Opcional: redirigir o mostrar mensaje de éxito
      console.log("Usuario registrado:", user);
    }
  };

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2 -mr-2">
      <form onSubmit={onSubmit} className="space-y-4">
        {apiError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-base">{apiError}</p>
          </div>
        )}

        {/* Campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <InputField
            id="email"
            label={t("register.email")}
            placeholder={t("register.emailPlaceholder")}
            value={form.email}
            name="email"
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            error={validationErrors.email}
          />

          {/* Full Name */}
          <InputField
            id="fullName"
            label={t("register.fullName")}
            placeholder={t("register.fullNamePlaceholder")}
            value={form.fullName}
            name="fullName"
            onChange={handleChange}
            onBlur={() => handleBlur("fullName")}
            error={validationErrors.fullName}
          />

          {/* DNI */}
          <InputField
            id="documentType"
            label={t("register.dni")}
            placeholder={t("register.dniPlaceholder")}
            value={form.documentType}
            name="documentType"
            onChange={handleChange}
            onBlur={() => handleBlur("documentType")}
            error={validationErrors.documentType}
            className="md:col-span-1"
          />

          {/* Phone */}
          <InputField
            id="phone"
            label={t("register.phone")}
            placeholder={t("register.phonePlaceholder")}
            value={form.phone}
            name="phone"
            onChange={handleChange}
            onBlur={() => handleBlur("phone")}
            error={validationErrors.phone}
            className="md:col-span-1"
          />

          {/* Password */}
          <InputField
            id="password"
            label={t("register.password")}
            placeholder={t("register.passwordPlaceholder")}
            value={form.password}
            name="password"
            onChange={handleChange}
            onBlur={() => handleBlur("password")}
            error={validationErrors.password}
            type="password"
          />
        </div>

        {/* Checkbox términos */}
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
                  2: <a href="#" className="text-primary hover:underline" />,
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

// Componente de input reutilizable
function InputField({ id, label, placeholder, value, name, onChange, onBlur, error, type = "text", className = "" }: any) {
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`input-base ${error ? "border-red-500" : ""}`}
        aria-invalid={!!error}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
