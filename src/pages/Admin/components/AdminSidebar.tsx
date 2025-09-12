import AdminNavItem from "./AdminNavItem";
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
                Plata Mensual
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-2">
        <AdminNavItem
          to="/admin/principal"
          label="Panel principal"
          Icon={FaHome}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/certificados"
          label="Certificados"
          Icon={PiCertificateFill}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/productos"
          label="Productos"
          Icon={FaBoxOpen}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/suscripciones"
          label="Suscripciones"
          Icon={FaCreditCard}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/pedidos"
          label="Pedidos"
          Icon={FaShoppingBag}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/transacciones"
          label="Transacciones"
          Icon={LuArrowLeftRight}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/reembolsos"
          label="Reembolsos"
          Icon={LuRotateCcw}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/opiniones"
          label="Opiniones"
          Icon={MdReviews}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/inventario"
          label="Inventario"
          Icon={FaBoxes}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/clientes"
          label="Clientes"
          Icon={FaUsers}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/personal"
          label="Personal"
          Icon={FaUserShield}
          collapse={collapsed}
        />
        <AdminNavItem
          to="/admin/reportes"
          label="Reportes"
          Icon={BiSolidReport}
          collapse={collapsed}
        />
      </nav>
    </aside>
  );
}
