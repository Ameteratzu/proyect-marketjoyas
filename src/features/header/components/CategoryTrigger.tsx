import { HiMenu } from "react-icons/hi";
import { useTranslation } from "react-i18next";

type Props = { onClick?: () => void };

export default function CategoryTrigger(props: Props) {
  const { t } = useTranslation("header");
  return (
    <button
      onClick={props.onClick}
      className="inline-flex items-center gap-2 text-primary hover:text-primary/75 transition-all duration-300 cursor-pointer"
      aria-label={t("openMenu") ?? "Abrir menú"}
    >
      <HiMenu className="iconPrincipal" />
      <span className="hidden sm:inline font-semibold text-[20px] md:text-[22px]">
        {t("products")}
      </span>
    </button>
  );
}