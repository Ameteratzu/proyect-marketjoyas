import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MOCK_ITEMS } from "./compare.const";
import EmptyState from "./components/EmptyState";
import CompareTable from "./components/CompareTable";
import type { CompareItem } from "./compare.types";

export default function Compare() {
  const { t } = useTranslation("compare");

  // Ahora lo manejamos en estado para poder eliminar
  const [items, setItems] = useState<CompareItem[]>(MOCK_ITEMS.slice(0, 4));

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="pb-14">
      <h1 className="font-sans text-center text-3xl md:text-4xl text-dark mt-10">
        {t("title")}
      </h1>
      <div className="separador"></div>

      <header className="container-p py-8">
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <CompareTable items={items} onRemove={handleRemove} />
        )}
      </header>
    </div>
  );
}
