import Container from "@/components/Container";
import TopBar from "@/features/header/components/TopBar";
import Logo from "@/features/header/components/logo";
import CategoryTrigger from "@/features/header/components/CategoryTrigger";
import SearchBar from "./components/SearchBar";

export default function Header() {
  return (
    <header role="banner" className="sticky top-0 z-50 bg-inver-accent">
      <TopBar />
      <div className="border-b border-cream/60">
        <Container className="py-4 flex items-center justify-between gap-6">
          <Logo />
          <CategoryTrigger />
          <SearchBar />
        </Container>
      </div>
      <div className="h-1 grad-gold" />
    </header>
  );
}
