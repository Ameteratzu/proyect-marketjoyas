import { useEffect, useState } from "react";
import { FaGem } from "react-icons/fa";

export default function LoadingAnimate() {
  const [dots, setDots] = useState(".");

  // efecto para ir agregando puntos "cargando."
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 4 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-primary">
      {/* Diamante girando */}
      <FaGem className="w-16 h-16 animate-spin-slow text-accent-warm" />

      {/* Texto dinámico */}
      <p className="mt-6 text-xl font-medium tracking-wide">Cargando{dots}</p>
    </div>
  );
}
