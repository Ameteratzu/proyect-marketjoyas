import { LuSearch, LuFilter, LuRefreshCcw } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";

interface CertificatesFiltersProps {
  qName: string;
  qDoc: string;
  onChangeQName: (v: string) => void;
  onChangeQDoc: (v: string) => void;
  onApply: () => void;
  onReset: () => void;
  className?: string;
}

/*
  Diseño aproximado al prototipo:
  - Contenedor con fondo neutro muy claro
  - Inputs con icono a la izquierda y placeholders cortos
  - Botones con estilo "pill" y jerarquía visual
*/
export function CertificatesFilters({
  qName,
  qDoc,
  onChangeQName,
  onChangeQDoc,
  onApply,
  onReset,
  className,
}: CertificatesFiltersProps) {
  const { t } = useTranslation("admin");

  return (
    <div
      className={cn(
        "mb-4 rounded-xl border border-black/10 bg-neutral/10 p-4 md:p-5 flex flex-col gap-4 md:gap-3 md:flex-row md:items-end",
        className
      )}
    >
      <div className="flex-1 md:flex-[2] min-w-[260px]">
        <label className="block mb-1 text-xs font-medium tracking-wide text-graphite/70 uppercase">
          {t("certificates.searchByNameLabel", {
            defaultValue: "Buscar por nombre",
          })}
        </label>
        <div className="relative">
          <LuSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-graphite/60" />
          <input
            value={qName}
            onChange={(e) => onChangeQName(e.target.value)}
            className="input w-full pl-9 pr-3 border-1 border-graphite/30 rounded-lg h-10"
            placeholder={t("certificates.searchByName", {
              defaultValue: "Buscar por nombre / tienda / producto",
            })}
          />
        </div>
      </div>

      <div className="flex-1 md:flex-[1] md:max-w-xs">
        <label className="block mb-1 text-xs font-medium tracking-wide text-graphite/70 uppercase">
          {t("certificates.searchByDocLabel", {
            defaultValue: "Buscar por DNI",
          })}
        </label>
        <div className="relative">
          <LuSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-graphite/60" />
          <input
            value={qDoc}
            onChange={(e) => onChangeQDoc(e.target.value)}
            className="input w-full pl-9 pr-3 border-1 border-graphite/30 rounded-lg h-10"
            placeholder={t("certificates.searchByDocPlaceholder", {
              defaultValue: "DNI/RUC",
            })}
          />
        </div>
      </div>

      <div className="flex gap-3 md:ml-auto">
        <button
          onClick={onApply}
          className={cn(
            "btn btn-primary inline-flex items-center gap-2  px-5 h-10 text-sm font-medium transition-colors shadow-sm"
          )}
        >
          <LuFilter className="h-4 w-4" />
          {t("filters.apply", { defaultValue: "Filtrar" })}
        </button>
        <button
          onClick={onReset}
          className={cn(
            "btn btn-ghost inline-flex items-center gap-2 px-5 h-10 text-sm font-medium transition-colors"
          )}
        >
          <LuRefreshCcw className="h-4 w-4" />
          {t("filters.clear", { defaultValue: "Limpiar" })}
        </button>
      </div>
    </div>
  );
}
