// Re-keys product images so each has a unique _key.
// Safe to run multiple times.

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

const products = await client.fetch('*[_type == "product"]{ _id, namePT, images }');

for (const p of products) {
  if (!p.images?.length) continue;
  const newImages = p.images.map((img, i) => ({
    ...img,
    _key: `img-${i}-${Math.random().toString(36).slice(2, 10)}`,
  }));
  await client.patch(p._id).set({ images: newImages }).commit();
  console.log(`  ✓ ${p.namePT} (${newImages.length} images re-keyed)`);
}

// Also fix any other arrays that might have duplicate keys (colors, related, features won't usually but check)
for (const p of products) {
  const fresh = await client.fetch('*[_id == $id][0]', { id: p._id });
  if (fresh.colors?.length) {
    const newColors = fresh.colors.map((c, i) => ({ ...c, _key: c._key || `c-${i}` }));
    if (JSON.stringify(newColors) !== JSON.stringify(fresh.colors)) {
      await client.patch(p._id).set({ colors: newColors }).commit();
    }
  }
}

console.log("Done.");
