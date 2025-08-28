import { NavLink as RRNavLink } from "react-router-dom";
import { cn } from "@/lib/cn";

type Props = {
  to: string;
  children?: React.ReactNode;
  end?: boolean;
};

export default function NavLink(props: Props) {
  return (
    <RRNavLink
      to={props.to}
      end={props.end}
      className={({ isActive }) =>
        cn(
          "relative text-xl font-medium transition-colors duration-300",
          isActive ? "text-accent-warm" : "text-primary hover:text-accent-warm",
          // underline: desde el centro con animación
          "after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:bg-accent-warm after:transition-transform after:duration-300 after:-translate-x-1/2 after:origin-center after:w-full",
          isActive
            ? "after:scale-x-100"
            : "after:scale-x-0 hover:after:scale-x-100"
        )
      }
    >
      {props.children}
    </RRNavLink>
  );
}
