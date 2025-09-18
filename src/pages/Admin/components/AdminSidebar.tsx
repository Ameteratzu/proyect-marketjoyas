import AdminNavItem from "./AdminNavItem";
import { useTranslation } from "react-i18next";
import {
  LuArrowLeftRight,
  LuRotateCcw,
} from "react-icons/lu";
import { FaHome, FaShoppingBag } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
import { FaBoxOpen } from 'react-icons/fa';
import { FaUserShield } from 'react-icons/fa';
import { FaBoxes } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { MdReviews } from 'react-icons/md';
import logo from "@/assets/logoMarketJoyasWhite.svg";
import { BiSolidReport } from 'react-icons/bi';

type Props = { collapsed: boolean };

export default function AdminSidebar({ collapsed }: Props) {
  const { t } = useTranslation("admin");

  return (
    <aside
      className={`bg-[#152425] text-white h-dvh sticky top-0 z-40 border-r border-white/10
        ${collapsed ? "w-[76px]" : "w-[260px]"} transition-all duration-300`}
    >
      {/* Header brand */}
  <div className="flex items-center justify-center gap-2 py-4">
        <div className="flex flex-col text-center gap-3">
          <img src={logo} alt="Centro Joyero" className="h-18 w-auto" />
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-xs font-display font-semibold bg-accent-warm text-dark inline-block px-4 py-0.5 rounded-full">
                {t("sidebar.plan.badge")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-2">
        <AdminNavItem
          to="/admin/principal"
          label={t("sidebar.dashboard")}
          Icon={FaHome}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/certificados"
          label={t("sidebar.certificates")}
          Icon={PiCertificateFill}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/productos"
          label={t("sidebar.products")}
          Icon={FaBoxOpen}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/suscripciones"
          label={t("sidebar.subscriptions")}
          Icon={FaCreditCard}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/pedidos"
          label={t("sidebar.orders")}
          Icon={FaShoppingBag}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/transacciones"
          label={t("sidebar.transactions")}
          Icon={LuArrowLeftRight}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/reembolsos"
          label={t("sidebar.refunds")}
          Icon={LuRotateCcw}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/opiniones"
          label={t("sidebar.reviews")}
          Icon={MdReviews}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/inventario"
          label={t("sidebar.inventory")}
          Icon={FaBoxes}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/clientes"
          label={t("sidebar.customers")}
          Icon={FaUsers}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/personal"
          label={t("sidebar.staff")}
          Icon={FaUserShield}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/reportes"
          label={t("sidebar.reports")}
          Icon={BiSolidReport}
          collapse={collapsed}
        />
      </nav>
    </aside>
  );
}
