export type Store = {
  id: string;
  name: string; // Nombre de la tienda
  href: string; // Enlace a la tienda
  logo?: string; // Logo de la tienda
};

import store1 from "@/assets/Shops/antonio.svg";
import store2 from "@/assets/Shops/norma.svg";

export const STORES: Store[] = [
  {
    id: "norma",
    name: "Joyería Norma",
    href: "/tienda/norma",
    logo: store2,
  },
  {
    id: "antonio",
    name: "Joyería Antonio",
    href: "/tienda/antonio",
    logo: store1,
  },
  {
    id: "norma",
    name: "Joyería Norma1",
    href: "/tienda/norma",
    logo: store2,
  },
  {
    id: "antonio",
    name: "Joyería Antonio1",
    href: "/tienda/antonio",
    logo: store1,
  },
  {
    id: "norma",
    name: "Joyería Norma2",
    href: "/tienda/norma",
    logo: store2,
  },
  {
    id: "antonio",
    name: "Joyería Antonio2",
    href: "/tienda/antonio",
    logo: store1,
  },
];
