import { useEffect, useMemo, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import SectionTitle from "../../../../components/SectionTitle";
import { STORES, type Store } from "./StoresSection.const";
import { cn } from "@/lib/cn";

/** Cuántas tarjetas mostrar según ancho (1 móvil / 2 ≥ md) */
function useSlidesPerView() {
  const [spv, setSpv] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setSpv(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return spv;
}

/** Divide el array en “páginas” de tamaño fijo (para desktop) */
function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [arr];
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out.length ? out : [[]];
}

export default function StoresSection() {
  const { t } = useTranslation("home");
  const slidesPerView = useSlidesPerView();
  const isDesktop = slidesPerView > 1;

  /** ===== Desktop logic (paginado con flechas) ===== */
  const pagesDesktop: Store[][] = useMemo(
    () => chunk(STORES, slidesPerView),
    [slidesPerView]
  );
  const [pageDesk, setPageDesk] = useState(0);
  const totalPagesDesk = pagesDesktop.length;

  useEffect(() => {
    setPageDesk((p) => Math.min(p, Math.max(0, totalPagesDesk - 1)));
  }, [totalPagesDesk]);

  const canPrev = isDesktop && pageDesk > 0 && totalPagesDesk > 1;
  const canNext =
    isDesktop && pageDesk < totalPagesDesk - 1 && totalPagesDesk > 1;

  const prev = () => canPrev && setPageDesk((p) => p - 1);
  const next = () => canNext && setPageDesk((p) => p + 1);

  /** ===== Mobile logic (scroll x con snap) ===== */
  const viewportRef = useRef<HTMLDivElement>(null);
  const [pageMob, setPageMob] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  useEffect(() => {
    if (!viewportRef.current) return;
    const el = viewportRef.current;
    const update = () => setViewportW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Detección de “página” en móvil basado en scrollLeft / width
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = el.clientWidth || 1;
        const current = Math.round(el.scrollLeft / w);
        setPageMob(current);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Dots en móvil: scroll a la “página” i
  const scrollToMobilePage = (i: number) => {
    const el = viewportRef.current;
    if (!el || viewportW === 0) return;
    el.scrollTo({ left: i * viewportW, behavior: "smooth" });
  };

  // Total páginas en móvil = cantidad de tarjetas (una por “página” visible)
  const totalPagesMob = STORES.length;

  return (
    <section className="my-10 md:my-14">
      <SectionTitle>{t("stores", { defaultValue: "Tiendas" })}</SectionTitle>

      <div className="container-p relative mt-6">
        {/* DESKTOP: flechas */}
        {isDesktop && totalPagesDesk > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
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
              onClick={next}
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

        {/* VIEWPORT */}
        {isDesktop ? (
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${pageDesk * 100}%)` }}
            >
              {pagesDesktop.map((stores, idx) => (
                <div
                  key={`page-${idx}`}
                  className={cn(
                    "shrink-0 w-full grid gap-6",
                    slidesPerView === 2 ? "grid-cols-2" : "grid-cols-1"
                  )}
                >
                  {stores.map((store) => (
                    <article
                      key={store.id}
                      className="bg-white rounded-2xl shadow-sm border border-black/5 px-6 py-5 flex items-center gap-6"
                    >
                      {store.logo ? (
                        <img
                          src={store.logo}
                          alt={store.name}
                          className="w-18 object-center"
                        />
                      ) : (
                        <span className="font-display text-2xl text-primary">
                          {store.name.charAt(0)}
                        </span>
                      )}

                      <div className="flex-1 flex items-center justify-between gap-4">
                        <h3 className="font-sans text-xl md:text-2xl text-dark">
                          {store.name}
                        </h3>
                        <a
                          href={store.href}
                          className="btn btn-primary font-display"
                        >
                          {t("viewStore", { defaultValue: "Ver Tienda" })}
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // MOBILE: scroll-x con snap + tarjeta fija centrada
          <div
            ref={viewportRef}
            className="no-scrollbar overflow-x-auto scroll-smooth snap-x snap-mandatory px-2"
          >
            <ul className="flex gap-5 py-1">
              {STORES.map((store) => (
                <li
                  key={store.id}
                  className="snap-start shrink-0 w-[320px] xs:w-[340px]"
                >
                  <article
                    className="
                      bg-white rounded-3xl shadow-sm border border-black/5
                      h-[360px] xs:h-[380px]
                      px-6 py-5
                      flex flex-col items-center justify-between text-center
                    "
                  >
                    {/* Logo grande */}
                    <div className="flex-1 w-full flex items-center justify-center">
                      {store.logo ? (
                        <img
                          src={store.logo}
                          alt={store.name}
                          className="w-48 h-48 xs:w-32 xs:h-32 object-contain"
                        />
                      ) : (
                        <span className="font-display text-4xl text-primary">
                          {store.name.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Nombre */}
                    <h3 className="mt-1 mb-3 font-sans text-3xl xs:text-xl text-dark">
                      {store.name}
                    </h3>

                    {/* CTA abajo */}
                    <a
                      href={store.href}
                      className="btn btn-primary font-display w-[70%] max-w-[220px] mb-1"
                    >
                      {t("viewStore", { defaultValue: "Ver Tienda" })}
                    </a>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* DOTS */}
        {!isDesktop && totalPagesMob > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            {Array.from({ length: totalPagesMob }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToMobilePage(i)}
                aria-label={`Ir a tarjeta ${i + 1}`}
                aria-current={i === pageMob ? "true" : undefined}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition",
                  i === pageMob
                    ? "bg-primary"
                    : "bg-primary/20 hover:bg-primary/35"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
