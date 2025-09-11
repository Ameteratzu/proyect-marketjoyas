import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { STORE_DETAILS } from "./storeDetail.const";
import StoreHeader from "./components/StoreHeader";
import StoreTabs from "./components/StoreTabs";
import StoreProducts from "./components/StoreProducts";
import StoreReviews from "./components/StoreReviews";

type Tab = "products" | "reviews";

export default function StoreDetail() {
  const { slug = "" } = useParams();
  const store = STORE_DETAILS[slug];
  const { t } = useTranslation("stores");

  const [tab, setTab] = useState<Tab>("products");

  // Permitir deep-link con hash: #reseñas
  useEffect(() => {
    if (location.hash === "#reseñas" || location.hash === "#reviews") {
      setTab("reviews");
    }
  }, []);

  if (!store) {
    return (
      <div className="container-p py-14">
        <h1 className="text-2xl font-display text-dark">{t("notFound")}</h1>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <h1 className="font-sans text-center text-3xl md:text-4xl text-dark mt-8 font-medium">
        {store.name}
      </h1>
      <div className="separador"></div>

      <StoreHeader store={store} />

      <StoreTabs
        value={tab}
        onChange={setTab}
        leftLabel={t("products")}
        rightLabel={t("reviews")}
      />

      {tab === "products" ? (
        <StoreProducts store={store} />
      ) : (
        <StoreReviews store={store} />
      )}
    </div>
  );
}
