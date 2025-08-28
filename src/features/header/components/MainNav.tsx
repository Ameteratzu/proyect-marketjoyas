import { MAIN_NAV } from "@/features/header/header.const";
import { useTranslation } from "react-i18next";
import NavLink from "./NavLink";
import { PATHS } from "@/routes/paths";

export default function MainNav() {
  const { t } = useTranslation("header");

  return (
    <nav aria-label="Secundario" className="w-full bg-neutral/40">
      <div className="container-p py-4 flex items-center justify-center gap-12 md:gap-16">
        {MAIN_NAV.map((item) => (
          <NavLink
            key={item.id}
            to={item.href}
            end={item.href === PATHS.HOME}
          >
            {t(item.labelKey)}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
