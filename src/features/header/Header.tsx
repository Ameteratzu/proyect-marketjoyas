import Container from "@/components/Container";
import TopBar from "@/components/TopBar";
// import Logo from "@/components/Logo";
// import MainNav from "@/components/MainNav";
// import Actions from "@/components/Actions";

export default function Header() {
  return (
    <header role="banner" className="sticky top-0 z-50 bg-inver-accent">
      <TopBar />
      <div className="border-b border-cream/60">
        <Container className="py-4 flex items-center justify-between gap-6">
          hola
        </Container>
      </div>
      <div className="h-1 grad-gold" />
    </header>
  );
}
