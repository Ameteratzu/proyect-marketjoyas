// Esto sirve para definir los tipos de datos que se usan en el footer
// y asi tener una mejor organizacion y evitar errores de tipado
export type FooterItem = {
  labelKey: string;
  href: string;
  external?: boolean;
};

export type FooterGroup = {
  id: string;
  titleKey: string;
  items: FooterItem[];
};
