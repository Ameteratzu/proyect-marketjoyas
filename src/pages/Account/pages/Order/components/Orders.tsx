import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Bag from "../../../../../assets/order/bag.png";
import Vector from "../../../../../assets/order/Vector.png";

const Orders: React.FC = () => {
  const { t } = useTranslation("account");
  const navigate = useNavigate(); // hook de React Router

  return (
    <div className="p-6 md:p-8 min-h-screen flex flex-col items-center justify-center text-center">
      {/* Imagen arriba del texto */}
      <img
        src={Bag}
        alt="Bolsa de pedidos"
        className="w-[150px] h-auto mb-6"
      />

      {/* Texto */}
      <p className="font-afacap font-medium text-[35px] text-neutral-600 text-opacity-50 mb-4">
        {t("orders.empty")}
      </p>

      {/* Botón centrado */}
      <button
        className="
          px-6 py-3
          bg-[#1F6F61]
          text-white
          rounded-lg
          hover:bg-[#17584D]
          transition-colors
          flex items-center justify-center gap-2
          text-center
          max-w-[180px]
        "
        onClick={() => {
          navigate("/cuenta/pedidos/order-data"); // <-- ruta hacia la página OrderData.tsx
        }}
      >
        <span className="block leading-tight text-[18px]">
          {t("orders.action")}
        </span>
        <img src={Vector} alt="Vector" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Orders;
