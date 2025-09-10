// Esto sirve para simular datos de detalle de tiendas
import type { Store } from "./stores.type";
import antonio from "@/assets/Shops/antonio.svg";
import norma from "@/assets/Shops/norma.svg";
import logoPandora from "@/assets/products/logo_pandora.png";
import productImg from "@/assets/producto-compare.jpg";

export type StoreDetail = Store & {
  contacts: {
    address1?: string;
    address2?: string;
    email?: string;
    phone?: string;
  };
  products: Array<{
    id: string;
    name: string;
    image?: string;
    price: string;
    oldPrice?: string;
    brandLogo?: string;
  }>;
  reviewsList: Array<{
    id: string;
    user: string;
    avatar?: string;
    rating: number;
    date: string;
    text: string;
  }>;
};

export const STORE_DETAILS: Record<string, StoreDetail> = {
  "joyeria-antonios": {
    id: "antonios-1",
    slug: "joyeria-antonios",
    name: "Joyería Antonio’s",
    logo: antonio,
    rating: 5,
    reviews: 4,
    contacts: {
      address1: "Jirón de la Unión 739 - Cercado de Lima, Lima, Perú",
      address2: "Jirón Huallaga 160 - Cercado de Lima, Lima, Perú",
      email: "omarantonio_ct@hotmail.com",
      phone: "+51 984 725 804",
    },
    products: [
      {
        id: "p1",
        name: "Aros de matrimonio Oro 18k 10 gramos",
        image: productImg,
        price: "S/3,990",
        oldPrice: "S/4,990",
        brandLogo: antonio,
      },
      {
        id: "p2",
        name: "Aros de matrimonio Oro 18k 10 gramos",
        image: productImg,
        price: "S/3,990",
        oldPrice: "S/4,990",
        brandLogo: antonio,
      },
      {
        id: "p3",
        name: "Aros de matrimonio Oro 18k 10 gramos",
        image: productImg,
        price: "S/3,990",
        oldPrice: "S/4,990",
        brandLogo: antonio,
      },
      {
        id: "p4",
        name: "Aros de matrimonio Oro 18k 10 gramos",
        image: productImg,
        price: "S/3,990",
        oldPrice: "S/4,990",
        brandLogo: antonio,
      },
    ],
    reviewsList: [
      {
        id: "r1",
        user: "Emmanuel Gazmey",
        rating: 5,
        date: "2025-03-26",
        text: "Está muy vacano, estas joyas brr.",
      },
      {
        id: "r2",
        user: "Evaluna Montanner",
        rating: 5,
        date: "2025-03-26",
        text: "Muy bonito, lo regalé a mi esposa. ¡Gracias Market!",
      },
    ],
  },
  "joyeria-norma": {
    id: "norma-1",
    slug: "joyeria-norma",
    name: "Joyería Norma",
    logo: norma,
    rating: 4.6,
    reviews: 89,
    contacts: {
      address1: "Av. Principal 123 - Lima, Perú",
      email: "contacto@norma.pe",
      phone: "+51 900 000 000",
    },
    products: [
      {
        id: "p1",
        name: "Sortija Oro 18k princesa",
        image: productImg,
        price: "S/4,990",
        brandLogo: norma,
      },
      {
        id: "p2",
        name: "Aros plata 950 moissanita",
        image: productImg,
        price: "S/2,000",
        brandLogo: norma,
      },
    ],
    reviewsList: [
      {
        id: "r1",
        user: "Cliente Feliz",
        rating: 5,
        date: "2025-02-10",
        text: "Llegó rápido y muy bonito.",
      },
    ],
  },
  pandora: {
    id: "pandora-1",
    slug: "pandora",
    name: "Pandora",
    logo: logoPandora,
    rating: 4.9,
    reviews: 321,
    contacts: {
      address1: "Centro Comercial X, Lima",
      email: "contacto@pandora.pe",
      phone: "+51 111 222 333",
    },
    products: [
      {
        id: "p1",
        name: "Pulsera Pandora Plata 925",
        image: productImg,
        price: "S/850",
        brandLogo: logoPandora,
      },
    ],
    reviewsList: [],
  },
};
