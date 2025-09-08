// Esto sirve para definir los tipos de datos que se utilizan en la página de comparación de productos.
export type CompareItem = {
  id: string;
  image?: string;
  name: string;
  price: string;
  avaibility: "in" | "out";
  rating: number;
  reviews?: number;
  category: string;
  material?: string;
  occasion?: string;
  gem: string;
  brand?: string;
};

export type CompareFeatureRow =
  | "price"
  | "avaibility"
  | "rating"
  | "category"
  | "material"
  | "occasion"
  | "gem"
  | "brand";
