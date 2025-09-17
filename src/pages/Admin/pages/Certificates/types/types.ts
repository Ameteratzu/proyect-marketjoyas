// Tipos del dominio + DTOs del backend

export interface Certificate {
  id: string;
  storeName: string;
  address: string;
  product: string;
  client: string;
  doc: string; // DNI/RUC
  date: string; // dd/mm/yyyy (formateado en FE)
}

/** Respuesta cruda del BE al listar/crear */
export type CertificateDTO = {
  id?: number | string;
  _id?: string;
  id_certificado?: string;
  tiendaNombre?: string;
  tiendaDireccion?: string;
  clienteNombre?: string;
  clienteDnioRUC?: string | number;
  productoNombre?: string;
  fechaEmision?: string;
  fecha?: string;
  date?: string;
  createdAt?: string;
  // …otros campos que no mostramos en la tabla
};

/** Payload de creación para el BE */
export type CreateCertificatePayload = {
  tiendaNombre: string;
  tiendaDireccion: string;
  clienteNombre: string;
  clienteDnioRUC: string;
  productoNombre: string;
  gemaId?: number;
  materialId?: number;
  precio: number;
  imagenUrl?: string;
  pais: string;
  descripcion: string;
};

/** Upload de Cloudinary (según tu BE) */
export type CloudinaryUploadResponse = {
  url: string;
  public_id: string;
};
