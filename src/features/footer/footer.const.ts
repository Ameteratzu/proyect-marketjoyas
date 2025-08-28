// Esto sirve para 
import type { FooterGroup } from "./footer.types";

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    id: "account",
    titleKey: "account.title",
    items: [
      { labelKey: "account.profile", href: "/cuenta" },
      { labelKey: "account.store", href: "/mi-tienda" },
      { labelKey: "account.cart", href: "/carrito" },
      { labelKey: "account.privacy", href: "/legal/politica-privacidad" },
    ],
  },
  {
    id: "info",
    titleKey: "info.title",
    items: [
      { labelKey: "info.about", href: "/nosotros" },
      { labelKey: "info.refund", href: "/legal/reembolsos" },
      { labelKey: "info.claimBook", href: "/legal/libro-reclamaciones" },
    ],
  },
];
