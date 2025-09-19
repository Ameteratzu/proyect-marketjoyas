// src/pages/index.tsx

import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import CategoriesNav from '@/pages/Products/components/CategoriesNav';
import Filters from '@/pages/Products/components/Filters';
import ProductList from '@/pages/Products/components/ProductList';
import Sorting from '@/pages/Products/components/Sorting';
import Pagination from '@/pages/Products/components/Pagination';
import ResultsDisplay from '@/pages/Products/components/ResultsDisplay';
import anillos from "@/assets/products/anillos.png";
import ProductModal from './components/ProductModal'; // ✅ Importación del componente modal


// Define el tipo para la estructura de tus productos
interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    brand?: string;
    image: string;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [sortOption, setSortOption] = useState<string>('recommended');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 12;

    // ✅ NUEVOS ESTADOS PARA EL MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // ✅ FUNCIONES PARA ABRIR Y CERRAR EL MODAL
    const openModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // Simulación de una llamada a una API para obtener productos
    useEffect(() => {
        const mockProducts = [
            { id: 1, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 2, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 3, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 4, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 5, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 6, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 7, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 8, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 9, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 10, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 11, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 12, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 13, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
            { id: 14, name: 'Aros de matrimonio Oro 18k 10 gramos', price: 3990, originalPrice: 4990, discountPercentage: 37, brand: 'PANDORA', image: anillos },
        ];
        setProducts(mockProducts);
    }, []);

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        return 0;
    });

    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const currentProducts = sortedProducts.slice(firstProductIndex, lastProductIndex);
    
    return (
        <div className="bg-white">
            <Container>
                <CategoriesNav />
            </Container>
            
            <hr className="my-6 border-t border-gray-300" />
            
            {/* Contenedor principal para la sección de productos */}
            <div className="flex flex-col md:flex-row py-4 px-4 md:py-8 md:px-24 gap-4 md:gap-8">
                {/* Barra lateral de filtros (oculta en móviles) */}
                <aside className="hidden md:block w-full md:w-[372px]">
                    <Filters />
                </aside>

                {/* Contenido principal con productos y controles */}
                <main className="w-full md:w-3/4 ml-0">
                    {/* Contenedor superior con Sorting y Pagination */}
                    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md mb-8">
                        <Sorting onSortChange={setSortOption} />
                        {/* Oculta paginación superior en móviles */}
                        <div className="hidden md:block">
                            <Pagination
                                totalItems={products.length}
                                itemsPerPage={productsPerPage}
                                onPageChange={setCurrentPage}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                    
                    {/* ✅ Pasa la función openModal a ProductList */}
                    <ProductList products={currentProducts} onProductClick={openModal} />
                    
                    {/* Contenedor inferior con el texto y la paginación */}
                    <div className="p-4 my-8 bg-white rounded-lg shadow-md">
                        <div className="flex flex-col md:grid md:grid-cols-3 justify-center items-center gap-4">
                            {/* Columna Izquierda: Resultados */}
                            <div className="md:col-start-1">
                                <ResultsDisplay
                                    totalItems={products.length}
                                    itemsPerPage={productsPerPage}
                                    currentPage={currentPage}
                                />
                            </div>
                            {/* Columna del medio: Botones de Paginación */}
                            <div className="md:col-start-2 md:justify-self-center md:ml-[80px]">
                                <Pagination
                                    totalItems={products.length}
                                    itemsPerPage={productsPerPage}
                                    onPageChange={setCurrentPage}
                                    currentPage={currentPage}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* ✅ RENDERIZADO CONDICIONAL DEL MODAL */}
            {isModalOpen && selectedProduct && (
                <ProductModal product={selectedProduct} onClose={closeModal} />
            )}
        </div>
    );
}