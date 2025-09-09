import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import esHeader from "@/locales/es/header.json";
import enHeader from "@/locales/en/header.json";
import esFooter from "@/locales/es/footer.json";
import enFooter from "@/locales/en/footer.json";
import esHome from "@/locales/es/home.json";
import enHome from "@/locales/en/home.json";
import esSidebar from "@/locales/es/sidebar.json";
import enSidebar from "@/locales/en/sidebar.json";
import esCompare from "@/locales/es/compare.json";
import enCompare from "@/locales/en/compare.json";
import esAbout from "@/locales/es/about.json";
import enAbout from "@/locales/en/about.json";
import esQuote from "@/locales/es/quote.json";
import enQuote from "@/locales/en/quote.json";


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

    // Namespaces (acá se añade más)
    ns: ["header", "footer", "home", "sidebar", "compare", "about"],
    defaultNS: "header",

    // Resources en memoria
    resources: {
      es: { header: esHeader, footer: esFooter, home: esHome, sidebar: esSidebar, compare: esCompare, about: esAbout, quote: esQuote },
      en: { header: enHeader, footer: enFooter, home: enHome, sidebar: enSidebar, compare: enCompare, about: enAbout, quote: enQuote },
    },
  });

export default i18n;
