import LoadingAnimate from "@/components/LoadingAnimate";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = lazy(() => import("../Dasboard"));

export default function AdminRoutes() {
  return (
    <Suspense fallback={<LoadingAnimate />}>
      <Outlet />
    </Suspense>
  );
}

export const adminRoutes = [
  {
    path: "/admin",
    element: <Dashboard />,
  },
];
