export type Category = "tocas" | "balaclavas" | "fatos" | "carteiras" | "joalharia";

export type Product = {
  slug: string;
  name: { pt: string; en: string };
  category: Category;
  price: number; // AOA
  oldPrice?: number;
  badge?: { pt: string; en: string };
  description: { pt: string; en: string };
  features: { pt: string[]; en: string[] };
  images: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  stock: number;
  bestseller?: boolean;
  related?: string[]; // slugs
};

export const PRODUCTS: Product[] = [
  {
    slug: "toca-bee-preta",
    name: {
      pt: "Toca Bee — Preta",
      en: "Bee Beanie — Black",
    },
    category: "tocas",
    price: 8500,
    oldPrice: 12000,
    badge: { pt: "Mais vendido", en: "Bestseller" },
    description: {
      pt: "A toca emblema do Plug Empire. Algodão de alta densidade com forro de cetim que protege o cabelo e evita o frizz. Bordado dourado da abelha — assinatura discreta, presença total.",
      en: "The flagship Plug Empire beanie. High-density cotton with a satin lining that protects hair and prevents frizz. Gold bee embroidery — discreet signature, total presence.",
    },
    features: {
      pt: [
        "Forro de cetim que evita o frizz",
        "Logotipo bordado em fio dourado",
        "Mantém o isolamento térmico natural do cabelo",
        "Ajuste respirável e sem pressão",
      ],
      en: [
        "Satin lining that prevents frizz",
        "Bee logo embroidered in gold thread",
        "Keeps the hair's natural thermal insulation",
        "Breathable, pressure-free fit",
      ],
    },
    images: [
      "/products/beanie-black-1.jpg",
      "/products/beanie-black-2.jpg",
      "/products/beanie-black-3.jpg",
      "/products/beanie-black-4.jpg",
      "/products/beanie-black-pair.jpg",
    ],
    sizes: ["Único"],
    colors: [
      { name: "Preto", hex: "#0a0a0a" },
      { name: "Branco", hex: "#fafafa" },
      { name: "Amarelo", hex: "#F5B82E" },
      { name: "Rosa", hex: "#F4B6C2" },
    ],
    stock: 24,
    bestseller: true,
    related: ["toca-bee-branca", "toca-bee-amarela", "balaclava-bee"],
  },
  {
    slug: "toca-bee-branca",
    name: {
      pt: "Toca Bee — Branca",
      en: "Bee Beanie — White",
    },
    category: "tocas",
    price: 8500,
    description: {
      pt: "Versão branca da toca assinatura. Limpa, leve, com o bordado da abelha em amarelo dourado. Perfeita para os tons mais claros do guarda-roupa.",
      en: "White version of the signature beanie. Clean, lightweight, with the bee embroidered in golden yellow. Perfect for the brighter side of the wardrobe.",
    },
    features: {
      pt: [
        "Tecido respirável de alta densidade",
        "Bordado da abelha em amarelo dourado",
        "Forro interno suave",
        "Ajuste universal",
      ],
      en: [
        "High-density breathable fabric",
        "Bee logo in golden yellow",
        "Soft inner lining",
        "Universal fit",
      ],
    },
    images: [
      "/products/beanie-white-1.jpg",
      "/products/beanie-group-2.jpg",
    ],
    sizes: ["Único"],
    colors: [
      { name: "Branco", hex: "#fafafa" },
      { name: "Preto", hex: "#0a0a0a" },
    ],
    stock: 18,
    related: ["toca-bee-preta", "toca-bee-rosa", "balaclava-bee"],
  },
  {
    slug: "toca-bee-amarela",
    name: {
      pt: "Toca Bee — Amarela",
      en: "Bee Beanie — Yellow",
    },
    category: "tocas",
    price: 8500,
    badge: { pt: "Edição limitada", en: "Limited drop" },
    description: {
      pt: "A toca em amarelo abelha — uma declaração ousada com o lettering Stravages preto. Edição limitada da temporada.",
      en: "The bee-yellow beanie — a bold statement with the Stravages lettering in black. Limited seasonal drop.",
    },
    features: {
      pt: [
        "Amarelo abelha exclusivo da casa",
        "Lettering Stravages em preto",
        "Algodão escovado",
        "Edição de produção limitada",
      ],
      en: [
        "House-exclusive bee-yellow",
        "Stravages lettering in black",
        "Brushed cotton",
        "Limited production run",
      ],
    },
    images: ["/products/beanie-yellow-1.jpg", "/products/beanie-yellow-2.jpg"],
    sizes: ["Único"],
    colors: [
      { name: "Amarelo", hex: "#F5B82E" },
      { name: "Preto", hex: "#0a0a0a" },
    ],
    stock: 10,
    related: ["toca-bee-preta", "fato-empire-amarelo", "balaclava-bee"],
  },
  {
    slug: "toca-bee-rosa",
    name: {
      pt: "Toca Bee — Rosa",
      en: "Bee Beanie — Pink",
    },
    category: "tocas",
    price: 8500,
    description: {
      pt: "Rosa pó com o lettering Stravages a destacar-se. Suave, feminina, sem perder o atitude da casa.",
      en: "Powder pink with the Stravages lettering set against it. Soft, feminine, without losing the house's attitude.",
    },
    features: {
      pt: [
        "Rosa pó suave",
        "Lettering Stravages em branco",
        "Forro de cetim",
        "Ajuste relaxado",
      ],
      en: [
        "Soft powder pink",
        "Stravages lettering in white",
        "Satin lining",
        "Relaxed fit",
      ],
    },
    images: [
      "/products/beanie-pink-1.jpg",
      "/products/beanie-pink-2.jpg",
      "/products/beanie-pink-3.jpg",
      "/products/beanie-pink-4.jpg",
    ],
    sizes: ["Único"],
    colors: [
      { name: "Rosa", hex: "#F4B6C2" },
      { name: "Branco", hex: "#fafafa" },
    ],
    stock: 12,
    related: ["toca-bee-preta", "toca-bee-branca", "carteira-stravages"],
  },
  {
    slug: "balaclava-bee",
    name: {
      pt: "Balaclava Bee",
      en: "Bee Balaclava",
    },
    category: "balaclavas",
    price: 14500,
    badge: { pt: "Novo", en: "New" },
    description: {
      pt: "Balaclava em tecido técnico preto, com a abelha bordada em amarelo dourado. Pensada para os dias frios — proteção total sem perder o estilo.",
      en: "Black technical-fabric balaclava with the bee embroidered in golden yellow. Built for cold days — full protection without losing the style.",
    },
    features: {
      pt: [
        "Tecido técnico respirável",
        "Cobertura total — cabeça e pescoço",
        "Bordado da abelha em amarelo",
        "Costuras reforçadas",
      ],
      en: [
        "Breathable technical fabric",
        "Full head and neck coverage",
        "Bee embroidery in yellow",
        "Reinforced stitching",
      ],
    },
    images: ["/products/balaclava-1.jpg", "/products/balaclava-2.png"],
    sizes: ["Único"],
    colors: [{ name: "Preto", hex: "#0a0a0a" }],
    stock: 15,
    related: ["toca-bee-preta", "carteira-stravages", "fato-empire-amarelo"],
  },
  {
    slug: "fato-empire-amarelo",
    name: {
      pt: "Fato Empire — Amarelo",
      en: "Empire Tracksuit — Yellow",
    },
    category: "fatos",
    price: 65000,
    oldPrice: 80000,
    badge: { pt: "Conjunto", en: "Full set" },
    description: {
      pt: "Conjunto completo: hoodie zip + calça de fato em amarelo abelha, com patches bordados e detalhes em vermelho. Inclui a toca a condizer. Streetwear premium feito para virar cabeças.",
      en: "Full set: zip hoodie + tracksuit pants in bee-yellow, with embroidered patches and red details. Matching beanie included. Premium streetwear made to turn heads.",
    },
    features: {
      pt: [
        "Hoodie com fecho metálico dourado",
        "Calça com aplicações bordadas",
        "Toca a condizer incluída",
        "Algodão de gramagem pesada",
      ],
      en: [
        "Hoodie with gold metal zipper",
        "Pants with embroidered appliqués",
        "Matching beanie included",
        "Heavyweight cotton",
      ],
    },
    images: [
      "/products/tracksuit-yellow-1.jpg",
      "/products/tracksuit-yellow-2.jpg",
      "/products/tracksuit-yellow-3.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Amarelo", hex: "#F5B82E" }],
    stock: 6,
    bestseller: true,
    related: ["toca-bee-amarela", "carteira-stravages", "balaclava-bee"],
  },
  {
    slug: "carteira-stravages",
    name: {
      pt: "Carteira Stravages — Couro",
      en: "Stravages Wallet — Leather",
    },
    category: "carteiras",
    price: 28500,
    badge: { pt: "Premium", en: "Premium" },
    description: {
      pt: "Carteira em couro preto com a abelha e o lettering Stravages gravados a quente em folha dourada. Compartimentos para 6 cartões, fenda para notas e bolso para moedas. A peça mais discreta — e mais reconhecível.",
      en: "Black leather wallet with the bee and Stravages lettering hot-stamped in gold foil. Six card slots, note compartment and coin pocket. The most discreet piece — and the most recognisable.",
    },
    features: {
      pt: [
        "Couro genuíno preto",
        "Gravação em folha dourada real",
        "6 compartimentos para cartões",
        "Caixa premium incluída",
      ],
      en: [
        "Genuine black leather",
        "Real gold-foil hot-stamp",
        "6 card slots",
        "Premium gift box included",
      ],
    },
    images: ["/products/wallet-1.png"],
    sizes: ["Único"],
    colors: [{ name: "Preto / Ouro", hex: "#0a0a0a" }],
    stock: 8,
    bestseller: true,
    related: ["toca-bee-preta", "balaclava-bee", "fato-empire-amarelo"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelated(slugs: string[] | undefined): Product[] {
  if (!slugs) return [];
  return slugs
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));
}

export const CATEGORIES: { key: Category; label: { pt: string; en: string } }[] = [
  { key: "tocas", label: { pt: "Tocas", en: "Beanies" } },
  { key: "balaclavas", label: { pt: "Balaclavas", en: "Balaclavas" } },
  { key: "fatos", label: { pt: "Fatos", en: "Tracksuits" } },
  { key: "carteiras", label: { pt: "Carteiras", en: "Wallets" } },
  { key: "joalharia", label: { pt: "Joalharia", en: "Jewelry" } },
];
