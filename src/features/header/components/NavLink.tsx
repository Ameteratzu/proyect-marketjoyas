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
    "after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:bg-accent-warm after:transition-transform after:duration-300 after:-translate-x-1/2 after:origin-center";

  const underlineActive = "after:w-full after:scale-x-100";
  const underlineInactive = "after:w-full after:scale-x-0 hover:after:scale-x-100";

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
