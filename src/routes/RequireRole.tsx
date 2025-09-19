import { useSelector } from "react-redux";
import type { RootState } from "@/common/store/store";
import NotFound from "@/pages/NotFound/NotFound";
import { Outlet } from "react-router-dom";

type Props = {
  roles: string[]; // lista de roles permitidos, p.ej. ["admin"]
};

/**
 * Protege rutas por rol. Si no hay sesión o el rol no está permitido, muestra NotFound.
 */
export default function RequireRole({ roles }: Props) {
  const auth = useSelector((state: RootState) => state.user.user);
  const rawRole = auth?.user?.rol;
  const currentRole = typeof rawRole === "string" ? rawRole.toUpperCase() : undefined;
  const allowedRoles = roles.map(r => r.toUpperCase());
  const allowed = !!currentRole && allowedRoles.includes(currentRole);
  if (!allowed) return <NotFound />;
  return <Outlet />;
}
