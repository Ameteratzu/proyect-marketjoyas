import HeroCarousel from "@/pages/Home/components/HeroCarousel/HeroCarousel";
import JewelryCategories from "@/pages/Home/components/JewelryCategories/JewelryCategories";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      {/* Sección: Joyas */}
      <JewelryCategories />
    </>
  );
}
