export interface Certificate {
  id: string;
  storeName: string;
  address: string;
  product: string;
  client: string;
  doc: string;
  date: string;

  gemId?: number;
  materialId?: number;
  country?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
}

export type CertificateDTO = {
  id?: number | string;
  _id?: number | string;
  id_certificado?: number | string;
  tiendaNombre?: string;
  tiendaDireccion?: string;
  clienteNombre?: string;
  clienteDnioRUC?: string | number;
  productoNombre?: string;
  gemaId?: number;
  materialId?: number;
  precio?: number | string;
  imagenUrl?: string;
  pais?: string;
  descripcion?: string;
  fechaEmision?: string;
  createdAt?: string;
  fecha?: string;
  date?: string;
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
