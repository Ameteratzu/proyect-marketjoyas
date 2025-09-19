
import { BiTime } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import blogImagen from "@/assets/blog/blogimagen.png";
import limpiaJoyas from "@/assets/blog/limpiar_joyas.png";
import tendenciaJoyas from "@/assets/blog/tendencia_joyas.png";
import arteJoyas from "@/assets/blog/arte_dedos_joyas.png";
import guiaJoyas from "@/assets/blog/guia_joyas.png";
import logoJoyas from "@/assets/blog/logo_centro_joyero.png";
import logoFb from "@/assets/blog/logo-facebook.png";
import logoIg from "@/assets/blog/ri_instagram-fill.png";
import logoX from "@/assets/blog/prime_twitter.png";

export default function Blog() {
  return (
    <>
      {/* Header */}
      <section className="container-p py-12">
        <header className="text-center mb-12">
          <h1 className="h1 text-6xl font-sans font-medium text-dark">Blog de Joyas</h1>
          <div className="w-full">
            <p className="lead mt-1 text-primary font-sans mb-4 max-w-4xl mx-auto">
              Descubre consejos expertos, tendencias y guías para cuidar y lucir tus joyas
            </p>
          </div>
        </header>
      </section>

      {/* Línea negra fuera del container */}
      <div className="w-full border-b-2 border-graphite/25 -mt-20"></div>

      {/* Grid principal */}
      <section className="container-p py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contenido principal */}
        <article className="lg:col-span-2 space-y-6">
          <div className="overflow-hidden rounded-lg shadow-md">
            <img
              src={blogImagen}
              alt="joyas"
              className="w-3xl object-cover rounded-t-lg mx-auto mt-5"
            />

            <div className="p-4">
              {/* Fila superior con categoría, tiempo y autor */}
              <div className="flex items-center gap-4 flex-wrap mb-3">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-accent-warm text-white rounded-full">
                  Cuidado
                </span>

                <div className="flex items-center text-sm text-graphite gap-1">
                  <BiTime className="text-base" />
                  <span>10 min lectura</span>
                </div>

                <div className="flex items-center text-sm text-graphite gap-1">
                  <BsPerson className="text-base" />
                  <span>Mario Antonio</span>
                </div>

                <span className="text-sm text-dark">20 de febrero de 2023</span>
              </div>

              {/* Título */}
              <h2 className="h2 mt-3 text-2xl text-primary font-sans">
                Cómo limpiar y cuidar tus joyas de oro
              </h2>

              {/* Párrafo */}
              <p className="mt-3 text-dark font-sans text-lg">
                Las joyas de oro son una inversión valiosa que requiere cuidados específicos
                para mantener su belleza y valor a lo largo del tiempo. En este artículo,
                te compartimos los secretos profesionales para el cuidado adecuado de tus piezas.
              </p>

              <h2 className="h2 mt-3 text-2xl text-primary font-sans">
                Limpieza Básica Diaria
              </h2>
              <p className="mt-3 text-dark font-sans text-lg">
                Para el cuidado diario de tus joyas de oro, es fundamental seguir una rutina simple pero efectiva:
              </p>

              <ol className="list-decimal font-sans list-inside mt-3 text-dark space-y-2 text-lg">
                <li>
                  Limpieza suave: Utiliza un paño suave y seco para limpiar tus joyas después de cada uso
                </li>
                <li>
                  Evita químicos: Mantén tus joyas alejadas de perfumes, lociones y productos de limpieza
                </li>
                <li>
                  Almacenamiento adecuado: Guarda cada pieza por separado en compartimentos acolchados
                </li>
              </ol>

              <h2 className="h2 mt-3 text-2xl text-primary font-sans">
                Limpieza profunda semanal
              </h2>

              <p className="mt-3 text-dark font-sans">
                Una vez por semana, realiza una limpieza más profunda:
              </p>

              <ul className="list-none mt-3 font-sans text-dark space-y-2 text-lg">
                <li>- Prepara una solución con agua tibia y unas gotas de jabón suave</li>
                <li>- Sumerge las joyas durante 10-15 minutos</li>
                <li>- Utiliza un cepillo de dientes suave para limpiar áreas difíciles</li>
                <li>- Enjuaga con agua limpia y seca completamente</li>
              </ul>

              <h2 className="mt-3 text-2xl font-bold text-primary font-sans">
                Cuidados especiales
              </h2>

              {/* Párrafo */}
              <p className="mt-3 text-lg text-dark font-sans">
                El oro de diferentes quilates requiere cuidados específicos. El oro de 18k es más resistente que el de 14k, pero ambos necesitan protección contra rayones y golpes.
                Recuerda que las joyas con piedras preciosas requieren cuidados adicionales, ya que algunas gemas son más delicadas que otras.
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Categorías */}
          <div className="card p-4 shadow-xl rounded-2xl">
            <h3 className="h3 text-2xl mb-0.5 text-dark font-sans font-medium">Categorías</h3>
            <ul className="-mx-1">
              <li><button className="w-full font-medium font-sans cursor-pointer text-left pl-3 py-2.5 text-base rounded-lg bg-transparent text-dark hover:bg-primary hover:text-white transition-colors duration-200">Todos</button></li>
              <li><button className="w-full font-medium font-sans cursor-pointer text-left pl-3 py-2.5 text-base rounded-lg bg-transparent text-dark hover:bg-primary hover:text-white transition-colors duration-200">Cuidado</button></li>
              <li><button className="w-full font-medium ont-sans cursor-pointer text-left pl-3 py-2.5 text-base rounded-lg bg-transparent text-dark hover:bg-primary hover:text-white transition-colors duration-200">Tendencias</button></li>
              <li><button className="w-full font-medium ont-sans cursor-pointer text-left pl-3 py-2.5 text-base rounded-lg bg-transparent text-dark hover:bg-primary hover:text-white transition-colors duration-200">Guías</button></li>
              <li><button className="w-full font-medium ont-sans cursor-pointer text-left pl-3 py-2.5 text-base rounded-lg bg-transparent text-dark hover:bg-primary hover:text-white transition-colors duration-200">Estilo</button></li>
            </ul>
          </div>

          {/* Más Populares */}
          <div className="card p-3 rounded-2xl shadow-lg">
            <h3 className="h3 text-2xl mb-2 text-dark font-sans font-medium">Más Populares</h3>
            <ul className="space-y-1">
              <li className="group flex items-center gap-4 border border-gray-300 rounded-lg p-3 cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                <img
                  src={limpiaJoyas}
                  alt="post"
                  className="w-28 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 flex flex-col">
                  {/* Título */}
                  <p className="text-base font-semibold text-dark group-hover:text-primary/80">
                    Cómo limpiar tus joyas de oro
                  </p>

                  {/* Categoría a la izquierda / Tiempo a la derecha */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-primary font-medium group-hover:text-primary/80">
                      Cuidado
                    </span>
                    <span className="flex items-center gap-1 text-xs text-graphite group-hover:text-primary/80">
                      <BiTime className="text-sm" /> 10 min
                    </span>
                  </div>
                </div>
              </li>


              
              <li className="group flex items-center gap-4 border border-gray-300 rounded-lg p-3 cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                <img
                  src={tendenciaJoyas}
                  alt="post"
                  className="w-28 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 flex flex-col">
                  {/* Título */}
                  <p className="text-base font-semibold text-dark group-hover:text-primary/80">
                    Cómo limpiar tus joyas de oro
                  </p>

                  {/* Categoría a la izquierda / Tiempo a la derecha */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-primary font-medium group-hover:text-primary/80">
                      Cuidado
                    </span>
                    <span className="flex items-center gap-1 text-xs text-graphite group-hover:text-primary/80">
                      <BiTime className="text-sm" /> 10 min
                    </span>
                  </div>
                </div>
              </li>


              <li className="group flex items-center gap-4 border border-gray-300 rounded-lg p-3 cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                <img
                  src={arteJoyas}
                  alt="post"
                  className="w-28 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 flex flex-col">
                  {/* Título */}
                  <p className="text-base font-semibold text-dark group-hover:text-primary/80">
                    Cómo limpiar tus joyas de oro
                  </p>

                  {/* Categoría a la izquierda / Tiempo a la derecha */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-primary font-medium group-hover:text-primary/80">
                      Cuidado
                    </span>
                    <span className="flex items-center gap-1 text-xs text-graphite group-hover:text-primary/80">
                      <BiTime className="text-sm" /> 10 min
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>


          <div className="card p-3 rounded-2xl shadow-lg">
            <h3 className="h3 text-2xl mb-2 text-dark font-sans font-medium">Todos</h3>
            <ul className="space-y-1">
              <li className="group flex items-center gap-4 border border-gray-300 rounded-lg p-3 cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                <img
                  src={limpiaJoyas}
                  alt="post"
                  className="w-28 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 flex flex-col">
                  {/* Título */}
                  <p className="text-base font-semibold text-dark group-hover:text-primary/80">
                    Cómo limpiar tus joyas de oro
                  </p>

                  {/* Categoría a la izquierda / Tiempo a la derecha */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-primary font-medium group-hover:text-primary/80">
                      Cuidado
                    </span>
                    <span className="flex items-center gap-1 text-xs text-graphite group-hover:text-primary/80">
                      <BiTime className="text-sm" /> 10 min
                    </span>
                  </div>
                </div>
              </li>


              
              <li className="group flex items-center gap-4 border border-gray-300 rounded-lg p-3 cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                <img
                  src={tendenciaJoyas}
                  alt="post"
                  className="w-28 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 flex flex-col">
                  {/* Título */}
                  <p className="text-base font-semibold text-dark group-hover:text-primary/80">
                    Cómo limpiar tus joyas de oro
                  </p>

                  {/* Categoría a la izquierda / Tiempo a la derecha */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-primary font-medium group-hover:text-primary/80">
                      Cuidado
                    </span>
                    <span className="flex items-center gap-1 text-xs text-graphite group-hover:text-primary/80">
                      <BiTime className="text-sm" /> 10 min
                    </span>
                  </div>
                </div>
              </li>


              <li className="group flex items-center gap-4 border border-gray-300 rounded-lg p-3 cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                <img
                  src={arteJoyas}
                  alt="post"
                  className="w-28 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 flex flex-col">
                  {/* Título */}
                  <p className="text-base font-semibold text-dark group-hover:text-primary/80">
                    Cómo limpiar tus joyas de oro
                  </p>

                  {/* Categoría a la izquierda / Tiempo a la derecha */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-primary font-medium group-hover:text-primary/80">
                      Cuidado
                    </span>
                    <span className="flex items-center gap-1 text-xs text-graphite group-hover:text-primary/80">
                      <BiTime className="text-sm" /> 10 min
                    </span>
                  </div>
                </div>
              </li>


              <li className="group flex items-center gap-4 border border-gray-300 rounded-lg p-3 cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                <img
                  src={guiaJoyas}
                  alt="post"
                  className="w-28 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 flex flex-col">
                  {/* Título */}
                  <p className="text-base font-semibold text-dark group-hover:text-primary/80">
                    Cómo limpiar tus joyas de oro
                  </p>

                  {/* Categoría a la izquierda / Tiempo a la derecha */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-primary font-medium group-hover:text-primary/80">
                      Cuidado
                    </span>
                    <span className="flex items-center gap-1 text-xs text-graphite group-hover:text-primary/80">
                      <BiTime className="text-sm" /> 10 min
                    </span>
                  </div>
                </div>
              </li>

              <li className="group flex items-center gap-4 border border-gray-300 rounded-lg p-3 cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                <img
                  src={tendenciaJoyas}
                  alt="post"
                  className="w-28 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 flex flex-col">
                  {/* Título */}
                  <p className="text-base font-semibold text-dark group-hover:text-primary/80">
                    Cómo limpiar tus joyas de oro
                  </p>

                  {/* Categoría a la izquierda / Tiempo a la derecha */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-primary font-medium group-hover:text-primary/80">
                      Cuidado
                    </span>
                    <span className="flex items-center gap-1 text-xs text-graphite group-hover:text-primary/80">
                      <BiTime className="text-sm" /> 10 min
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      {/* Footer */}
        <div className="card mt-10 p-6 max-w-5xl mx-auto rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-start gap-4">
          {/* Logo y nombre */}
          <div className="flex items-center gap-3">
            <img
              src={logoJoyas}
              alt="Centro Joyero"
              className="h-25 w-auto object-contain"
            />
          </div>

          {/* Redes sociales */}
          <div className="flex items-center gap-5">
            <img src={logoFb} alt="Facebook" className="w-8 h-8 cursor-pointer" />
            <img src={logoIg} alt="Instagram" className="w-8 h-8 cursor-pointer" />
            <img src={logoX} alt="Twitter/X" className="w-8 h-8 cursor-pointer" />
          </div>

          {/* Texto descriptivo */}
          <p className="text-sans text-graphite/50 font-medium max-w-xl text-left ml-auto">
            CentroJoyero.com es un marketplace donde joyerías publican y venden sus productos. 
            Conecta a compradores y joyeros, ofreciendo piezas únicas en una plataforma segura e intuitiva.
          </p>
        </div>
    </section>
    </>
  );
}
