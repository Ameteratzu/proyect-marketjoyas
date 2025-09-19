import { FaRegHeart } from "react-icons/fa";
import parejaMano from "../../assets/Testimony/pareja_mano.png";
import parejaVaque from "../../assets/Testimony/chicos_vaquero.png";
import parejaBoda from "../../assets/Testimony/boda_expres.png";
import parejaFalda from "../../assets/Testimony/chica_falda.png";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

export default function Testimonios() {
  return (
    <>
      {/* Sección de encabezado y botón */}
      <section className="w-full py-16 text-center bg-gradient-to-r from-[#f8f7f3] to-[#d9ebe3]">
        <h1 className="text-4xl font-bold text-gray-800 font-display">
          Testimonios de <span className="text-teal-700">Amor</span>
        </h1>

        <p className="mt-4 text-lg text-dark max-w-2xl mx-auto font-sans">
          Conoce las historias reales de parejas que encontraron en Centro Joyero
          las joyas perfectas para celebrar sus momentos más especiales
        </p>

        <p className="mt-4 text-2xl text-dark font-medium max-w-2xl mx-auto font-sans">
          Comparte tu{" "}
          <span className="text-teal-700 font-medium text-2xl">Historia</span>
        </p>

        <p className="mt-4 text-medio text-dark max-w-2xl mx-auto font-sans">
          Si eres cliente de Market Joyas, nos encantaría conocer tu experiencia y
          compartir tu historia de amor
        </p>

        {/* Botón */}
        <div className="mt-8">
          <a
            href="mailto:contacto@tusitio.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-700 text-white font-medium rounded-lg shadow hover:bg-teal-800 transition"
          >
            <FaRegHeart className="text-lg" />
            Agregar mi Testimonio
          </a>
        </div>
      </section>

      {/* Sección de testimonios */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaMano} alt="Pareja mano" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Maria Rodrigues y Miguel</h3>
            <p className="text-gray-600 mt-2 text-sm font-medium leading-relaxed">
              Un anillo único para un amor único. Este momento quedará grabado en
              nuestros corazones para siempre.
            </p>
            <p className="text-xs font-bold text-gray-500 mt-3">
              24, abril, 2023 • Lima, Peru
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaVaque} alt="Pareja propuesta" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Leila y Josmell Cordova</h3>
            <p className="text-gray-600 mt-4">
              Fue la mejor sorpresa que recibió mi ahora prometida.
            </p>
            <p className="text-sm text-gray-500 mt-5">24, abril, 2023 · Lima, Perú</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaBoda} alt="Boda" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Maria Rodrigues y Miguel</h3>
            <p className="text-gray-600 mt-3">
              Muchas gracias por haber formado parte de esta historia.
            </p>
            <p className="text-sm text-gray-500 mt-3">24, mayo, 2024 · Lima, Perú</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaFalda} alt="Entrega de regalo" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Maria Rodrigues y Miguel</h3>
            <p className="text-gray-600 mt-2 text-xs">
              Les comparto una imagen de lo que fue el regalo especial para mi novia.
            </p>
            <p className="text-sm text-gray-500 mt-3">12, julio, 2025 · Lima, Perú</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaMano} alt="Pareja mano" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Maria Rodrigues y Miguel</h3>
            <p className="text-gray-600 mt-2 text-sm font-medium leading-relaxed">
              Un anillo único para un amor único. Este momento quedará grabado en
              nuestros corazones para siempre.
            </p>
            <p className="text-xs font-bold text-gray-500 mt-3">
              24, abril, 2023 • Lima, Peru
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaVaque} alt="Pareja propuesta" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Leila y Josmell Cordova</h3>
            <p className="text-gray-600 mt-4">
              Fue la mejor sorpresa que recibió mi ahora prometida.
            </p>
            <p className="text-sm text-gray-500 mt-5">24, abril, 2023 · Lima, Perú</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaBoda} alt="Boda" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Maria Rodrigues y Miguel</h3>
            <p className="text-gray-600 mt-3">
              Muchas gracias por haber formado parte de esta historia.
            </p>
            <p className="text-sm text-gray-500 mt-3">24, mayo, 2024 · Lima, Perú</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaFalda} alt="Entrega de regalo" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Maria Rodrigues y Miguel</h3>
            <p className="text-gray-600 mt-2 text-xs">
              Les comparto una imagen de lo que fue el regalo especial para mi novia.
            </p>
            <p className="text-sm text-gray-500 mt-3">12, julio, 2025 · Lima, Perú</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaMano} alt="Pareja mano" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Maria Rodrigues y Miguel</h3>
            <p className="text-gray-600 mt-2 text-sm font-medium leading-relaxed">
              Un anillo único para un amor único. Este momento quedará grabado en
              nuestros corazones para siempre.
            </p>
            <p className="text-xs font-bold text-gray-500 mt-3">
              24, abril, 2023 • Lima, Peru
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaVaque} alt="Pareja propuesta" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Leila y Josmell Cordova</h3>
            <p className="text-gray-600 mt-4">
              Fue la mejor sorpresa que recibió mi ahora prometida.
            </p>
            <p className="text-sm text-gray-500 mt-5">24, abril, 2023 · Lima, Perú</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaBoda} alt="Boda" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Maria Rodrigues y Miguel</h3>
            <p className="text-gray-600 mt-3">
              Muchas gracias por haber formado parte de esta historia.
            </p>
            <p className="text-sm text-gray-500 mt-3">24, mayo, 2024 · Lima, Perú</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaFalda} alt="Entrega de regalo" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Maria Rodrigues y Miguel</h3>
            <p className="text-gray-600 mt-2 text-xs">
              Les comparto una imagen de lo que fue el regalo especial para mi novia.
            </p>
            <p className="text-sm text-gray-500 mt-3">12, julio, 2025 · Lima, Perú</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaMano} alt="Pareja mano" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Maria Rodrigues y Miguel</h3>
            <p className="text-gray-600 mt-2 text-sm font-medium leading-relaxed">
              Un anillo único para un amor único. Este momento quedará grabado en
              nuestros corazones para siempre.
            </p>
            <p className="text-xs font-bold text-gray-500 mt-3">
              24, abril, 2023 • Lima, Peru
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaVaque} alt="Pareja propuesta" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Leila y Josmell Cordova</h3>
            <p className="text-gray-600 mt-4">
              Fue la mejor sorpresa que recibió mi ahora prometida.
            </p>
            <p className="text-sm text-gray-500 mt-5">24, abril, 2023 · Lima, Perú</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaBoda} alt="Boda" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Maria Rodrigues y Miguel</h3>
            <p className="text-gray-600 mt-3">
              Muchas gracias por haber formado parte de esta historia.
            </p>
            <p className="text-sm text-gray-500 mt-3">24, mayo, 2024 · Lima, Perú</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow p-4 text-center font-display">
            <img src={parejaFalda} alt="Entrega de regalo" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Maria Rodrigues y Miguel</h3>
            <p className="text-gray-600 mt-2 text-xs">
              Les comparto una imagen de lo que fue el regalo especial para mi novia.
            </p>
            <p className="text-sm text-gray-500 mt-3">12, julio, 2025 · Lima, Perú</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white shadow rounded-lg p-4 mt-12">
          {/* Texto a la izquierda */}
          <p className="text-sm text-gray-500">
            1 - 48 de 300 resultados
          </p>

          {/* Paginador centrado */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center">
              <button className="px-2 py-1 text-sm border rounded-sm text-gray-500 hover:bg-gray-100">
                <FaAngleLeft className="text-lg" /> {/* 👈 aquí el icono */}
              </button>
              <span className="mx-2 px-3 py-1 text-sm border rounded-md bg-teal-700 text-white font-medium">
                1
              </span>
              <button className="px-2 py-1 text-sm border rounded-sm text-gray-500 hover:bg-gray-100">
                <FaAngleRight className="text-lg" /> {/* 👈 aquí el icono */}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
