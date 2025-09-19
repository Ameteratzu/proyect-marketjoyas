import { Routes, Route, Navigate } from "react-router-dom";
import AccountLayout from "./AccountLayout";
import AccountInfo from "./pages/AccountInfo";
import Orders from "./pages/Orders";
import Address from "./pages/Address";
import Favorites from "./pages/Favorites";
import Help from "./pages/Help";

export default function Account() {
  return (
    <Routes>
      <Route element={<AccountLayout />}>
        <Route index element={<AccountInfo />} />
        <Route path="pedidos" element={<Orders />} />
        <Route path="direccion" element={<Address />} />
        <Route path="favoritos" element={<Favorites />} />
        <Route path="ayuda" element={<Help />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  );
}
