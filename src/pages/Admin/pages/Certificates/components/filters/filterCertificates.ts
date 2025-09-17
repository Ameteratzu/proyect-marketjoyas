import type { Certificate } from '../../types/types';

export function filterCertificates(rows: Certificate[], qName: string, qDoc: string) {
  const qn = qName.trim().toLowerCase();
  const qd = qDoc.trim().toLowerCase();
  if (!qn && !qd) return rows;

  return rows.filter((r) => {
    const matchName =
      !qn ||
      r.client.toLowerCase().includes(qn) ||
      r.storeName.toLowerCase().includes(qn) ||
      r.product.toLowerCase().includes(qn);
    const matchDoc = !qd || r.doc.toLowerCase().includes(qd);
    return matchName && matchDoc;
  });
}
