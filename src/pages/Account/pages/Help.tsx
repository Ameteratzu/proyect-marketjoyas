import { useTranslation } from "react-i18next";

export default function Help() {
  const { t } = useTranslation("account");
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-lg font-semibold text-neutral-900">
        {t("help.title")}
      </h2>
      <p className="mt-2 text-neutral-600">{t("help.desc")}</p>
      {/* Diseño-only: FAQ / canal de soporte */}
    </div>
  );
}
