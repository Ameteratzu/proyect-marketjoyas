import Footer from "@/features/footer/Footer";
import Header from "@/features/header/Header";
import ScrollToTop from "@/routes/ScrollToTop";
import ScrollTopBtn from "@/components/ScrollTopBtn";

type Props = { children: React.ReactNode };

export default function AppShell(props: Props) {
  return (
    <div className="min-h-dvh bg-fondo text-oscuro">
      <Header />
      <ScrollToTop />
      <ScrollTopBtn />
      <main id="content">{props.children}</main>
      <Footer />
    </div>
  );
}
