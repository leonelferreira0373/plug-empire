"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Layers, Snowflake, Sparkles } from "lucide-react";
import { useLang } from "@/components/providers";
import { dict } from "@/lib/i18n";
import type { Product } from "@/lib/products";
import type { HomeContent } from "@/lib/site-content";
import { formatEUR } from "@/lib/utils";

export function HomeClient({
  products,
  home,
}: {
  products: Product[];
  home: HomeContent | null;
}) {
  const { lang } = useLang();
  const t = dict[lang];

  // Sanity-driven copy with editorial defaults
  const heroTitle =
    (lang === "pt" ? home?.heroTitlePT : home?.heroTitleEN) ?? "STRAVAGES";
  const heroSubtitle =
    (lang === "pt" ? home?.heroSubtitlePT : home?.heroSubtitleEN) ??
    (lang === "pt"
      ? "Mais que roupa. Uma presença."
      : "More than clothing. A presence.");

  // Top 4 beanies from Sanity for the colado grid
  const sanityBeanies = products.filter((p) => p.category === "tocas").slice(0, 4);

  // Extra 4 beanies — new high-fidelity studio shots
  // (TODO: migrate these to Sanity as their own product entries when the brand
  // owner photographs SKUs; for now they link to the tocas category)
  const extraBeanies = [
    {
      slug: "extra-black",
      href: "/loja?cat=tocas",
      name: { pt: "Stravages Beanie Black", en: "Stravages Beanie Black" },
      price: 25,
      image: "/products/beanie-black.jpg",
    },
    {
      slug: "extra-white",
      href: "/loja?cat=tocas",
      name: { pt: "Stravages Beanie White", en: "Stravages Beanie White" },
      price: 25,
      image: "/products/beanie-white.jpg",
    },
    {
      slug: "extra-pink",
      href: "/loja?cat=tocas",
      name: { pt: "Stravages Beanie Pink", en: "Stravages Beanie Pink" },
      price: 25,
      image: "/products/beanie-pink.jpg",
    },
    {
      slug: "extra-yellow",
      href: "/loja?cat=tocas",
      name: { pt: "Stravages Beanie Yellow", en: "Stravages Beanie Yellow" },
      price: 25,
      image: "/products/beanie-yellow.jpg",
    },
  ];

  return (
    <div>
      {/* ============== HERO ============== */}
      <section className="relative isolate min-h-[85vh] overflow-hidden bg-black flex items-stretch">
        <Image
          src="/products/balaclava-1.jpg"
          alt="Stravages — balaclava em pedestal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] md:object-[center_right] -z-10"
        />
        {/* Legibility gradient — only left ~45% darkened */}
        <div
          aria-hidden
          className="absolute inset-0 -z-[1] pointer-events-none hidden md:block"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0) 45%)",
          }}
        />

        <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-24 md:py-32">
          <div className="max-w-[50%] flex flex-col items-start">
            <h1 className="font-display text-5xl leading-[0.95] tracking-[0.08em] sm:text-7xl md:text-8xl">
              {heroTitle}
            </h1>
            <p className="mt-4 text-xs sm:text-sm tracking-[0.25em] uppercase text-muted-foreground">
              {heroSubtitle}
            </p>
            <Link href="/loja" className="mt-10 btn-gold-outline">
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ============== SIGNATURE BEE COLLECTION ============== */}
      <section className="relative isolate gold-divider-top overflow-hidden">
        <div className="grid md:grid-cols-[1.6fr_1fr] items-center">
          <Image
            src="/products/signature-beanie.jpg"
            alt="Toca Bee — abelha e lettering bordados em dourado sobre seda preta"
            width={1600}
            height={2000}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="block w-full h-auto"
          />
          <div className="flex flex-col items-start gap-6 px-6 py-12 md:px-12 md:py-0 md:pr-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {lang === "pt" ? "Assinatura" : "Signature"}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight leading-[1.05]">
              {lang === "pt" ? (
                <>
                  Signature Bee
                  <br />
                  Collection
                </>
              ) : (
                <>
                  Signature Bee
                  <br />
                  Collection
                </>
              )}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground max-w-md">
              {lang === "pt"
                ? "Identidade marcada. Sem compromissos. Linhas premium desenhadas para elevar a tua presença."
                : "Marked identity. No compromises. Premium lines designed to elevate your presence."}
            </p>
            <Link href="/loja?cat=tocas" className="btn-gold-outline">
              {lang === "pt" ? "Ver Produtos" : "View Products"}
            </Link>
          </div>
        </div>
      </section>

      {/* ============== BEANIES GRID (colado) ============== */}
      <section className="gold-divider-top py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {lang === "pt" ? "Coleção Essencial" : "Essential Collection"}
            </span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">
              {lang === "pt" ? "Beanies" : "Beanies"}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4">
          {/* Old beanies — Sanity products with their PDP routes */}
          {sanityBeanies.map((b, i) => (
            <Link
              key={b.slug}
              href={`/produto/${b.slug}`}
              className="beanie-card md:border-r border-[rgba(212,175,55,0.2)]"
            >
              <Image
                src={b.images[0]}
                alt={b.name[lang]}
                width={800}
                height={800}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="w-full h-auto aspect-square object-cover"
              />
              <h3 className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-[0.15em] text-center text-foreground">
                {b.name[lang]}
              </h3>
              <span className="block pb-7 px-3 text-center font-display text-base text-gold">
                {formatEUR(b.price)}
              </span>
            </Link>
          ))}

          {/* New beanies — high-fidelity studio shots, link to category until SKUs land in Sanity */}
          {extraBeanies.map((b, i, arr) => (
            <Link
              key={b.slug}
              href={b.href}
              className={`beanie-card ${i < arr.length - 1 ? "md:border-r" : ""} border-[rgba(212,175,55,0.2)]`}
            >
              <Image
                src={b.image}
                alt={b.name[lang]}
                width={800}
                height={800}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="w-full h-auto aspect-square object-cover"
              />
              <h3 className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-[0.15em] text-center text-foreground">
                {b.name[lang]}
              </h3>
              <span className="block pb-7 px-3 text-center font-display text-base text-gold">
                {formatEUR(b.price)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============== STRAVAGES SET ============== */}
      <section className="relative isolate gold-divider-top overflow-hidden">
        <div className="grid md:grid-cols-[1fr_1.6fr] items-center">
          <div className="flex flex-col items-start gap-6 px-6 py-12 md:px-12 md:py-0 md:pl-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {lang === "pt" ? "Conjuntos Exclusivos" : "Exclusive Sets"}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight leading-[1.05]">
              Stravages Set
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground max-w-md">
              {lang === "pt"
                ? "Construído para presença. Não para passar despercebido. Hoodie relaxado e calças premium em tecido pesado com detalhes de costura e bordados em ouro."
                : "Built for presence. Not to pass unnoticed. Relaxed hoodie and premium pants in heavyweight fabric with gold stitching and embroidery."}
            </p>
            <Link href="/loja?cat=tracksuits" className="btn-gold-outline">
              {lang === "pt" ? "Shop Set" : "Shop Set"}
            </Link>
          </div>
          <Image
            src="/products/stravages-set.jpg"
            alt="Stravages Set — hoodie e calças pretos com detalhes dourados e abelha bordada"
            width={2000}
            height={1200}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="block w-full h-auto"
          />
        </div>
      </section>

      {/* ============== FEATURES (4 cols) ============== */}
      <section className="gold-divider-top py-16 bg-black">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 text-center">
          {[
            {
              Icon: Crown,
              title: lang === "pt" ? "Exclusividade" : "Exclusivity",
              desc:
                lang === "pt"
                  ? "Peças limitadas. Para poucos."
                  : "Limited pieces. For the few.",
            },
            {
              Icon: Layers,
              title: lang === "pt" ? "Qualidade Premium" : "Premium Quality",
              desc:
                lang === "pt"
                  ? "Materiais selecionados para máximo conforto."
                  : "Materials selected for maximum comfort.",
            },
            {
              Icon: Snowflake,
              title: lang === "pt" ? "Conforto Térmico" : "Thermal Comfort",
              desc:
                lang === "pt"
                  ? "Proteção e aquecimento para qualquer estação."
                  : "Protection and warmth for any season.",
            },
            {
              Icon: Sparkles,
              title: lang === "pt" ? "Atitude" : "Attitude",
              desc:
                lang === "pt"
                  ? "Mais que um acessório. Um estilo de vida."
                  : "More than an accessory. A lifestyle.",
            },
          ].map(({ Icon, title, desc }, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <Icon className="text-gold" size={32} strokeWidth={1.4} />
              <h3 className="font-display text-sm tracking-[0.22em] uppercase">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============== CADA DETALHE IMPORTA (packaging) ============== */}
      <section className="relative isolate gold-divider-top overflow-hidden">
        <div className="grid md:grid-cols-[1fr_1.6fr] items-center">
          <div className="flex flex-col items-start gap-6 px-6 py-12 md:px-12 md:py-0 md:pl-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {lang === "pt" ? "Unboxing" : "Unboxing"}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight leading-[1.05]">
              {lang === "pt" ? (
                <>
                  Cada detalhe
                  <br />
                  importa.
                </>
              ) : (
                <>
                  Every detail
                  <br />
                  matters.
                </>
              )}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground max-w-md">
              {lang === "pt"
                ? "Do toque do material à abertura da embalagem. As nossas caixas exclusivas com acabamento mate e relevo dourado elevam o produto à categoria de obra de arte."
                : "From the touch of the fabric to the unboxing. Our exclusive matte boxes with gold-foil embossing elevate the product to art."}
            </p>
          </div>
          <Image
            src="/products/packaging.jpg"
            alt="Caixa Stravages premium com logo e abelha em relevo dourado sobre veludo preto"
            width={2000}
            height={1200}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="block w-full h-auto"
          />
        </div>
      </section>

      {/* ============== NEWSLETTER ============== */}
      <section className="gold-divider-top py-20 bg-surface text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
            {lang === "pt" ? "Faz parte da colmeia" : "Join the hive"}
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">
            {lang === "pt"
              ? "Recebe novidades, drops exclusivos e acesso antecipado."
              : "Get news, exclusive drops, and early access."}
          </p>
          <form
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                lang === "pt"
                  ? "Inscrição concluída. Bem-vindo à colmeia."
                  : "Subscription confirmed. Welcome to the hive.",
              );
            }}
          >
            <input
              type="email"
              required
              placeholder={
                lang === "pt" ? "O TEU EMAIL" : "YOUR EMAIL"
              }
              className="flex-1 bg-transparent border border-border focus:border-gold outline-none px-4 py-3 text-sm tracking-widest uppercase"
            />
            <button
              type="submit"
              className="btn-gold-shine px-8 py-3 text-xs font-bold tracking-widest uppercase"
            >
              {lang === "pt" ? "Subscrever" : "Subscribe"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
