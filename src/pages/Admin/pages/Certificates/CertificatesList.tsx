import { useTranslation } from 'react-i18next';
import { LuPlus } from 'react-icons/lu';
import { Pagination } from './Pagination';
import { CertificatesTable } from './CertificatesTable';
import { useCertificates } from './useCertificates';
import { CertificatesFilters } from './CertificatesFilters';

export default function CertificatesList() {
  const { t } = useTranslation('admin');
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
  } = useCertificates();

  return (
    <section className="rounded-xl border border-black/10 bg-white p-4 md:p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-2xl font-semibold leading-tight">
          {t('certificates.title', { defaultValue: 'Gestión de Certificados' })}
        </h1>
        <button className="btn btn-primary inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium transition-colors">
          <LuPlus className="h-5 w-5" />
          {t('certificates.create', { defaultValue: 'Crear Certificado' })}
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

      <CertificatesTable rows={current} />

      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={filteredTotal}
        onChange={setPage}
      />
    </section>
  );
}
