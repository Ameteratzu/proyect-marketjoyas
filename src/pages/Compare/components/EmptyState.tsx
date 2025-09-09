// Componente que muestra un estado vacío cuando no hay productos para comparar.
import { useTranslation } from "react-i18next";
import { CgPlayListSearch } from "react-icons/cg";
import { GiBigDiamondRing } from "react-icons/gi";

export default function EmptyState() {
  const { t } = useTranslation("compare");

  return (
    <section className="container-p py-16 text-center">
      <div className="mx-auto max-w-xl rounded-2xl border border-primary/10 bg-white/60 p-10 shadow-sm">
        <div className="mb-4 text-primary mx-auto flex items-center justify-center">
          <CgPlayListSearch className="text-[128px]" />
        </div>
        <h2 className="font-sans text-2xl md:text-3xl text-dark mb-2">
          {t("empty.headline")}
        </h2>
        <p className="text-graphite/80 mb-6 text-xl">{t("empty.sub")}</p>
        <a href="/productos" className="btn btn-primary inline-flex text-2xl">
          {t("empty.cta")}
          <GiBigDiamondRing className="ml-2" />
        </a>
      </div>
    </section>
  );
}
