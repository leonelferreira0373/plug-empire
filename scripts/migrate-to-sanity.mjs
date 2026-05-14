// One-shot migration: pushes the hardcoded products + page content into Sanity.
// Run AFTER you've created a Sanity project and set the env vars in .env.local:
//   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET (default "production"),
//   SANITY_API_WRITE_TOKEN  (Editor or higher, from sanity.io/manage > API > Tokens)
//
// Usage:
//   node scripts/migrate-to-sanity.mjs
//
// Safe to re-run: documents are upserted by stable IDs.

import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

// ---------- Product catalog (mirrors lib/products.ts fallback) ----------
const PUBLIC = join(__dirname, "..", "public");

const PRODUCTS = [
  {
    slug: "toca-bee-preta",
    namePT: "Toca Bee — Preta",
    nameEN: "Bee Beanie — Black",
    category: "tocas",
    price: 34.9,
    oldPrice: 49.9,
    badgePT: "Mais vendido",
    badgeEN: "Bestseller",
    descriptionPT:
      "A toca emblema do Plug Empire. Algodão de alta densidade com forro de cetim que protege o cabelo e evita o frizz. Bordado dourado da abelha — assinatura discreta, presença total.",
    descriptionEN:
      "The flagship Plug Empire beanie. High-density cotton with a satin lining that protects hair and prevents frizz. Gold bee embroidery — discreet signature, total presence.",
    featuresPT: [
      "Forro de cetim que evita o frizz",
      "Logotipo bordado em fio dourado",
      "Mantém o isolamento térmico natural do cabelo",
      "Ajuste respirável e sem pressão",
    ],
    featuresEN: [
      "Satin lining that prevents frizz",
      "Bee logo embroidered in gold thread",
      "Keeps the hair's natural thermal insulation",
      "Breathable, pressure-free fit",
    ],
    images: [
      "products/beanie-black-4.jpg",
      "products/beanie-black-pair.jpg",
      "products/beanie-black-2.jpg",
      "products/beanie-black-1.jpg",
      "products/beanie-black-3.jpg",
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
    order: 1,
    related: ["toca-bee-branca", "toca-bee-amarela", "balaclava-bee"],
  },
  {
    slug: "toca-bee-branca",
    namePT: "Toca Bee — Branca",
    nameEN: "Bee Beanie — White",
    category: "tocas",
    price: 34.9,
    descriptionPT:
      "Versão branca da toca assinatura. Limpa, leve, com o bordado da abelha em amarelo dourado.",
    descriptionEN:
      "White version of the signature beanie. Clean, lightweight, with the bee embroidered in golden yellow.",
    featuresPT: ["Tecido respirável", "Bordado em dourado", "Forro suave", "Ajuste universal"],
    featuresEN: ["Breathable fabric", "Gold yellow embroidery", "Soft inner lining", "Universal fit"],
    images: ["products/beanie-white-1.jpg", "products/beanie-group-2.jpg"],
    sizes: ["Único"],
    colors: [
      { name: "Branco", hex: "#fafafa" },
      { name: "Preto", hex: "#0a0a0a" },
    ],
    stock: 18,
    order: 2,
    related: ["toca-bee-preta", "toca-bee-rosa", "balaclava-bee"],
  },
  {
    slug: "toca-bee-amarela",
    namePT: "Toca Bee — Amarela",
    nameEN: "Bee Beanie — Yellow",
    category: "tocas",
    price: 34.9,
    badgePT: "Edição limitada",
    badgeEN: "Limited drop",
    descriptionPT:
      "A toca em amarelo abelha — uma declaração ousada com o lettering Stravages preto.",
    descriptionEN:
      "The bee-yellow beanie — a bold statement with the Stravages lettering in black.",
    featuresPT: ["Amarelo abelha", "Lettering preto", "Algodão escovado", "Produção limitada"],
    featuresEN: ["Bee yellow", "Black lettering", "Brushed cotton", "Limited run"],
    images: ["products/beanie-yellow-1.jpg", "products/beanie-yellow-2.jpg"],
    sizes: ["Único"],
    colors: [
      { name: "Amarelo", hex: "#F5B82E" },
      { name: "Preto", hex: "#0a0a0a" },
    ],
    stock: 10,
    order: 3,
    related: ["toca-bee-preta", "fato-empire-amarelo", "balaclava-bee"],
  },
  {
    slug: "toca-bee-rosa",
    namePT: "Toca Bee — Rosa",
    nameEN: "Bee Beanie — Pink",
    category: "tocas",
    price: 34.9,
    descriptionPT: "Rosa pó com o lettering Stravages a destacar-se.",
    descriptionEN: "Powder pink with the Stravages lettering set against it.",
    featuresPT: ["Rosa pó", "Lettering branco", "Forro de cetim", "Ajuste relaxado"],
    featuresEN: ["Powder pink", "White lettering", "Satin lining", "Relaxed fit"],
    images: [
      "products/beanie-pink-1.jpg",
      "products/beanie-pink-2.jpg",
      "products/beanie-pink-3.jpg",
      "products/beanie-pink-4.jpg",
    ],
    sizes: ["Único"],
    colors: [
      { name: "Rosa", hex: "#F4B6C2" },
      { name: "Branco", hex: "#fafafa" },
    ],
    stock: 12,
    order: 4,
    related: ["toca-bee-preta", "toca-bee-branca", "carteira-stravages"],
  },
  {
    slug: "balaclava-bee",
    namePT: "Balaclava Bee",
    nameEN: "Bee Balaclava",
    category: "balaclavas",
    price: 54.9,
    badgePT: "Novo",
    badgeEN: "New",
    descriptionPT:
      "Balaclava em tecido técnico preto, com a abelha bordada em amarelo dourado.",
    descriptionEN:
      "Black technical-fabric balaclava with the bee embroidered in golden yellow.",
    featuresPT: ["Tecido técnico", "Cobertura total", "Bordado da abelha", "Costuras reforçadas"],
    featuresEN: ["Technical fabric", "Full coverage", "Bee embroidery", "Reinforced stitching"],
    images: ["products/balaclava-1.jpg", "products/balaclava-2.png"],
    sizes: ["Único"],
    colors: [{ name: "Preto", hex: "#0a0a0a" }],
    stock: 15,
    order: 5,
    related: ["toca-bee-preta", "carteira-stravages", "fato-empire-amarelo"],
  },
  {
    slug: "fato-empire-amarelo",
    namePT: "Fato Empire — Amarelo",
    nameEN: "Empire Tracksuit — Yellow",
    category: "fatos",
    price: 179.9,
    oldPrice: 219.9,
    badgePT: "Conjunto",
    badgeEN: "Full set",
    descriptionPT:
      "Conjunto completo: hoodie zip + calça de fato em amarelo abelha, com patches bordados.",
    descriptionEN:
      "Full set: zip hoodie + tracksuit pants in bee-yellow with embroidered patches.",
    featuresPT: ["Fecho dourado", "Aplicações bordadas", "Toca incluída", "Gramagem pesada"],
    featuresEN: ["Gold zipper", "Embroidered appliqués", "Beanie included", "Heavyweight cotton"],
    images: [
      "products/tracksuit-yellow-1.jpg",
      "products/tracksuit-yellow-2.jpg",
      "products/tracksuit-yellow-3.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Amarelo", hex: "#F5B82E" }],
    stock: 6,
    bestseller: true,
    order: 6,
    related: ["toca-bee-amarela", "carteira-stravages", "balaclava-bee"],
  },
  {
    slug: "carteira-stravages",
    namePT: "Carteira Stravages — Couro",
    nameEN: "Stravages Wallet — Leather",
    category: "carteiras",
    price: 89.9,
    badgePT: "Premium",
    badgeEN: "Premium",
    descriptionPT:
      "Carteira em couro preto com a abelha e o lettering Stravages gravados a quente em folha dourada.",
    descriptionEN:
      "Black leather wallet with the bee and Stravages lettering hot-stamped in gold foil.",
    featuresPT: ["Couro genuíno", "Folha dourada real", "6 compartimentos", "Caixa premium"],
    featuresEN: ["Genuine leather", "Real gold foil", "6 card slots", "Premium box"],
    images: ["products/wallet-1.png"],
    sizes: ["Único"],
    colors: [{ name: "Preto / Ouro", hex: "#0a0a0a" }],
    stock: 8,
    bestseller: true,
    order: 7,
    related: ["toca-bee-preta", "balaclava-bee", "fato-empire-amarelo"],
  },
];

