// One-shot: patch the home singleton in Sanity to match the editorial mockup.
// Run: node scripts/update-hero-copy.mjs

import { createClient } from "@sanity/client";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

await client
  .patch("home")
  .set({
    heroEyebrowPT: "",
    heroEyebrowEN: "",
    heroTitlePT: "STRAVAGES",
    heroTitleEN: "STRAVAGES",
    heroSubtitlePT: "Mais que roupa. Uma presença.",
    heroSubtitleEN: "More than clothing. A presence.",
  })
  .commit();

console.log("✅ Hero copy updated in Sanity.");
