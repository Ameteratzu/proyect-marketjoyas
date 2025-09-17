import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuPlus } from "react-icons/lu";
import { Pagination } from "./components/pagination/Pagination";
import { CertificatesTable } from "./components/table/CertificatesTable";
import CertificatePreviewModal from "./features/CertificatePreviewModal";
import { useCertificates } from "./hooks/useCertificates";
import { CertificatesFilters } from "./components/filters/CertificatesFilters";
import CreateEditCertificateModal from "./modal/CreateEditCertificateModal";
import type { Certificate } from "./types/types";
import { fetchCertificates, createCertificate } from "./api/certificates.api";
import type { CertificateFormValues } from "./modal/useCertificateForm";
import { uploadToCloudinary } from "@/common/api/cloudinary.api";
import { compressImage } from "@/common/utils/resizeImage";
import { useToast } from "@/components/Toast";

export default function CertificatesList() {
  const [items, setItems] = useState<Certificate[]>([]);
  const { t } = useTranslation("admin");
  const toast = useToast();
  const [previewId, setPreviewId] = useState<number | null>(null);
  const {
    qName,
    qDoc,
    setQName,
    setQDoc,
    page,
    totalPages,
    setPage,
    current,
    filteredTotal,
    reset,
  } = useCertificates(items);

  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCertificates();
        if (!cancelled) setItems([...data].reverse());
      } catch (err: any) {
        if (!cancelled) {
          console.error("Error cargando certificados:", err);
          setError(err?.message ?? "Error desconocido");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const reload = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCertificates();
      setItems([...data].reverse());
    } catch (err: any) {
      console.error("Error recargando certificados:", err);
      setError(err?.message ?? "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-xl border border-black/10 bg-white p-4 md:p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-2xl font-semibold leading-tight">
          {t("certificates.title", { defaultValue: "Gestión de Certificados" })}
        </h1>
        <button
          className="btn btn-primary inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium transition-colors"
          onClick={() => setShowCreate(true)}
        >
          <LuPlus className="h-5 w-5" />
          {t("certificates.create", { defaultValue: "Crear Certificado" })}
        </button>
      </div>

      <CertificatesFilters
        qName={qName}
        qDoc={qDoc}
        onChangeQName={setQName}
        onChangeQDoc={setQDoc}
        onApply={() => setPage(1)}
        onReset={reset}
      />

      {loading ? (
        <div className="py-10 text-center text-graphite/70">Cargando…</div>
      ) : error ? (
        <div className="py-10 text-center text-red-600">
          {error.includes("401")
            ? "No autorizado. Inicia sesión de nuevo o verifica el token."
            : error}
        </div>
      ) : (
        <>
          <CertificatesTable
            rows={current}
            onView={(row) => setPreviewId(Number(row.id))}
          />
          <CertificatePreviewModal
            open={!!previewId}
            id={previewId!}
            onClose={() => setPreviewId(null)}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={filteredTotal}
            onChange={setPage}
          />
        </>
      )}

      <CreateEditCertificateModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={async (values: CertificateFormValues) => {
          try {
            let uploadedImage: { url: string; public_id: string } | undefined;

            if (values.image) {
              try {
                // Si pasa de 2.5MB la comprimimos a ~1280px y 0.82 de calidad
                const TOO_BIG = 2.5 * 1024 * 1024;
                let fileToSend = values.image;
                if (values.image.size > TOO_BIG) {
                  fileToSend = await compressImage(values.image, {
                    maxWidth: 1280,
                    quality: 0.82,
                    mimeType: "image/jpeg",
                  });
                }
                uploadedImage = await uploadToCloudinary(fileToSend);
              } catch (e: any) {
                console.error("Error subiendo imagen a Cloudinary:", e);
                setError(
                  e?.response?.data?.message ||
                    e?.message ||
                    "Error subiendo la imagen"
                );
                return false;
              }
            }

            const res = await createCertificate(values, uploadedImage);
            if (!res?.ok) {
              const msg =
                (res && (res.data?.message || res.data?.error)) ||
                "No se pudo crear el certificado";
              throw new Error(msg);
            }

            await reload();
            setShowCreate(false);
            toast.success("Certificado creado correctamente");
            return true;
          } catch (err: any) {
            const msg = err?.response?.data?.message;
            const human = Array.isArray(msg)
              ? msg.join(" | ")
              : msg || err?.message || "Error creando certificado";
            console.error("Error creando certificado:", err);
            setError(human);
            return false;
          }
        }}
        mode="create"
      />
    </section>
  );
}
