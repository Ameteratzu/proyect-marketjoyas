// Definimos aca las constantes y tipos relacionados con las especialidades
import img1 from "@/assets/about/Especialidad1.png";
import img2 from "@/assets/about/Especialidad2.png";
import img3 from "@/assets/about/Especialidad3.png";
import img4 from "@/assets/about/Especialidad4.png";

export type Specialty = {
  id: string;
  image: string;
  titleKey: string;
  descKey: string;
};

export const SPECIALTIES: Specialty[] = [
  {
    id: "clients",
    image: img1,
    titleKey: "specialties.clients.title",
    descKey: "specialties.clients.desc",
  },
  {
    id: "shipping",
    image: img2,
    titleKey: "specialties.shipping.title",
    descKey: "specialties.shipping.desc",
  },
  {
    id: "deals",
    image: img3,
    titleKey: "specialties.deals.title",
    descKey: "specialties.deals.desc",
  },
  {
    id: "brands",
    image: img4,
    titleKey: "specialties.brands.title",
    descKey: "specialties.brands.desc",
  },
];
