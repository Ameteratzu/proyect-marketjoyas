// src/features/header/components/Sidebar.tsx

import { HiX } from "react-icons/hi";
import { FaAngleRight } from 'react-icons/fa6';
import { cn } from "@/lib/cn";

// Define un tipo para las categorías
type Category = {
  name: string;
  href: string;
};

// Array de categorías
const categories: Category[] = [
  { name: "Alianza y Matrimonio", href: "#" },
  { name: "Sortijas", href: "#" },
  { name: "Aretes", href: "#" },
  { name: "Cadenas y collares", href: "#" },
  { name: "Dijes", href: "#" },
  { name: "Pulseras", href: "#" },
  { name: "Puñeras", href: "#" },
  { name: "Tobilleras", href: "#" },
  { name: "Sets - Juegos", href: "#" },
  { name: "Piercing", href: "#" },
  { name: "Cuadros y Adornos", href: "#" },
  { name: "Accesorios", href: "#" },
  { name: "Gemas", href: "#" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Estilo para la fuente Afacad, agregado directamente en el componente */}
      
      {/* Fondo oscuro translúcido con desenfoque */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-all duration-300 backdrop-blur-sm",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      {/* Sidebar principal */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-full max-w-[300px] bg-white shadow-lg transition-transform duration-300",
          "font-afacad-local", // 👈 Aplica la clase local aquí
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Encabezado verde */}
        <div className="flex items-center justify-between py-4 px-6 bg-primary text-white">
          <h2 className="font-sans text-2xl font-bold">¡Bienvenido!</h2>
          <button onClick={onClose} aria-label="Cerrar menú">
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* Lista de categorías dinámica */}
        <nav className="">
          <ul className="font-sans">
            {categories.map((category) => (
              <li key={category.name} className="py-4 px-6 text-[22px] text-primary/50 hover:bg-primary/25 transition-all duration-200">
                <a href={category.href} className="flex items-center justify-between gap-3">
                  <span>{category.name}</span>
                  <FaAngleRight className="text-lg text-[#E0E0E0]" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}