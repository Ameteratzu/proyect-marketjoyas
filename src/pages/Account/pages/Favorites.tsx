import { useTranslation } from "react-i18next";

export default function Favorites() {
  const { t } = useTranslation("account");
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-lg font-semibold text-neutral-900">
        {t("favorites.title")}
      </h2>
      <p className="mt-2 text-neutral-600">{t("favorites.empty")}</p>
      {/* Diseño-only: grid de productos favoritos */}
    </div>
  );
}
