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
          "flex items-center gap-3 mt-5 px-3 py-2 rounded-lg transition-colors border border-black/15",
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
