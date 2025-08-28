import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Si cargas desde archivos usa http-backend; aquí pondré resources en memoria:
import esHeader from "@/locales/es/header.json";
import enHeader from "@/locales/en/header.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Forzar español si no hay preferencia guardada
    fallbackLng: "es",
    supportedLngs: ["es", "en"],
    nonExplicitSupportedLngs: true, // "en-US" -> "en"
    load: "languageOnly", // nos permitira usar solo "es" y "en"

    detection: {
      // orden de detección: primero lo guardado por nosotros
      order: ["localStorage", "htmlTag", "navigator", "querystring", "cookie"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng", // clave que usa el detector
    },

    interpolation: { escapeValue: false },

    // Namespaces (puedes añadir más: 'footer', 'home', etc.)
    ns: ["header"],
    defaultNS: "header",

    // Resources en memoria
    resources: {
      es: { header: esHeader },
      en: { header: enHeader },
    },
  });

export default i18n;
