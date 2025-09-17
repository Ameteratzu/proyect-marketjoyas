import { cn } from '@/lib/cn';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems?: number;
  onChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, totalItems, onChange, className }: PaginationProps) {
  const { t } = useTranslation('admin');
  if (totalPages <= 1 && page === 1) {
    return (
      <div className={cn('mt-4 flex justify-between text-sm text-graphite/70', className)}>
        {typeof totalItems === 'number' && (
          <p>{t('certificates.results', { defaultValue: '{{count}} resultados', count: totalItems })}</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('mt-4 flex flex-wrap items-center justify-between gap-3', className)}>
      {typeof totalItems === 'number' && (
        <p className="text-sm text-graphite/70">
          {t('certificates.results', { defaultValue: '{{count}} resultados', count: totalItems })}
        </p>
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className={cn('btn btn-ghost px-3', page === 1 && 'opacity-50 cursor-not-allowed')}
        >
          ←
        </button>
        {Array.from({ length: totalPages }).map((_, i) => {
          const n = i + 1;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={cn(
                'px-3 h-9 rounded-lg border text-sm',
                n === page
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-black/10 hover:bg-neutral/50'
              )}
            >
              {n}
            </button>
          );
        })}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className={cn('btn btn-ghost px-3', page === totalPages && 'opacity-50 cursor-not-allowed')}
        >
          →
        </button>
      </div>
    </div>
  );
}
