import { http } from "@/common/api/http";
import type { Certificate } from "./types";

export async function fetchCertificates(): Promise<Certificate[]> {
  // opcional: tiendaId desde storage
  let tiendaId: number | undefined;
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const parsed = JSON.parse(raw);
      const id = parsed?.user?.tiendaId ?? parsed?.tiendaId;
      if (id !== undefined && id !== null && id !== "") {
        tiendaId = Number(id);
      }
    }
  } catch {
    // ignore
  }

  const { data } = await http.get("/certificados-joyas", {
    params: tiendaId ? { tiendaId } : undefined,
  });
  // Normalización ligera si backend trae keys distintas
  if (!Array.isArray(data)) return [];
  return data.map((raw: any): Certificate => {
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
