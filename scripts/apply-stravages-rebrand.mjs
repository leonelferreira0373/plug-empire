// One-shot rebrand: Plug Empire → STRAVAGES on a Sanity dataset that was already migrated.
// Run this AFTER pulling the new code and BEFORE pushing to prod, on the same project
// that the old migration ran against.
//
// What it does:
//   1. Deletes the old "fato-empire-amarelo" tracksuit product
//   2. Deletes the old "carteira-stravages" (replaced by "carteira-couro" at 20 €)
//   3. Updates the surviving products' prices (tocas/balaclava → 25 €, removes oldPrice)
//   4. Rewrites the surviving products' PT/EN descriptions/features to match the new copy
//   5. Replaces home/about/contact singletons with the new STRAVAGES copy
//
// Safe to re-run.
//
// Usage:
//   node scripts/apply-stravages-rebrand.mjs

import { createClient } from "@sanity/client";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

async function deleteOldProducts() {
  console.log("Deleting discontinued products...");

  // Detach references first so the delete doesn't fail
  const danglingIds = ["product-fato-empire-amarelo", "product-carteira-stravages"];
  for (const id of danglingIds) {
    const referencing = await client.fetch(
      `*[references($id)]{ _id, related }`,
      { id },
    );
    for (const doc of referencing) {
      const cleaned = (doc.related ?? []).filter(
        (r) => r?._ref !== id,
      );
      await client.patch(doc._id).set({ related: cleaned }).commit();
    }
    try {
      await client.delete(id);
      console.log(`  ✓ deleted ${id}`);
    } catch (err) {
      if (String(err.message).includes("not found")) {
        console.log(`  · ${id} already gone`);
      } else {
        throw err;
      }
    }
  }
}

const PRICE_UPDATES = [
  { id: "product-toca-bee-preta", price: 25, oldPrice: null, badgePT: "Mais vendido", badgeEN: "Bestseller" },
  { id: "product-toca-bee-branca", price: 25, oldPrice: null },
  { id: "product-toca-bee-amarela", price: 25, oldPrice: null },
  { id: "product-toca-bee-rosa", price: 25, oldPrice: null },
  { id: "product-balaclava-bee", price: 25, oldPrice: null },
];

async function updatePrices() {
  console.log("Updating prices to 25 €...");
  for (const u of PRICE_UPDATES) {
    try {
      const patch = client.patch(u.id).set({ price: u.price });
      if (u.oldPrice === null) patch.unset(["oldPrice"]);
      if (u.badgePT) patch.set({ badgePT: u.badgePT });
      if (u.badgeEN) patch.set({ badgeEN: u.badgeEN });
      await patch.commit();
      console.log(`  ✓ ${u.id} → ${u.price} €`);
    } catch (err) {
      if (String(err.message).includes("not found")) {
        console.log(`  · ${u.id} not in dataset, skipping`);
      } else {
        throw err;
      }
    }
  }
}

async function upsertCarteiraCouro() {
  console.log("Creating new 'Carteira — Couro' (20 €)...");
  await client.createOrReplace({
    _id: "product-carteira-couro",
    _type: "product",
    namePT: "Carteira — Couro",
    nameEN: "Wallet — Leather",
    slug: { _type: "slug", current: "carteira-couro" },
    category: "carteiras",
    price: 20,
    descriptionPT:
      "Carteira em couro preto. Acessório complementar selecionado pela casa — sem branding Stravages, para quem prefere uma peça discreta.",
    descriptionEN:
      "Black leather wallet. A complementary accessory curated by the house — without Stravages branding, for those who prefer a discreet piece.",
    featuresPT: [
      "Couro genuíno",
      "6 compartimentos para cartões",
      "Compartimento para notas",
      "Sem branding visível",
    ],
    featuresEN: [
      "Genuine leather",
      "6 card slots",
      "Banknote compartment",
      "No visible branding",
    ],
    sizes: ["Único"],
    colors: [{ _key: "c0", name: "Preto", hex: "#0a0a0a" }],
    stock: 8,
    bestseller: false,
    order: 6,
    images: [],
  });
  console.log("  ✓ carteira-couro (re-upload an image via /studio if needed)");
}

async function rewriteSurvivingDescriptions() {
  console.log("Rewriting descriptions for surviving products...");
  const survivors = [
    {
      id: "product-toca-bee-preta",
      descriptionPT:
        "A toca emblema Stravages. Algodão de alta densidade com forro de cetim que protege o cabelo e evita o frizz. Bordado dourado da abelha — assinatura discreta, presença total.",
      descriptionEN:
        "The flagship Stravages beanie. High-density cotton with a satin lining that protects hair and prevents frizz. Gold bee embroidery — discreet signature, total presence.",
    },
    {
      id: "product-toca-bee-amarela",
      descriptionPT:
        "A toca em amarelo abelha — uma declaração ousada com o lettering Stravages preto.",
      descriptionEN:
        "The bee-yellow beanie — a bold statement with the Stravages lettering in black.",
    },
    {
      id: "product-toca-bee-rosa",
      descriptionPT: "Rosa pó com o lettering Stravages a destacar-se.",
      descriptionEN: "Powder pink with the Stravages lettering set against it.",
    },
  ];
  for (const s of survivors) {
    try {
      await client
        .patch(s.id)
        .set({ descriptionPT: s.descriptionPT, descriptionEN: s.descriptionEN })
        .commit();
      console.log(`  ✓ ${s.id}`);
    } catch (err) {
      if (String(err.message).includes("not found")) {
        console.log(`  · ${s.id} not in dataset, skipping`);
      } else {
        throw err;
      }
    }
  }
}

async function rewriteSingletons() {
  console.log("Rewriting home/about/contact singletons...");

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
  console.log(`Applying Stravages rebrand to "${projectId}" / "${dataset}"...\n`);
  await deleteOldProducts();
  await updatePrices();
  await rewriteSurvivingDescriptions();
  await upsertCarteiraCouro();
  await rewriteSingletons();
  console.log("\n✅ Rebrand applied. Open /studio to verify and re-upload images if needed.");
})().catch((err) => {
  console.error("Rebrand failed:", err);
  process.exit(1);
});
