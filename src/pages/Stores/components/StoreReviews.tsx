import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { FaFilter } from "react-icons/fa";
import type React from "react";
import type { StoreDetail } from "../storeDetail.const";
import { FaStar } from "react-icons/fa"; // estrellas llenas
import { FaStarHalfAlt } from "react-icons/fa"; // estrella media
import { FaRegStar } from "react-icons/fa"; // estrella vacía

type Props = { store: StoreDetail };

function Stars({ value }: { value: number }) {
  const stars: React.ReactElement[] = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<FaStar key={i} className="text-accent-warm" />);
    } else if (value >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-accent-warm" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-graphite/30" />);
    }
  }
  return <span className="flex items-center gap-1 text-[18px]">{stars}</span>;
}

type FilterMode = "relevant" | "recent" | "oldest" | "low";

export default function StoreReviews({ store }: Props) {
  const { t } = useTranslation("stores");
  const [filterOpen, setFilterOpen] = useState(false);
  const [mode, setMode] = useState<FilterMode>("relevant");

  const sortedReviews = useMemo(() => {
    const list = [...store.reviewsList];
    switch (mode) {
      case "recent":
        return list.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "oldest":
        return list.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "low":
        return list.sort((a, b) => a.rating - b.rating);
      case "relevant":
      default:
        // Relevancia simple: rating desc luego fecha reciente
        return list.sort((a, b) => {
          if (b.rating !== a.rating) return b.rating - a.rating;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }
  }, [store.reviewsList, mode]);

  const modeLabel = (m: FilterMode) => {
    switch (m) {
      case "relevant":
        return t("reviews.filter.relevant", "más relevantes");
      case "recent":
        return t("reviews.filter.recent", "más recientes");
      case "oldest":
        return t("reviews.filter.oldest", "más antiguas");
      case "low":
        return t("reviews.filter.low", "menor calificación");
    }
  };

  return (
    <div className="container-p py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Columna izquierda: resumen simple */}
        <aside className="lg:w-80 shrink-0">
          <div className="text-5xl font-display text-dark mb-5">
            {store.rating ?? "—"} / 5
          </div>
          <div className="mt-1">
            <Stars value={store.rating ?? 0} />
          </div>
          <div className="mt-2 text-graphite/70 text-sm">
            {t("vendorRating")}{" "}
            <span className="text-dark">
              ({store.reviews ?? 0} {t("reviewsCount")})
            </span>
          </div>
        </aside>

        {/* Columna derecha: lista */}
        <div className="flex-1">
          {/* Encabezado subtítulo + filtro */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-sans font-semibold text-2xl md:text-3xl text-dark">
              {t("reviews.subtitle", "Opiniones del producto")}
            </h2>
            {store.reviewsList.length > 0 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setFilterOpen((o) => !o)}
                  className="inline-flex items-center gap-2 text-xl font-medium text-dark hover:text-primary focus:outline-none cursor-pointer"
                >
                  <FaFilter className="text-primary" />
                  {t("reviews.filter.label", "Filtrar:")}&nbsp;{modeLabel(mode)}
                </button>
                {filterOpen && (
                  <ul className="absolute right-0 mt-2 w-48 rounded-md border border-black/10 bg-white shadow-lg z-10 py-1 text-sm">
                    {(
                      ["relevant", "recent", "oldest", "low"] as FilterMode[]
                    ).map((opt) => (
                      <li key={opt}>
                        <button
                          className={`w-full text-left px-4 py-2 hover:bg-neutral/60 transition ${
                            opt === mode
                              ? "text-primary font-semibold"
                              : "text-dark/80"
                          }`}
                          onClick={() => {
                            setMode(opt);
                            setFilterOpen(false);
                          }}
                        >
                          {modeLabel(opt)}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {!store.reviewsList.length ? (
            <p className="text-graphite/70 text-xl md:text-2xl">{t("noreviews")}</p>
          ) : (
            <ul className="space-y-6">
              {sortedReviews.map((r) => (
                <li key={r.id} className="border-b border-black/10 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-neutral/60 grid place-items-center text-sm text-dark/70">
                      {r.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-dark">{r.user}</div>
                      <div className="text-xs text-graphite/60">{r.date}</div>
                    </div>
                    <Stars value={r.rating} />
                  </div>
                  <p className="mt-3 text-dark/80">{r.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
