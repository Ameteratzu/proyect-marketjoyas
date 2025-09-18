// src/features/products/components/CategoriesNav.tsx

const categories = [
  { name: 'Compromiso', imageUrl: '/src/assets/products/nav_joyas_1.jpg' },
  { name: 'Matrimonio', imageUrl: '/src/assets/products/nav_joyas_2.png' },
  { name: 'Anillos Promesa', imageUrl: '/src/assets/products/nav_joyas_3.png' },
  { name: 'Aniversarios', imageUrl: '/src/assets/products/nav_joyas_4.png' },
];

export default function CategoriesNav() {
  return (
    // Usa flexbox y clases de desplazamiento para crear el carrusel en móviles
    <nav className="flex items-center justify-start md:justify-center gap-4 md:gap-8 overflow-x-auto p-4 md:p-8 scrollbar-hide">
      {categories.map((category) => (
        // Los elementos de la categoría deben tener un ancho fijo para el carrusel
        <div 
          key={category.name} 
          className="flex flex-col items-center cursor-pointer hover:text-primary transition-colors duration-200 flex-shrink-0 w-24 md:w-[150px]"
        >
          <img 
            src={category.imageUrl} 
            alt={category.name} 
            className="w-16 h-16 md:w-[120px] md:h-[120px] rounded-full object-cover shadow-md mb-2" 
          />
          <span className="text-sm md:text-2xl font-semibold text-center">{category.name}</span>
        </div>
      ))}
    </nav>
  );
}