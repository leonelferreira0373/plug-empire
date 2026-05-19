"use client";

import * as React from "react";
import { useLang } from "./providers";
import type { Lang } from "@/lib/i18n";

type Section = {
  heading: { pt: string; en: string };
  body: { pt: React.ReactNode; en: React.ReactNode };
};

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: { pt: string; en: string };
  intro?: { pt: string; en: string };
  sections: Section[];
}) {
  const { lang } = useLang();
  const updated = new Intl.DateTimeFormat(lang === "pt" ? "pt-PT" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
        Stravages · Legal
      </div>
      <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
        {title[lang]}
      </h1>
      <p className="mt-2 text-xs text-muted-foreground">
        {lang === "pt" ? `Última atualização: ${updated}` : `Last updated: ${updated}`}
      </p>
      {intro && (
        <p className="mt-8 text-base leading-relaxed text-muted-foreground">
          {intro[lang]}
        </p>
      )}
      <div className="mt-10 space-y-10">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display text-xl uppercase tracking-widest text-foreground">
              {s.heading[lang]}
            </h2>
            <div className="prose-content mt-4 space-y-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              {s.body[lang]}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

export function L({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function LList({ items }: { items: string[] }) {
  return (
    <ul className="ml-5 list-disc space-y-2 marker:text-gold">
      {items.map((i, k) => (
        <li key={k}>{i}</li>
      ))}
    </ul>
  );
}

export type { Lang };
