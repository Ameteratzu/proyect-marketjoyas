import type {} from "react";
import personalizedImg from "@/assets/personalized.png";

export const PERSONALIZED_IMAGE = {
  src: personalizedImg,
  alt: "Artesano trabajando en un collar personalizado",
};

export type AudienceKey = "forHim" | "forHer" | "forKids";

export const AUDIENCE: Array<{ id: AudienceKey; href: string }> = [
  { id: "forHim", href: "/categories/para-ellos" },
  { id: "forHer", href: "/categories/para-ellas" },
  { id: "forKids", href: "/categories/para-ninos" },
];
