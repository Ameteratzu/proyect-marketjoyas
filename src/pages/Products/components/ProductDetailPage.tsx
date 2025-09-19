// src/pages/Products/components/ProductDetailPage.tsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight, FaCheckCircle, FaRegStar } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import { MdAccessTime } from 'react-icons/md';
import { AiOutlineSmile } from 'react-icons/ai';

// Importa la imagen desde src/assets
import anillosImg from '../../../assets/products/anillos.png';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  brand?: string;
  image: string;
  images?: string[];
  description: string;
  specs: {
    condition: string;
    guarantee: string;
    origin: string;
    material: string;
    model: string;
    stoneType: string;
    nickelFree: string;
    gender: string;
    includes: string;
    // Campos agregados para un total de 11 especificaciones
    detalleCondicion: string;
    garantia: string;
  };
}

// Datos de ejemplo del producto
const DUMMY_PRODUCT: Product = {
  id: 1,
  name: 'Aros de matrimonio Oro 18k 10 gramos',
  price: 3990.0,
  originalPrice: 4990.0,
  discountPercentage: 20,
  brand: 'PANDORA',
  image: anillosImg,
  images: [anillosImg, anillosImg, anillosImg, anillosImg, anillosImg],
  description: 'Un elegante anillo en color dorado, elaborado en acero inoxidable...',
  specs: {
    condition: 'Nuevo',
    guarantee: '1 mes de garantía por defecto de fábrica.',
    origin: 'Perú',
    material: 'Acero inoxidable, Enchapado en oro, PVD',
    model: 'Doble Butterfly Shine',
    stoneType: 'No aplica',
    nickelFree: 'No',
    gender: 'Mujer',
    includes: 'Joya, papel de seda, tarjeta de garantía.',
    detalleCondicion: 'Producto nuevo',
    garantia: '1 mes',
  },
};

// Componente para los iconos de estrellas de calificación
const StarRating = ({ count = 5, filled = 0 }) => (
  <div className="flex items-center text-yellow-500">
    {Array.from({ length: count }, (_, i) => (
      i < filled ? (
        <svg
          key={i}
          className="w-5 h-5 fill-current text-yellow-500"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.32 6.91 1-5 4.88 1.18 6.88-6.18-3.25-6.18 3.25 1.18-6.88-5-4.88 6.91-1z" />
        </svg>
      ) : (
        <FaRegStar key={i} className="w-5 h-5 text-gray-400" />
      )
    ))}
  </div>
);

// Componente para la sección de servicios del vendedor
const SellerServices = ({ brand }: { brand: string | undefined }) => (
  <div className="mt-6 border p-4 rounded-lg border-neutral shadow-sm w-full md:w-96 mx-auto">
    <div className="flex items-center justify-center gap-2">
      <span className="text-primary text-lg">Vendido por: </span>
      <span className="font-bold text-gray-800">{brand}</span>
    </div>
    <div className="flex justify-center my-4">
      <StarRating filled={3} />
    </div>
    <div className="flex justify-between items-center text-center mt-4 text-gray-500 text-sm md:text-lg">
      <div className="flex flex-col items-center flex-1">
        <MdAccessTime className="h-6 w-6 text-dark" />
        <span className="text-sm mt-1 text-primary text-center">Pocas entregas con demora</span>
      </div>
      <div className="flex flex-col items-center flex-1">
        <FaCheckCircle className="h-6 w-6 text-dark" />
        <span className="text-sm mt-1 text-primary text-center">Cumple con sus entregas</span>
      </div>
      <div className="flex flex-col items-center flex-1">
        <AiOutlineSmile className="h-6 w-6 text-dark" />
        <span className="text-sm mt-1 text-primary text-center">Ofrece un buen servicio</span>
      </div>
    </div>
    <button className="w-full mt-4 mx-auto bg-gray-200 text-gray-700 font-semibold font-sans py-2 px-4 rounded-lg hover:bg-gray-300 block border border-black">
      Ir a la tienda
    </button>
  </div>
);

