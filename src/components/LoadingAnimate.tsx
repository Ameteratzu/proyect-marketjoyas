import { FaGem } from "react-icons/fa";

export default function LoadingAnimate() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-primary">
      {/* Diamante girando (CSS) */}
      <FaGem className="w-16 h-16 animate-spin text-accent-warm" />

      {/* Tres puntos con animación CSS desfasada */}
      <div className="mt-6 flex items-end gap-1 h-6">
        <span className="sr-only">Cargando</span>
        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
