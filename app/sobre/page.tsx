"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLang } from "@/components/providers";
import { dict } from "@/lib/i18n";
import { BRAND } from "@/lib/config";

export default function SobrePage() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 opacity-30">
          <Image
            src="/products/beanie-group.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
        <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            <Sparkles size={14} />
            EST. {BRAND.founded} · PORTUGAL
          </div>
          <h1 className="mt-6 font-display text-5xl tracking-tight sm:text-7xl">
            <span className="block">{t.about_title}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {lang === "pt"
              ? "Plug Empire nasceu em Portugal como uma promessa simples: vestir os que constroem o seu próprio nome — com peças que sentem, no toque e no detalhe, o orgulho de quem as cria."
              : "Plug Empire was born in Portugal as a simple promise: dressing those building their own name — with pieces that carry, in feel and detail, the pride of those who make them."}
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <blockquote className="font-display text-3xl leading-[1.2] tracking-tight sm:text-5xl">
          &ldquo;<span className="gold-gradient">Todo o sonho é possível…</span>{" "}
          basta acreditar.&rdquo;
        </blockquote>
        <p className="mt-8 text-base leading-relaxed text-muted-foreground">
          {lang === "pt"
            ? "É mais do que um slogan. É a forma como pensamos cada peça: trabalho, dedicação, atenção ao detalhe. Da escolha do tecido ao bordado da abelha, nada é deixado ao acaso."
            : "It's more than a slogan. It's how we think about every piece: work, dedication, attention to detail. From the choice of fabric to the bee embroidery, nothing is left to chance."}
        </p>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: { pt: "Origem", en: "Origin" },
              d: {
                pt: "Desenhado e curado em Portugal. As peças são produzidas com fornecedores parceiros nos EUA, Emirados, Turquia e Namíbia, sob padrões rigorosos de qualidade.",
                en: "Designed and curated in Portugal. Pieces are produced with partner suppliers in the USA, UAE, Turkey and Namibia under strict quality standards.",
              },
            },
            {
              t: { pt: "Detalhe", en: "Detail" },
              d: {
                pt: "Cada toca leva forro de cetim. Cada carteira é gravada com folha dourada real. Cada costura é inspeccionada antes de sair da casa.",
                en: "Every beanie has a satin lining. Every wallet is stamped with real gold foil. Every seam is inspected before leaving the house.",
              },
            },
            {
              t: { pt: "Comunidade", en: "Community" },
              d: {
                pt: "Vestimos artistas, fundadores, gente que constrói. Cada peça que sai daqui é uma chancela: alguém acreditou no seu próprio sonho.",
                en: "We dress artists, founders, builders. Every piece that leaves here is a stamp: someone believed in their own dream.",
              },
            },
          ].map((p, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-surface/40 p-7"
            >
              <div className="font-display text-3xl text-gold">0{i + 1}</div>
              <h3 className="mt-4 font-display text-xl uppercase tracking-widest">
                {p.t[lang]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.d[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="border-y border-border bg-black">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-5xl">
            {lang === "pt" ? "Veste o" : "Wear the"}{" "}
            <span className="gold-gradient">Plug Empire.</span>
          </h2>
          <Link
            href="/loja"
            className="inline-flex items-center gap-2 rounded-full btn-gold-shine px-8 py-4 text-sm font-bold uppercase tracking-widest"
          >
            {t.hero_cta_shop}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
