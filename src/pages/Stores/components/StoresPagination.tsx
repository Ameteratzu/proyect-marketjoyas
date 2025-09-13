import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
};

export default function StoresPagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const scrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const go = (p: number) => () => {
    onPageChange(Math.min(Math.max(1, p), totalPages));
    scrollTop();
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="Stores pagination"
    >
      <button
        onClick={go(page - 1)}
        disabled={page <= 1}
        className="btn btn-ghost hover:bg-accent-warm p-3 text-primary hover:text-white"
      >
        <FaArrowLeft />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={go(p)}
          aria-current={p === page ? "page" : undefined}
          className={`min-w-9 h-9 rounded-md border px-3 text-sm ${
            p === page
              ? "bg-primary text-white border-primary cursor-pointer"
              : "bg-white border-black/10 hover:bg-accent-warm transition-colors duration-300 cursor-pointer hover:border-accent-warm hover:text-white"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={go(page + 1)}
        disabled={page >= totalPages}
        className="btn btn-ghost hover:bg-accent-warm p-3 text-primary hover:text-white"
      >
        <FaArrowRight />
      </button>
    </nav>
  );
}
