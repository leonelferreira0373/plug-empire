// Single source of truth for brand contact info.

export const BRAND = {
  name: "STRAVAGES",
  tagline_pt: "Nascido no risco. Movido pela visão.",
  tagline_en: "Born in risk. Driven by vision.",
  email: "Plugempire.contact@gmail.com",
  // Phone in international format, no + or spaces. Used to build wa.me link.
  whatsapp: "351934728032",
  instagram_main: "stravages.clo",
  instagram_brand: "plug_empire",
  linktree: "https://linktr.ee/plug_empire",
  address: "Lisboa, Portugal",
  founded: 2026,
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}
