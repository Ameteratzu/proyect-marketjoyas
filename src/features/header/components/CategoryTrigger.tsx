import { HiMenu } from "react-icons/hi";
import { useTranslation } from "react-i18next";

type Props = { onClick?: () => void };

export default function CategoryTrigger(props: Props) {
  const { t } = useTranslation("header");
  return (
    <button
      onClick={props.onClick}
      className="text-[24px] inline-flex items-center gap-2 text-primary"
    >
      <HiMenu className="w-7 h-auto" />
      <span className="font-semibold">{t("products")}</span>
    </button>
  );
}
