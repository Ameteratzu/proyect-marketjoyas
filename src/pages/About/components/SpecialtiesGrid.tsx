import { useTranslation } from "react-i18next";
import { SPECIALTIES } from "../about.const";
import SectionTitle from "@/components/SectionTitle";

export default function SpecialtiesGrid() {
  const { t } = useTranslation("about");

  return (
    <section className="">
      <SectionTitle decor="full" lineThickness="thick">
        {t("specialties.title")}
      </SectionTitle>
      <div className="container-p">
        <div className="text-center mb-8">
          <p className="mt-2 text-graphite max-w-3xl mx-auto">
            {t("specialties.subtitle")}
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALTIES.map((s) => (
            <li
              key={s.id}
              className="rounded-2xl bg-white border border-black/5 shadow-sm overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="h-50">
                <img
                  src={s.image}
                  alt={t(s.titleKey)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-display font-bold text-[16px] text-primary">
                  {t(s.titleKey)}
                </h3>
                <p className="text-graphite mt-1">{t(s.descKey)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
