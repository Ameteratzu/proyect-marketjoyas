// src/features/header/components/Sidebar.tsx

import { HiX } from "react-icons/hi";
import { FaAngleRight } from "react-icons/fa6";
import { cn } from "@/lib/cn";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

type Category = { key: string; href: string };

const categories: Category[] = [
  { key: "alliance_marriage", href: "#" },
  { key: "rings", href: "#" },
  { key: "earrings", href: "#" },
  { key: "chains_necklaces", href: "#" },
  { key: "charms", href: "#" },
  { key: "bracelets", href: "#" },
  { key: "bangles", href: "#" },
  { key: "anklets", href: "#" },
  { key: "sets", href: "#" },
  { key: "piercing", href: "#" },
  { key: "frames_decor", href: "#" },
  { key: "accessories", href: "#" },
  { key: "gems", href: "#" }
];

type Props = { isOpen: boolean; onClose: () => void };

export default function Sidebar({ isOpen, onClose }: Props) {
  const { t } = useTranslation("sidebar");

  // bloquea el scroll del body cuando el sidebar está abierto
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-all duration-300 backdrop-blur-sm",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50",
          // ancho responsivo (solo layout)
          "w-[88vw] max-w-[320px] sm:w-[360px] sm:max-w-[360px] md:max-w-[400px]",
          // layout interno
          "bg-white shadow-lg transition-transform duration-300 font-afacad-local flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Header fijo (tamaños originales) */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between py-4 px-6 bg-primary text-white"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.5rem)" }}
        >
          <h2 className="font-sans text-2xl font-bold">{t("welcome")}</h2>
          <button onClick={onClose} aria-label={t("close") as string} className="-mr-2 p-2">
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* Lista scrollable (tamaños originales) */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="font-sans">
            {categories.map((category) => (
              <li
                key={category.key}
                className="py-4 px-6 text-[22px] text-primary/50 hover:bg-primary/25 transition-all duration-200"
              >
                <a href={category.href} className="flex items-center justify-between gap-3">
                  <span>{t(`categories.${category.key}`)}</span>
                  <FaAngleRight className="text-lg text-[#E0E0E0]" />
                </a>
              </li>
            ))}
          </ul>
          <div style={{ height: "env(safe-area-inset-bottom)" }} />
        </nav>
      </div>
    </>
  );
}
