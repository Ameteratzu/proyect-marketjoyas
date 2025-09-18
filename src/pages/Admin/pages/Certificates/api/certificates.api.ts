import { http } from "@/common/api/http";
import type { Certificate } from "../types/types";
import type { CertificateFormValues } from "../modal/useCertificateForm";
import type { CertificateDTO, CloudinaryUploadResponse } from "../types/types";
import { parsePrice, toId } from "../utils/number";

// ---------- helpers ----------
function dtoToCertificate(raw: CertificateDTO): Certificate {
  const dateRaw = raw.date ?? raw.fecha ?? raw.fechaEmision ?? raw.createdAt;
  const date = dateRaw ? new Date(dateRaw).toLocaleDateString("es-PE") : "";
  return {
    id: String(raw.id ?? raw._id ?? raw.id_certificado ?? Math.random()),
    storeName: raw.tiendaNombre ?? "",
    address: raw.tiendaDireccion ?? "",
    product: raw.productoNombre ?? "",
    client: raw.clienteNombre ?? "",
    doc: String(raw.clienteDnioRUC ?? ""),
    date,
    // extras para edición
    gemId: raw.gemaId,
    materialId: raw.materialId,
    country: raw.pais ?? undefined,
    price: raw.precio != null ? Number(raw.precio) : undefined,
    description: raw.descripcion ?? undefined,
    imageUrl: raw.imagenUrl ?? undefined,
  };
}

// ---------- list ----------
export async function fetchCertificates(): Promise<Certificate[]> {
  const { data } = await http.get("/certificados-joyas");
  const arr: CertificateDTO[] = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.data)
    ? (data as any).data
    : [];
  return arr.map(dtoToCertificate);
}

// ---------- create ----------
export async function createCertificate(
  values: CertificateFormValues,
  image?: CloudinaryUploadResponse
): Promise<{ ok: boolean; data: any }> {
  const payload = formValuesToPayload(values, image);

  if (import.meta.env.DEV) {
    console.info(
      "[certificates] create payload ->",
      JSON.stringify(payload, null, 2)
    );
  }

  const res = await http.post("/certificados-joyas", payload);

  if (import.meta.env.DEV) {
    console.info("[certificates] create response <-", res.data);
  }

  return { ok: true, data: res.data };
}

// ---------- update (PATCH) ----------
export async function updateCertificate(
  id: number | string,
  values: CertificateFormValues,
  image?: CloudinaryUploadResponse
): Promise<{ ok: boolean; data: any }> {
  const payload = formValuesToPayload(values, image);

  if (import.meta.env.DEV) {
    console.info(
      "[certificates] update payload ->",
      id,
      JSON.stringify(payload, null, 2)
    );
  }

  const res = await http.patch(`/certificados-joyas/${Number(id)}`, payload);

  if (import.meta.env.DEV) {
    console.info("[certificates] update response <-", res.data);
  }

  return { ok: true, data: res.data };
}

// ---------- delete ----------
export async function deleteCertificate(
  id: number | string
): Promise<{ ok: boolean; data: any }> {
  const res = await http.delete(`/certificados-joyas/${Number(id)}`);
  if (import.meta.env.DEV) {
    console.info("[certificates] delete response <-", res.data);
  }
  return { ok: true, data: res.data };
}

// ---------- catalogs ----------
export type OptionItem = { id: number; nombre: string };

export async function fetchGems(q?: string): Promise<OptionItem[]> {
  const { data } = await http.get("/gemas", {
    params: q ? { nombre: q } : undefined,
  });
  if (!Array.isArray(data)) return [];
  return data.map((g: any) => ({
    id: Number(g.id ?? g.gemaId ?? g._id),
    nombre: g.nombre ?? g.name ?? "",
  }));
}

export async function fetchMaterials(q?: string): Promise<OptionItem[]> {
  const { data } = await http.get("/materiales", {
    params: q ? { nombre: q } : undefined,
  });
  if (!Array.isArray(data)) return [];
  return data.map((m: any) => ({
    id: Number(m.id ?? m.materialId ?? m._id),
    nombre: m.nombre ?? m.name ?? "",
  }));
}

// ---------- get by id (para PDF) ----------
export async function getCertificateById(id: number) {
  const { data } = await http.get<CertificateDTO>(`/certificados-joyas/${id}`);

  return {
    id: data.id,
    tiendaNombre: data.tiendaNombre ?? "",
    tiendaDireccion: data.tiendaDireccion ?? "",
    clienteNombre: data.clienteNombre ?? "",
    clienteDnioRUC: data.clienteDnioRUC ?? "",
    productoNombre: data.productoNombre ?? "",
    gemaId: data.gemaId,
    materialId: data.materialId,
    precio: Number(data.precio ?? 0),
    imagenUrl: data.imagenUrl ?? "",
    pais: data.pais ?? "Perú",
    descripcion: data.descripcion ?? "",
    fechaEmision:
      data.fechaEmision ?? data.createdAt ?? new Date().toISOString(),
  };
}

// ---------- utils locales ----------
function formValuesToPayload(
  values: CertificateFormValues,
  image?: CloudinaryUploadResponse
) {
  const payload: any = {
    tiendaNombre: values.storeName?.trim(),
    tiendaDireccion: values.address?.trim(),
    clienteNombre: values.client?.trim(),
    clienteDnioRUC: values.doc?.trim(),
    productoNombre: values.product?.trim(),
    gemaId: toId(values.gemstone),
    materialId: toId(values.material),
    precio: parsePrice(values.price),
    imagenUrl: image?.url || undefined,
    pais: values.country || "",
    descripcion: values.description || "",
  };
  Object.keys(payload).forEach((k) => {
    if (payload[k] === undefined) delete payload[k];
  });
  return payload;
}
