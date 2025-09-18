import { useRef, useState } from "react";
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
import { useSelector } from "react-redux";
import type { RootState } from "../../common/store/store";

import Sidebar from "./components/Sidebar";
import AuthModal from "../../common/components/AuthModal";


export default function Header() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  // Sentinel y hooks de scroll
  const sentinelRef = useRef<HTMLDivElement>(null);
  const headerVisible = useOnScreen(sentinelRef, "-100px");
  const hideBecauseScrollingDown = useHideOnScroll(12);
  const showFloatingBar = !headerVisible && !hideBecauseScrollingDown;
  const user = useSelector((state: RootState) => state.user.user);


  return (
    <>
      {/* ===== Header ===== */}
      <header role="banner" className="bg-bg-light shadow-2xl">
        <TopBar />
        <Container className="py-4 flex items-center justify-between gap-6">
          <div className="container-p py-3 md:py-4">
            {/* mobile: fila superior */}
            <div className="flex items-center justify-between md:hidden gap-3">
              {/* 👈 Pasa la función para abrir el sidebar al hacer clic */}
              <CategoryTrigger onClick={() => setIsSidebarOpen(true)} />
              <Logo />
              <Actions onLoginClick={() => setOpenAuth(true)} user={user?.user} />

            </div>
            {/* ... el resto del código del header ... */}
            <div className="mt-3 md:hidden">
              <SearchBar />
            </div>
            <div className="hidden md:flex items-center justify-between gap-6">
              <Logo />
              {/* 👈 Pasa la función para abrir el sidebar en desktop */}
              <CategoryTrigger onClick={() => setIsSidebarOpen(true)} />
              <SearchBar />
              <Actions onLoginClick={() => setOpenAuth(true)} user={user?.user} />

            </div>
          </div>
        </Container>
        <MainNav />
      </header>

      {/* ... el resto de tu código para la barra flotante ... */}
      <div ref={sentinelRef} aria-hidden className="h-1" />
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-bg-light shadow-2xl transition-transform duration-300",
          showFloatingBar ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container-p py-3 md:py-4">
          <div className="flex items-center justify-between md:hidden gap-3">
            {/* 👈 Pasa la función para abrir el sidebar en la barra flotante móvil */}
            <CategoryTrigger onClick={() => setIsSidebarOpen(true)} />
            <Logo />
            <Actions onLoginClick={() => setOpenAuth(true)} user={user?.user} />

          </div>
          <div className="mt-3 md:hidden">
            <SearchBar />
          </div>
          <div className="hidden md:flex items-center justify-between gap-6">
            <Logo />
            {/* 👈 Pasa la función para abrir el sidebar en la barra flotante desktop */}
            <CategoryTrigger onClick={() => setIsSidebarOpen(true)} />
            <SearchBar />
            <Actions onLoginClick={() => setOpenAuth(true)} user={user?.user} />

          </div>
        </div>
      </div>

      {/* 👈 Renderiza el Sidebar y pasa el estado y la función para cerrarlo */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
    </>

  );

}
