import LoadingAnimate from "@/components/LoadingAnimate";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import CertificatesList from "../pages/Certificates/CertificatesList";
import Customers from "../pages/Customers/Customers";

const Dashboard = lazy(() => import("../Dasboard"));
const Inventory = lazy(() => import("../pages/Inventory/Inventory"));
const Orders = lazy(() => import("../pages/Orders/Orders"));
const Products = lazy(() => import("../pages/Products/Products"));
const Refunds = lazy(() => import("../pages/Refunds/Refunds"));
const Transactions = lazy(() => import("../pages/Transactions/Transactions"));
const Subscriptions = lazy(
  () => import("../pages/Subscriptions/Subscriptions")
);
const Staff = lazy(() => import("../pages/Staff/Staff"));
const Reviews = lazy(() => import("../pages/Reviews/Reviews"));
const Reports = lazy(() => import("../pages/Reports/Reports"));

function SuspenseOutlet() {
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
    children: [
      {
        element: <SuspenseOutlet />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "certificados", element: <CertificatesList /> },
          { path: "productos", element: <Products /> },
          { path: "suscripciones", element: <Subscriptions /> },
          { path: "pedidos", element: <Orders /> },
          { path: "transacciones", element: <Transactions /> },
          { path: "reembolsos", element: <Refunds /> },
          { path: "opiniones", element: <Reviews /> },
          { path: "inventario", element: <Inventory /> },
          { path: "clientes", element: <Customers /> },
          { path: "personal", element: <Staff /> },
          { path: "reportes", element: <Reports /> },
        ],
      },
    ],
  },
];
