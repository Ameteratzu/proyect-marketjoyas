// src/features/products/components/ProductModal.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiX } from 'react-icons/hi';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { PiMagnifyingGlassPlusBold, PiMagnifyingGlassMinusBold } from 'react-icons/pi';
import { PATHS } from '@/routes/paths';

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    brand?: string;
    image: string;
    images?: string[]; 
}

interface Props {
    product: Product | null;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
    const imagesToDisplay = product?.images || [
        product?.image, 
        product?.image, 
        product?.image, 
        product?.image, 
        product?.image
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [product]);

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => 
            (prevIndex - 1 + imagesToDisplay.length) % imagesToDisplay.length
        );
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % imagesToDisplay.length
        );
    };

    const handleZoomInClick = () => {
        setIsZoomed(true);
    };

    const handleZoomOutClick = () => {
        setIsZoomed(false);
    };

    const handleViewProductClick = () => {
        if (product) {
            // Esto es lo único que cambia. Navega a la URL con el ID del producto.
            navigate(`${PATHS.PRODUCTS}/${product.id}`); 
            onClose();
        }
    };

    if (!product) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative overflow-y-auto max-h-[95vh] flex flex-col md:flex-row gap-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-50"
                    aria-label="Cerrar modal"
                >
                    <HiX className="h-6 w-6" />
                </button>
                
                <div className="flex-1 flex flex-col items-center">
                    <div className="relative w-full overflow-hidden rounded-lg">
                        <img
                            src={imagesToDisplay[currentImageIndex]}
                            alt={product.name}
                            className={`w-full h-auto object-cover ${isZoomed ? 'scale-150 transform transition-transform duration-300' : ''}`}
                        />
                        <button 
                            onClick={handlePrevClick} 
                            className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-accent-warm rounded-full hover:bg-accent-warm transition cursor-pointer"
                        >
                            <FaAngleLeft className="text-xl" />
                        </button>
                        <button 
                            onClick={handleNextClick} 
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-accent-warm rounded-full hover:bg-accent-warm transition cursor-pointer"
                        >
                            <FaAngleRight className="text-xl" />
                        </button>
                        
                        <div className="absolute bottom-2 right-2 flex gap-2">
                            <button 
                                onClick={handleZoomInClick} 
                                className="p-2 bg-accent-warm rounded-lg hover:bg-white transition cursor-pointer"
                            >
                                <PiMagnifyingGlassPlusBold className="text-xl text-gray-700" />
                            </button>
                            <button 
                                onClick={handleZoomOutClick} 
                                className="p-2 bg-accent-warm rounded-lg hover:bg-white transition cursor-pointer" 
                            >
                                <PiMagnifyingGlassMinusBold className="text-xl text-gray-700" />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4 overflow-x-auto">
                        {imagesToDisplay.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-16 h-16 rounded-md border-2 cursor-pointer ${currentImageIndex === index ? 'border-primary' : 'border-transparent hover:border-primary transition'}`}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 font-sans text-primary">{product.name}</h2>
                    <p className="text-accent-warm text-xl font-semibold mt-2">
                        <span className="text-primary">Precio:</span> S/{product.price.toFixed(2)}
                    </p>
                    
                    <div className="mt-4">
                        <p className="mt-2 font-sans text-gray-600">
                            Un elegante anillo en color dorado, elaborado en acero inoxidable con enchape en oro y PVD, lo que garantiza resistencia, durabilidad y un brillo que perdura en el tiempo. Diseñado especialmente para mujeres que buscan estilo y sofisticación en cada detalle.
                        </p>
                        <p className="mt-2 font-sans text-gray-600">
                            Disponible en tallas 40 a 45, es un accesorio versátil y cómodo, ideal para uso diario o para ocasiones especiales. Además, es libre de níquel, lo que lo hace seguro para pieles sensibles.
                        </p>
                        <p className="mt-2 font-sans text-gray-600">
                            Un complemento atemporal y moderno que realza cualquier look con un toque de distinción.
                        </p>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleViewProductClick}
                            className="font-display bg-primary text-white font-semibold py-3 px-6 rounded-lg 
                                       hover:bg-teal-700 transition-all duration-300
                                       transform hover:scale-105 hover:shadow-lg"
                        >
                            Ver Producto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}