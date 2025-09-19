import { useTranslation } from "react-i18next";

export default function Address() {
  const { t } = useTranslation("account");
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-lg font-semibold text-neutral-900">
        {t("address.title")}
      </h2>
      <p className="mt-2 text-neutral-600">{t("address.empty")}</p>
      {/* Diseño-only: formulario de dirección en la próxima iteración */}
    </div>
  );
}
