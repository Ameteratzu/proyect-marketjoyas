import HeroCarousel from "@/pages/Home/components/HeroCarousel/HeroCarousel";
import JewelryCategories from "@/pages/Home/components/JewelryCategories/JewelryCategories";
import StoresSection from "@/pages/Home/components/StoresSection/StoresSection";
import Personalized from "./components/Personalized/Personalized";
import ScrollTopBtn from "@/components/ScrollTopBtn";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      {/* Sección: Joyas */}
      <JewelryCategories />

      {/* Sección: Tiendas */}
      <StoresSection />

      {/* Sección: Personalizados */}
      <Personalized />

    </>
  );
}
