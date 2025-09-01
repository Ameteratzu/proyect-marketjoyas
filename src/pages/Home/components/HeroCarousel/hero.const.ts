import banner1 from "@/assets/banner1.png";
import banner2 from "@/assets/banner2.png";
import banner3 from "@/assets/banner3.png";
import banner4 from "@/assets/banner4.png";

export interface HeroSlideMeta {
  id: string;
  image: string;
}

// Sólo contiene metadatos estáticos (id + imagen). Los textos y enlaces vienen de i18n.
export const HERO_SLIDES: HeroSlideMeta[] = [
  { id: "b1", image: banner1 },
  { id: "b2", image: banner2 },
  { id: "b3", image: banner3 },
  { id: "b4", image: banner4 },
];
