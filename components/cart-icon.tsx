"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function CartIcon({ className }: { className?: string }) {
  const count = useCart((s) => s.items.reduce((acc, i) => acc + i.qty, 0));
  return (
    <Link
      href="/carrinho"
      aria-label={`Cart (${count})`}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-gold/60 hover:text-gold",
        className,
      )}
    >
      <ShoppingBag size={18} />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-black">
          {count}
        </span>
      )}
    </Link>
  );
}
