import VisuallyHidden from "@/components/VisuallyHidden";
import { HERO_SLIDES } from "./hero.const";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = HERO_SLIDES.length;

  // Autoplay
  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 5000);

    return () => clearInterval(id);
  }, [paused, total]);

  const goTo = (i: number) => setIndex((i + total) % total);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  return (
    <section
      aria-label="Hero carousel"
      className="relative w-full overflow-hidden bg-accent-warm/30"
      // Comportamiento del hero con el mouse
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* viewport con alto adaptable */}
      <div className="relative w-full h-[48vw] max-h-[540px] min-h-[220px]">
        {/* Pista */}
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {HERO_SLIDES.map((s) => {
            const Img = (
              <img
                key={s.id}
                src={s.image}
                alt={s.alt ?? ""}
                className="w-full h-full object-cover select-none pointer-events-auto"
                draggable={false}
              />
            );
            return (
              <div key={s.id} className="shrink-0 w-full h-full relative">
                {/* imagen + overlay */}
                {Img}
                <div className="absolute inset-0 bg-black/15 z-0"></div>

                {/* contenido del slide */}
                <div className="absolute inset-0 flex items-center justify-start px-6 md:px-16">
                  <div className="relative z-10 max-w-xl text-left text-white space-y-4 m-30">
                    {s.badge && (
                      <span className="inline-block bg-primary px-4 py-1 rounded-md text-sm font-semibold">
                        {s.badge}
                      </span>
                    )}
                    {s.title && (
                      <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight drop-shadow-lg">
                        {s.title}
                      </h2>
                    )}
                    {s.subtitle && (
                      <p className="text-lg md:text-xl font-medium drop-shadow">
                        {s.subtitle}
                      </p>
                    )}
                    {s.cta && (
                      <a href={s.cta.href} className="btn btn-primary mt-1">
                        {s.cta.label}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* flechas */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-accent-warm text-white hover:bg-white hover:text-dark transition-all cursor-pointer duration-300"
            >
              <HiChevronLeft />
            </button>

            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full  bg-accent-warm text-white hover:bg-white hover:text-dark transition-all cursor-pointer duration-300"
            >
              <HiChevronRight className="w-6 h-6" />
              <VisuallyHidden>Siguiente</VisuallyHidden>
            </button>
          </>
        )}

        {/* Indicadores */}
        {total > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition cursor-pointer",
                  i === index ? "bg-dark/70" : "bg-white/50 hover:bg-white/75"
                )}
                aria-label={`Ir al slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
