import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi2";

export default function ScrollTopBtn() {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollTop}
      aria-label="Subir arriba"
      className={`
        fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50
        w-12 h-12 md:w-14 md:h-14
        flex items-center justify-center
        rounded-full
        bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600
        text-white
        shadow-lg shadow-amber-500/30
        border border-amber-200/40
        hover:scale-110 hover:shadow-xl hover:shadow-amber-500/40
        transition-all duration-300 ease-in-out cursor-pointer
        ${
          isVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      <HiArrowUp className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  );
}
