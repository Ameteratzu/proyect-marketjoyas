// Esto sirve para los items del sidebar de admin
import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons";
import { cn } from "@/lib/cn";

type Props = {
  to: string;
  label: string;
  Icon: IconType;
  collapse?: boolean; // para sidebar colapsado
};

export default function AdminNavItem({ to, label, Icon, collapse }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors",
          isActive
            ? "bg-primary text-white"
            : "text-white/80 hover:text-white hover:bg-primary/35"
        )
      }
      aria-label={label}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapse && <span className="truncate">{label}</span>}
    </NavLink>
  );
}
