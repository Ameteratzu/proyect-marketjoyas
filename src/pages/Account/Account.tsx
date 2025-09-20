import { Routes, Route, Navigate } from "react-router-dom";
import AccountLayout from "./AccountLayout";
import AccountInfo from "./pages/AccountInfo";
import Orders from "./pages/Order/components/Orders";
import Address from "./pages/Address/Address";
import Favorites from "./pages/Favorites/components/Favorites";
import Help from "./pages/Help/Help";
import OrderData from "./pages/Order/components/Order-data"; 
import FavoritesData from "./pages/Favorites/components/favorites-data"; 


export default function Account() {
  return (
    <Routes>
      <Route element={<AccountLayout />}>
        <Route index element={<AccountInfo />} />
        <Route path="pedidos" element={<Orders />} />
        <Route path="pedidos/order-data" element={<OrderData />} />
        <Route path="direccion" element={<Address />} />
        <Route path="favoritos" element={<Favorites />} />
        <Route path="favoritos/favorites-data" element={<FavoritesData />} />
        <Route path="ayuda" element={<Help />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  );
}
