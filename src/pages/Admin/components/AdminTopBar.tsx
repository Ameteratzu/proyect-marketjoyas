import {
  LuBell,
  LuGlobe,
  LuStore,
  LuPanelLeftClose,
  LuPanelLeftOpen,
} from "react-icons/lu";
import AdminUserMenu from "./AdminUserMenu";

type Props = { collapsed: boolean; onToggle: () => void };

export default function AdminTopbar({ collapsed, onToggle }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-bg-light/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full flex h-16 items-center gap-3 pl-4 pr-4 sm:pr-6 lg:pr-8">
        {/* Toggle sidebar al inicio */}
        <button
          onClick={onToggle}
          className="rounded-xl border border-black/10 bg-white px-3 py-2 text-graphite hover:bg-neutral/50 flex items-center gap-2 shrink-0 cursor-pointer"
          aria-label="Alternar sidebar"
        >
          {collapsed ? (
            <LuPanelLeftOpen className="h-5 w-5" />
          ) : (
            <LuPanelLeftClose className="h-5 w-5" />
          )}
        </button>

        {/* Espaciador flexible para empujar acciones a la derecha */}
        <div className="ml-auto flex items-center gap-2">
          {/* Notificaciones (con desplegable simple más adelante) */}
          <button className="rounded-xl border border-black/10 bg-white px-3 py-2 text-graphite hover:bg-neutral/50">
            <LuBell className="h-5 w-5" />
          </button>

          {/* Visitar sitio */}
          <a
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-neutral/50"
          >
            <LuGlobe className="h-4 w-4" />
            Visitar Sitio
          </a>

          {/* Tienda */}
          <a
            href="/tiendas"
            className="hidden sm:flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-neutral/50"
          >
            <LuStore className="h-4 w-4" />
            Tienda
          </a>

          {/* Selector idioma mock (ES) */}
          <button className="hidden sm:flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-neutral/50">
            <img
              alt="ES"
              src="https://flagcdn.com/w20/pe.png"
              className="h-4 w-5"
            />
            ES
            <span className="i-[heroicons-outline:chevron-down] w-4 h-4" />
          </button>

          <AdminUserMenu />
        </div>
      </div>
    </header>
  );
}
