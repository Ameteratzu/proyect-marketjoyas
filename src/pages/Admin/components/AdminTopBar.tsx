import {
  LuBell,
  LuGlobe,
  LuStore,
  LuPanelLeftClose,
  LuPanelLeftOpen,
} from "react-icons/lu";
import AdminUserMenu from "./AdminUserMenu";
import { RiArrowDownSFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = { collapsed: boolean; onToggle: () => void };

type Notification = {
  id: string;
  title: string;
  description?: string;
  time: string; // texto corto (hace 2h, etc.)
  unread?: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Nuevo pedido",
    description: "Pedido #10234 recibido",
    time: "hace 2m",
    unread: true,
  },
  {
    id: "2",
    title: "Suscripción renovada",
    description: "Plan Oro - Cliente Ana",
    time: "hace 25m",
  },
  {
    id: "3",
    title: "Reembolso completado",
    description: "Pedido #10198",
    time: "hace 1h",
  },
];

export default function AdminTopbar({ collapsed, onToggle }: Props) {
  const [openNotif, setOpenNotif] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);
  const { t, i18n } = useTranslation("admin");

  // Cerrar al hacer clic fuera para ambos menús
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node) &&
        openNotif
      ) {
        setOpenNotif(false);
      }
      if (
        langRef.current &&
        !langRef.current.contains(e.target as Node) &&
        openLang
      ) {
        setOpenLang(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenNotif(false);
        setOpenLang(false);
      }
    }
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKey);
    };
  }, [openNotif, openLang]);

  const currentLng = i18n.language.startsWith("en") ? "en" : "es";
  const languages = [
    {
      code: "es",
      label: t("topbar.languages.es"),
      flag: "https://flagcdn.com/w20/pe.png",
    },
    {
      code: "en",
      label: t("topbar.languages.en"),
      flag: "https://flagcdn.com/w20/us.png",
    },
  ];
  const activeLang = languages.find((l) => l.code === currentLng)!;
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
            <LuPanelLeftOpen className="h-8 w-5" />
          ) : (
            <LuPanelLeftClose className="h-8 w-5" />
          )}
        </button>

        {/* Espaciador flexible para empujar acciones a la derecha */}
        <div className="ml-auto flex items-center gap-2">
          {/* Notificaciones */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setOpenNotif((v) => !v)}
              aria-haspopup="true"
              aria-expanded={openNotif}
              className="flex items-center gap-1 cursor-pointer rounded-xl border border-black/10 bg-white px-3 py-2 text-graphite hover:bg-neutral/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <span className="relative">
                <LuBell className="h-5 w-5" />
                {MOCK_NOTIFICATIONS.some((n) => n.unread) && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-white" />
                )}
              </span>
              <RiArrowDownSFill
                className={`h-4 w-4 transition-transform ${
                  openNotif ? "rotate-180" : ""
                }`}
              />
            </button>
            {openNotif && (
              <div
                role="menu"
                aria-label="Notificaciones"
                className="absolute right-0 mt-2 w-80 max-h-[70vh] overflow-auto rounded-xl border border-black/10 bg-white shadow-lg p-2 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2"
              >
                <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-neutral/60">
                  <p className="text-sm font-medium">{t("topbar.notifications")}</p>
                  <button
                    onClick={() => setOpenNotif(false)}
                    className="text-xs text-graphite/70 hover:text-primary cursor-pointer"
                  >
                    {t("topbar.notifications.close")}
                  </button>
                </div>
                {MOCK_NOTIFICATIONS.length === 0 && (
                  <p className="text-xs text-graphite/60 px-2 py-4 text-center">
                    {t("topbar.notifications.empty")}
                  </p>
                )}
                {MOCK_NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className={`rounded-lg px-3 py-2 text-sm flex flex-col gap-0.5 border border-transparent hover:border-neutral/60 cursor-pointer transition bg-neutral/30 ${
                      n.unread ? "outline outline-primary/40" : ""
                    }`}
                  >
                    <span className="font-medium leading-tight">{n.title}</span>
                    {n.description && (
                      <span className="text-xs text-graphite/70 leading-tight">
                        {n.description}
                      </span>
                    )}
                    <span className="text-[10px] uppercase tracking-wide text-graphite/50">
                      {n.time}
                    </span>
                  </div>
                ))}
                <div className="pt-1 border-t border-neutral/60 mt-1">
                  <button className="w-full text-xs font-medium text-primary hover:underline py-1.5 rounded-lg cursor-pointer">
                    {t("topbar.notifications.viewAll")}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Visitar sitio */}
          <a
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-neutral/50"
          >
            <LuGlobe className="h-4 w-4" />
            {t("topbar.visitSite")}
          </a>

          {/* Tienda */}
          <a
            href="/tiendas"
            target="_blank"
            className="hidden sm:flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-neutral/50"
          >
            <LuStore className="h-4 w-4" />
            {t("topbar.store")}
          </a>

          {/* Selector idioma */}
          <div className="relative hidden sm:block" ref={langRef}>
            <button
              onClick={() => setOpenLang((v) => !v)}
              aria-haspopup="true"
              aria-expanded={openLang}
              className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-neutral/50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <img
                alt={activeLang.code.toUpperCase()}
                src={activeLang.flag}
                className="h-4 w-5"
              />
              {activeLang.code.toUpperCase()}
              <RiArrowDownSFill
                className={`h-4 w-4 transition-transform ${
                  openLang ? "rotate-180" : ""
                }`}
              />
            </button>
            {openLang && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-black/10 bg-white shadow-lg py-2 text-sm flex flex-col animate-in fade-in slide-in-from-top-2">
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => {
                      i18n.changeLanguage(lng.code);
                      setOpenLang(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-neutral/50 cursor-pointer ${
                      lng.code === currentLng ? "bg-neutral/30 font-medium" : ""
                    }`}
                  >
                    <img
                      alt={lng.code.toUpperCase()}
                      src={lng.flag}
                      className="h-4 w-5"
                    />
                    <span className="flex-1">{lng.label}</span>
                    {lng.code === currentLng && (
                      <span className="i-[heroicons-outline:check] w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <AdminUserMenu />
        </div>
      </div>
    </header>
  );
}
