import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  href: string;
};

export default function SocialLink(props: Props) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-dark hover:text-primary transition"
    >
      <span className="iconSocial">{props.icon}</span>
      <span className="text-sm">{props.label}</span>
    </a>
  );
}
