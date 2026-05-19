"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLang } from "@/components/providers";
import { dict } from "@/lib/i18n";
import { BRAND } from "@/lib/config";
import type { AboutContent } from "@/lib/site-content";

const FALLBACK_PILLARS = [
  {
    titlePT: "Colmeia",
    titleEN: "Hive",
    bodyPT:
      "Sai da colmeia todos os dias sem garantias. Mesmo assim, vai. Para quem enfrenta pressão e recusa o destino imposto.",
    bodyEN:
      "Leaves the hive every day without guarantees. Goes anyway. For those who face pressure and refuse the destiny imposed on them.",
  },
  {
    titlePT: "Detalhe",
    titleEN: "Detail",
    bodyPT:
      "Cada toca leva forro de cetim. Cada peça é inspecionada antes de sair. Sem atalhos. Sem desculpas.",
    bodyEN:
      "Every beanie has a satin lining. Every piece is inspected before it leaves. No shortcuts. No excuses.",
  },
  {
    titlePT: "Identidade",
    titleEN: "Identity",
    bodyPT:
      "Não é moda. É bandeira. É o nome que escolhemos vestir — para quem vem de baixo e vai longe.",
    bodyEN:
      "Not fashion. A flag. The name we choose to wear — for those who come from below and go far.",
  },
];

const FALLBACK_INTRO = {
  pt: "Stravages nasce na tensão entre o que te rodeia e aquilo que recusas tornar-te. Para quem vem de baixo, para quem enfrenta pressão, para quem não aceita o destino imposto.",
  en: "Stravages is born in the tension between what surrounds you and what you refuse to become. For those who come from below, who face pressure, who refuse the destiny imposed on them.",
};

const FALLBACK_MANIFESTO = {
  pt: `Não começou com um plano. Começou com sobrevivência. Num lugar onde sair de casa nunca era só sair — era arriscar. Era não saber se o dia acabava como começou.

Crescer ali não era simples. Ou escolhes quem queres ser… ou o ambiente escolhe por ti. Todos os dias havia exemplos do caminho fácil. Dinheiro rápido. Decisões erradas. Destinos previsíveis. Mas dentro de alguns havia outra voz. Uma pergunta silenciosa: "Isto é tudo… ou há mais?"

Stravages nasce exatamente aí. No conflito entre pressão e propósito. Entre o que te rodeia… e aquilo que recusas tornar-te.

A abelha carrega essa verdade. Sai todos os dias da colmeia sem garantias. Sem certeza de voltar. Com risco constante. Mesmo assim, vai. Não porque é fácil — mas porque é o que tem de ser feito. E talvez o mais poderoso: voa mesmo quando dizem que não devia conseguir. Tal como nós.

Não é só roupa. É identidade. É mentalidade. É a prova de que de onde vens não define até onde vais.`,
  en: `It didn't start with a plan. It started with survival. In a place where leaving home was never just leaving — it was risking. It was not knowing if the day would end the way it started.

Growing up there wasn't simple. Either you choose who you want to be… or the environment chooses for you. Every day there were examples of the easy path. Quick money. Wrong decisions. Predictable destinies. But inside some, there was another voice. A silent question: "Is this all… or is there more?"

Stravages is born exactly there. In the conflict between pressure and purpose. Between what surrounds you… and what you refuse to become.

The bee carries that truth. It leaves the hive every day without guarantees. Without certainty of returning. With constant risk. Even so, it goes. Not because it's easy — but because it's what has to be done. And maybe most powerful: it flies even when they say it shouldn't be able to. Just like us.

More than clothing. It's identity. It's mentality. It's proof that where you come from doesn't define how far you go.`,
};

export function SobreClient({ content }: { content: AboutContent | null }) {
  const { lang } = useLang();
  const t = dict[lang];

  const headline =
    (lang === "pt" ? content?.headlinePT : content?.headlineEN) ?? t.about_title;
  const intro =
    (lang === "pt" ? content?.introPT : content?.introEN) ??
    FALLBACK_INTRO[lang];
  const manifesto =
    (lang === "pt" ? content?.manifestoPT : content?.manifestoEN) ??
    FALLBACK_MANIFESTO[lang];
  const pillars =
    content?.pillars && content.pillars.length > 0
      ? content.pillars
      : FALLBACK_PILLARS;

  const heroImage = content?.heroImage ?? "/products/beanie-group.jpg";

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 opacity-30">
          <Image
            src={heroImage}
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
            EST. {BRAND.founded} · LISBOA
          </div>
          <h1 className="mt-6 font-display text-5xl tracking-tight sm:text-7xl">
            <span className="block">{headline}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {intro}
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="space-y-6 text-base leading-relaxed text-foreground/85 sm:text-lg">
          {manifesto.split(/\n\n+/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-surface/40 p-7"
            >
              <div className="font-display text-3xl text-gold">0{i + 1}</div>
              <h3 className="mt-4 font-display text-xl uppercase tracking-widest">
                {lang === "pt" ? p.titlePT : p.titleEN}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {lang === "pt" ? p.bodyPT : p.bodyEN}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="border-y border-border bg-black">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-5xl">
            {lang === "pt" ? "Veste o" : "Wear"}{" "}
            <span className="gold-gradient">Stravages.</span>
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
