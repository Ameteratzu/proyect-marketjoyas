import FooterColumns from "@/features/footer/components/FooterColumns";
import FooterContact from "@/features/footer/components/FooterContact";
import FooterBottom from "@/features/footer/components/FooterBottom";

export default function Footer() {
  return (
    <footer>
      {/* Fondo principal oscuro */}
      <div className="w-full bg-dark">
        <div className="container-p py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-16">
            {/*  logo + columnas */}
            <div className="lg:col-span-3">
              <FooterColumns />
            </div>

            {/* contacto */}
            <FooterContact />
          </div>
        </div>
      </div>

      {/* Franja inferior */}
      <FooterBottom />
    </footer>
  );
}
