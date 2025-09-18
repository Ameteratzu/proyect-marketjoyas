import { useEffect, useState } from "react";
import { CertificatesTable } from "./components/table/CertificatesTable";
import CreateEditCertificateModal from "./modal/CreateEditCertificateModal";
import type { Certificate } from "./types/types";
import type { CertificateFormValues } from "./modal/useCertificateForm";
import {
  fetchCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from "./api/certificates.api";
import { toast } from "react-hot-toast";

type ModalState =
  | { open: false }
  | {
      open: true;
      mode: "create" | "edit";
      row: Certificate | null;
      initialValues: CertificateFormValues | null;
    };

export default function CertificatesScreen() {
  const [rows, setRows] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({ open: false });

  const reload = async () => {
    setLoading(true);
    try {
      const data = await fetchCertificates();
      setRows(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  // ---- Handlers tabla ----
  const onView = (row: Certificate) => {
    console.log("ver", row);
  };

  const onLink = (row: Certificate) => {
    console.log("link", row);
  };

  const onDelete = async (row: Certificate) => {
    const ok = window.confirm(
      `¿Eliminar el certificado de "${row.client}" (ID ${row.id})? Esta acción no se puede deshacer.`
    );
    if (!ok) return;

    try {
      await deleteCertificate(row.id);
      toast.success("Certificado eliminado");
      await reload();
    } catch (e: any) {
      console.error("[certificates] delete error ->", e);
      toast.error(
        e?.response?.data?.message || "No se pudo eliminar el certificado"
      );
    }
  };

  const onEdit = (row: Certificate) => {
    setModal({
      open: true,
      mode: "edit",
      row,
      initialValues: mapRowToForm(row),
    });
  };

  const onCreate = () => {
    setModal({
      open: true,
      mode: "create",
      row: null,
      initialValues: null,
    });
  };

  // ---- Submit modal ----
  const onSubmit = async (vals: CertificateFormValues) => {
    try {
      if (modal.open && modal.mode === "edit" && modal.row) {
        const idNum = Number(modal.row.id);
        await updateCertificate(idNum, vals);
        toast.success("Certificado actualizado");
      } else {
        await createCertificate(vals);
        toast.success("Certificado creado");
      }
      await reload();
      setModal({ open: false });
      return true;
    } catch (e: any) {
      console.error("[certificates] onSubmit error ->", e);
      toast.error(
        e?.response?.data?.message || "No se pudo completar la operación"
      );
      return false;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Certificados</h2>
        <button
          onClick={onCreate}
          className="btn-primary px-6 py-2 rounded-full"
        >
          Nuevo certificado
        </button>
      </div>

      <CertificatesTable
        rows={rows}
        loading={loading}
        onView={onView}
        onLink={onLink}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <CreateEditCertificateModal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        onSubmit={onSubmit}
        mode={modal.open ? modal.mode : "create"}
        initialValues={
          modal.open ? modal.initialValues ?? undefined : undefined
        }
        className="max-w-5xl"
      />
    </div>
  );
}

// ================== Helpers de mapeo ==================
function mapRowToForm(row: Certificate): CertificateFormValues {
  return {
    storeName: row.storeName || "",
    address: row.address || "",
    product: row.product || "",
    client: row.client || "",
    doc: row.doc || "",
    gemstone: row.gemId != null ? String(row.gemId) : "",
    material: row.materialId != null ? String(row.materialId) : "",
    country: row.country || "Perú",
    price: row.price != null ? String(row.price) : "",
    description: row.description || "",
    image: null,
  };
}
