// Estos sirve para manejar los links del footer, si es interno usa Link de react-router-dom, si es externo usa <a>
import { Link } from "react-router-dom";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
};

export default function FooterLink({
  href,
  children,
  className,
  title,
}: Props) {
  const internal = href.startsWith("/");

  return internal ? (
    <Link to={href} className={className} title={title}>
      {children}
    </Link>
  ) : (
    <a
      href={href}
      className={className}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
