"use client";

import * as React from "react";
import { useLang } from "@/components/providers";
import { dict } from "@/lib/i18n";
import { CATEGORIES, type Category, type Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

export function LojaClient({ products }: { products: Product[] }) {
  const { lang } = useLang();
  const t = dict[lang];
  const [filter, setFilter] = React.useState<Category | "all">("all");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const cat = new URLSearchParams(window.location.search).get("cat");
    if (cat && CATEGORIES.some((c) => c.key === cat)) {
      setFilter(cat as Category);
    }
  }, []);

  const items =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="border-b border-border pb-8">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Plug Empire
        </div>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-6xl">
          {t.catalog_title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          {t.catalog_subtitle}
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={t.catalog_filter_all}
        />
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c.key}
            active={filter === c.key}
            onClick={() => setFilter(c.key)}
            label={c.label[lang]}
          />
        ))}
      </div>

      {/* Grid */}
      {items.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-20 rounded-2xl border border-dashed border-border bg-surface/40 p-12 text-center text-muted-foreground">
          {t.catalog_empty}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors",
        active
          ? "border-gold bg-gold text-black"
          : "border-border bg-surface text-foreground hover:border-gold/60 hover:text-gold",
      )}
    >
      {label}
    </button>
  );
}
