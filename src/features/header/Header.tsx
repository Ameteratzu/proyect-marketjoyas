import Container from "@/components/Container";
import TopBar from "@/features/header/components/TopBar";
import Logo from "@/features/header/components/Logo";
import CategoryTrigger from "@/features/header/components/CategoryTrigger";
import SearchBar from "@/features/header/components/SearchBar";
import Actions from "@/features/header/components/Action";
import MainNav from "./components/MainNav";

export default function Header() {
  return (
    <header role="banner" className="sticky top-0 z-50 bg-inver-accent">
      <TopBar />
      <Container className="py-4 flex items-center justify-between gap-6">
        <div className="container-p py-3 md:py-4">
          {/* mobile: fila superior */}
          <div className="flex items-center justify-between md:hidden gap-3">
            <CategoryTrigger />
            <Logo />
            <Actions />
          </div>

          {/* búsqueda mobile */}
          <div className="mt-3 md:hidden">
            <SearchBar />
          </div>

          {/* desktop */}
          <div className="hidden md:flex items-center justify-between gap-6">
            <Logo />
            <CategoryTrigger />
            <SearchBar />
            <Actions />
          </div>
        </div>
      </Container>
      <MainNav />
    </header>
  );
}
