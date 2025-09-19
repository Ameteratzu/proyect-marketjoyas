import ubigeoPeru from "ubigeo-peru";

type Row = {
  ubigeo: string; // "010000", "010100", "010101" ... (a veces no viene, pero no lo necesitamos)
  departamento: string; // "01"
  provincia: string; // "00" | "01" | ...
  distrito: string; // "00" | "01" | ...
  nombre: string; // nombre humano (dep/prov/distr segun el caso)
  [k: string]: unknown;
};

// El paquete expone { inei, reniec }. Usamos INEI por consistencia.
const DATA: Row[] = (ubigeoPeru as any)?.inei?.length
  ? (ubigeoPeru as any).inei
  : (ubigeoPeru as any).reniec || [];

export type Labeled = { code: string; name: string };

function pad2(v: string | number): string {
  const s = String(v ?? "");
  return s.length === 1 ? `0${s}` : s;
}

function uniqByCode(items: Labeled[]): Labeled[] {
  const map = new Map<string, Labeled>();
  for (const it of items) if (!map.has(it.code)) map.set(it.code, it);
  return Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "es")
  );
}

/** Departamentos (label = nombre, value = "01", "02"...) */
export function getDepartmentsLabeled(): Labeled[] {
  const items = DATA.filter(
    (r) => r.provincia === "00" && r.distrito === "00"
  ).map((r) => ({ code: pad2(r.departamento), name: r.nombre }));
  return uniqByCode(items);
}

/** Provincias por departamento (depCode: '01', '15', etc.) -> value = '1501' */
export function getProvincesLabeled(depCode: string): Labeled[] {
  if (!depCode) return [];
  const dep = pad2(depCode);
  const items = DATA.filter(
    (r) =>
      pad2(r.departamento) === dep &&
      r.distrito === "00" &&
      r.provincia !== "00"
  ).map((r) => ({ code: `${dep}${pad2(r.provincia)}`, name: r.nombre }));
  return uniqByCode(items);
}

/** Distritos por provincia (provCode: '1501', etc.) -> value = '150101' */
export function getDistrictsLabeled(provCode: string): Labeled[] {
  if (!provCode) return [];
  const dep = provCode.slice(0, 2);
  const prov = provCode.slice(2, 4);
  const items = DATA.filter(
    (r) =>
      pad2(r.departamento) === dep &&
      pad2(r.provincia) === prov &&
      r.distrito !== "00"
  ).map((r) => ({ code: `${dep}${prov}${pad2(r.distrito)}`, name: r.nombre }));
  return uniqByCode(items);
}

/** Resolver nombres por códigos (dep: '15', prov: '1501', dist: '150101') */
export function resolveNamesByCodes(
  depCode: string,
  provCode: string,
  distCode: string
) {
  const dep = pad2(depCode);
  const prov = provCode?.slice(2, 4) ?? "";
  const dist = distCode?.slice(4, 6) ?? "";

  const depRow = DATA.find(
    (r) =>
      pad2(r.departamento) === dep &&
      r.provincia === "00" &&
      r.distrito === "00"
  );
  const provRow = DATA.find(
    (r) =>
      pad2(r.departamento) === dep &&
      pad2(r.provincia) === prov &&
      r.distrito === "00"
  );
  const distRow = DATA.find(
    (r) =>
      pad2(r.departamento) === dep &&
      pad2(r.provincia) === prov &&
      pad2(r.distrito) === dist
  );

  return {
    department: depRow?.nombre ?? "",
    province: provRow?.nombre ?? "",
    district: distRow?.nombre ?? "",
  };
}
