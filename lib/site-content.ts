import { isSanityConfigured, sanityClient, imgUrl } from "./sanity";

// ============ Types ============

export type HomeContent = {
  heroEyebrowPT?: string;
  heroEyebrowEN?: string;
  heroTitlePT?: string;
  heroTitleEN?: string;
  heroSubtitlePT?: string;
  heroSubtitleEN?: string;
  heroImage?: string;
  storyQuotePT?: string;
  storyQuoteEN?: string;
  storyBodyPT?: string;
  storyBodyEN?: string;
};

export type Pillar = {
  titlePT?: string;
  titleEN?: string;
  bodyPT?: string;
  bodyEN?: string;
};

export type AboutContent = {
  headlinePT?: string;
  headlineEN?: string;
  introPT?: string;
  introEN?: string;
  manifestoPT?: string;
  manifestoEN?: string;
  pillars?: Pillar[];
  heroImage?: string;
};

export type ContactContent = {
  headlinePT?: string;
  headlineEN?: string;
  introPT?: string;
  introEN?: string;
  email?: string;
  whatsapp?: string;
  instagramMain?: string;
  instagramBrand?: string;
  linktree?: string;
  address?: string;
  hoursPT?: string;
  hoursEN?: string;
};

// ============ Fetchers ============

async function fetchOne<T>(id: string): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await sanityClient().fetch<T | null>(
      `*[_id == $id][0]`,
      { id },
      { next: { revalidate: 60 } },
    );
  } catch (err) {
    console.error(`[site-content] fetch ${id} failed`, err);
    return null;
  }
}

export async function getHome(): Promise<HomeContent | null> {
  const doc = await fetchOne<HomeContent & { heroImage?: unknown }>("home");
  if (!doc) return null;
  return {
    ...doc,
    heroImage: doc.heroImage
      ? imgUrl(doc.heroImage as Parameters<typeof imgUrl>[0], 1600)
      : undefined,
  };
}

export async function getAbout(): Promise<AboutContent | null> {
  const doc = await fetchOne<AboutContent & { heroImage?: unknown }>("about");
  if (!doc) return null;
  return {
    ...doc,
    heroImage: doc.heroImage
      ? imgUrl(doc.heroImage as Parameters<typeof imgUrl>[0], 1600)
      : undefined,
  };
}

export async function getContact(): Promise<ContactContent | null> {
  return fetchOne<ContactContent>("contact");
}
