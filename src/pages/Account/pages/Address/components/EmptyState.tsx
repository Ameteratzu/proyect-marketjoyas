import { LuMapPinned } from "react-icons/lu";
import { useTranslation } from "react-i18next";

type Props = {
  onClick: () => void;
  ctaLabel: string;
};

export default function EmptyState(props: Props) {
  const { t } = useTranslation("account");
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-12 md:p-14 text-center shadow-sm">
      <div className="mx-auto h-30 w-30 md:w-60 md:h-60 rounded-full bg-neutral-100 grid place-items-center text-neutral-500 ring-1 ring-black/5">
        <LuMapPinned className="h-20 w-auto md:h-30" />
      </div>
      <p className="mt-6 text-neutral-800 text-2xl md:w-3xl font-medium max-w-md mx-auto leading-relaxed">
        {t("address.emptyHelp")}
      </p>
      <div className="mt-8">
        <button type="button" onClick={props.onClick} className="btn-primary ">
          {props.ctaLabel}
        </button>
      </div>
    </div>
  );
}
