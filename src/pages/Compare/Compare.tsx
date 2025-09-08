import StockBadge from "./components/StockBadge";
import RatingStars from "./components/RatingStars";

export default function Compare() {
    return (
        <section className="container-p py-12">
          <h1 className="h1 text-3xl">Prueba del Comparar</h1>
          <p className="lead mt-3">Acá podrás comparar las joyas y elegir la que más te guste</p>
          <h1>Prueba de Badge</h1>
          <StockBadge inStock={false} />
          <StockBadge inStock={true} />
          <h1>Prueba de RatingStars</h1>
          <RatingStars value={4} reviews={20} />
        </section>
      );
}