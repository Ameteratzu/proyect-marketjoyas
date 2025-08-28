// Esto sirve para bloquear el scroll del body cuando un modal o menú está abierto
import { useLayoutEffect } from "react";

export default function useLockBodyScroll(locked: boolean) {
  useLayoutEffect(() => {
    const { overflow } = document.body.style;

    if (locked) document.body.style.overflow = "hidden";

    return () => { document.body.style.overflow = overflow; };
  }, [locked]);
}
