import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AppShell from "@/app/AppShell";
import { PATHS } from "./paths";
import RequireAuth from "./RequireAuth";
import StoreDetail from "@/pages/Stores/StoreDetail";
import LoadingAnimate from "@/components/LoadingAnimate";
import { adminRoutes } from "@/pages/Admin/routes/admin.routes";

const Home = lazy(() => import("@/pages/Home/Home"));
const Quote = lazy(() => import("@/pages/Quote/Quote"));
const Compare = lazy(() => import("@/pages/Compare/Compare"));
const Blog = lazy(() => import("@/pages/Blog/Blog"));
const Stores = lazy(() => import("@/pages/Stores/Stores"));
const About = lazy(() => import("@/pages/About/About"));
const Contact = lazy(() => import("@/pages/Contact/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));
const Products = lazy(() => import("@/pages/Products").then(module => ({ default: module.default })));
const ProductDetailPage = lazy(() => import("@/pages/Products/components/ProductDetailPage"));
const AccountPage = lazy(() => import("@/pages/Account/Account"));

function RootLayout() {
  return (
    <AppShell>
      <Suspense fallback={<LoadingAnimate />}>
        <Outlet />
      </Suspense>
    </AppShell>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: PATHS.PRODUCTS, element: <Products /> },
      { path: `${PATHS.PRODUCTS}/:id`, element: <ProductDetailPage /> },
      { path: PATHS.QUOTE, element: <Quote /> },
      { path: PATHS.COMPARE, element: <Compare /> },
      { path: PATHS.BLOG, element: <Blog /> },
      { path: PATHS.STORES, element: <Stores /> },
      { path: `${PATHS.STORES}/:slug`, element: <StoreDetail /> },
      { path: PATHS.ABOUT, element: <About /> },
      { path: PATHS.CONTACT, element: <Contact /> },
      { path: "*", element: <NotFound /> },
      {
        element: <RequireAuth />,
        children: [
          { path: PATHS.ACCOUNT, element: <AccountPage /> },
          { path: `${PATHS.ACCOUNT}/*`, element: <AccountPage /> },
        ],
      },
    ],
  },
  ...adminRoutes,
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
