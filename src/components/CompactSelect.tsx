import React, { useEffect, useMemo, useRef, useState } from "react";

export type Option = { value: string; label: string };

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export default function CompactSelect({
  value,
  onChange,
  options,
  placeholder = "Seleccione",
  disabled,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<number>(-1);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const current = useMemo(
    () => options.find((o) => o.value === value) || null,
    [options, value]
  );

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (rootRef.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Keyboard navigation
  function onKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    if (
      !open &&
      (e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "Enter" ||
        e.key === " ")
    ) {
      e.preventDefault();
      setOpen(true);
      setHighlight(
        Math.max(
          0,
          options.findIndex((o) => o.value === value)
        )
      );
      return;
    }
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[highlight];
      if (opt) {
        onChange(opt.value);
        setOpen(false);
        btnRef.current?.focus();
      }
    }
  }

  return (
    <div
      ref={rootRef}
      className={"relative " + (className || "")}
      onKeyDown={onKeyDown}
    >
    <button
        ref={btnRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
      "w-full rounded-lg border border-neutral-300 bg-white text-left",
      "px-3 py-2 text-base",
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        {current ? (
          <span className="text-neutral-800">{current.label}</span>
        ) : (
          <span className="text-neutral-400">{placeholder}</span>
        )}
      </button>

      {open && !disabled && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 mt-1 w-full rounded-md border border-neutral-200 bg-white shadow-lg max-h-56 overflow-auto p-1"
        >
          {options.length === 0 && (
            <div className="px-2 py-1.5 text-xs text-neutral-400">
              Sin opciones
            </div>
          )}
          {options.map((opt, idx) => {
            const selected = opt.value === value;
            const active = idx === highlight;
            return (
              <div
                role="option"
                aria-selected={selected}
                key={opt.value}
                className={[
                  "px-2 py-1.5 text-sm rounded cursor-pointer",
                  selected
                    ? "bg-accent-warm/60 text-dark"
                    : "text-neutral-800",
                  active && !selected ? "bg-accent-warm/20" : "",
                ].join(" ")}
                onMouseEnter={() => setHighlight(idx)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  btnRef.current?.focus();
                }}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
