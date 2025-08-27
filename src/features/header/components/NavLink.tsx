import { cn } from "@/lib/cn";

type Props = {
  href: string;
  active?: boolean;
  children?: React.ReactNode;
};

export default function NavLink(props: Props) {
  const cls = cn(
    "text-xl transition-colors",
    props.active
      ? "text-accent-warm underline underline-offset-[10px] decoration-2"
      : "text-primary hover:opacity-90"
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
