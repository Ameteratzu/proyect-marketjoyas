// Componente para mostrar la calificación en estrellas y el número de reseñas.
type Props = { value: number; reviews?: number };
import { FaStar, FaRegStar } from "react-icons/fa";

export default function RatingStars({ value, reviews }: Props) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="inline-flex items-center gap-2 text-amber-500">
      <div className="flex">
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f-${i}`}>
            <FaStar className="mr-1" />
          </span>
        ))}
        {half && <span>☆</span>}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e-${i}`}>
            <FaRegStar />
          </span>
        ))}
      </div>
      {reviews != null && (
        <span className="text-xs text-graphite/70">({reviews} reseñas)</span>
      )}
    </div>
  );
}
