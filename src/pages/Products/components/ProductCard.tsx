// src/features/products/components/ProductCard.tsx
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

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
    onProductClick: (product: Product) => void;
}

const brandLogos: { [key: string]: string } = {
    PANDORA: 'src/assets/products/logo_pandora.png',
    CHANEL: '/images/logo_chanel.png',
    SWAROVSKI: '/images/logo_swarovski.png',
};

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
    const logoSrc = product.brand ? brandLogos[product.brand.toUpperCase()] : null;

    return (
        <div className="w-full bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden flex flex-col group">
            {/* Contenedor principal de la imagen con el onClick */}
            <div 
                className="p-4 flex items-center justify-center cursor-pointer"
                onClick={() => onProductClick(product)}
            >
                {/* Contenedor de la imagen (hijo de arriba) */}
                <div className="w-[279px] h-[279px] rounded-[7.5px] overflow-hidden relative group">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full rounded-[7.5px] transform transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Ícono de "ojo" */}
                    <div 
                        className="absolute top-[8px] left-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        onClick={(e) => {
                            e.stopPropagation();
                            onProductClick(product);
                        }}
                    >
                        <button
                            className="px-[15px] py-[3px] bg-accent-warm rounded-lg text-gray-700 hover:text-primary hover:bg-accent-warm transition-colors duration-300"
                            aria-label="Ver detalles del producto"
                        >
                            <MdOutlineRemoveRedEye className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Detalles del producto */}
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="font-sans font-bold text-2xl text-primary">{product.name}</h3>
                    
                    <div className="flex justify-between items-start my-2">
                        <div className="flex flex-col">
                            <span className="text-graphite font-sans">Precio:</span> 
                            
                            <div className="flex items-center gap-2">
                                <p className="text-xl font-bold text-accent-warm">S/{product.price.toFixed(2)}</p>
                                {product.discountPercentage && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg">
                                        -{product.discountPercentage}%
                                    </span>
                                )}
                            </div>
                            
                            {product.originalPrice && (
                                <p className="text-sm text-graphite line-through">
                                    S/{product.originalPrice.toFixed(2)}
                                </p>
                            )}
                        </div>
                        
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

                <div className="mt-4 flex flex-col gap-2 ">
                    <button className="font-display bg-primary cursor-pointer text-white rounded-md px-4 py-2 hover:bg-teal-700 w-full flex items-center justify-center gap-2
                                         transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                        Cotizar <MdOutlineAddShoppingCart />
                    </button>
                    
                    <button className="font-display border cursor-pointer bg-accent-warm/50 border-neutral rounded-md px-4 py-2  w-full flex items-center justify-center gap-2
                                         transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        Agregar a favoritos <FaRegHeart />
                    </button>
                </div>
            </div>
        </div>
    );
}