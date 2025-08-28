import { TbWorld } from "react-icons/tb";
import { BiStore } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function TopBar() {
  const { t, i18n } = useTranslation("header");

  // Mantener <html lang="..."> en sync
  useEffect(() => {
    const lang = i18n.resolvedLanguage || i18n.language || "es";
    document.documentElement.lang = lang.startsWith("es") ? "es" : "en";
  }, [i18n.resolvedLanguage, i18n.language]);

  const toggleLang = () => {
    const lang = i18n.resolvedLanguage || i18n.language || "es";
    i18n.changeLanguage(lang.startsWith("es") ? "en" : "es");
  };

  return (
    <div className="bg-primary text-white text-xs">
      <div className="container-p py-2 flex items-center justify-between font-medium">
        <span className="tracking-wide">{t("freeShipping")}</span>

        <nav className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-2 opacity-90 hover:opacity-100 cursor-pointer"
          >
            <TbWorld className="iconSecundario" />
            <span className="uppercase tracking-wide">{t("lang")}</span>
          </button>

          <a
            href="/vender"
            className="inline-flex items-center gap-2 opacity-90 hover:opacity-100"
          >
            <BiStore className="iconSecundario" />
            <span className="uppercase tracking-wide">{t("sellWithUs")}</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
