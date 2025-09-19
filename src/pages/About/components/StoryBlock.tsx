import { useTranslation } from "react-i18next";
import defaultImg from "@/assets/about/EnTodoElPais.png";

type Props = { image?: string };

export default function StoryBlock({ image }: Props) {
  const { t } = useTranslation("about");
  const imgSrc = image ?? defaultImg;

  return (
    <section className="container-p py-12 md:py-16">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-accent-warm uppercase tracking-wider font-semibold text-xl">
          {t("story.kicker")}
        </p>
        <h3 className="font-display text-3xl md:text-4xl text-primary mt-1">
          {t("story.title")}
        </h3>
        <p className="mt-3 text-graphite text-lg">{t("story.body")}</p>
      </div>

      <div className="mt-8 flex justify-center">
        <img
          src={imgSrc}
          alt={t("story.alt")}
          className="rounded-2xl shadow-md w-full max-w-[360px] object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="py-10 md:py-14 text-center">
        <p className="text-dark text-xl">{t("contact.lead")}</p>
        <a
          href="/registro"
          className="btn btn-primary mt-5 inline-block text-lg"
        >
          {t("contact.cta")}
        </a>
      </div>
    </section>
  );
}
