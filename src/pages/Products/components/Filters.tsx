
// Se ha eliminado las clases de tamaño fijo del componente FilterOption
// para que se puedan aplicar de forma personalizada.
const FilterOption = ({ label, className = '' }: { label: string; className?: string }) => {
  return (
    <button 
      className={`border border-gray-300 rounded-md text-[15px] text-gray-700 hover:bg-gray-100 transition-colors flex items-center pl-2 ${className}
                 transform transition-transform duration-200 hover:translate-x-1 hover:shadow-md`}
    >
      {label}
    </button>
  );
};

export default function Filters() {
  return (
    
    <div className="flex w-full "> 
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Sección de Rango de Precios */}
        <div className="mb-3">
          <h3 className="font-sans text-[25px] mb-3 text-primary/50">Rango de Precios</h3>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Min."
              className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Max."
              className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="w-full bg-primary cursor-pointer text-white font-sans py-2 rounded-md transition-all duration-300
             hover:opacity-90 hover:shadow-md
             active:scale-95 active:shadow-sm">
            Actualizar
          </button>
        </div>

        {/* Sección de Material */}
        <div className="mb-3">
          <h3 className="font-sans text-[25px] mb-3 text-primary/50">Material</h3>
          <div className="flex flex-col gap-1">
            <FilterOption label="Plata 950" className="w-[72px] h-[31px] cursor-pointer" />
            <FilterOption label="Plata" className="w-[57px] h-[31px] cursor-pointer" />
            <FilterOption label="Oro 18k" className="w-[66px] h-[31px] cursor-pointer" />
            <FilterOption label="Oro" className="w-[48px] h-[31px] cursor-pointer" />
          </div>
        </div>

        {/* Sección de Estilo o Público */}
        <div className="mb-3">
          <h3 className="font-sans text-[25px] mb-3 text-primary/50">Estilo o Público</h3>
          <div className="flex flex-col gap-1">
            <FilterOption label="Damas" className="w-[62px] h-[31px] cursor-pointer" />
            <FilterOption label="Caballeros" className="w-[83px] h-[31px] cursor-pointer" />
            <FilterOption label="Bebés" className="w-[55px] h-[31px] cursor-pointer" />
            <FilterOption label="Niños" className="w-[58px] h-[31px] cursor-pointer" />
          </div>
        </div>
        
        {/* Sección de Gemas y Piedras Preciosas */}
        <div>
          <h3 className="font-sans text-[23.5px] mb-3 text-primary/50">Gemas y Piedras Preciosas</h3>
          <div className="flex flex-col gap-1">
            <FilterOption label="Swarovski" className="w-[83px] h-[31px] cursor-pointer" />
            <FilterOption label="Circón" className="w-[57px] h-[31px] cursor-pointer" />
            <FilterOption label="Moissanita" className="w-[84px] h-[31px] cursor-pointer" />
            <FilterOption label="Diamantes" className="w-[82px] h-[31px] cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}