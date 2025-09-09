// src/features/products/components/ProductCard.tsx

import React from 'react';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
  discountPercentage?: number;
  brand?: string;
}

interface ProductCardProps {
  product: Product;
}

// Objeto para mapear nombres de marca a rutas de logo
const brandLogos: { [key: string]: string } = {
  PANDORA: 'src/assets/products/logo_pandora.png',
  CHANEL: '/images/logo_chanel.png',
  SWAROVSKI: '/images/logo_swarovski.png',
};

export default function ProductCard({ product }: ProductCardProps) {
  const logoSrc = product.brand ? brandLogos[product.brand.toUpperCase()] : null;

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Contenedor de la imagen */}
      <div className="p-4 flex items-center justify-center cursor-pointer">
        <div className="w-[279px] h-[279px] rounded-[7.5px] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full rounded-[7.5px]" 
          />
        </div>
      </div>
      
      {/* Detalles del producto */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-sans font-bold text-2xl text-primary">{product.name}</h3>
          
          {/* Contenedor de precio y marca */}
          <div className="flex justify-between items-start my-2">
            {/* Columna izquierda para precio */}
            <div className="flex flex-col">
              <span className="text-graphite font-sans">Precio:</span> 
              
              {/* Contenedor para el precio de oferta y descuento */}
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-accent-warm">S/{product.price.toFixed(2)}</p>
                {product.discountPercentage && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>
              
              {/* Precio original tachado debajo del precio principal */}
              {product.originalPrice && (
                <p className="text-sm text-graphite line-through">
                  S/{product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
            
            {/* Columna derecha para la marca */}
            <div className="flex flex-col items-end">
              <span className="text-sm text-graphite">Por:</span> 
              {logoSrc ? (
                <img 
                  src={logoSrc} 
                  alt={`Logo de ${product.brand}`} 
                  className="h-6 object-contain mt-1" 
                />
              ) : (
                product.brand && <p className="text-lg font-bold">{product.brand}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contenedor de botones */}
        <div className="mt-4 flex flex-col gap-2 ">
          {/* Botón Cotizar */}
          <button className="font-display bg-primary cursor-pointer text-white  rounded-md px-4 py-2 hover:bg-teal-700 w-full flex items-center justify-center gap-2">
            Cotizar <MdOutlineAddShoppingCart />
          </button>
          
          {/* Botón Agregar a favoritos */}
          <button className="font-display border cursor-pointer bg-accent-warm/50 border-neutral rounded-md px-4 py-2 hover:bg-neutral w-full flex items-center justify-center gap-2">
            Agregar a favoritos <FaRegHeart />
          </button>
        </div>
      </div>
    </div>
  );
}