import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation("admin");
  return (
    <section className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">{t("dashboard.title")}</h1>
      <p className="mt-3 text-graphite/80">{t("dashboard.welcome")}</p>
    </section>
  );
}
