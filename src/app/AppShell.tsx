import Footer from "@/features/footer/Footer";
import Header from "@/features/header/Header";
import ScrollToTop from "@/routes/ScrollToTop";
import ScrollTopBtn from "@/components/ScrollTopBtn";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/common/store/user.slice";
import { setAuthToken } from "@/common/api/http";

type Props = { children: React.ReactNode };

export default function AppShell(props: Props) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // Si venimos de un logout, limpiar sesión una vez ya estamos en inicio
  useEffect(() => {
    if (pathname === "/" && sessionStorage.getItem("pendingLogout") === "1") {
      try {
        const rememberedEmail = localStorage.getItem("rememberEmail");
        localStorage.clear();
        if (rememberedEmail) localStorage.setItem("rememberEmail", rememberedEmail);
      } finally {
        // limpiar auth en cliente
        setAuthToken(null);
        dispatch(logout());
        sessionStorage.removeItem("pendingLogout");
      }
    }
  }, [pathname, dispatch]);
  return (
    <div className="min-h-dvh bg-fondo text-oscuro">
      <Header />
      <ScrollToTop />
      <ScrollTopBtn />
      <main id="content">{props.children}</main>
      <Footer />
    </div>
  );
}
