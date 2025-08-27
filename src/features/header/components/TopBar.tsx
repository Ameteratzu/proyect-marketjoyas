import { TbWorld } from "react-icons/tb";
import { BiStore } from 'react-icons/bi';
import { useTranslation } from "react-i18next";

export default function TopBar() {
  const { t, i18n } = useTranslation("header");

  return (
    <div className="bg-primary text-white text-xs">
      <div className="container-p py-2 flex items-center justify-between font-medium">
        <span className="tracking-wide">{t("freeShipping")}</span>
        
        <nav className="hidden sm:flex items-center gap-6">
          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === "es" ? "en" : "es")
            }
            className="cursor-pointer inline-flex items-center gap-2 opacity-90 hover:opacity-100"
          >
            <TbWorld className="iconSecundario" />
            <span>{t("lang")}</span>
          </button>
          <a
            href="/vender"
            className="inline-flex items-center gap-2 opacity-90 hover:opacity-100"
          >
            <BiStore className="iconSecundario" />
            <span>{t("sellWithUs")}</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
