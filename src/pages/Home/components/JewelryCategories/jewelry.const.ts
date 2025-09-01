// Metadatos estáticos de las categorías de joyas.
// Los nombres visibles vienen de i18n: home.jewelry.<id>

import weddingBandsImg from "@/assets/jewelry/alianzamatrimonio.png";
import earringsImg from "@/assets/jewelry/aretes.png";
import chainsImg from "@/assets/jewelry/cadenas.png";
import necklacesImg from "@/assets/jewelry/collares.png";
import setsImg from "@/assets/jewelry/conjuntos.png";
import framesImg from "@/assets/jewelry/cuadrosadornos.png";
import piercingImg from "@/assets/jewelry/piercing.png";
import braceletsImg from "@/assets/jewelry/pulseras.png";
import cuffsImg from "@/assets/jewelry/puñeras.png";
import ringsImg from "@/assets/jewelry/sortijas.png";
import ankletsImg from "@/assets/jewelry/tobilleras.png";

export interface JewelryCategoryMeta {
  id:
    | "weddingBands"
    | "earrings"
    | "chains"
    | "necklaces"
    | "sets"
    | "frames"
    | "piercing"
    | "bracelets"
    | "cuffs"
    | "rings"
    | "anklets";
  image: string;
  href?: string;
}

// Orden definido (puedes reordenar según prioridad de diseño)
export const JEWELRY_CATEGORIES: JewelryCategoryMeta[] = [
  { id: "weddingBands", image: weddingBandsImg },
  { id: "earrings", image: earringsImg },
  { id: "rings", image: ringsImg },
  { id: "necklaces", image: necklacesImg },
  { id: "bracelets", image: braceletsImg },
  { id: "chains", image: chainsImg },
  { id: "sets", image: setsImg },
  { id: "frames", image: framesImg },
  { id: "piercing", image: piercingImg },
  { id: "cuffs", image: cuffsImg },
  { id: "anklets", image: ankletsImg },
];