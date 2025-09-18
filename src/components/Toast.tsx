import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type ToastVariant = "success" | "error" | "info";
type ToastItem = { id: number; message: string; variant: ToastVariant };

type ToastContextType = {
  show: (message: string, variant?: ToastVariant) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(1);

  const remove = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const showBase = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = idRef.current++;
    setToasts((list) => [...list, { id, message, variant }]);
    // auto cerrar a los 3s
    setTimeout(() => remove(id), 3000);
  }, [remove]);

  const value = useMemo<ToastContextType>(() => ({
    show: (m, v) => showBase(m, v),
    success: (m) => showBase(m, "success"),
    error: (m) => showBase(m, "error"),
    info: (m) => showBase(m, "info"),
  }), [showBase]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[1000] space-y-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastCard key={t.id} item={t} onDone={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({ item, onDone }: { item: ToastItem; onDone: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const enter = setTimeout(() => setShow(true), 10);
    const exit = setTimeout(() => setShow(false), 2800);
    const done = setTimeout(onDone, 3200);
    return () => {
      clearTimeout(enter); clearTimeout(exit); clearTimeout(done);
    };
  }, [onDone]);

  // Usar tokens de color de la app definidos en index.css (@theme)
  // success -> bg-primary, error -> bg-secondary, info -> bg-graphite
  const color =
    item.variant === "success"
      ? "bg-primary"
      : item.variant === "error"
      ? "bg-secondary"
      : "bg-graphite";

  return (
    <div
      className={[
        "pointer-events-auto text-white rounded-md shadow-lg px-4 py-3 min-w-[260px] max-w-[340px]",
        color,
        "transition-all duration-300 ease-out",
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <div className="text-sm">{item.message}</div>
    </div>
  );
}
