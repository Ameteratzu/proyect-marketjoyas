import React from "react";
import { useTranslation } from "react-i18next";
import collar from "../../../../../assets/jewelry/collares.png";
import click from "../../../../../assets/order/click.png";
import eye from "../../../../../assets/order/Eye.png";
import dele from "../../../../../assets/order/delete.png";
import anillo from "../../../../../assets/products/anillos.png";
import cadena from "../../../../../assets/jewelry/cadenas.png";


const OrderData: React.FC = () => {
  const { t } = useTranslation("account");

  return (
    <div className="p-6 md:p-8 min-h-screen flex flex-col items-start text-left">
      {/* Title */}
      <p className="font-afacap font-bold text-[20px] mb-1">
        {t("orders.title")}
      </p>

      {/* Description */}
      <p className="font-afacap text-[16px] text-gray-700 mb-6">
        {t("orders.description")}
      </p>

      {/* Contenedor de los cuadros */}
      <div className="w-full flex flex-col gap-4">
        <div className="bg-white rounded-lg border border-gray-300">
          <div className="flex justify-between items-center p-4">
            <p className="font-bold mb-0 text-[#1F6F61]">{t("orders.productTitle")}</p>
            <p className="font-bold mb-0">{t("orders.orderDate")} 13/05/2025</p>
            <p className="font-bold mb-0">{t("orders.productPrice")} S/3,500</p>
          </div>

          <div className="border-t border-gray-300"></div> {/* Línea de ancho total */}
          <div className="bg-white rounded-lg border border-gray-300 w-full p-4 flex items-start justify-between">

            <div className="flex flex-col justify-center flex-1 mx-20 overflow-hidden">
              <img
                src={collar}
                alt="Collar"
                className="w-[110px] h-[110px] object-cover rounded-lg"
              />
            </div>

            {/* Texto centrado entre imagen y botones */}
            <div className="flex flex-col justify-start flex-2 mx-6">
              <p className="font-bold mb-0.1 text-[#1F6F61] text-[20px]">Antonio's Joyeria</p>
              <div className="flex items-center gap-2">
                <img src={click} alt="Click" className="w-4 h-4" />
                <p className="text-gray-700 mb-0">Anillo de promesa juntos para siempre</p>
              </div>
            </div>
            {/* Botones a la derecha */}
            <div className="flex flex-col gap-5">
              <button className="bg-[#1F6F61] hover:bg-[#196652] text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2">
                <img src={eye} alt="Ver detalle" className="w-4 h-4" />
                {t("orders.form.view")}
              </button>
              <button className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2">
                <img src={dele} alt="Eliminar pedido" className="w-4 h-4" />
                {t("orders.form.delete")}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-300">
          <div className="flex justify-between items-center p-4">
            <p className="font-bold mb-0 text-[#1F6F61]">{t("orders.productTitle")}</p>
            <p className="font-bold mb-0">{t("orders.orderDate")} 13/05/2025</p>
            <p className="font-bold mb-0">{t("orders.productPrice")} S/3,500</p>
          </div>

          <div className="border-t border-gray-300"></div> {/* Línea de ancho total */}
          <div className="bg-white rounded-lg border border-gray-300 w-full p-4 flex items-start justify-between">

            <div className="flex flex-col justify-center relative w-[120px] h-[120px] ml-20 overflow-hidden">
              <img
                src={collar}
                alt="Collar"
                className="w-[110px] h-[110px] object-cover absolute top-0 left-0 rounded-lg z-10"
              />
              <img
                src={anillo}
                alt="Anillo"
                className="w-[110px] h-[110px] object-cover absolute top-2 left-3 rounded-lg z-20"
              />
            </div>




            {/* Texto centrado entre imagen y botones */}
            <div className="flex flex-col justify-start flex-2 ml-32">
              <p className="font-bold mb-0.1 text-[#1F6F61] text-[20px]">Antonio's Joyeria</p>
              <div className="flex items-center gap-2">
                <img src={click} alt="Click" className="w-4 h-4" />
                <p className="text-gray-700 mb-0">Anillo de promesa juntos para siempre</p>
              </div>
              <p className="font-bold mb-0.1 text-[#1F6F61] text-[20px]">Norma Joyería</p>
              <div className="flex items-center gap-2">
                <img src={click} alt="Click" className="w-4 h-4" />
                <p className="text-gray-700 mb-0">Anillo de diamante e</p>
              </div>
            </div>

            {/* Botones a la derecha */}
            <div className="flex flex-col gap-5">
              <button className="bg-[#1F6F61] hover:bg-[#196652] text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2">
                <img src={eye} alt="Ver detalle" className="w-4 h-4" />
                {t("orders.form.view")}
              </button>
              <button className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2">
                <img src={dele} alt="Eliminar pedido" className="w-4 h-4" />
                {t("orders.form.delete")}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-300">
          <div className="flex justify-between items-center p-4">
            <p className="font-bold mb-0 text-[#1F6F61]">{t("orders.productTitle")}</p>
            <p className="font-bold mb-0">{t("orders.orderDate")} 13/05/2025</p>
            <p className="font-bold mb-0">{t("orders.productPrice")} S/3,500</p>
          </div>

          <div className="border-t border-gray-300"></div> {/* Línea de ancho total */}
          <div className="bg-white rounded-lg border border-gray-300 w-full p-4 flex items-start justify-between">

            <div className="flex flex-col justify-center relative w-[140px] h-[140px] ml-15 overflow-hidden">
              <img
                src={collar}
                alt="Collar1"
                className="w-[110px] h-[110px] object-cover absolute top-0 left-0 rounded-lg z-10"
              />
              <img
                src={anillo}
                alt="anillo"
                className="w-[110px] h-[110px] object-cover absolute top-2 left-2 rounded-lg z-20"
              />
              <img
                src={collar}
                alt="Collar3"
                className="w-[110px] h-[110px] object-cover absolute top-4 left-4 rounded-lg z-30"
              />
              <img
                src={cadena}
                alt="Cadena"
                className="w-[110px] h-[110px] object-cover absolute top-6 left-6 rounded-lg z-40"
              />
            </div>

            {/* Texto centrado entre imagen y botones */}
            <div className="flex flex-col justify-start flex-2 ml-32">
              <p className="font-bold mb-0.1 text-[#1F6F61] text-[20px]">Antonio's Joyeria</p>
              <div className="flex items-center gap-2">
                <img src={click} alt="Click" className="w-4 h-4" />
                <p className="text-gray-700 mb-0">Anillo de promesa juntos para siempre</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={click} alt="Click" className="w-4 h-4" />
                <p className="text-gray-700 mb-0">Collar de perlas amanecer</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={click} alt="Click" className="w-4 h-4" />
                <p className="text-gray-700 mb-0">Pulcerade de dijes de oro</p>
              </div>
              <p className="font-bold mb-0.1 text-[#1F6F61] text-[20px]">Norma Joyería</p>
              <div className="flex items-center gap-2">
                <img src={click} alt="Click" className="w-4 h-4" />
                <p className="text-gray-700 mb-0">Anillo de diamante e</p>
              </div>
            </div>

            {/* Botones a la derecha */}
            <div className="flex flex-col gap-5">
              <button className="bg-[#1F6F61] hover:bg-[#196652] text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2">
                <img src={eye} alt="Ver detalle" className="w-4 h-4" />
                {t("orders.form.view")}
              </button>
              <button className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2">
                <img src={dele} alt="Eliminar pedido" className="w-4 h-4" />
                {t("orders.form.delete")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="self-end mt-4 flex items-center gap-2">
        <button className="px-3 py-1 rounded bg-gray-200 text-gray-500 cursor-not-allowed">
          &lt;
        </button>
        <button className="px-3 py-1 rounded bg-[#1F6F61] text-white">1</button>
        <button className="px-3 py-1 rounded border border-gray-300 text-gray-700">2</button>
        <button className="px-3 py-1 rounded border border-gray-300 text-gray-700">...</button>
        <button className="px-3 py-1 rounded border border-gray-300 text-gray-700">&gt;</button>
      </div>



    </div>
  );
};

export default OrderData;
