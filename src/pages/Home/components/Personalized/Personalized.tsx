import { useTranslation } from "react-i18next";
import SectionTitle from "@/components/SectionTitle";
import { AUDIENCE, PERSONALIZED_IMAGE } from "./Personalized.const";

export default function Personalized() {
  const { t } = useTranslation("home");

  return (
    <section
      aria-labelledby="home-personalized"
      className="mt-10 md:mt-16 mb-18"
    >
      <SectionTitle id="home-personalized" decor="full" lineThickness="thick">
        {t("sections.personalized")}
      </SectionTitle>

      <div className="container-p grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* Columna izquierda: títulos + CTAs */}
        <div className="order-2 md:order-1 text-center">
          <h3 className="font-display text-3xl md:text-4xl leading-tight text-primary font-extrabold">
            {t("personalized.title")}
          </h3>

          <p className="mt-6 text-2xl text-graphite">
            {t("personalized.subtitle")}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {AUDIENCE.map((a) => (
              <div key={a.id} className="text-center">
                <p className="mb-2 text-graphite text-xl">
                  {t(`personalized.${a.id}`)}
                </p>
                <a
                  href={a.href}
                  className="btn btn-primary px-6 py-2 rounded-full text-lg"
                >
                  {t("personalized.see")} ▸
                </a>
              </div>
            ))}
          </div>
        </div>
          {/* Columna derecha: imagen */}
          <div className="order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-black/5">
              <img
                src={PERSONALIZED_IMAGE.src}
                alt={PERSONALIZED_IMAGE.alt}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>
      </div>
    </section>
  );
}
