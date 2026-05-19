"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  showWordmark = true,
  size = 32,
}: {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 group", className)}>
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src="/brand/bee.png"
          alt="Stravages"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showWordmark && (
        <span className="font-display text-xl tracking-[0.18em] font-bold text-foreground group-hover:text-gold transition-colors">
          STRAVAGES
        </span>
      )}
    </Link>
  );
}
