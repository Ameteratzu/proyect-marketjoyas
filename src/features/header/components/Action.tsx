import { FiUser } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import VisuallyHidden from "@/components/VisuallyHidden";
import { useTranslation } from "react-i18next";

export default function Actions() {
  const { t } = useTranslation("header");
  const base = "inline-flex items-center gap-2 text-primary hover:text-primary/75 hover:opacity-90 cursor-pointer transition-all duration-300";

  return (
    <div className="flex items-center gap-8">
      <a href="/cuenta" className={base}>
        <FiUser className="iconPrincipal" />
        <span className="text-xl font-semibold text-[24px]">{t("login")}</span>
        <VisuallyHidden>{t("login")}</VisuallyHidden>
      </a>
      <a href="/favoritos" className={base}>
        <MdFavoriteBorder className="iconPrincipal" />
        <span className="text-xl font-semibold text-[24px]">{t("favorites")}</span>
        <VisuallyHidden>{t("favorites")}</VisuallyHidden>
      </a>
    </div>
  );
}
