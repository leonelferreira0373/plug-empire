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
    price: 25,
    badgePT: "Mais vendido",
    badgeEN: "Bestseller",
    descriptionPT:
      "A toca emblema Stravages. Algodão de alta densidade com forro de cetim que protege o cabelo e evita o frizz. Bordado dourado da abelha — assinatura discreta, presença total.",
    descriptionEN:
      "The flagship Stravages beanie. High-density cotton with a satin lining that protects hair and prevents frizz. Gold bee embroidery — discreet signature, total presence.",
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
    price: 25,
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
    price: 25,
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
    related: ["toca-bee-preta", "balaclava-bee", "toca-bee-rosa"],
  },
  {
    slug: "toca-bee-rosa",
    namePT: "Toca Bee — Rosa",
    nameEN: "Bee Beanie — Pink",
    category: "tocas",
    price: 25,
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
    related: ["toca-bee-preta", "toca-bee-branca", "carteira-couro"],
  },
  {
    slug: "balaclava-bee",
    namePT: "Balaclava Bee",
    nameEN: "Bee Balaclava",
    category: "balaclavas",
    price: 25,
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
    related: ["toca-bee-preta", "carteira-couro", "toca-bee-amarela"],
  },
  {
    slug: "carteira-couro",
    namePT: "Carteira — Couro",
    nameEN: "Wallet — Leather",
    category: "carteiras",
    price: 20,
    descriptionPT:
      "Carteira em couro preto. Acessório complementar selecionado pela casa — sem branding Stravages, para quem prefere uma peça discreta.",
    descriptionEN:
      "Black leather wallet. A complementary accessory curated by the house — without Stravages branding, for those who prefer a discreet piece.",
    featuresPT: ["Couro genuíno", "6 compartimentos para cartões", "Compartimento para notas", "Sem branding visível"],
    featuresEN: ["Genuine leather", "6 card slots", "Banknote compartment", "No visible branding"],
    images: ["products/wallet-1.png"],
    sizes: ["Único"],
    colors: [{ name: "Preto", hex: "#0a0a0a" }],
    stock: 8,
    order: 6,
    related: ["toca-bee-preta", "balaclava-bee"],
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
    for (let i = 0; i < p.images.length; i++) {
      const assetId = await uploadImage(p.images[i]);
      imageRefs.push({
        _type: "image",
        _key: `img-${i}-${Math.random().toString(36).slice(2, 10)}`,
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
    heroEyebrowPT: "Stravages",
    heroEyebrowEN: "Stravages",
    heroTitlePT: "Nascido no risco. Movido pela visão.",
    heroTitleEN: "Born in risk. Driven by vision.",
    heroSubtitlePT:
      "Não é só roupa. É presença. É escolha. É sobrevivência com identidade. Cada peça Stravages é feita para quem vem de baixo e recusa o destino imposto.",
    heroSubtitleEN:
      "More than clothing. It's presence. It's choice. It's survival with identity. Every Stravages piece is made for those who come from below and refuse the destiny imposed on them.",
    storyQuotePT: "Mesmo quando tudo aponta contra ti, tu vais.",
    storyQuoteEN: "Even when everything points against you, you go.",
    storyBodyPT:
      "Stravages nasce no conflito entre pressão e propósito. Entre o que te rodeia… e aquilo que recusas tornar-te. Cada peça — toca, balaclava, carteira — é feita para quem vem de baixo, para quem teve de ser mais forte do que as circunstâncias.",
    storyBodyEN:
      "Stravages is born in the conflict between pressure and purpose. Between what surrounds you… and what you refuse to become. Every piece — beanie, balaclava, wallet — is made for those who come from below, for those who had to be stronger than circumstances.",
  });
  console.log("  ✓ home");

  await client.createOrReplace({
    _id: "about",
    _type: "about",
    headlinePT: "A nossa história",
    headlineEN: "Our story",
    introPT:
      "Stravages nasce na tensão entre o que te rodeia e aquilo que recusas tornar-te. Para quem vem de baixo, para quem enfrenta pressão, para quem não aceita o destino imposto.",
    introEN:
      "Stravages is born in the tension between what surrounds you and what you refuse to become. For those who come from below, who face pressure, who refuse the destiny imposed on them.",
    manifestoPT: `Não começou com um plano. Começou com sobrevivência. Num lugar onde sair de casa nunca era só sair — era arriscar. Era não saber se o dia acabava como começou.

Crescer ali não era simples. Ou escolhes quem queres ser… ou o ambiente escolhe por ti. Todos os dias havia exemplos do caminho fácil. Dinheiro rápido. Decisões erradas. Destinos previsíveis. Mas dentro de alguns havia outra voz. Uma pergunta silenciosa: "Isto é tudo… ou há mais?"

Stravages nasce exatamente aí. No conflito entre pressão e propósito. Entre o que te rodeia… e aquilo que recusas tornar-te.

A abelha carrega essa verdade. Sai todos os dias da colmeia sem garantias. Sem certeza de voltar. Com risco constante. Mesmo assim, vai. Não porque é fácil — mas porque é o que tem de ser feito. E talvez o mais poderoso: voa mesmo quando dizem que não devia conseguir. Tal como nós.

Não é só roupa. É identidade. É mentalidade. É a prova de que de onde vens não define até onde vais.`,
    manifestoEN: `It didn't start with a plan. It started with survival. In a place where leaving home was never just leaving — it was risking. It was not knowing if the day would end the way it started.

Growing up there wasn't simple. Either you choose who you want to be… or the environment chooses for you. Every day there were examples of the easy path. Quick money. Wrong decisions. Predictable destinies. But inside some, there was another voice. A silent question: "Is this all… or is there more?"

Stravages is born exactly there. In the conflict between pressure and purpose. Between what surrounds you… and what you refuse to become.

The bee carries that truth. It leaves the hive every day without guarantees. Without certainty of returning. With constant risk. Even so, it goes. Not because it's easy — but because it's what has to be done. And maybe most powerful: it flies even when they say it shouldn't be able to. Just like us.

More than clothing. It's identity. It's mentality. It's proof that where you come from doesn't define how far you go.`,
    pillars: [
      {
        _key: "p1",
        titlePT: "Colmeia",
        titleEN: "Hive",
        bodyPT:
          "Sai da colmeia todos os dias sem garantias. Mesmo assim, vai. Para quem enfrenta pressão e recusa o destino imposto.",
        bodyEN:
          "Leaves the hive every day without guarantees. Goes anyway. For those who face pressure and refuse the destiny imposed on them.",
      },
      {
        _key: "p2",
        titlePT: "Detalhe",
        titleEN: "Detail",
        bodyPT:
          "Cada toca leva forro de cetim. Cada peça é inspecionada antes de sair. Sem atalhos. Sem desculpas.",
        bodyEN:
          "Every beanie has a satin lining. Every piece is inspected before it leaves. No shortcuts. No excuses.",
      },
      {
        _key: "p3",
        titlePT: "Identidade",
        titleEN: "Identity",
        bodyPT:
          "Não é moda. É bandeira. É o nome que escolhemos vestir — para quem vem de baixo e vai longe.",
        bodyEN:
          "Not fashion. A flag. The name we choose to wear — for those who come from below and go far.",
      },
    ],
  });
  console.log("  ✓ about");

  await client.createOrReplace({
    _id: "contact",
    _type: "contact",
    headlinePT: "Fala connosco",
    headlineEN: "Get in touch",
    introPT:
      "Atendimento direto da casa. Encomendas, dúvidas sobre tamanhos, parcerias — escolhe o canal.",
    introEN:
      "Direct from the house. Orders, sizing questions, partnerships — pick a channel.",
    email: "Plugempire.contact@gmail.com",
    whatsapp: "351934728032",
    instagramMain: "stravages.clo",
    instagramBrand: "plug_empire",
    linktree: "https://linktr.ee/plug_empire",
    address: "Lisboa, Portugal",
    hoursPT:
      "Respondemos via WhatsApp todos os dias, das 09h às 22h (hora de Lisboa). Para encomendas urgentes, menciona na primeira mensagem.",
    hoursEN:
      "We reply on WhatsApp every day, 9 AM to 10 PM (Lisbon time). For urgent orders, mention it in your first message.",
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
