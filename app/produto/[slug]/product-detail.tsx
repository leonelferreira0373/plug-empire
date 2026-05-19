"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronRight,
} from "lucide-react";
import { useLang } from "@/components/providers";
import { dict } from "@/lib/i18n";
import { cn, formatEUR } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/products";

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { lang } = useLang();
  const t = dict[lang];
  const add = useCart((s) => s.add);
  const router = useRouter();

  const [activeImage, setActiveImage] = React.useState(0);
  const [size, setSize] = React.useState(product.sizes?.[0] ?? "");
  const [color, setColor] = React.useState(product.colors?.[0]?.name ?? "");
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  const onSale = product.oldPrice && product.oldPrice > product.price;

  const handleAdd = () => {
    add({
      slug: product.slug,
      name: product.name[lang],
      price: product.price,
      image: product.images[0],
      size,
      color,
      qty,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    add({
      slug: product.slug,
      name: product.name[lang],
      price: product.price,
      image: product.images[0],
      size,
      color,
      qty,
    });
    router.push("/checkout");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-gold">
          {lang === "pt" ? "Início" : "Home"}
        </Link>
        <ChevronRight size={12} />
        <Link href="/loja" className="hover:text-gold">
          {t.nav_shop}
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground">{product.name[lang]}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* GALLERY */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src={product.images[activeImage]}
              alt={product.name[lang]}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black">
                {product.badge[lang]}
              </span>
            )}
            {onSale && (
              <span className="absolute right-4 top-4 rounded-full bg-black/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold border border-gold/40">
                -{Math.round((1 - product.price / product.oldPrice!) * 100)}%
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-lg border transition-all",
                    activeImage === i
                      ? "border-gold ring-2 ring-gold/40"
                      : "border-border hover:border-gold/60",
                  )}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-col">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Stravages
          </div>
          <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-5xl">
            {product.name[lang]}
          </h1>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-gold">
              {formatEUR(product.price)}
            </span>
            {onSale && (
              <>
                <span className="text-base text-muted-foreground line-through">
                  {formatEUR(product.oldPrice!)}
                </span>
                <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs font-semibold text-gold">
                  -{Math.round((1 - product.price / product.oldPrice!) * 100)}%
                </span>
              </>
            )}
          </div>

          {/* Stock badge */}
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                product.stock > 5
                  ? "bg-emerald-500"
                  : product.stock > 0
                    ? "bg-amber-400"
                    : "bg-red-500",
              )}
            />
            <span className="text-muted-foreground">
              {product.stock > 5
                ? `${product.stock} ${t.pdp_in_stock}`
                : product.stock > 0
                  ? `${t.pdp_low_stock} · ${product.stock}`
                  : t.out_of_stock}
            </span>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {product.description[lang]}
          </p>

          {/* Color */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
                  {t.pdp_color}
                </span>
                <span className="text-xs text-muted-foreground">{color}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    className={cn(
                      "relative h-10 w-10 rounded-full border-2 transition-all",
                      color === c.name
                        ? "border-gold ring-2 ring-gold/30"
                        : "border-border hover:border-gold/50",
                    )}
                    style={{ background: c.hex }}
                  >
                    {color === c.name && (
                      <Check
                        size={14}
                        className="absolute inset-0 m-auto text-white drop-shadow-md mix-blend-difference"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
                {t.pdp_size}
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-14 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors",
                      size === s
                        ? "border-gold bg-gold text-black"
                        : "border-border bg-surface text-foreground hover:border-gold/60",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
              {t.pdp_quantity}
            </span>
            <div className="mt-3 inline-flex items-center rounded-lg border border-border bg-surface">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-gold"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-display text-lg font-bold">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                aria-label="Increase quantity"
                className="flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-gold"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={cn(
                "group flex flex-1 items-center justify-center gap-2 rounded-full border-2 px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all",
                added
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                  : "border-gold bg-transparent text-gold hover:bg-gold hover:text-black disabled:opacity-40 disabled:cursor-not-allowed",
              )}
            >
              {added ? (
                <>
                  <Check size={18} />
                  {lang === "pt" ? "Adicionado!" : "Added!"}
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  {t.pdp_add_to_cart}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-full btn-gold-shine px-6 py-4 text-sm font-bold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.pdp_buy_now}
            </button>
          </div>

          {/* Trust items */}
          <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-surface/40 p-5 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <Truck size={16} className="mt-0.5 shrink-0 text-gold" />
              <span className="text-muted-foreground">{t.pdp_shipping_info}</span>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw size={16} className="mt-0.5 shrink-0 text-gold" />
              <span className="text-muted-foreground">{t.pdp_returns_info}</span>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-gold" />
              <span className="text-muted-foreground">{t.pdp_secure_payment}</span>
            </div>
          </div>

          {/* Features */}
          <div className="mt-10 border-t border-border pt-8">
            <h2 className="font-display text-xl tracking-wider uppercase text-foreground">
              {t.pdp_features}
            </h2>
            <ul className="mt-5 space-y-3">
              {product.features[lang].map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground/85"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-border pt-12">
          <h2 className="font-display text-2xl tracking-wider sm:text-3xl">
            {t.pdp_related}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
