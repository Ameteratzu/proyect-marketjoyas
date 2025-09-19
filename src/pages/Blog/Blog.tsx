import React from "react";
import blogImagen from "../../assets/blog/blogimagen.png";


export default function Blog() {
  return (
    <section className="container-p py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="h1 text-4xl font-sans text-dark">Blog de Joyas</h1>

        <div className="w-full">
          <p className="lead mt-1 text-primary font-sans mb-4 max-w-4xl mx-auto">
            Descubre consejos expertos, tendencias y guías para cuidar y lucir tus joyas
          </p>
        </div>
      </header>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contenido principal */}
        <article className="lg:col-span-2 space-y-6">
          <div className="overflow-hidden rounded-lg shadow-md aspect-video">
            <img
              src={blogImagen}
              alt="joyas"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-accent-warm text-white rounded-full">
              Cuidado
            </span>
            <h2 className="h2 mt-3 text-2xl text-secondary">
              Cómo limpiar y cuidar tus joyas de oro
            </h2>
            <p className="mt-3 text-graphite">
              Las joyas de oro son una inversión valiosa que requiere cuidados específicos
              para mantener su belleza y valor a lo largo del tiempo. En este artículo,
              te compartimos los secretos profesionales para el cuidado adecuado de tus piezas.
            </p>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Categorías */}
          <div className="card p-5">
            <h3 className="h3 text-lg mb-4 text-secondary">Categorías</h3>
            <ul className="space-y-3">
              <li>
                <button className="btn-selected w-full">Todos</button>
              </li>
              <li>
                <button className="btn-light w-full">Cuidado</button>
              </li>
              <li>
                <button className="btn-light w-full">Tendencias</button>
              </li>
              <li>
                <button className="btn-light w-full">Guías</button>
              </li>
              <li>
                <button className="btn-light w-full">Estilo</button>
              </li>
            </ul>
          </div>

          {/* Más Populares */}
          <div className="card p-5">
            <h3 className="h3 text-lg mb-4 text-secondary">Más Populares</h3>
            <ul className="space-y-5">
              <li className="flex items-center gap-4">
                <img
                  src="/images/post1.jpg"
                  alt="post"
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-dark">
                    Cómo limpiar tus joyas de oro
                  </p>
                  <span className="text-xs text-graphite">10 min</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <img
                  src="/images/post2.jpg"
                  alt="post"
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-dark">
                    Tendencias en joyería 2024: lo que debes saber
                  </p>
                  <span className="text-xs text-graphite">9 min</span>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
