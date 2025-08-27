import { MAIN_NAV } from "@/features/header/header.const";
import { useTranslation } from "react-i18next";
import NavLink from "./NavLink";
import { useMemo } from "react";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  // activo si coincide exactamente o si la ruta empieza con el href del item
  return pathname === href || pathname.startsWith(href + "/");
}

export default function MainNav() {
  const { t } = useTranslation("header");

  // pathname actual
  const pathname = useMemo(
    () => (typeof window !== "undefined" ? window.location.pathname : "/"),
    []
  );

  return (
    <nav aria-label="Secundario" className="w-full bg-neutral/40">
      <div className="container-p py-4 flex items-center justify-center gap-12 md:gap-16">
        {MAIN_NAV.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <NavLink key={item.id} href={item.href} active={active}>
              {t(item.labelKey)}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
