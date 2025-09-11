import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import type { StoreDetail } from "../storeDetail.const";

type Props = { store: StoreDetail };

export default function StoreProducts({ store }: Props) {
  const { t } = useTranslation("stores");

  if (!store.products.length) {
    return (
      <p className="container-p py-10 text-center text-graphite/70">
        {t("noProducts")}
      </p>
    );
  }

  return (
    <div className="container-p py-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {store.products.map((p) => (
        <article
          key={p.id}
          className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden flex flex-col"
        >
          <div className="aspect-[4/3] overflow-hidden bg-neutral">
            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          <div className="p-4 flex flex-col gap-3">
            <h3 className="text-primary text-2xl font-medium font-sans line-clamp-2">{p.name}</h3>

            {/* Bloque precio y marca alineados arriba */}
            <div className="flex items-start justify-between gap-4">
              {/* Columna precio */}
              <div className="flex-1">
                <span className="block text-dark/50 text-lg">
                  {t("price")}:
                </span>
                <div className="mt-1 flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-accent-warm font-bold text-xl">
                      {p.price}
                    </span>
                    {p.oldPrice &&
                      (() => {
                        // Calcula el porcentaje de descuento
                        const parseNum = (val: string) => {
                          const cleaned = val
                            .replace(/S\//i, "")
                            .replace(/,/g, "")
                            .trim();
                          const num = parseFloat(cleaned);
                          return isNaN(num) ? null : num;
                        };
                        // Si hay oldPrice, calcula el porcentaje y lo muestra
                        const currentNum = parseNum(p.price);
                        const oldNum = parseNum(p.oldPrice!);
                        if (currentNum && oldNum && oldNum > currentNum) {
                          const percent = Math.round(
                            ((oldNum - currentNum) / oldNum) * 100
                          );
                          return (
                            <span className="inline-block bg-red-700 text-white text-[11px] leading-none font-bold px-2 py-1 rounded">
                              -{percent}%
                            </span>
                          );
                        }
                        return null;
                      })()}
                  </div>
                  {p.oldPrice && (
                    <span className="text-graphite/60 line-through text-sm mt-1">
                      {p.oldPrice}
                    </span>
                  )}
                </div>
              </div>
              {/* Columna marca */}
              <div className="flex flex-col w-24">
                <span className="text-dark/50 text-lg">{t("for")}: </span>
                {p.brandLogo && (
                  <img
                    src={p.brandLogo}
                    alt={store.name}
                    className="h-10 w-auto opacity-80 mt-1"
                  />
                )}
              </div>
            </div>

            <div className="mt-1 grid grid-rows-2 gap-3">
              <button className="btn btn-primary w-full inline-flex items-center justify-center text-xl">
                {t("quote")}
                <MdOutlineAddShoppingCart className="ml-2" />
              </button>
              <button className="btn btn-ghost w-full inline-flex items-center justify-center text-xl">
                {t("fav")}
                <FaRegHeart className="ml-2" />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
