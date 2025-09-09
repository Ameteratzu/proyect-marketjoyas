// Definimos aca las constantes y tipos relacionados con las especialidades
export type Specialty = {
  id: string;
  image?: string;
  titleKey: string;
  descKey: string;
};

export const SPECIALTIES: Specialty[] = [
  {
    id: "clients",
    image: "/src/assets/about/Especialidad1.png",
    titleKey: "specialties.clients.title",
    descKey: "specialties.clients.desc",
  },
  {
    id: "shipping",
    image: "/src/assets/about/Especialidad2.png",
    titleKey: "specialties.shipping.title",
    descKey: "specialties.shipping.desc",
  },
  {
    id: "deals",
    image: "/src/assets/about/Especialidad3.png",
    titleKey: "specialties.deals.title",
    descKey: "specialties.deals.desc",
  },
  {
    id: "brands",
    image: "/src/assets/about/Especialidad4.png",
    titleKey: "specialties.brands.title",
    descKey: "specialties.brands.desc",
  },
];
