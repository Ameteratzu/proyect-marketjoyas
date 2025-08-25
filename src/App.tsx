export default function App() {
  return (
    <div className="min-h-dvh bg-white text-neutral-900">
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2">
            <img src="./assets/logo.svg" alt="Merket Joyas" className="h-7 w-auto" />
            <span className="font-semibold">Market Joyas</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-blue-600" href="#">
              Catálogo
            </a>
            <a className="hover:text-blue-600" href="#">
              Ofertas
            </a>
            <a className="hover:text-blue-600" href="#">
              Contacto
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold">Bienvenido</h1>
        <p className="mt-2 text-neutral-600">
          Base limpia lista para construir.
        </p>

        <div className="mt-6 rounded-xl bg-black/90 text-white p-6">
          Tailwind v4.1 activo ✨
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-neutral-500">
          © {new Date().getFullYear()} Merket Joyas
        </div>
      </footer>
    </div>
  );
}