// Componente principal de la página de detalles del producto
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) throw new Error('No se proporcionó un ID de producto.');
        const data = DUMMY_PRODUCT;
        if (!data) throw new Error('Producto no encontrado.');
        setProduct(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const imagesToDisplay = product?.images || (product?.image ? [product.image] : []);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagesToDisplay.length) % imagesToDisplay.length);
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesToDisplay.length);
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl font-semibold">Cargando...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-600">{error}</div>;
  if (!product) return <div className="flex justify-center items-center h-screen text-xl font-semibold">Producto no encontrado.</div>;

  return (
    <div className="container mx-auto p-4 md:p-8 mt-4">
      {/* Breadcrumbs */}
      <nav className="text-sm breadcrumbs mb-4 w-fit">
        <ul className="flex items-center space-x-2">
          <li className="flex items-center">
            <a href="/" className="flex items-center gap-1 hover:underline text-gray-500">
              <HiOutlineHome className="h-4 w-4" />
              <span className="font-bold">Inicio</span>
            </a>
          </li>
          <li className="flex items-center">
            <span className="text-primary font-bold">/</span>
            <a href="/productos" className="ml-2 hover:underline text-gray-500">Sortijas</a>
          </li>
          <li className="flex items-center">
            <span className="text-primary font-bold">/</span>
            <span className="ml-2 text-primary font-bold">{product.name}</span>
          </li>
        </ul>
      </nav>


      {/* Contenedor principal del producto */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-lg shadow-lg">
        {/* Sección de la imagen y miniaturas */}
        <div className="md:max-w-md flex flex-col">
          <div className="relative overflow-hidden rounded-lg max-w-sm max-h-[400px]">
            <img
              src={imagesToDisplay[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={handlePrevClick}
              className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-accent-warm rounded-full opacity-75 hover:opacity-100 transition cursor-pointer"
            >
              <FaAngleLeft className="text-xl text-gray-800" />
            </button>
            <button
              onClick={handleNextClick}
              className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-accent-warm rounded-full opacity-75 hover:opacity-100 transition cursor-pointer"
            >
              <FaAngleRight className="text-xl text-gray-800" />
            </button>
          </div>

          {/* Miniaturas */}
          <div className="flex gap-2 mt-4 overflow-x-auto justify-start">
            {imagesToDisplay.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-16 h-16 rounded-md border-2 cursor-pointer transition ${
                  currentImageIndex === index ? 'border-primary' : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sección de detalles del producto */}
        <div className="flex-1 w-full">
          <div className="flex items-center mb-2 w-full">
            <span className="bg-secondary text-white text-lg rounded-md px-3 py-1 font-sans">
              Categoría Sortijas
            </span>
            <span className="text-primary px-3 py-0.5 ml-auto text-lg">
              Código: 322392322
            </span>
          </div>

          <h1 className="text-base md:text-3xl mb-2 text-black font-sans">{product.name}</h1>
          <StarRating filled={0} />

          {/* Cambio clave: Usamos Flexbox para alinear el contenedor de detalles y el de precios/vendedor */}
          <div className="flex flex-col md:flex-row gap-6 items-start mt-4">
            {/* Detalles (color, talla, especificaciones) */}
            <div className="flex-1 w-full md:w-auto">
              <h3 className="font-semibold text-black text-lg font-sans">Color: <span className="text-primary text-lg">Dorado</span></h3>
              <div className="flex">
                <img src={anillosImg} alt="Color dorado" className="w-10 h-10 rounded-none border-2 border-black cursor-pointer" />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 font-sans text-lg">Talla:</h3>
                <div className="p-2 w-15 font-sans text-center rounded-lg bg-graphite/25">40 - 45</div>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-gray-700 font-sans text-lg">Especificaciones principales</h3>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                  <li>
                    <span className="font-semibold font-sans text-lg">Género:</span>
                    <span className="text-primary text-lg"> {product.specs.gender}</span>
                  </li>
                  <li>
                    <span className="font-semibold font-sans text-lg">Material de las joyas:</span>
                    <span className="text-primary text-lg"> {product.specs.material}</span>
                  </li>
                  <li>
                    <span className="font-semibold font-sans text-lg">Tipo de piedra:</span>
                    <span className="text-primary text-lg"> {product.specs.stoneType}</span>
                  </li>
                  <li>
                    <span className="font-semibold font-sans text-lg">Posee níquel:</span>
                    <span className="text-primary text-lg"> {product.specs.nickelFree}</span>
                  </li>
                </ul>
                <a href="#especificaciones" className="text-graphite/70 hover:underline mt-2 inline-block font-sans text-lg">Ver más especificaciones</a>
              </div>
            </div>

            {/* Precios y vendedor */}
            <div className="flex-none w-full md:w-96">
              <div className="flex flex-col mb-4">
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-accent-warm">S/{product.price.toFixed(2)}</p>
                  {product.discountPercentage && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">-{product.discountPercentage}%</span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through">S/{product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <SellerServices brand={product.brand} />
            </div>
          </div>
        </div>
      </div>

      {/* Secciones de Especificaciones e Información Adicional */}
      <div id="especificaciones" className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold font-sans mb-4 border-b-2 border-black pb-1">Especificaciones</h2>
          <div className="font-sans">
            <table className="w-full text-left">
              <tbody>
                <tr className="bg-gray-100">
                  <td className="font-semibold py-6 px-4 text-lg">Condición del producto</td>
                  <td className="py-3 px-4 text-gray-600 text-right text-lg">{product.specs.condition}</td>
                </tr>
                <tr>
                  <td className="font-semibold py-6 px-4 text-lg">Detalle de la garantía</td>
                  <td className="py-3 px-4 text-gray-600 text-right text-lg">{product.specs.guarantee}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="font-semibold py-6 px-4 text-lg">País de origen</td>
                  <td className="py-3 px-4 text-gray-600 text-right text-lg">{product.specs.origin}</td>
                </tr>
                <tr>
                  <td className="font-semibold py-6 px-4 text-lg">Material de joyas</td>
                  <td className="py-3 px-4 text-gray-600 text-right text-lg">{product.specs.material}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="font-semibold py-6 px-4 text-lg">Detalle de la Condición</td>
                  <td className="py-3 px-4 text-gray-600 text-right text-lg">{product.specs.detalleCondicion}</td>
                </tr>
                <tr>
                  <td className="font-semibold py-6 px-4 text-lg">Modelo</td>
                  <td className="py-3 px-4 text-gray-600 text-right text-lg">{product.specs.model}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="font-semibold py-6 px-4 text-lg">Tipo de piedra</td>
                  <td className="py-3 px-4 text-gray-600 text-right text-lg">{product.specs.stoneType}</td>
                </tr>
                <tr>
                  <td className="font-semibold py-6 px-4 text-lg">Posee níquel</td>
                  <td className="py-3 px-4 text-gray-600 text-right text-lg">{product.specs.nickelFree}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="font-semibold py-6 px-4 text-lg">Garantía</td>
                  <td className="py-3 px-4 text-gray-600 text-right text-lg">{product.specs.garantia}</td>
                </tr>
                <tr>
                  <td className="font-semibold py-6 px-4 text-lg">Género</td>
                  <td className="py-3 px-4 text-gray-600 text-right text-lg">{product.specs.gender}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="font-semibold py-6 px-4 text-lg">Incluye</td>
                  <td className="py-3 px-4 text-gray-600 text-right text-lg">{product.specs.includes}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="font-bold mb-4 font-sans text-2xl border-b-2 border-black pb-1">Información Adicional</h2>
          <p className="text-gray-600 font-sans text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur tempor volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec eleifend nunc. Suspendisse ut lectus sit amet mi commodo blandit. Curabitur malesuada tempus consequat. Proin ligula purus, consequat sit amet tristique ut amet, bibendum sed sem. Nunc vitae egestas nisl. Phasellus condimentum augue quis lorem suscipit, nec efficitur ligula porttitor. Etiam faucibus, enim sit amet vulputate laoreet, velit neque condimentum libero, viverra pharetra magna mauris sit amet metus. Morbi congue turpis ut justo ullamcorper, in convallis tortor auctor. Proin ullamcorper ornare est, vel lobortis erat tristique at. Nulla quis metus sem. Fusce vitae vestibulum lacus. Duis vulputate fringilla elit ac efficitur. Nullam bibendum blandit lacus, porta tempor lectus finibus id.
          </p>
        </div>
      </div>
    </div>
  );
}