import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "es", // idioma por defecto
  fallbackLng: "es",
  interpolation: { escapeValue: false },
  resources: {
    es: {
      header: await import("@/../public/locales/es/header.json"),
    },
    en: {
      header: await import("@/../public/locales/en/header.json"),
    },
  },
});

export default i18n;
