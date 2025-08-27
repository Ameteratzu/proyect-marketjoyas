// Sirve para definir las rutas de la aplicación con carga diferida de componentes de página.
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AppShell from "@/app/AppShell";
import { PATHS } from "./path";
// import Loading from "@/components/Loading";

// Lazy pages
const Home = lazy(() => import("@/pages/Home/Home"));
const Quote = lazy(() => import("@/pages/Quote/Quote"));
const Compare = lazy(() => import("@/pages/Compare/Compare"));
const Blog = lazy(() => import("@/pages/Blog/Blog"));
const Stores = lazy(() => import("@/pages/Stores/Stores"));
const About = lazy(() => import("@/pages/About/About"));
const Contact = lazy(() => import("@/pages/Contact/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));

function RootLayout() {
  return (
    <AppShell>
      {/* <Suspense fallback={<Loading />}> */}
      <Suspense fallback={<div>Cargando...</div>}>
        <Outlet />
      </Suspense>
      {/* </Suspense> */}
    </AppShell>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: PATHS.QUOTE, element: <Quote /> },
      { path: PATHS.COMPARE, element: <Compare /> },
      { path: PATHS.BLOG, element: <Blog /> },
      { path: PATHS.STORES, element: <Stores /> },
      { path: PATHS.ABOUT, element: <About /> },
      { path: PATHS.CONTACT, element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);


export default function Router() {
    return <RouterProvider router={router} />;
}
