import { useTranslation } from "react-i18next";

type Props = { image?: string };

export default function BandCta({ image = "/src/assets/about/EntregandoProductos.png" }: Props) {
  const { t } = useTranslation("about");

  return (
    <section className="bg-primary text-white mt-16 text-center md:text-left">
      <div className="container-p py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <p className="text-accent-warm font-bold text-xl tracking-wide uppercase">
            {t("band.kicker")}
          </p>
          <h3 className="mt-1 font-display text-3xl md:text-4xl max-w-lg">
            {t("band.title")}
          </h3>
          <p className="mt-3 text-white/90 max-w-100 text-lg">{t("band.desc")}</p>
          <a href="/productos" className="btn btn-light mt-6 inline-block text-lg">
            {t("band.cta")}
          </a>
        </div>
        <div className="order-1 md:order-2">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={image}
              alt={t("band.alt")}
              className="w-full h-[260px] md:h-[500px] object-cover hover:transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
