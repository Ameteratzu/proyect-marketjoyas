export interface Certificate {
  id: string;
  storeName: string;
  address: string;
  product: string;
  client: string;
  doc: string;
  date: string;
}

export type CertificateDTO = {
  id?: number | string;
  _id?: string;

  // nombres “oficiales” que estás usando
  tiendaNombre?: string;
  tiendaDireccion?: string;
  clienteNombre?: string;
  clienteDnioRUC?: string;
  productoNombre?: string;
  gemaId?: number;
  materialId?: number;
  precio?: number | string;
  imagenUrl?: string;
  pais?: string;
  descripcion?: string;

  // campos de fecha
  fechaEmision?: string;
  createdAt?: string;
  fecha?: string;
  date?: string;
  // variantes raras que vimos antes
  id_certificado?: string | number;
};

// Payload de creación
export type CreateCertificatePayload = {
  tiendaNombre: string;
  tiendaDireccion: string;
  clienteNombre: string;
  clienteDnioRUC: string;
  productoNombre: string;
  gemaId?: number;
  materialId?: number;
  precio?: number;
  imagenUrl?: string;
  pais?: string;
  descripcion?: string;
};

// Para Cloudinary
export type CloudinaryUploadResponse = {
  url: string;
  public_id: string;
};
