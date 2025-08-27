import { HiMenu } from "react-icons/hi";
import { useTranslation } from "react-i18next";

type Props = { onClick?: () => void };

export default function CategoryTrigger(props: Props) {
  const { t } = useTranslation("header");
  return (
    <button
      onClick={props.onClick}
      className="text-[24px] inline-flex items-center gap-2 text-primary hover:text-primary/75 transition-all duration-300 cursor-pointer"
    >
      <HiMenu className="iconPrincipal" />
      <span className="font-semibold">{t("products")}</span>
    </button>
  );
}
