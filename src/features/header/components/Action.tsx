import { FiUser } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import VisuallyHidden from "@/components/VisuallyHidden";
import { useTranslation } from "react-i18next";

export default function Actions() {
  const { t } = useTranslation("header");
  const base =
    "inline-flex items-center gap-2 text-primary hover:text-primary/75 hover:opacity-90 cursor-pointer transition-all duration-300";

  return (
    <div className="flex items-center gap-3 md:gap-4">
      <button type="button" className={base}>
        <FiUser className="iconSocial md:iconPrincipal" />
        {/* oculto en mobile, visible desde md+ */}
        <span className="hidden md:inline text-[20px] md:text-[24px] font-semibold">
          {t("login")}
        </span>
        <VisuallyHidden>{t("login")}</VisuallyHidden>
      </button>

      <button type="button" className={base}>
        <MdFavoriteBorder className="iconSocial md:iconPrincipal" />
        {/* oculto en mobile, visible desde md+ */}
        <span className="hidden md:inline text-[20px] md:text-[24px] font-semibold">
          {t("favorites")}
        </span>
        <VisuallyHidden>{t("favorites")}</VisuallyHidden>
      </button>
    </div>
  );
}
