import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

type Props = {
  to: string;
  icon: ReactNode;
  label: string;
  end?: boolean;
};

export default function SidebarItem(props: Props) {
  return (
    <NavLink
      to={props.to}
      end={props.end}
      className={({ isActive }) =>
        cn(
      // móvil: item tipo "píldora" con ancho mínimo, scroll-snap y sin margen top
      // padding: reducimos padding derecho en móvil y centramos contenido
      "flex items-center gap-3 pl-3 pr-2 py-3 md:px-4 rounded-lg transition-colors border border-black/15 snap-start shrink-0 min-w-[68%] sm:min-w-[50%] md:min-w-0 md:w-full justify-center md:justify-start text-center md:text-left",
          // separar verticalmente solo en desktop
          "md:mt-5",
          isActive
            ? "bg-accent-warm/50 text-dark"
            : "text-neutral-700 hover:bg-accent-warm/15",
        )
      }
    >
    <span className="text-xl">{props.icon}</span>
    <span className="font-medium">{props.label}</span>
    </NavLink>
  );
}
