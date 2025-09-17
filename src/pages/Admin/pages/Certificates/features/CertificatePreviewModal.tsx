// src/pages/Admin/pages/Certificates/features/preview/CertificatePreviewModal.tsx
import { useEffect, useState } from "react";
import ModalBase from "../modal/ModalBase";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import CertificatePdf from "./CertificatePdf";
import { fetchGems, fetchMaterials } from "../api/certificates.api";
import { getCertificateById } from "../api/certificates.api";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  id?: number | null;
  onClose: () => void;
};

export default function CertificatePreviewModal({ open, id, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [gemas, setGemas] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);

  useEffect(() => {
    let cancel = false;
    if (!open || !id) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [gemasData, materialesData, certData] = await Promise.all([
          fetchGems(),
          fetchMaterials(),
          getCertificateById(id),
        ]);
        if (!cancel) {
          setGemas(gemasData);
          setMateriales(materialesData);
          setData(certData);
        }
      } catch (e: any) {
        if (!cancel) setError(e?.message ?? "Error cargando certificado");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [open, id]);

  const doc = data ? (
    <CertificatePdf
      data={data}
      assets={{
  logoUrl: "/CentroJoyeroLogo.png",
      }}
      lookups={{ gemas, materiales }}
    />
  ) : null;

  const handleDownload = async () => {
    if (!doc || !id) return;
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificado_${id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ModalBase
      open={open}
      onClose={onClose}
      title="Vista previa del Certificado"
      className="max-w-6xl"
    >
      <div className="flex flex-col h-[80vh]">
        <div className="p-3 border-b border-black/10">
          {loading && <p className="text-sm text-graphite/70">Cargando…</p>}
          {error && (
            <p className="text-sm text-red-600">
              {Array.isArray(error) ? error.join(" | ") : error}
            </p>
          )}
        </div>

        <div
          className={cn(
            "flex-1 bg-neutral/20",
            (!data || error) && "grid place-items-center"
          )}
        >
          {doc ? (
            <PDFViewer
              style={{ width: "100%", height: "100%", border: "none" }}
            >
              {doc}
            </PDFViewer>
          ) : (
            !loading &&
            !error && <p className="text-graphite/60 text-sm">Sin datos</p>
          )}
        </div>

        <div className="shrink-0 border-t border-black/10 bg-white px-5 py-4 flex items-center justify-end gap-3">
          <button className="btn btn-ghost px-6" onClick={onClose}>
            Cerrar
          </button>
          <button
            className="btn btn-primary px-6 disabled:opacity-60"
            disabled={!doc}
            onClick={handleDownload}
          >
            Descargar PDF
          </button>
        </div>
      </div>
    </ModalBase>
  );
}
