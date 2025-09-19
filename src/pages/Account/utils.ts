import type { UiUser } from "./types";

// Diseño-only: sacamos un mínimo del storage para precargar placeholders.
// En la siguiente iteración se reemplaza por fetch real a /accounts/{id}.
export function getUiUser(): UiUser {
  // Intentamos leer un objeto 'user_profile' (si existiera),
  // y si no, devolvemos datos de ejemplo para el diseño.
  try {
    const raw = localStorage.getItem("user_profile");
    if (raw) {
      const p = JSON.parse(raw);
      const fullName =
        `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim() || "Usuario";
      return {
        fullName,
        email: p.email ?? "example@centrojoyer.com.pe",
        phone: p.phone ?? "+51 999 999 999",
        documentType: p.documentType ?? "DNI",
        documentNumber: p.documentNumber ?? "00000000",
        ordersCount: Number(p.ordersCount ?? 10),
        initials: initialsFromName(fullName),
      };
    }
  } catch {}

  const fullName = "José Antonio Ramos Torres";
  return {
    fullName,
    email: "joseantonioramostorres@gmail.com",
    phone: "+51 999 999 999",
    documentType: "DNI",
    documentNumber: "79999999",
    ordersCount: 10,
    initials: initialsFromName(fullName),
  };
}

function initialsFromName(name: string) {
  const parts = name.split(" ").filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts[parts.length - 1]?.[0] ?? "";
  return (a + b).toUpperCase();
}
