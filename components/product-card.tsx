"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "./providers";
import { dict } from "@/lib/i18n";
import { formatAOA } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { lang } = useLang();
  const t = dict[lang];
  const onSale = product.oldPrice && product.oldPrice > product.price;

  return (
    <Link
      href={`/produto/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface">
        <Image
          src={product.images[0]}
          alt={product.name[lang]}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.name[lang]}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
              {product.badge[lang]}
            </span>
          )}
          {onSale && (
            <span className="rounded-full bg-black/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold border border-gold/40">
              {t.sale_badge}
            </span>
          )}
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs font-bold uppercase tracking-widest text-white">
            {t.out_of_stock}
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1.5">
        <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-gold">
          {product.name[lang]}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-base font-bold tracking-wide text-foreground">
            {formatAOA(product.price)}
          </span>
          {onSale && (
            <span className="text-xs text-muted-foreground line-through">
              {formatAOA(product.oldPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
