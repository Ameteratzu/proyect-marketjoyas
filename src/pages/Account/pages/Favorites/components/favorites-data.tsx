import React from "react";
import { useTranslation } from "react-i18next";
import collar from "../../../../../assets/jewelry/collares.png";
import click from "../../../../../assets/order/click.png";
import eye from "../../../../../assets/order/Eye.png";
import dele from "../../../../../assets/order/delete.png";
import anillo from "../../../../../assets/products/anillos.png";
import cadena from "../../../../../assets/jewelry/cadenas.png";


const FavoritesData: React.FC = () => {
    const { t } = useTranslation("account");

    return (
        <div className="p-6 md:p-8 min-h-screen flex flex-col items-start text-left">

            {/* Contenedor de los cuadros */}
            <div className="w-full flex flex-col gap-4">
                <div className="bg-white rounded-lg border border-gray-300">
                    <div className="flex justify-center items-center gap-20 px-4 py-2">
                        <span className="font-bold text-[#1F6F61]">{t("favorites.productTitle")}</span>
                        <span className="font-bold">{t("favorites.productPrice")} S/3,500</span>
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
                                {t("favorites.form.view")}
                            </button>
                            <button className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2">
                                <img src={dele} alt="Eliminar pedido" className="w-4 h-4" />
                                {t("favorites.form.delete")}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-300">
                    <div className="flex justify-center items-center gap-20 px-4 py-2">
                        <span className="font-bold text-[#1F6F61]">{t("favorites.productTitle")}</span>
                        <span className="font-bold">{t("favorites.productPrice")} S/3,500</span>
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
                                {t("favorites.form.view")}
                            </button>
                            <button className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2">
                                <img src={dele} alt="Eliminar pedido" className="w-4 h-4" />
                                {t("favorites.form.delete")}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-300">
                    <div className="flex justify-center items-center gap-20 px-4 py-2">
                        <span className="font-bold text-[#1F6F61]">{t("favorites.productTitle")}</span>
                        <span className="font-bold">{t("favorites.productPrice")} S/3,500</span>
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
                                {t("favorites.form.view")}
                            </button>
                            <button className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2">
                                <img src={dele} alt="Eliminar pedido" className="w-4 h-4" />
                                {t("favorites.form.delete")}
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

export default FavoritesData;
