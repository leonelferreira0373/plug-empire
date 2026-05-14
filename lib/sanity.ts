import { createClient, type SanityClient } from "next-sanity";
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

export const SANITY = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
};

export const isSanityConfigured = !!SANITY.projectId;

let cached: SanityClient | null = null;

export function sanityClient(): SanityClient {
  if (cached) return cached;
  cached = createClient({
    projectId: SANITY.projectId,
    dataset: SANITY.dataset,
    apiVersion: SANITY.apiVersion,
    useCdn: true,
    perspective: "published",
  });
  return cached;
}

let writeCached: SanityClient | null = null;
export function sanityWriteClient(): SanityClient {
  if (writeCached) return writeCached;
  writeCached = createClient({
    projectId: SANITY.projectId,
    dataset: SANITY.dataset,
    apiVersion: SANITY.apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });
  return writeCached;
}

const builder = imageUrlBuilder({
  projectId: SANITY.projectId,
  dataset: SANITY.dataset,
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function imgUrl(source: SanityImageSource | undefined, width = 1200): string {
  if (!source) return "";
  try {
    return urlFor(source).width(width).auto("format").url();
  } catch {
    return "";
  }
}
