"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/providers";

export default function NotFound() {
  const { lang } = useLang();
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
      <div className="font-display text-[120px] leading-none text-gold sm:text-[180px]">
        404
      </div>
      <h1 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">
        {lang === "pt"
          ? "Esta página voou para a colmeia."
          : "This page flew back to the hive."}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {lang === "pt"
          ? "Não encontramos o que procuras — mas a loja continua aberta."
          : "We couldn't find what you're looking for — but the shop is still open."}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full btn-gold-shine px-8 py-4 text-sm font-bold uppercase tracking-widest"
      >
        {lang === "pt" ? "Voltar ao início" : "Back home"}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
