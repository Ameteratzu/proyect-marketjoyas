import type { NavItem } from "./header.types";

export const MAIN_NAV: Array<NavItem> = [
  { id: "home",     label: "Principal", href: "/" },
  { id: "products", label: "Productos", href: "/productos" },
  { id: "quote",    label: "Cotizar",   href: "/cotizar" },
  { id: "compare",  label: "Comparar",  href: "/comparar" },
  { id: "blog",     label: "Blog",      href: "/blog" },
  { id: "stores",   label: "Tiendas",   href: "/tiendas" },
  { id: "about",    label: "Nosotros",  href: "/nosotros" },
  { id: "contact",  label: "Contacto",  href: "/contacto" },
];
