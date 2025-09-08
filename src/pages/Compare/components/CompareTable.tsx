import { useTranslation } from "react-i18next";
import type { CompareItem } from "../compare.types";
import { FEATURES_ROWS } from "../compare.const";
import RatingStars from "./RatingStars";
import StockBadge from "./StockBadge";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

type Props = {
  items: CompareItem[];
  onRemove?: (id: string) => void; // ⬅️ nuevo (opcional)
};

export default function CompareTable({ items, onRemove }: Props) {
  const { t } = useTranslation("compare");

  return (
    <div className="py-8">
      <div className="overflow-x-auto rounded-xl border border-black/10 bg-white shadow-sm">
        <table className="min-w-[720px] w-full text-sm">
          {/* Cabecera con imágenes */}
          <thead>
            <tr className="bg-neutral/40">
              <th className="text-left py-4 px-5 font-semibold text-dark text-[16px] w-48">
                {t("columns.feature")}
              </th>

              {items.map((p) => (
                <th key={p.id} className="py-4 px-5 text-center relative">
                  {/* Botón eliminar arriba, centrado */}
                  {onRemove && (
                    <button
                      type="button"
                      aria-label={`Quitar ${p.name} de la comparación`}
                      title={t("remove") ?? "Quitar"}
                      onClick={() => onRemove(p.id)}
                      className="absolute top-2 left-0 text-dark/70 hover:text-red-600 cursor-pointer bg-white rounded-full p-1.5 hover:shadow-md transform hover:scale-110 duration-300"
                    >
                      <div className="text-3xl text-center">
                        <MdDeleteForever className="text-center" />
                      </div>
                    </button>
                  )}

                  <div className="mx-auto w-[120px]">
                    <div className="aspect-[1.2] overflow-hidden rounded-lg bg-neutral hover:scale-110 transition-transform duration-300 cursor-pointer">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full grid place-items-center text-graphite/40">
                          —
                        </div>
                      )}
                    </div>
                    <p className="mt-3 text-dark font-medium">{p.name}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Filas comparables */}
          <tbody>
            {FEATURES_ROWS.map((rowKey) => (
              <tr key={rowKey} className="even:bg-neutral/30">
                <td className="py-4 px-5 font-bold text-dark text-[16px]">
                  {t(`columns.${rowKey}`)}
                </td>

                {items.map((p) => {
                  let content: React.ReactNode = null;

                  switch (rowKey) {
                    case "price":
                      content = (
                        <span className="font-semibold text-[16px]">
                          {p.price}
                        </span>
                      );
                      break;
                    case "availability":
                      content = (
                        <StockBadge inStock={p.availability === "in"} />
                      );
                      break;
                    case "rating":
                      content = (
                        <RatingStars value={p.rating} reviews={p.reviews} />
                      );
                      break;
                    case "category":
                      content = p.category;
                      break;
                    case "material":
                      content = p.material;
                      break;
                    case "occasion":
                      content = p.occasion;
                      break;
                    case "gem":
                      content = p.gem;
                      break;
                    case "brand":
                      content = p.brand;
                      break;
                  }

                  return (
                    <td
                      key={`${rowKey}-${p.id}`}
                      className="py-4 px-5 text-center"
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Acciones */}
            <tr>
              <td className="py-5 px-5 text-dark text-[16px] font-bold">
                {t("columns.actions")}
              </td>
              {items.map((p) => (
                <td key={`actions-${p.id}`} className="py-5 px-5">
                  <div className="flex flex-col items-center justify-center gap-3">
                    {/* Botón favoritos  */}
                    <button className="btn btn-ghost w-full text-[16px] whitespace-nowrap min-w-[170px] inline-flex items-center justify-center">
                      {t("actions.fav")}
                      <FaRegHeart className="ml-2 shrink-0" />
                    </button>

                    <button className="btn btn-primary w-full text-[16px] inline-flex items-center justify-center min-w-[140px]">
                      {t("actions.quote")}
                      <MdOutlineAddShoppingCart className="ml-2 shrink-0" />
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
