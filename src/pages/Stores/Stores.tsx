import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import StoresGrid from "./components/StoresGrid";
import StoresPagination from "./components/StoresPagination";
import { ALL_STORES } from "./stores.const";

const PAGE_SIZE = 9; // 3x3

export default function Stores() {
  const { t } = useTranslation("stores");
  const [page, setPage] = useState(1); // si luego quieres con querystring, lo cambiamos

  const total = ALL_STORES.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return ALL_STORES.slice(start, start + PAGE_SIZE);
  }, [page]);

  return (
    <section className="">
      <div className="pt-8 md:pt-12">
        <h2 className="text-center text-4xl font-sans">{t("title")}</h2>
      </div>
      <div className="separador"></div>
      <div className="container-p my-8 md:my-12">
        {total === 0 ? (
          <p className="text-center text-graphite/70 mt-8">{t("empty")}</p>
        ) : (
          <>
            <StoresGrid stores={pageItems} />
            <StoresPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </section>
  );
}
