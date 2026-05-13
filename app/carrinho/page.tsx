"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart, cartKey } from "@/lib/cart";
import { useLang } from "@/components/providers";
import { dict } from "@/lib/i18n";
import { cn, formatAOA } from "@/lib/utils";
import { whatsappUrl } from "@/lib/config";

export default function CartPage() {
  const { lang } = useLang();
  const t = dict[lang];
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);

  // Avoid hydration mismatch — cart is from localStorage.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  const checkout = () => {
    const lines = [
      lang === "pt"
        ? "Olá! Quero fazer este pedido:"
        : "Hi! I'd like to place this order:",
      "",
      ...items.map(
        (i) =>
          `• ${i.name}${i.size ? ` · ${i.size}` : ""}${i.color ? ` · ${i.color}` : ""} — ${i.qty}× ${formatAOA(i.price)} = ${formatAOA(i.price * i.qty)}`,
      ),
      "",
      `${t.cart_subtotal}: ${formatAOA(subtotal)}`,
      "",
      lang === "pt"
        ? "Podem confirmar disponibilidade, envio e total final?"
        : "Can you confirm availability, shipping and final total?",
    ];
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          {t.cart_title}
        </h1>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-surface text-gold">
          <ShoppingBag size={32} />
        </div>
        <h1 className="mt-8 font-display text-3xl tracking-tight sm:text-4xl">
          {t.cart_title}
        </h1>
        <p className="mt-3 text-muted-foreground">{t.cart_empty}</p>
        <Link
          href="/loja"
          className="mt-8 inline-flex items-center gap-2 rounded-full btn-gold-shine px-8 py-4 text-sm font-bold uppercase tracking-widest"
        >
          {t.cart_empty_cta}
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex items-end justify-between border-b border-border pb-6">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          {t.cart_title}
        </h1>
        <button
          type="button"
          onClick={clear}
          className="text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-gold"
        >
          {lang === "pt" ? "Esvaziar" : "Clear"}
        </button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <ul className="divide-y divide-border">
          {items.map((item) => {
            const k = cartKey(item);
            return (
              <li
                key={k}
                className="grid grid-cols-[88px_1fr] gap-4 py-5 sm:grid-cols-[120px_1fr_auto] sm:gap-6"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-surface">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <Link
                    href={`/produto/${item.slug}`}
                    className="block text-sm font-semibold text-foreground hover:text-gold sm:text-base"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {item.size && <span>{item.size}</span>}
                    {item.size && item.color && <span> · </span>}
                    {item.color && <span>{item.color}</span>}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 sm:hidden">
                    <QtyControl
                      qty={item.qty}
                      onMinus={() => setQty(k, item.qty - 1)}
                      onPlus={() => setQty(k, item.qty + 1)}
                    />
                    <div className="font-display text-base font-bold text-gold">
                      {formatAOA(item.price * item.qty)}
                    </div>
                  </div>
                </div>
                <div className="hidden flex-col items-end gap-4 sm:flex">
                  <div className="font-display text-base font-bold text-gold">
                    {formatAOA(item.price * item.qty)}
                  </div>
                  <QtyControl
                    qty={item.qty}
                    onMinus={() => setQty(k, item.qty - 1)}
                    onPlus={() => setQty(k, item.qty + 1)}
                  />
                  <button
                    type="button"
                    onClick={() => remove(k)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-red-400"
                  >
                    <Trash2 size={12} />
                    {t.cart_remove}
                  </button>
                </div>
                <div className="col-span-2 -mt-2 sm:hidden">
                  <button
                    type="button"
                    onClick={() => remove(k)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-red-400"
                  >
                    <Trash2 size={12} />
                    {t.cart_remove}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-border bg-surface/40 p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-xl tracking-widest uppercase">
            {lang === "pt" ? "Resumo" : "Summary"}
          </h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">{t.cart_subtotal}</dt>
              <dd className="font-display text-base font-bold">
                {formatAOA(subtotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">{t.cart_shipping}</dt>
              <dd className="text-xs text-muted-foreground">
                {t.cart_shipping_calc}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <dt className="font-semibold uppercase tracking-widest text-foreground">
                {t.cart_total}
              </dt>
              <dd className="font-display text-2xl font-bold text-gold">
                {formatAOA(subtotal)}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={checkout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full btn-gold-shine px-6 py-4 text-sm font-bold uppercase tracking-widest"
          >
            {t.cart_checkout}
            <ArrowRight size={16} />
          </button>
          <Link
            href="/loja"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-gold/60 hover:text-gold"
          >
            {t.cart_continue}
          </Link>
        </aside>
      </div>
    </div>
  );
}

function QtyControl({
  qty,
  onMinus,
  onPlus,
}: {
  qty: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div className={cn("inline-flex items-center rounded-lg border border-border bg-surface")}>
      <button
        type="button"
        onClick={onMinus}
        aria-label="Decrease"
        className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:text-gold"
      >
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-sm font-bold">{qty}</span>
      <button
        type="button"
        onClick={onPlus}
        aria-label="Increase"
        className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:text-gold"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
