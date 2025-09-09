import { useEffect, useRef, useState } from "react";

/** Oculta al hacer scroll down y muestra al hacer scroll up. */
export default function useHideOnScroll(threshold = 8) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY || 0;

    const onScroll = () => {
      const y = Math.max(0, window.scrollY || 0);
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const diff = y - lastY.current;

        if (Math.abs(diff) > threshold) {
          // diff > 0 => bajando -> ocultar
          setHidden(diff > 0);
        }
        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}
