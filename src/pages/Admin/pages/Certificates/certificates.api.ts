import { http } from "@/common/api/http";
import type { Certificate } from "./types";
import type { CertificateFormValues } from "./modal/useCertificateForm";
import type { CloudinaryUploadResponse } from "@/common/api/cloudinary.api";

// =========================
// Listar certificados
// =========================
export async function fetchCertificates(): Promise<Certificate[]> {
  // El endpoint funciona sin tiendaId. Si en algún momento se necesita,
  // hacerlo vía query param/headers según indique el BE.
  let { data } = await http.get("/certificados-joyas");

  // Normalización por si el backend envía { data: [...] }
  if (!Array.isArray(data)) {
    const arr =
      data && Array.isArray((data as any).data) ? (data as any).data : [];
    if (!Array.isArray(arr)) return [];
    return arr.map((raw: any): Certificate => {
      const dateRaw =
        raw.date ?? raw.fecha ?? raw.fechaEmision ?? raw.createdAt;
      const date = dateRaw ? new Date(dateRaw).toLocaleDateString("es-PE") : "";
      return {
        id: String(raw.id ?? raw._id ?? raw.id_certificado ?? Math.random()),
        storeName:
          raw.storeName ??
          raw.store_name ??
          raw.tiendaNombre ??
          raw.tienda ??
          "",
        address:
          raw.address ??
          raw.direccion ??
          raw.tiendaDireccion ??
          raw.direccionTienda ??
          "",
        product:
          raw.product ??
          raw.producto ??
          raw.product_name ??
          raw.productoNombre ??
          "",
        client:
          raw.client ??
          raw.cliente ??
          raw.client_name ??
          raw.clienteNombre ??
          "",
        doc: String(
          raw.doc ??
            raw.documento ??
            raw.dni ??
            raw.ruc ??
            raw.clienteDnioRUC ??
            ""
        ),
        date,
      };
    });
  }

  const list: any[] = Array.isArray(data) ? data : [];
  return list.map((raw: any): Certificate => {
    const dateRaw = raw.date ?? raw.fecha ?? raw.fechaEmision ?? raw.createdAt;
    const date = dateRaw ? new Date(dateRaw).toLocaleDateString("es-PE") : "";
    return {
      id: String(raw.id ?? raw._id ?? raw.id_certificado ?? Math.random()),
      storeName:
        raw.storeName ?? raw.store_name ?? raw.tiendaNombre ?? raw.tienda ?? "",
      address:
        raw.address ??
        raw.direccion ??
        raw.tiendaDireccion ??
        raw.direccionTienda ??
        "",
      product:
        raw.product ??
        raw.producto ??
        raw.product_name ??
        raw.productoNombre ??
        "",
      client:
        raw.client ?? raw.cliente ?? raw.client_name ?? raw.clienteNombre ?? "",
      doc: String(
        raw.doc ??
          raw.documento ??
          raw.dni ??
          raw.ruc ??
          raw.clienteDnioRUC ??
          ""
      ),
      date,
    };
  });
}

// =========================
// Crear certificado
// (NO enviar tiendaId)
// =========================
export async function createCertificate(
  values: CertificateFormValues,
  image?: CloudinaryUploadResponse
): Promise<{ ok: boolean; data: any }> {
  // precio: normalizamos coma/punto y lo convertimos a número
  const precioNumber = (() => {
    const raw =
      (values as any).price ?? (values as any).precio ?? values.description; // fallback por si el form aún no mapea
    const toParse = String(values.price ?? raw ?? "0")
      .replace(/\s/g, "")
      .replace(",", ".");
    const n = Number(toParse);
    return Number.isFinite(n) ? n : 0;
  })();

  // IDs (vienen de los selects como string -> number)
  const gid = Number(values.gemstone);
  const mid = Number(values.material);

  const payload: any = {
    tiendaNombre: values.storeName,
    tiendaDireccion: values.address,
    clienteNombre: values.client,
    clienteDnioRUC: values.doc,
    productoNombre: values.product,
    gemaId: !Number.isNaN(gid) && gid > 0 ? gid : undefined,
    materialId: !Number.isNaN(mid) && mid > 0 ? mid : undefined,
    precio: precioNumber, // number
    imagenUrl: image?.url || undefined, // opcional
    pais: values.country || "",
    descripcion: values.description || "",
    // ⚠️ NO ENVIAR tiendaId (el backend lo rechaza)
  };

  // Limpieza: quitar undefined
  Object.keys(payload).forEach(
    (k) => payload[k] === undefined && delete payload[k]
  );

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

// =========================
// Catálogos
// =========================
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
