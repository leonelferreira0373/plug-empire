// Single source of truth for brand contact info.
// Replace the WhatsApp number when the real one is provided.

export const BRAND = {
  name: "PLUG EMPIRE",
  tagline_pt: "Todo o sonho é possível. Basta acreditar.",
  tagline_en: "Every dream is possible. You just have to believe.",
  email: "Plugempire.contact@gmail.com",
  // Phone in international format, no + or spaces. Used to build wa.me link.
  whatsapp: "351900000000", // TODO: replace with real PT number when provided
  instagram_main: "plug_empire",
  instagram_brand: "stravages.clo",
  linktree: "https://linktr.ee/plug_empire",
  address: "Lisboa, Portugal",
  founded: 2022,
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}
