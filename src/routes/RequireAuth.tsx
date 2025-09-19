import { useSelector } from "react-redux";
import type { RootState } from "@/common/store/store";
import NotFound from "@/pages/NotFound/NotFound";
import { Outlet } from "react-router-dom";

/**
 * Protege rutas que requieren autenticación.
 * Si no hay usuario logueado, renderiza NotFound.
 */
export default function RequireAuth() {
  const user = useSelector((state: RootState) => state.user.user);
  if (!user) return <NotFound />;
  return <Outlet />;
}
