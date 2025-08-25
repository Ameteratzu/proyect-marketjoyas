export default function App() {
  return (
    <div className="min-h-dvh">
      <header className="border-b bg-white">
        <div className="container-p h-16 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2">
            <img src="/logo.svg" alt="Merket Joyas" className="h-7 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-brand" href="#">
              Catálogo
            </a>
            <a className="hover:text-brand" href="#">
              Ofertas
            </a>
            <a className="hover:text-brand" href="#">
              Contacto
            </a>
          </nav>
          <button className="btn-primary">Comprar</button>
        </div>
      </header>

      <main className="container-p py-10 space-y-6">
        <h1 className="text-3xl font-bold">Paleta aplicada</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="h-16 rounded-lg bg-brand" />
          <div className="h-16 rounded-lg bg-accent" />
          <div className="h-16 rounded-lg bg-golddeep" />
          <div className="h-16 rounded-lg bg-sand" />
          <div className="h-16 rounded-lg bg-cream" />
          <div className="h-16 rounded-lg bg-fondo border border-oscuro" />
        </div>

        <div className="rounded-xl p-6 text-white grad-gold">
          Gradiente dorado para banners o CTAs
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button className="btn-primary font-display">Botón primario</button>
          <button className="btn-ghost">Botón secundario</button>
          <button className="btn-selected">Botón Selección</button>
        </div>
      </main>

      <footer className="border-t">
        <div className="container-p py-6 text-sm text-graphite">
          © {new Date().getFullYear()} Merket Joyas
        </div>
      </footer>
    </div>
  );
}
