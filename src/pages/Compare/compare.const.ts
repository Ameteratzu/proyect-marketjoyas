// Esto sirve para definir constantes y datos de ejemplo para la página de comparación de productos.
import type { CompareItem, CompareFeatureRow } from "./compare.types";

// Datos de ejemplo para comparar productos
export const FEATURES_ROWS: CompareFeatureRow[] = [
  "price",
  "availability",
  "rating",
  "category",
  "material",
  "occasion",
  "gem",
  "brand",
];

// MOCKS de prueba (luego enchufamos store/URL)
export const MOCK_ITEMS: CompareItem[] = [
  {
    id: "p-01",
    image: "https://picsum.photos/seed/j1/140/100",
    name: "Sortija Oro 18k",
    price: "S/ 3,990",
    availability: "in",
    rating: 4.6,
    reviews: 89,
    category: "Sortijas",
    material: "Oro 18k",
    occasion: "Matrimonio, Aniversario",
    gem: "Amatista",
    brand: "Joyería Antonio´s",
  },
  {
    id: "p-02",
    image: "https://picsum.photos/seed/j2/140/100",
    name: "Sortija Oro 18k princesa",
    price: "S/ 4,990",
    availability: "in",
    rating: 4.5,
    reviews: 120,
    category: "Sortijas",
    material: "Oro 18k",
    occasion: "Matrimonio, Aniversario",
    gem: "Diamante",
    brand: "Joyería Antonio´s",
  },
  {
    id: "p-03",
    image: "https://picsum.photos/seed/j3/140/100",
    name: "Solitaire Swarovski",
    price: "S/ 3,000",
    availability: "in",
    rating: 4.3,
    reviews: 46,
    category: "Sortijas",
    material: "Oro 18k",
    occasion: "Matrimonio",
    gem: "Swarovsky",
    brand: "Pandora",
  },
  {
    id: "p-04",
    image: "https://picsum.photos/seed/j4/140/100",
    name: "Aros Plata 950 Moissanita",
    price: "S/ 2,000",
    availability: "in",
    rating: 4.1,
    reviews: 39,
    category: "Aros",
    material: "Plata 950",
    occasion: "Compromiso",
    gem: "Moissanita",
    brand: "Renzo Costa",
  },
];
