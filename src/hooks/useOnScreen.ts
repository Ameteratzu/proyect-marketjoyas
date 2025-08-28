import { useEffect, useState } from "react";

export default function useOnScreen(
  target: React.RefObject<Element | null>,
  rootMargin: string = "0px"
) {
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    const el = target.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { root: null, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, rootMargin]);

  return isIntersecting;
}
