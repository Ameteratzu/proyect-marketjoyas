// src/features/products/components/Sorting.tsx
import { FaAngleDown } from 'react-icons/fa6';

interface SortingProps {
  onSortChange: (value: string) => void;
}

export default function Sorting({ onSortChange }: SortingProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="sort-by" className="text-xl text-graphite font-normal">
        Ordenar por:
      </label>
      {/* Contenedor relativo para posicionar el ícono */}
      <div className="relative inline-block w-auto">
        <select 
          id="sort-by" 
          className="
            pl-0 pb-1 pt-0 pr-8
            border-b border-neutral
            bg-transparent
            cursor-pointer
            text-base
            text-secondary
            font-semibold
            appearance-none
            focus:outline-none
            focus:border-primary
          "
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="recommended">Recomendados</option>
          <option value="price-asc">Precio: de menor a mayor</option>
          <option value="price-desc">Precio: de mayor a menor</option>
        </select>
        {/* Ícono posicionado de forma absoluta */}
        <FaAngleDown className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-base text-secondary" />
      </div>
    </div>
  );
}