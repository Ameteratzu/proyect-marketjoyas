import { useMemo } from "react";
import {
  LuUser,
  LuShoppingBag,
  LuMapPin,
  LuHeart,
  LuLogOut,
  LuCamera,
} from "react-icons/lu";
import { FiHelpCircle } from 'react-icons/fi';
import SidebarItem from "./SidebarItem";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getUiUser } from "../utils";
//

export default function AccountSidebar() {
  const { t } = useTranslation("account");
  const user = useMemo(() => getUiUser(), []);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
      {/* Header avatar grande + pedidos totales debajo */}
      <div className="flex flex-col items-center pb-6 border-b border-neutral-200">
        {/* Avatar (placeholder con iniciales) */}
        <div className="relative">
          <div className="h-32 w-32 rounded-full bg-neutral-100 grid place-items-center text-3xl font-semibold overflow-hidden">
            <span>{user.initials}</span>
          </div>
          {/* Botón cámara  */}
          <button
            type="button"
            className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-accent-warm text-dark grid place-items-center shadow ring-1 ring-black/10 border border-white cursor-pointer"
            onClick={(e) => e.preventDefault()}
            aria-label="Cambiar foto de perfil"
            title="Cambiar foto de perfil"
          >
            <LuCamera className="h-4 w-4" />
          </button>
        </div>

        {/* Pedidos totales */}
        <p className="mt-4 text-sm text-neutral-600">
          {t("ordersTotal")}{" "}
          <span className="text-neutral-900 font-medium">
            {user.ordersCount}
          </span>
        </p>
      </div>

  {/* Menu: horizontal scroll en móvil, vertical en desktop */}
  <nav className="mt-6 flex gap-3 overflow-x-auto pb-2 -mx-0 px-6 snap-x md:block md:space-y-2 md:overflow-visible md:px-0 md:mx-0">
        <SidebarItem
          to="/cuenta"
          icon={<LuUser />}
          label={t("menu.info")}
          end
        />
        <SidebarItem
          to="/cuenta/pedidos"
          icon={<LuShoppingBag />}
          label={t("menu.orders")}
        />
        <SidebarItem
          to="/cuenta/direccion"
          icon={<LuMapPin />}
          label={t("menu.address")}
        />
        <SidebarItem
          to="/cuenta/favoritos"
          icon={<LuHeart />}
          label={t("menu.favorites")}
        />
        <SidebarItem
          to="/cuenta/ayuda"
          icon={<FiHelpCircle />}
          label={t("menu.help")}
        />
      </nav>

      {/* Cerrar sesión */}
      <div className="pt-6 mt-6 border-t border-neutral-200">
        <NavLink
          to="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
          onClick={(e) => {
            e.preventDefault();
            // Colocar bandera y navegar primero
            sessionStorage.setItem("pendingLogout", "1");
            navigate("/", { replace: true });
          }}
        >
          <LuLogOut className="text-xl" />
          <span>{t("menu.logout")}</span>
        </NavLink>
      </div>
    </div>
  );
}
