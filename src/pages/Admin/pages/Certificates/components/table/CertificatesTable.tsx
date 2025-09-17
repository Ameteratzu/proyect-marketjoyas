import { LuEye, LuPencil, LuTrash2 } from 'react-icons/lu';
import { FiSend } from 'react-icons/fi';
import type { Certificate } from '../../types/types';
import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';

interface CertificatesTableProps {
  rows: Certificate[];
  onView?: (row: Certificate) => void;
  onLink?: (row: Certificate) => void;
  onEdit?: (row: Certificate) => void;
  onDelete?: (row: Certificate) => void;
  className?: string;
  loading?: boolean;
}

export function CertificatesTable({
  rows,
  onView,
  onLink,
  onEdit,
  onDelete,
  className,
  loading,
}: CertificatesTableProps) {
  const { t } = useTranslation('admin');

  return (
    <div className={cn('overflow-x-auto rounded-xl border border-black/10', className)}>
      <table className="min-w-[920px] w-full text-sm">
        <thead className="bg-dark text-white">
          <tr>
            <th className="px-4 py-3 text-left">{t('certificates.columns.store', { defaultValue: 'Nombre de la tienda' })}</th>
            <th className="px-4 py-3 text-left">{t('certificates.columns.address', { defaultValue: 'Dirección' })}</th>
            <th className="px-4 py-3 text-left">{t('certificates.columns.product', { defaultValue: 'Producto' })}</th>
            <th className="px-4 py-3 text-left">{t('certificates.columns.client', { defaultValue: 'Cliente' })}</th>
            <th className="px-4 py-3 text-left">{t('certificates.columns.doc', { defaultValue: 'DNI/RUC' })}</th>
            <th className="px-4 py-3 text-left">{t('certificates.columns.date', { defaultValue: 'Fecha' })}</th>
            <th className="px-4 py-3 text-left">{t('certificates.columns.actions', { defaultValue: 'Acciones' })}</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-graphite/70">
                {t('loading', { defaultValue: 'Cargando...' })}
              </td>
            </tr>
          )}
          {!loading && rows.map((row, i) => (
            <tr key={row.id} className={cn(i % 2 === 1 && 'bg-neutral/30')}>
              <td className="px-4 py-3">{row.storeName}</td>
              <td className="px-4 py-3">{row.address}</td>
              <td className="px-4 py-3">{row.product}</td>
              <td className="px-4 py-3">{row.client}</td>
              <td className="px-4 py-3">{row.doc}</td>
              <td className="px-4 py-3">{row.date}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2 text-primary">
                  <button
                    className="rounded-lg p-1.5 hover:bg-primary/10 cursor-pointer"
                    title={t('actions.view', { defaultValue: 'Ver' })}
                    aria-label="Ver"
                    onClick={() => onView?.(row)}
                  >
                    <LuEye className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded-lg p-1.5 hover:bg-primary/10 cursor-pointer"
                    title={t('actions.edit', { defaultValue: 'Editar' })}
                    aria-label="Editar"
                    onClick={() => onEdit?.(row)}
                  >
                    <LuPencil className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded-lg p-1.5 hover:bg-red-50 text-red-600 cursor-pointer"
                    title={t('actions.delete', { defaultValue: 'Eliminar' })}
                    aria-label="Eliminar"
                    onClick={() => onDelete?.(row)}
                  >
                    <LuTrash2 className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded-lg p-1.5 hover:bg-primary/10 cursor-pointer"
                    title={t('actions.link', { defaultValue: 'Enlace/Descargar' })}
                    aria-label="Enlace"
                    onClick={() => onLink?.(row)}
                  >
                    <FiSend className="h-5 w-5 text-accent-warm" />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-graphite/70">
                {t('certificates.empty', { defaultValue: 'No se encontraron certificados con los filtros actuales.' })}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
