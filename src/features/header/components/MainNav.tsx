import { useEffect, useRef, useState } from "react";
import { MAIN_NAV } from "@/features/header/header.const";
import { useTranslation } from "react-i18next";
import { PATHS } from "@/routes/paths";
import { NavLink as RRNavLink } from "react-router-dom";
import { cn } from "@/lib/cn";

export default function MainNav() {
  const { t } = useTranslation("header");
  const first = MAIN_NAV.slice(0, 3);
  const rest = MAIN_NAV.slice(3);

  const [openMore, setOpenMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // cerrar al click fuera
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!moreRef.current?.contains(e.target as Node)) setOpenMore(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative text-[20px] md:text-xl font-medium transition-colors duration-300",
      isActive ? "text-accent-warm" : "text-primary hover:text-accent-warm",
      // subrayado desde el centro
      "after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:bg-accent-warm after:transition-transform after:duration-300 after:-translate-x-1/2 after:origin-center after:w-full",
      isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
    );

  const onNavigate = () => setOpenMore(false);

  return (
    <nav aria-label="Secundario" className="w-full bg-neutral/40">
      <div className="container-p py-3">
        {/* MOBILE: 3 items + Más (centrado) */}
        <div className="md:hidden flex items-center justify-center gap-8">
          {first.map((item) => (
            <RRNavLink
              key={item.id}
              to={item.href}
              end={item.href === PATHS.HOME}
              className={linkCls}
              onClick={onNavigate}
            >
              {t(item.labelKey)}
            </RRNavLink>
          ))}

          {rest.length > 0 && (
            <div ref={moreRef} className="relative">
              <button
                type="button"
                className="text-[20px] font-medium text-primary hover:text-accent-warm inline-flex items-center gap-1 transition-colors duration-300"
                onClick={() => setOpenMore((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={openMore}
              >
                {t("more") ?? "Más"}
                <span className={cn("transition-transform", openMore && "rotate-180")}>▾</span>
              </button>

              {/* Dropdown */}
              <div
                role="menu"
                className={cn(
                  "absolute left-3/2 -translate-x-2/2 mt-4 w-60 rounded-2xl bg-white shadow-xl border p-2",
                  "transition origin-top z-10 border-neutral",
                  openMore ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                )}
              >
                {rest.map((item) => (
                  <RRNavLink
                    key={item.id}
                    to={item.href}
                    end={item.href === PATHS.HOME}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-xl px-5 py-3 text-[20px] text-primary hover:bg-accent-warm/20 transition duration-300",
                        isActive && "text-accent-warm"
                      )
                    }
                    role="menuitem"
                    onClick={onNavigate}
                  >
                    {t(item.labelKey)}
                  </RRNavLink>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP: todos centrados */}
        <div className="hidden md:flex items-center justify-center gap-12 md:gap-16">
          {MAIN_NAV.map((item) => (
            <RRNavLink
              key={item.id}
              to={item.href}
              end={item.href === PATHS.HOME}
              className={linkCls}
              onClick={onNavigate}
            >
              {t(item.labelKey)}
            </RRNavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
