import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuPlus } from "react-icons/lu";
import { Pagination } from "../Pagination";
import { CertificatesTable } from "../CertificatesTable";
import { useCertificates } from "../useCertificates";
import { CertificatesFilters } from "./CertificatesFilters";
import CreateEditCertificateModal from "../modal/CreateEditCertificateModal";
import type { Certificate } from "../types";
import { fetchCertificates } from "../certificates.api";

export default function CertificatesList() {
  const [items, setItems] = useState<Certificate[]>([]);
  const { t } = useTranslation("admin");
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

  // Cargar desde API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // (el fetch manual fue reemplazado por el servicio axios con token)
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchCertificates()
      .then((data) => {
        if (cancelled) return;
        setItems(data);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Error cargando certificados:", err);
        setError(err?.message ?? "Error desconocido");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
          <CertificatesTable rows={current} />
          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={filteredTotal}
            onChange={setPage}
          />
        </>
      )}

      {/* MODAL: Crear/Editar */}
      <CreateEditCertificateModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={() => {
          // Aquí luego haremos el POST/optimistic update
          // console.log("nuevo certificado:", values);
        }}
        mode="create"
      />
    </section>
  );
}
