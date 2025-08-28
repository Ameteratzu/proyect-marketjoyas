import { useRef } from "react";
import Container from "@/components/Container";
import TopBar from "@/features/header/components/TopBar";
import Logo from "@/features/header/components/Logo";
import CategoryTrigger from "@/features/header/components/CategoryTrigger";
import SearchBar from "@/features/header/components/SearchBar";
import Actions from "@/features/header/components/Action";
import MainNav from "./components/MainNav";

import useHideOnScroll from "@/hooks/useHideOnScroll";
import useOnScreen from "@/hooks/useOnScreen";
import { cn } from "@/lib/cn";

export default function Header() {
  // Sentinel para saber si el header normal está visible en viewport
  const sentinelRef = useRef<HTMLDivElement>(null);
  const headerVisible = useOnScreen(sentinelRef, "-100px");

  // Ocultar barra flotante si el scroll va hacia abajo
  const hideBecauseScrollingDown = useHideOnScroll(12);

  // Mostrar barra flotante solo si NO se ve el header normal y vamos hacia arriba
  const showFloatingBar = !headerVisible && !hideBecauseScrollingDown;

  return (
    <>
      {/* ===== Header NORMAL (no sticky) ===== */}
      <header role="banner" className="bg-bg-light shadow-2xl">
        <TopBar />

        <Container className="py-4 flex items-center justify-between gap-6">
          <div className="container-p py-3 md:py-4">
            {/* mobile: fila superior */}
            <div className="flex items-center justify-between md:hidden gap-3">
              <CategoryTrigger />
              <Logo />
              <Actions />
            </div>

            {/* búsqueda mobile (2ª fila) */}
            <div className="mt-3 md:hidden">
              <SearchBar />
            </div>

            {/* desktop */}
            <div className="hidden md:flex items-center justify-between gap-6">
              <Logo />
              <CategoryTrigger />
              <SearchBar />
              <Actions />
            </div>
          </div>
        </Container>

        <MainNav />
      </header>

      {/* Cuando esto sale del viewport, sabemos que el header ya no se ve */}
      <div ref={sentinelRef} aria-hidden className="h-1" />

      {/* ===== Barra FLOTANTE: solo la fila roja (logo + products + search + actions) ===== */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-bg-light shadow-2xl transition-transform duration-300",
          showFloatingBar ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container-p py-3 md:py-4">
          {/* móvil: MISMA DISPOSICIÓN que arriba */}
          <div className="flex items-center justify-between md:hidden gap-3">
            <CategoryTrigger />
            <Logo />
            <Actions />
          </div>
          <div className="mt-3 md:hidden">
            <SearchBar />
          </div>

          {/* desktop */}
          <div className="hidden md:flex items-center justify-between gap-6">
            <Logo />
            <CategoryTrigger />
            <SearchBar />
            <Actions />
          </div>
        </div>
      </div>
    </>
  );
}
