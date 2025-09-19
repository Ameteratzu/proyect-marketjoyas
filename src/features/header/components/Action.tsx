import { FiUser, FiLogOut } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import VisuallyHidden from "@/components/VisuallyHidden";
import { useTranslation } from "react-i18next";
//
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { setAuthToken } from "@/common/api/http";
import { useDispatch } from "react-redux";
import { logout } from "@/common/store/user.slice";

type Props = {
  onLoginClick?: () => void;
  user?: { fullName: string } | null;
};

export default function Actions({ onLoginClick, user }: Props) {
  const { t } = useTranslation("header");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar con tecla Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const base =
    "inline-flex items-center gap-2 text-primary hover:text-primary/75 hover:opacity-90 cursor-pointer transition-all duration-300";

  // Tomar solo el primer nombre si existe (sin fallback a login aquí)
  const displayName = user?.fullName?.trim()
    ? user.fullName.trim().split(/\s+/)[0]
    : "";

  return (
    <div className="flex items-center gap-3 md:gap-4">
      <div className="relative flex items-center gap-2" ref={menuRef}>
        <button
          type="button"
          className={base}
          onClick={user ? () => setMenuOpen(!menuOpen) : onLoginClick}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls="user-menu"
        >
          <FiUser className="iconSocial md:iconPrincipal" />
          <span className="hidden md:inline text-[20px] md:text-[24px] font-semibold">
            {user ? `Hola, ${displayName}` : t("login")}
          </span>
          <VisuallyHidden>
            {user ? `Hola, ${displayName}` : t("login")}
          </VisuallyHidden>
        </button>

        {user && menuOpen && (
          <div
            id="user-menu"
            role="menu"
            className="absolute right-0 top-full mt-3 w-56 origin-top-right rounded-xl border border-gray-200 bg-white/80 backdrop-blur-md shadow-lg ring-1 ring-black/5 z-20 animate-dropdown-in"
          >
            {/* Flecha del menú */}
            <div
              className="absolute -top-2.5 right-6 h-4 w-4 rotate-45 bg-white/80 border-t border-l border-gray-200"
              aria-hidden="true"
            />

            <div className="py-2">
              <Link
                to="/cuenta"
                role="menuitem"
                className="flex items-center gap-3 px-4 py-2 text-sm text-dark hover:bg-primary/10 hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <FiUser className="w-4 h-4" />
                <span>Mi Perfil</span>
              </Link>

              <div className="my-1 h-px bg-gray-100" />

              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-left text-dark hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                onClick={() => {
                  setMenuOpen(false);
                  if (pathname === "/") {
                    try {
                      const rememberedEmail = localStorage.getItem("rememberEmail");
                      localStorage.clear();
                      if (rememberedEmail) localStorage.setItem("rememberEmail", rememberedEmail);
                    } finally {
                      setAuthToken(null);
                      dispatch(logout());
                    }
                  } else {
                    // usar misma estrategia: bandera + navegación primero
                    sessionStorage.setItem("pendingLogout", "1");
                    navigate("/", { replace: true });
                  }
                }}
              >
                <FiLogOut className="w-4 h-4" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <button type="button" className={base}>
        <MdFavoriteBorder className="iconSocial md:iconPrincipal" />
        <span className="hidden md:inline text-[20px] md:text-[24px] font-semibold">
          {t("favorites")}
        </span>
        <VisuallyHidden>{t("favorites")}</VisuallyHidden>
      </button>
    </div>
  );
}
