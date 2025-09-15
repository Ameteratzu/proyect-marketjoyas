import { useMemo, useState, useCallback } from 'react';
import type { Certificate } from './types';
import { MOCK_CERTIFICATES } from './mockCertificates';
import { filterCertificates } from './filterCertificates';

const PAGE_SIZE = 7; // Mantener configurable si se desea

export function useCertificates(initialData: Certificate[] = MOCK_CERTIFICATES) {
  const [qName, setQName] = useState('');
  const [qDoc, setQDoc] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => filterCertificates(initialData, qName, qDoc), [initialData, qName, qDoc]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const current = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const reset = useCallback(() => {
    setQName('');
    setQDoc('');
    setPage(1);
  }, []);

  const handleChangeQName = useCallback((value: string) => {
    setQName(value);
    setPage(1);
  }, []);

  const handleChangeQDoc = useCallback((value: string) => {
    setQDoc(value);
    setPage(1);
  }, []);

  const goToPage = useCallback((n: number) => {
    setPage(Math.min(Math.max(1, n), totalPages));
  }, [totalPages]);

  return {
    qName,
    qDoc,
    page,
    totalPages,
    current,
    filteredTotal: filtered.length,
    reset,
    setPage: goToPage,
    setQName: handleChangeQName,
    setQDoc: handleChangeQDoc,
    pageSize: PAGE_SIZE,
  };
}
