import type {} from "react";
import personalizedImg from "@/assets/personalized.jpg";

export const PERSONALIZED_IMAGE = {
  src: personalizedImg,
  alt: "Artesano trabajando en un collar personalizado",
};

export type AudienceKey = "forHim" | "forHer" | "forKids";

export const AUDIENCE: Array<{ id: AudienceKey; href: string }> = [
  { id: "forHim", href: "/categorias/para-ellos" },
  { id: "forHer", href: "/categorias/para-ellas" },
  { id: "forKids", href: "/categorias/para-ninos" },
];
