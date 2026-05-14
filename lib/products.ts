// Product data layer.
// Fetches from Sanity when configured; falls back to the hardcoded catalog otherwise.
// This keeps the site working before/after the CMS migration.

import { isSanityConfigured, sanityClient, imgUrl } from "./sanity";

export type Category = "tocas" | "balaclavas" | "fatos" | "carteiras" | "joalharia";

export type Product = {
  slug: string;
  name: { pt: string; en: string };
  category: Category;
  price: number; // EUR
  oldPrice?: number;
  badge?: { pt: string; en: string };
  description: { pt: string; en: string };
  features: { pt: string[]; en: string[] };
  images: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  stock: number;
  bestseller?: boolean;
  related?: string[];
};

// -------- Hardcoded fallback (used until Sanity is wired) ----------

const FALLBACK: Product[] = [
  {
    slug: "toca-bee-preta",
    name: { pt: "Toca Bee — Preta", en: "Bee Beanie — Black" },
    category: "tocas",
    price: 34.9,
    oldPrice: 49.9,
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
      "/products/beanie-black-4.jpg",
      "/products/beanie-black-pair.jpg",
      "/products/beanie-black-2.jpg",
      "/products/beanie-black-1.jpg",
      "/products/beanie-black-3.jpg",
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
    name: { pt: "Toca Bee — Branca", en: "Bee Beanie — White" },
    category: "tocas",
    price: 34.9,
    description: {
      pt: "Versão branca da toca assinatura. Limpa, leve, com o bordado da abelha em amarelo dourado.",
      en: "White version of the signature beanie. Clean, lightweight, with the bee embroidered in golden yellow.",
    },
    features: {
      pt: ["Tecido respirável", "Bordado da abelha em dourado", "Forro suave", "Ajuste universal"],
      en: ["Breathable fabric", "Bee logo in golden yellow", "Soft inner lining", "Universal fit"],
    },
    images: ["/products/beanie-white-1.jpg", "/products/beanie-group-2.jpg"],
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
    name: { pt: "Toca Bee — Amarela", en: "Bee Beanie — Yellow" },
    category: "tocas",
    price: 34.9,
    badge: { pt: "Edição limitada", en: "Limited drop" },
    description: {
      pt: "A toca em amarelo abelha — uma declaração ousada com o lettering Stravages preto.",
      en: "The bee-yellow beanie — a bold statement with the Stravages lettering in black.",
    },
    features: {
      pt: ["Amarelo abelha", "Lettering Stravages preto", "Algodão escovado", "Produção limitada"],
      en: ["House bee-yellow", "Stravages lettering in black", "Brushed cotton", "Limited run"],
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
    name: { pt: "Toca Bee — Rosa", en: "Bee Beanie — Pink" },
    category: "tocas",
    price: 34.9,
    description: {
      pt: "Rosa pó com o lettering Stravages a destacar-se.",
      en: "Powder pink with the Stravages lettering set against it.",
    },
    features: {
      pt: ["Rosa pó suave", "Lettering Stravages branco", "Forro de cetim", "Ajuste relaxado"],
      en: ["Soft powder pink", "Stravages lettering in white", "Satin lining", "Relaxed fit"],
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
    name: { pt: "Balaclava Bee", en: "Bee Balaclava" },
    category: "balaclavas",
    price: 54.9,
    badge: { pt: "Novo", en: "New" },
    description: {
      pt: "Balaclava em tecido técnico preto, com a abelha bordada em amarelo dourado.",
      en: "Black technical-fabric balaclava with the bee embroidered in golden yellow.",
    },
    features: {
      pt: ["Tecido técnico", "Cobertura total", "Bordado da abelha", "Costuras reforçadas"],
      en: ["Technical fabric", "Full coverage", "Bee embroidery", "Reinforced stitching"],
    },
    images: ["/products/balaclava-1.jpg", "/products/balaclava-2.png"],
    sizes: ["Único"],
    colors: [{ name: "Preto", hex: "#0a0a0a" }],
    stock: 15,
    related: ["toca-bee-preta", "carteira-stravages", "fato-empire-amarelo"],
  },
  {
    slug: "fato-empire-amarelo",
    name: { pt: "Fato Empire — Amarelo", en: "Empire Tracksuit — Yellow" },
    category: "fatos",
    price: 179.9,
    oldPrice: 219.9,
    badge: { pt: "Conjunto", en: "Full set" },
    description: {
      pt: "Conjunto completo: hoodie zip + calça de fato em amarelo abelha, com patches bordados.",
      en: "Full set: zip hoodie + tracksuit pants in bee-yellow with embroidered patches.",
    },
    features: {
      pt: ["Fecho dourado", "Aplicações bordadas", "Toca incluída", "Gramagem pesada"],
      en: ["Gold zipper", "Embroidered appliqués", "Beanie included", "Heavyweight cotton"],
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
    name: { pt: "Carteira Stravages — Couro", en: "Stravages Wallet — Leather" },
    category: "carteiras",
    price: 89.9,
    badge: { pt: "Premium", en: "Premium" },
    description: {
      pt: "Carteira em couro preto com a abelha e o lettering Stravages gravados a quente em folha dourada.",
      en: "Black leather wallet with the bee and Stravages lettering hot-stamped in gold foil.",
    },
    features: {
      pt: ["Couro genuíno", "Folha dourada", "6 compartimentos", "Caixa premium"],
      en: ["Genuine leather", "Gold foil hot-stamp", "6 card slots", "Premium box"],
    },
    images: ["/products/wallet-1.png"],
    sizes: ["Único"],
    colors: [{ name: "Preto / Ouro", hex: "#0a0a0a" }],
    stock: 8,
    bestseller: true,
    related: ["toca-bee-preta", "balaclava-bee", "fato-empire-amarelo"],
  },
];

// -------- Sanity → typed Product mapper --------

type SanityProduct = {
  slug?: { current?: string };
  namePT?: string;
  nameEN?: string;
  category?: Category;
  price?: number;
  oldPrice?: number;
  badgePT?: string;
  badgeEN?: string;
  descriptionPT?: string;
  descriptionEN?: string;
  featuresPT?: string[];
  featuresEN?: string[];
  images?: unknown[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  stock?: number;
  bestseller?: boolean;
  related?: { slug?: { current?: string } }[];
};

function mapFromSanity(doc: SanityProduct): Product | null {
  const slug = doc.slug?.current;
  if (!slug) return null;
  return {
    slug,
    name: { pt: doc.namePT ?? "", en: doc.nameEN ?? doc.namePT ?? "" },
    category: (doc.category ?? "tocas") as Category,
    price: doc.price ?? 0,
    oldPrice: doc.oldPrice,
    badge:
      doc.badgePT || doc.badgeEN
        ? { pt: doc.badgePT ?? "", en: doc.badgeEN ?? doc.badgePT ?? "" }
        : undefined,
    description: {
      pt: doc.descriptionPT ?? "",
      en: doc.descriptionEN ?? doc.descriptionPT ?? "",
    },
    features: {
      pt: doc.featuresPT ?? [],
      en: doc.featuresEN?.length ? doc.featuresEN : (doc.featuresPT ?? []),
    },
    images: (doc.images ?? [])
      .map((img) => imgUrl(img as Parameters<typeof imgUrl>[0], 1400))
      .filter(Boolean),
    sizes: doc.sizes,
    colors: doc.colors,
    stock: doc.stock ?? 0,
    bestseller: doc.bestseller,
    related: doc.related?.map((r) => r.slug?.current ?? "").filter(Boolean),
  };
}

// -------- Public API (async; works in Server Components) ----------

const ALL_QUERY = `*[_type == "product"] | order(order asc) {
  "slug": slug,
  namePT, nameEN, category, price, oldPrice,
  badgePT, badgeEN,
  descriptionPT, descriptionEN,
  featuresPT, featuresEN,
  images,
  sizes, colors,
  stock, bestseller,
  "related": related[]->{ "slug": slug }
}`;

const ONE_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  "slug": slug,
  namePT, nameEN, category, price, oldPrice,
  badgePT, badgeEN,
  descriptionPT, descriptionEN,
  featuresPT, featuresEN,
  images,
  sizes, colors,
  stock, bestseller,
  "related": related[]->{ "slug": slug }
}`;

export async function getAllProducts(): Promise<Product[]> {
  if (!isSanityConfigured) return FALLBACK;
  try {
    const docs = await sanityClient().fetch<SanityProduct[]>(ALL_QUERY, {}, { next: { revalidate: 60 } });
    const mapped = docs.map(mapFromSanity).filter((p): p is Product => Boolean(p));
    return mapped.length > 0 ? mapped : FALLBACK;
  } catch (err) {
    console.error("[products] sanity fetch failed, using fallback", err);
    return FALLBACK;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured) {
    return FALLBACK.find((p) => p.slug === slug) ?? null;
  }
  try {
    const doc = await sanityClient().fetch<SanityProduct | null>(
      ONE_QUERY,
      { slug },
      { next: { revalidate: 60 } },
    );
    if (!doc) return FALLBACK.find((p) => p.slug === slug) ?? null;
    return mapFromSanity(doc);
  } catch (err) {
    console.error("[products] sanity fetch one failed, using fallback", err);
    return FALLBACK.find((p) => p.slug === slug) ?? null;
  }
}

export async function getProductSlugs(): Promise<string[]> {
  const all = await getAllProducts();
  return all.map((p) => p.slug);
}

export async function getRelated(slugs: string[] | undefined): Promise<Product[]> {
  if (!slugs?.length) return [];
  const all = await getAllProducts();
  return slugs.map((s) => all.find((p) => p.slug === s)).filter((p): p is Product => Boolean(p));
}

export const CATEGORIES: { key: Category; label: { pt: string; en: string } }[] = [
  { key: "tocas", label: { pt: "Tocas", en: "Beanies" } },
  { key: "balaclavas", label: { pt: "Balaclavas", en: "Balaclavas" } },
  { key: "fatos", label: { pt: "Fatos", en: "Tracksuits" } },
  { key: "carteiras", label: { pt: "Carteiras", en: "Wallets" } },
  { key: "joalharia", label: { pt: "Joalharia", en: "Jewelry" } },
];

// Synchronous access to fallback for client components that already had the data.
// (Used by checkout summary, cart icon — non-critical paths.)
export const PRODUCTS_FALLBACK = FALLBACK;
