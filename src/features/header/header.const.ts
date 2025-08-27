import type { NavItem } from "./header.types";

export const MAIN_NAV: Array<NavItem> = [
  { id: "home",     labelKey: "home", href: "/" },
  { id: "quote",    labelKey: "quote",     href: "/cotizar" },
  { id: "compare",  labelKey: "compare",   href: "/comparar" },
  { id: "blog",     labelKey: "blog",      href: "/blog" },
  { id: "stores",   labelKey: "stores",    href: "/tiendas" },
  { id: "about",    labelKey: "about",     href: "/nosotros" },
  { id: "contact",  labelKey: "contact",   href: "/contacto" },
];
