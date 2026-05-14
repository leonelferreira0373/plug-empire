"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Truck, ShieldCheck, BadgeCheck } from "lucide-react";
import { useLang } from "@/components/providers";
import { dict } from "@/lib/i18n";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { formatEUR } from "@/lib/utils";

export function HomeClient({ products }: { products: Product[] }) {
  const { lang } = useLang();
  const t = dict[lang];

  const featured =
    products.find((p) => p.slug === "toca-bee-preta") ?? products[0];
  const grid = products.slice(0, 6);
  const wallet =
    products.find((p) => p.slug === "carteira-stravages") ?? products[0];

  if (!featured || !wallet) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
        <h1 className="font-display text-3xl">Plug Empire</h1>
        <p className="mt-4 text-muted-foreground">
          {lang === "pt"
            ? "A loja está a ser preparada. Volta em breve."
            : "The store is being prepared. Check back soon."}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ============== HERO ============== */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={featured.images[0] ?? "/products/beanie-black-pair.jpg"}
            alt=""
            fill
            priority
            className="object-cover opacity-50 md:opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background md:from-background/40 md:via-background/70 md:to-background" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-background via-background/30 to-transparent md:block" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-28 sm:px-6">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <Sparkles size={14} />
              {t.hero_eyebrow}
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
              <span className="block text-foreground">{t.hero_title_1}</span>
              <span className="block gold-gradient">{t.hero_title_2}</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.hero_subtitle}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/loja"
                className="group inline-flex items-center justify-center gap-2 rounded-full btn-gold-shine px-8 py-4 text-sm font-bold uppercase tracking-widest shadow-[0_0_0_1px_rgba(212,175,55,0.4),0_8px_30px_-12px_rgba(212,175,55,0.6)] transition-transform hover:scale-[1.02]"
              >
                {t.hero_cta_shop}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/40 px-8 py-4 text-sm font-medium uppercase tracking-widest text-foreground backdrop-blur transition-colors hover:border-gold/60 hover:text-gold"
              >
                {t.hero_cta_story}
              </Link>
            </div>

            {/* Decorative bee */}
            <div className="pointer-events-none absolute right-0 top-1/2 -z-10 hidden -translate-y-1/2 opacity-[0.08] md:block">
              <Image
                src="/brand/bee.png"
                alt=""
                width={600}
                height={600}
                className="object-contain"
              />
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src={wallet.images[0]}
                alt={wallet.name[lang]}
                fill
                priority
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                    {t.featured_eyebrow}
                  </div>
                  <div className="mt-2 font-display text-2xl font-bold tracking-wide text-white">
                    {wallet.name[lang]}
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    {formatEUR(wallet.price)}
                  </div>
                </div>
                <Link
                  href={`/produto/${wallet.slug}`}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black transition-transform hover:scale-110"
                  aria-label={wallet.name[lang]}
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-black">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-8 sm:grid-cols-4 sm:px-6">
          {[
            { icon: BadgeCheck, label: t.trust_authentic },
            { icon: Truck, label: t.trust_shipping },
            { icon: ShieldCheck, label: t.trust_secure },
            { icon: Sparkles, label: t.trust_quality },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-3 text-center text-[11px] font-bold tracking-[0.22em] text-gold"
            >
              <item.icon size={18} className="text-gold-light" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {t.featured_eyebrow}
            </div>
            <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
              {featured.name[lang]}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {featured.description[lang]}
            </p>
            <ul className="mt-8 space-y-3">
              {featured.features[lang].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span className="text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-6">
              <Link
                href={`/produto/${featured.slug}`}
                className="inline-flex items-center gap-2 rounded-full btn-gold-shine px-8 py-4 text-sm font-bold uppercase tracking-widest"
              >
                {t.hero_cta_shop}
                <ArrowRight size={16} />
              </Link>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-gold">
                  {formatEUR(featured.price)}
                </span>
                {featured.oldPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatEUR(featured.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src={featured.images[0]}
                alt={featured.name[lang]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {featured.badge && (
                <div className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black">
                  {featured.badge[lang]}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="flex items-end justify-between border-b border-border pb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {lang === "pt" ? "Toda a coleção" : "Full collection"}
            </div>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
              {lang === "pt" ? "Compra agora" : "Shop now"}
            </h2>
          </div>
          <Link
            href="/loja"
            className="hidden items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gold transition-colors hover:text-gold-light md:inline-flex"
          >
            {lang === "pt" ? "Ver tudo" : "View all"}
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {grid.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/loja"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-gold"
          >
            {lang === "pt" ? "Ver tudo" : "View all"}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-y border-border bg-black">
        <div className="absolute inset-0 -z-10 opacity-20">
          <Image
            src="/products/beanie-features.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40" />
        </div>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            الله · {lang === "pt" ? "A nossa marca" : "Our brand"}
          </div>
          <blockquote className="mt-6 font-display text-3xl leading-[1.15] tracking-tight text-white sm:text-5xl">
            &ldquo;Todo o sonho é possível… <span className="gold-gradient">basta acreditar.</span>&rdquo;
          </blockquote>
          <p className="mt-8 text-sm leading-relaxed text-white/70 sm:text-base">
            {lang === "pt"
              ? "Marca portuguesa. Vestimos quem constrói o seu próprio nome. Cada peça do Plug Empire — toca, balaclava, fato, carteira — é desenhada e produzida com o mesmo padrão: qualidade premium, identidade clara, sem atalhos."
              : "Portuguese brand. We dress those building their own name. Every Plug Empire piece — beanie, balaclava, tracksuit, wallet — is designed and produced to the same standard: premium quality, clear identity, no shortcuts."}
          </p>
          <Link
            href="/sobre"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/60 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-black"
          >
            {t.hero_cta_story}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
