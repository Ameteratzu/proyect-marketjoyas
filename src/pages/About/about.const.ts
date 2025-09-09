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
    image: "/src/assets/Especialidad1.jpg",
    titleKey: "specialties.clients.title",
    descKey: "specialties.clients.desc",
  },
  {
    id: "shipping",
    image: "/src/assets/Especialidad2.jpg",
    titleKey: "specialties.shipping.title",
    descKey: "specialties.shipping.desc",
  },
  {
    id: "deals",
    image: "/src/assets/Especialidad3.jpg",
    titleKey: "specialties.deals.title",
    descKey: "specialties.deals.desc",
  },
  {
    id: "brands",
    image: "/src/assets/Especialidad4.jpg",
    titleKey: "specialties.brands.title",
    descKey: "specialties.brands.desc",
  },
];
