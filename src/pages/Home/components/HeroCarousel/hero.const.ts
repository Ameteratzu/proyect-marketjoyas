export type HeroSlide = {
  id: string;
  image: string;
  alt?: string;
  href?: string;
};

// Imagenes del banner
import banner1 from "@/assets/banner1.png";
import banner2 from "@/assets/banner2.png";
import banner3 from "@/assets/banner3.png";
import banner4 from "@/assets/banner4.png";

export const HERO_SLIDES: HeroSlide[] = [
  { id: "b1", image: banner1, alt: "Promoción de jotas - 1" },
  { id: "b2", image: banner2, alt: "Promoción de jotas - 2" },
  { id: "b3", image: banner3, alt: "Promoción de jotas - 3" },
  { id: "b4", image: banner4, alt: "Promoción de jotas - 4" },
];
