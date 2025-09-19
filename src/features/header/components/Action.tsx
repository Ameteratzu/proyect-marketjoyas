import { FiUser } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import VisuallyHidden from "@/components/VisuallyHidden";
import { useTranslation } from "react-i18next";
import { logout } from "../../../common/store/user.slice";
import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";

type Props = {
  onLoginClick?: () => void;
  user?: { fullName: string } | null;
};

export default function Actions({ onLoginClick, user }: Props) {
  const { t } = useTranslation("header");
  const dispatch = useDispatch();
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
        >
          <FiUser className="iconSocial md:iconPrincipal" />
          <span className="hidden md:inline text-[20px] md:text-[24px] font-semibold">
            {user ? `Hola, ${displayName}` : t("login")}
          </span>
          <VisuallyHidden>{user ? `Hola, ${displayName}` : t("login")}</VisuallyHidden>
        </button>

        {user && menuOpen && (
          <div className="absolute top-full mt-2 right-0 bg-white border rounded shadow-md z-10">
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
              onClick={() => dispatch(logout())}
            >
              Cerrar sesión
            </button>
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
