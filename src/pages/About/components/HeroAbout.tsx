import { useTranslation } from "react-i18next";
import defaultBg from "@/assets/about/about-hero.png";

type Props = { bg?: string };

export default function HeroAbout({ bg }: Props) {
  const { t } = useTranslation("about");
  const bgSrc = bg ?? defaultBg;

  return (
    <section className="relative">
      <div className="relative h-[220px] sm:h-[260px] md:h-[320px] overflow-hidden">
        <img
          src={bgSrc}
          alt={t("hero.alt")}
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
        />
        <div className="absolute inset-0" />
        <div className="container-p relative z-[1] h-full flex items-center">
          <div className="text-center md:text-left">
            <h1 className="mt-1 font-medium font-sans text-3xl md:text-6xl text-white">
              {t("hero.kicker")}
              <span className="text-primary">
                {" "}
                {t("hero.title")} {t("hero.brand")}
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-white/90 leading-relaxed pr-0 md:pr-50">
              {t("hero.lead")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
