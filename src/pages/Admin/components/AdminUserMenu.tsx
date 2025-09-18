import { useState, useRef, useEffect } from "react";
import { LuLogOut, LuUser, LuActivity } from "react-icons/lu";

export default function AdminUserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-2 shadow-sm hover:bg-neutral/60 transition"
      >
        <img
          src="https://i.pravatar.cc/48?img=12"
          className="h-7 w-7 rounded-full"
          alt="Usuario"
        />
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold leading-4">José Morales</p>
          <p className="text-xs text-graphite/70">Joyería Pandora</p>
        </div>
        <span className="i-[heroicons-outline:chevron-down] w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-black/10 bg-white p-1 shadow-lg">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-neutral/40">
            <LuUser className="h-4 w-4" /> Perfil
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-neutral/40">
            <LuActivity className="h-4 w-4" /> Actividad
          </button>
          <hr className="my-1" />
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">
            <LuLogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
