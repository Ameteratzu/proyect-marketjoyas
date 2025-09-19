declare module "ubigeo-peru" {
  // Estructura mínima suficiente según el paquete (index.js carga dos JSON)
  export type UbigeoRow = {
    ubigeo: string; // código ubigeo
    departamento: string;
    provincia: string;
    distrito: string;
    // algunos dumps incluyen abreviaciones o campos extra; los dejamos abiertos
    [k: string]: unknown;
  };

  const ubigeoPeru: {
    reniec: UbigeoRow[]; // dataset 1
    inei: UbigeoRow[]; // dataset 2 (usaremos este por consistencia)
  };

  export default ubigeoPeru;
}
