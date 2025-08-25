import Icon from "@/components/Icon";

export default function TopBar() {
  return (
    <div className="grad-gold text-white text-xs">
      <div className="container-p py-2 flex items-center justify-between">
        <span className="tracking-wide">RETIRO GRATIS EN TIENDAS</span>

        <nav className="hidden sm:flex items-center gap-6">
          <a
            href="/es"
            className="inline-flex items-center gap-2 opacity-90 hover:opacity-100"
          >
            <Icon name="globe" className="w-4 h-4" />
            <span>ESPAÑOL</span>
          </a>
          <a
            href="/vender"
            className="inline-flex items-center gap-2 opacity-90 hover:opacity-100"
          >
            <Icon name="store" className="w-4 h-4" />
            <span>VENDE CON NOSOTROS</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
