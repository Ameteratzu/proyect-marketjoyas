// esto sirve para simular una base de datos
import type { Store } from "./stores.type";
import antonio from "@/assets/Shops/antonio.svg";
import norma from "@/assets/Shops/norma.svg";
import logoPandora from "@/assets/products/logo_pandora.png";

export const ALL_STORES: Store[] = [
  {
    id: "antonios-1",
    slug: "joyeria-antonios",
    name: "Joyería Antonio’s",
    logo: antonio,
    rating: 4.8,
    reviews: 112,
  },
  {
    id: "norma-1",
    slug: "joyeria-norma",
    name: "Joyería Norma",
    logo: norma,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "pandora-1",
    slug: "pandora",
    name: "Pandora",
    logo: logoPandora,
    rating: 4.9,
    reviews: 321,
  },
  {
    id: "antonios-2",
    slug: "joyeria-antonios",
    name: "Joyería Antonio’s",
    logo: antonio,
    rating: 4.8,
    reviews: 112,
  },
  {
    id: "norma-2",
    slug: "joyeria-norma",
    name: "Joyería Norma",
    logo: norma,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "pandora-2",
    slug: "pandora",
    name: "Pandora",
    logo: logoPandora,
    rating: 4.9,
    reviews: 321,
  },
  {
    id: "antonios-3",
    slug: "joyeria-antonios",
    name: "Joyería Antonio’s",
    logo: antonio,
    rating: 4.8,
    reviews: 112,
  },
  {
    id: "norma-3",
    slug: "joyeria-norma",
    name: "Joyería Norma",
    logo: norma,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "pandora-3",
    slug: "pandora",
    name: "Pandora",
    logo: logoPandora,
    rating: 4.9,
    reviews: 321,
  },
  {
    id: "antonios-4",
    slug: "joyeria-antonios",
    name: "Joyería Antonio’s",
    logo: antonio,
    rating: 4.8,
    reviews: 112,
  },
];
