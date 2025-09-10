import { Link } from "react-router-dom";
import type React from "react";
import { useTranslation } from "react-i18next";
import type { Store } from "../stores.type";
import { PATHS } from "@/routes/paths";
import { FaStar } from "react-icons/fa"; // estrellas llenas
import { FaStarHalfAlt } from "react-icons/fa"; // estrella media
import { FaRegStar } from "react-icons/fa"; // estrella vacía

type Props = { store: Store };

export default function StoreCard({ store }: Props) {
  const { t } = useTranslation("stores");
  const to = `${PATHS.STORES}/${store.slug}`;

  // Renderiza 5 estrellas (llena, media o vacía) según el rating
  const ratingValue = typeof store.rating === "number" ? store.rating : 0;
  const renderStars = (value: number) => {
    const stars: React.ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      if (value >= i) {
        stars.push(<FaStar key={i} className="inline text-yellow-500 mr-0.5 " />);
      } else if (value >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt key={i} className="inline text-yellow-500 mr-0.5 " />
        );
      } else {
        stars.push(<FaRegStar key={i} className="inline text-yellow-500 mr-0.5" />);
      }
    }
    return stars;
  };

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-black/5 p-5 flex flex-col gap-4">
      <div className="h-16 flex items-center gap-10">
        {store.logo && (
          <>
            <img
              src={store.logo}
              alt={store.name}
              className="max-h-12 w-auto"
            />
            <div className="flex flex-col">
              <span className="font-sans text-2xl text-primary font-medium">
                {store.name}
              </span>
              {t("rating")}{" "}
              <div className="text-sm text-primary content-center">
                <span className="font-semibold text-dark mr-1">
                  {store.rating ?? "—"}
                </span>{" "}
                <span className="">{renderStars(ratingValue)}</span>
                {store.reviews ? (
                  <span className="text-dark ml-2">({store.reviews})</span>
                ) : null}
              </div>
            </div>
          </>
        )}
      </div>

      <Link to={to} className="btn btn-primary self-center mt-4 w-full text-xl">
        {t("goTo")}
      </Link>
    </article>
  );
}
