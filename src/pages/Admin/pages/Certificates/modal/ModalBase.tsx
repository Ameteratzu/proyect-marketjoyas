import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type ModalBaseProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function ModalBase({
  open,
  onClose,
  title,
  children,
  className,
}: ModalBaseProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const onBackdrop = (e: React.MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/40 backdrop-blur-sm p-3"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={onBackdrop}
    >
      <div
        ref={ref}
        className={cn(
          "w-full max-w-4xl rounded-2xl bg-white shadow-xl outline-none",
          className
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