async function uploadImage(filePath) {
  const buffer = await readFile(join(PUBLIC, filePath));
  const filename = filePath.split("/").pop();
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType:
      filePath.endsWith(".png") ? "image/png" : "image/jpeg",
  });
  return asset._id;
}

async function upsertProduct(p) {
  const id = `product-${p.slug}`;
  const existing = await client.fetch('*[_id == $id][0]{ _id, images }', { id });

  // Upload images only if not already there
  let imageRefs = existing?.images;
  if (!imageRefs || imageRefs.length === 0) {
    console.log(`  uploading ${p.images.length} images for ${p.slug}...`);
    imageRefs = [];
    for (const img of p.images) {
      const assetId = await uploadImage(img);
      imageRefs.push({
        _type: "image",
        _key: assetId.slice(-8),
        asset: { _type: "reference", _ref: assetId },
      });
    }
  }

  const doc = {
    _id: id,
    _type: "product",
    namePT: p.namePT,
    nameEN: p.nameEN,
    slug: { _type: "slug", current: p.slug },
    category: p.category,
    price: p.price,
    oldPrice: p.oldPrice,
    badgePT: p.badgePT,
    badgeEN: p.badgeEN,
    descriptionPT: p.descriptionPT,
    descriptionEN: p.descriptionEN,
    featuresPT: p.featuresPT,
    featuresEN: p.featuresEN,
    images: imageRefs,
    sizes: p.sizes,
    colors: p.colors?.map((c, i) => ({ _key: `c${i}`, ...c })),
    stock: p.stock,
    bestseller: p.bestseller ?? false,
    order: p.order ?? 100,
    // related set after first pass
  };

  await client.createOrReplace(doc);
  console.log(`  ✓ ${p.slug}`);
}

