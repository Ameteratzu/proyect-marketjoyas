import { http } from "@/common/api/http";
import type { Certificate } from "../types/types";
import type { CertificateFormValues } from "../modal/useCertificateForm";
import type {
  CertificateDTO,
  CreateCertificatePayload,
  CloudinaryUploadResponse,
} from "../types/types";
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
  };
}

function extractApiError(err: any): string {
  const msg = err?.response?.data?.message ?? err?.message;
  return Array.isArray(msg)
    ? msg.join(" | ")
    : String(msg || "Error desconocido");
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
  const payload: CreateCertificatePayload = {
    tiendaNombre: values.storeName,
    tiendaDireccion: values.address,
    clienteNombre: values.client,
    clienteDnioRUC: values.doc,
    productoNombre: values.product,
    gemaId: toId(values.gemstone),
    materialId: toId(values.material),
    precio: parsePrice(values.price),
    imagenUrl: image?.url || undefined,
    pais: values.country || "",
    descripcion: values.description || "",
  };

  Object.keys(payload).forEach((k) => {
    if ((payload as any)[k] === undefined) delete (payload as any)[k];
  });

  if (import.meta.env.DEV) {
    console.info(
      "[certificates] createCertificate payload ->",
      JSON.stringify(payload, null, 2)
    );
  }

  const res = await http.post("/certificados-joyas", payload);

  if (import.meta.env.DEV) {
    console.info("[certificates] createCertificate response <-", res.data);
  }

  const d: any = res.data;
  const createdId = d?.id ?? d?._id ?? d?.data?.id ?? d?.created?.id;
  const ok =
    res.status >= 200 &&
    res.status < 300 &&
    (createdId != null || d?.success === true || d?.ok === true);

  return { ok, data: d };
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
  // 👇 tipamos el genérico para evitar "unknown"
  const { data } = await http.get<CertificateDTO>(`/certificados-joyas/${id}`);

  return {
    id: data.id,
    tiendaNombre: data.tiendaNombre ?? "",
    tiendaDireccion: data.tiendaDireccion ?? "",
    clienteNombre: data.clienteNombre ?? "",
    clienteDnioRUC: data.clienteDnioRUC ?? "",
    productoNombre: data.productoNombre ?? "",
    gemaId: data.gemaId,
    materialId: data.materialId, // ✅ ahora existe en el tipo
    precio: Number(data.precio ?? 0),
    imagenUrl: data.imagenUrl ?? "",
    pais: data.pais ?? "Perú",
    descripcion: data.descripcion ?? "",
    fechaEmision:
      data.fechaEmision ?? data.createdAt ?? new Date().toISOString(),
  };
}
