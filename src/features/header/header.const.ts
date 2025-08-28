// Esto sirve para definir las rutas principales del header
import { PATHS } from "@/routes/paths";
import type { NavItem } from "./header.types";

export const MAIN_NAV: Array<NavItem> = [
  { id: "home",    labelKey: "home",    href: PATHS.HOME },
  { id: "quote",   labelKey: "quote",   href: PATHS.QUOTE },
  { id: "compare", labelKey: "compare", href: PATHS.COMPARE },
  { id: "blog",    labelKey: "blog",    href: PATHS.BLOG },
  { id: "stores",  labelKey: "stores",  href: PATHS.STORES },
  { id: "about",   labelKey: "about",   href: PATHS.ABOUT },
  { id: "contact", labelKey: "contact", href: PATHS.CONTACT },
];