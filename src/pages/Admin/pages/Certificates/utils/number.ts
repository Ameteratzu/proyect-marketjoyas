export function parsePrice(input: unknown): number {
  // "1.399,50" -> 1399.5 | "1399,00" -> 1399 | "1399.99" -> 1399.99
  const s = String(input ?? "")
    .trim()
    .replace(/\s/g, "");
  if (!s) return 0;
  const normalized = s.replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

export function toId(v: unknown): number | undefined {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}
