// esto sirve para definir los tipos de datos de las tiendas
export type StoreId = string;

export type Store = {
  id: StoreId;
  slug: string;
  name: string;
  logo?: string;
  rating?: number;
  reviews?: number;
};
