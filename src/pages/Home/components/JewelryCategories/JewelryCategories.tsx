import { useTranslation } from "react-i18next";
import SectionTitle from "@/components/SectionTitle";
import { JEWELRY_CATEGORIES } from "./jewelry.const";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function JewelryCategories() {
  const { t } = useTranslation("home");

  // Slider sólo desktop; mobile = scroll táctil
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768);
  const [itemsPerView, setItemsPerView] = useState(5);
  const [firstIndex, setFirstIndex] = useState(0);

  const total = JEWELRY_CATEGORIES.length;

  const calcItemsPerView = (w: number) => {
    if (w >= 1280) return 6;
    if (w >= 1024) return 6;
    if (w >= 768) return 5;
    return 5;
  };

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      const desktop = w >= 768;
      setIsDesktop(desktop);
      if (desktop) {
        const n = calcItemsPerView(w);
        setItemsPerView((prev) => {
          if (prev !== n) {
            setFirstIndex((i) => Math.min(i, Math.max(0, total - n)));
          }
          return n;
        });
      } else {
        setFirstIndex(0);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [total]);

  const maxFirst = Math.max(0, total - itemsPerView);
  const canPrev = isDesktop && firstIndex > 0;
  const canNext = isDesktop && firstIndex < maxFirst;

  const go = (dir: number) => {
    if (!isDesktop) return;
    setFirstIndex((i) =>
      Math.min(Math.max(i + dir * itemsPerView, 0), maxFirst)
    );
  };

  // Sin gaps horizontales en desktop => cálculo exacto sin recortes
  const translatePct = (firstIndex * 100) / itemsPerView;
  const itemBasisDesktop = `${100 / itemsPerView}%`;

  return (
    <section aria-labelledby="home-jewelry" className="mt-10 md:mt-16 relative">
      <SectionTitle
        id="home-jewelry"
        decor="full"
        lineThickness="thick"
      >
        {t("sections.jewelry")}
      </SectionTitle>

      <div className="relative container-p">
        {isDesktop && total > itemsPerView && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={!canPrev}
              className={`hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full transition shadow ${
                canPrev
                  ? "bg-primary/85 text-white hover:bg-accent-warm hover:text-dark cursor-pointer"
                  : "bg-primary/15 text-primary/40 cursor-not-allowed"
              }`}
              aria-label="Anterior"
            >
              <HiChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={!canNext}
              className={`hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full transition shadow ${
                canNext
                  ? "bg-primary/85 text-white hover:bg-accent-warm hover:text-dark cursor-pointer"
                  : "bg-primary/15 text-primary/40 cursor-not-allowed"
              }`}
              aria-label="Siguiente"
            >
              <HiChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <div
          className={
            isDesktop
              ? "overflow-hidden"
              : "px-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
          }
        >
          <ul
            aria-roledescription="carousel"
            aria-label={t("sections.jewelry")}
            className={`flex ${
              isDesktop
                ? "transition-transform duration-500 ease-out"
                : ""
            }`}
            style={
              isDesktop
                ? { transform: `translateX(-${translatePct}%)` }
                : undefined
            }
          >
            {JEWELRY_CATEGORIES.map((cat, idx) => {
              const label = t(`jewelry.${cat.id}`);
              return (
                <li
                  key={cat.id}
                  className={
                    isDesktop
                      ? "shrink-0"
                      : "snap-start shrink-0 basis-[60%] xs:basis-[55%] sm:basis-[40%]"
                  }
                  style={
                    isDesktop
                      ? { flexBasis: itemBasisDesktop }
                      : undefined
                  }
                  aria-hidden={
                    isDesktop
                      ? idx < firstIndex || idx >= firstIndex + itemsPerView
                      : undefined
                  }
                >
                  <a
                    href={cat.href ?? "#"}
                    className="group relative block aspect-auto w-full overflow-hidden  focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-warm/60 cursor-pointer"
                    aria-label={label}
                  >
                    <img
                      src={cat.image}
                      alt={label}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/30 group-hover:bg-black/35 transition-colors duration-300"
                    />
                    <span
                      className="absolute inset-x-0 bottom-6 text-center font-display text-3xl md:text-[30px] font-medium tracking-wide text-white drop-shadow select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
