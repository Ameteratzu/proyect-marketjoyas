import type { Certificate } from './types';

export const MOCK_CERTIFICATES: Certificate[] = Array.from({ length: 28 }).map((_, i) => ({
  id: String(1000 + i),
  storeName: i % 3 === 0 ? 'Joyería Pandora' : i % 3 === 1 ? 'Joyería Antonio’s' : 'Joyería Norma',
  address: 'Av. Angamos 123, Lima',
  product: i % 2 === 0 ? 'Anillo de compromiso' : 'Aros de matrimonio',
  client: i % 2 === 0 ? 'Antonio Garcia' : 'María Flores',
  doc: i % 2 === 0 ? '12345678' : '87654321',
  date: '10/03/2025',
}));
