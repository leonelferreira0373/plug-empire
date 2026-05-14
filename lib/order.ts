export type OrderLine = {
  slug: string;
  name: string;
  price: number;
  qty: number;
  size?: string;
  color?: string;
  image?: string;
};

export type OrderInput = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
    notes?: string;
  };
  lines: OrderLine[];
  shipping: number;
  lang: "pt" | "en";
};

export function generateOrderRef(): string {
  // Format: PE-YYYYMMDD-XXXX  (e.g. PE-20260514-A3F7)
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const rand = Array.from({ length: 4 }, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)],
  ).join("");
  return `PE-${yyyy}${mm}${dd}-${rand}`;
}

export function calcSubtotal(lines: OrderLine[]): number {
  return lines.reduce((acc, l) => acc + l.price * l.qty, 0);
}

// Shipping rules (EUR):
//  - PT continental: free above €60, else €5
//  - PT islands (Açores/Madeira): €8
//  - EU: €10
//  - UK / Switzerland / non-EU: base + €5 surcharge
const PT_CONTINENTAL = ["PT", "Portugal"];
const PT_ISLANDS = ["Açores", "Madeira", "Azores"];
const EU = [
  "ES", "FR", "DE", "IT", "NL", "BE", "LU", "IE", "AT", "FI", "SE", "DK",
  "PL", "CZ", "SK", "HU", "RO", "BG", "GR", "HR", "SI", "LT", "LV", "EE",
  "MT", "CY", "Espanha", "França", "Alemanha", "Itália", "Holanda", "Bélgica",
];
const NON_EU_SURCHARGE = [
  "UK", "United Kingdom", "Reino Unido", "Inglaterra",
  "CH", "Switzerland", "Suíça",
];

export function calcShipping(country: string, postcode: string, subtotal: number): number {
  const c = country.trim();

  // PT mainland (rough postcode rule — islands often start with 9)
  if (PT_CONTINENTAL.includes(c)) {
    if (postcode.startsWith("9")) return 8; // islands
    return subtotal >= 60 ? 0 : 5;
  }

  if (PT_ISLANDS.some((p) => c.toLowerCase().includes(p.toLowerCase()))) return 8;

  if (EU.includes(c) || EU.some((p) => c.toLowerCase() === p.toLowerCase())) return 10;

  if (NON_EU_SURCHARGE.some((p) => c.toLowerCase().includes(p.toLowerCase()))) return 15;

  // Any other country (non-EU)
  return 15;
}
