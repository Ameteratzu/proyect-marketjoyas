import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "react";
import { SPECIALTIES } from "../about.const";
import SectionTitle from "@/components/SectionTitle";

export default function SpecialtiesGrid() {
  const { t } = useTranslation("about");

  // Referencia para el carrusel horizontal en mobile
  const listRef = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState(0);

  // Actualiza el índice activo según el scroll (solo mobile, pero sin condicional pesada)
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const handler = () => {
      // Si no hay scroll horizontal real (modo grid en desktop), fijamos 0
      if (el.scrollWidth <= el.clientWidth) {
        if (active !== 0) setActive(0);
        return;
      }
      const children = Array.from(el.children) as HTMLElement[];
      const viewportCenter = el.scrollLeft + el.clientWidth / 2;
      let closestIdx = 0;
      let minDist = Number.POSITIVE_INFINITY;
      children.forEach((child, idx) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(childCenter - viewportCenter);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }
      });
      if (closestIdx !== active) setActive(closestIdx);
    };
    el.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    // Inicial
    handler();
    return () => {
      el.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [active]);

  const scrollTo = (i: number) => {
    const el = listRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (!child) return;
    const target = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

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

        {/* Lista: en mobile se convierte en carrusel horizontal; en sm+ conserva el grid original */}
        <ul
          ref={listRef}
          className="flex overflow-x-auto no-scrollbar gap-6 px-2 -mx-2 scroll-smooth snap-x snap-mandatory sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4" /* no tocamos clases existentes para desktop */
          aria-label={t("specialties.title")}
        >
          {SPECIALTIES.map((s, idx) => (
            <li
              key={s.id}
              className="rounded-2xl bg-white border border-black/5 shadow-sm overflow-hidden hover:scale-105 transition-transform duration-300 snap-center shrink-0 w-[85%] sm:w-auto sm:shrink" /* añadimos ancho relativo solo mobile */
              aria-current={idx === active ? "true" : undefined}
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

        {/* Puntos de navegación: sólo visibles en mobile */}
        <div
          className="flex justify-center gap-2 mt-4 sm:hidden"
          aria-hidden="true"
        >
          {SPECIALTIES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                i === active ? "bg-primary" : "bg-dark/25"
              }`}
              aria-label={`Ir a tarjeta ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
