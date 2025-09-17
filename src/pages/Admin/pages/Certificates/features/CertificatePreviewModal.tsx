// src/pages/Admin/pages/Certificates/features/preview/CertificatePreviewModal.tsx
import { useEffect, useState } from "react";
import ModalBase from "../modal/ModalBase";
import { pdf } from "@react-pdf/renderer";
import CertificatePdf from "./CertificatePdf";
import { fetchGems, fetchMaterials } from "../api/certificates.api";
import { getCertificateById } from "../api/certificates.api";
import { cn } from "@/lib/cn";
import LoadingAnimate from '@/components/LoadingAnimate';

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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

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
        if (!cancel) {
          setError(e?.message ?? "Error cargando certificado");
          setLoading(false);
        }
      } finally {
        // No apagamos loading aquí; lo haremos cuando el PDF esté generado
      }
    })();
    return () => {
      cancel = true;
    };
  }, [open, id]);

  // Generar el PDF a blob y mantener el loader hasta terminar
  useEffect(() => {
    if (!open) return;
    // Construimos el doc aquí o usamos el de fuera; usaremos el de fuera
    if (!data) {
      setPdfUrl(null);
      return;
    }
    let cancelled = false;
    let currentUrl: string | null = null;
    setLoading(true);
    const nextDoc = (
      <CertificatePdf data={data} lookups={{ gemas, materiales }} />
    );

    (async () => {
      try {
        const blob = await pdf(nextDoc).toBlob();
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        currentUrl = url;
        setPdfUrl(url);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Error generando PDF");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      if (currentUrl) URL.revokeObjectURL(currentUrl);
    };
  }, [open, data, gemas, materiales]);

  // Resetear estado cuando el modal se cierra para liberar el documento
  useEffect(() => {
    if (!open) {
      setData(null);
      setError(null);
      setGemas([]);
      setMateriales([]);
      setLoading(false);
    }
  }, [open]);

  const doc = data ? (
    <CertificatePdf data={data} lookups={{ gemas, materiales }} />
  ) : null;

  const handleDownload = async () => {
    if ((!doc && !pdfUrl) || !id) return;
    // Si ya tenemos el blob, úsalo; si no, genera on-demand
    const url = pdfUrl
      ? pdfUrl
      : URL.createObjectURL(await pdf(doc as any).toBlob());
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificado_${id}.pdf`;
    a.click();
    if (!pdfUrl) URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    // Asegurar limpieza inmediata al cerrar
    setData(null);
    setError(null);
    setGemas([]);
    setMateriales([]);
    setLoading(false);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    onClose();
  };

  return (
    <ModalBase
      open={open}
  onClose={handleClose}
      title="Vista previa del Certificado"
      className="max-w-6xl"
    >
      <div className="flex flex-col h-[80vh]">
        <div className="p-3 border-b border-black/10">
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
          {loading ? (
            <LoadingAnimate />
          ) : pdfUrl ? (
            <iframe
              title="Vista previa PDF"
              src={pdfUrl}
              onLoad={() => setLoading(false)}
              style={{ width: "100%", height: "100%", border: "none", background: "#fff" }}
            />
          ) : (
            !loading &&
            !error && <p className="text-graphite/60 text-sm">Sin datos</p>
          )}
        </div>

        <div className="shrink-0 border-t border-black/10 bg-white px-5 py-4 flex items-center justify-end gap-3">
          <button className="btn btn-ghost px-6" onClick={handleClose}>
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