async function linkRelated() {
  console.log("Linking related products...");
  for (const p of PRODUCTS) {
    if (!p.related?.length) continue;
    const id = `product-${p.slug}`;
    const relatedRefs = p.related.map((slug, i) => ({
      _type: "reference",
      _key: `r${i}`,
      _ref: `product-${slug}`,
    }));
    await client.patch(id).set({ related: relatedRefs }).commit();
  }
}

async function seedSingletons() {
  console.log("Seeding page singletons...");
  await client.createOrReplace({
    _id: "home",
    _type: "home",
    heroEyebrowPT: "Plug Empire",
    heroEyebrowEN: "Plug Empire",
    heroTitlePT: "Todo o sonho é possível.",
    heroTitleEN: "Every dream is possible.",
    heroSubtitlePT:
      "Streetwear premium nascido em Portugal. Cada peça do Plug Empire é feita para os que constroem o seu próprio nome.",
    heroSubtitleEN:
      "Premium streetwear born in Portugal. Every Plug Empire piece is made for those building their own name.",
    storyQuotePT: "Todo o sonho é possível… basta acreditar.",
    storyQuoteEN: "Every dream is possible… you just have to believe.",
  });
  console.log("  ✓ home");

  await client.createOrReplace({
    _id: "about",
    _type: "about",
    headlinePT: "A nossa história",
    headlineEN: "Our story",
    introPT:
      "Plug Empire nasceu em Portugal como uma promessa simples: vestir os que constroem o seu próprio nome.",
    introEN:
      "Plug Empire was born in Portugal as a simple promise: dressing those building their own name.",
    pillars: [
      {
        _key: "p1",
        titlePT: "Origem",
        titleEN: "Origin",
        bodyPT:
          "Desenhado e curado em Portugal. As peças são produzidas com fornecedores parceiros nos EUA, Emirados, Turquia e Namíbia.",
        bodyEN:
          "Designed and curated in Portugal. Pieces produced with partner suppliers in the USA, UAE, Turkey and Namibia.",
      },
      {
        _key: "p2",
        titlePT: "Detalhe",
        titleEN: "Detail",
        bodyPT:
          "Cada toca leva forro de cetim. Cada carteira é gravada em folha dourada. Cada costura é inspeccionada.",
        bodyEN:
          "Every beanie has a satin lining. Every wallet is stamped with gold foil. Every seam is inspected.",
      },
      {
        _key: "p3",
        titlePT: "Comunidade",
        titleEN: "Community",
        bodyPT:
          "Vestimos artistas, fundadores, gente que constrói. Cada peça é uma chancela de quem acredita.",
        bodyEN:
          "We dress artists, founders, builders. Every piece is a stamp of someone who believes.",
      },
    ],
  });
  console.log("  ✓ about");

  await client.createOrReplace({
    _id: "contact",
    _type: "contact",
    headlinePT: "Fala connosco",
    headlineEN: "Get in touch",
    email: "Plugempire.contact@gmail.com",
    whatsapp: "351900000000",
    instagramMain: "plug_empire",
    instagramBrand: "stravages.clo",
    linktree: "https://linktr.ee/plug_empire",
    address: "Lisboa, Portugal",
  });
  console.log("  ✓ contact");
}

(async () => {
  console.log(`Migrating to Sanity project "${projectId}" / dataset "${dataset}"...\n`);
  console.log("Products:");
  for (const p of PRODUCTS) await upsertProduct(p);
  await linkRelated();
  await seedSingletons();
  console.log("\n✅ Migration complete. Open /studio to manage everything.");
})().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
