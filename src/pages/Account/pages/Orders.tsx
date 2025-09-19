import { useTranslation } from "react-i18next";

export default function Orders() {
  const { t } = useTranslation("account");
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-lg font-semibold text-neutral-900">
        {t("orders.title")}
      </h2>
      <p className="mt-2 text-neutral-600">{t("orders.empty")}</p>
      {/* Diseño-only: aquí irá la tabla de pedidos más adelante */}
    </div>
  );
}
