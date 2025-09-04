import HeroCarousel from "@/pages/Home/components/HeroCarousel/HeroCarousel";
import JewelryCategories from "@/pages/Home/components/JewelryCategories/JewelryCategories";
import StoresSection from "@/pages/Home/components/StoresSection/StoresSection";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      {/* Sección: Joyas */}
      <JewelryCategories />

      {/* Sección: Tiendas */}
      <StoresSection />
    </>
  );
}
