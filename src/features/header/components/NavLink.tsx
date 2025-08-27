import { cn } from "@/lib/cn";

type Props = {
  href: string;
  active?: boolean;
  children?: React.ReactNode;
};

export default function NavLink(props: Props) {
  const base = "relative text-xl font-medium transition-colors duration-300";

  const activeCls = "text-accent-warm";
  const inactiveCls = "text-primary hover:text-accent-warm";

  const underline =
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accent-warm after:transition-all after:duration-300";

  const underlineActive = "after:w-full"; // subrayado completo fijo

  const underlineInactive = "after:w-0 hover:after:w-full"; // animación de expandir

  const cls = cn(
    base,
    props.active ? activeCls : inactiveCls,
    underline,
    props.active ? underlineActive : underlineInactive
  );

  return (
    <a
      href={props.href}
      className={cls}
      aria-current={props.active ? "page" : undefined}
    >
      {props.children}
    </a>
  );
}
