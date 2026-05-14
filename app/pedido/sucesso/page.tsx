"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Copy, Mail } from "lucide-react";
import { useLang } from "@/components/providers";
import { formatEUR } from "@/lib/utils";

type StoredOrder = {
  ref: string;
  total: number;
  iban: string;
  beneficiary: string;
  bic?: string | null;
  email: string;
};

export default function OrderSuccessPage() {
  return (
    <React.Suspense fallback={<Skeleton />}>
      <Inner />
    </React.Suspense>
  );
}

function Skeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <h1 className="font-display text-4xl">…</h1>
    </div>
  );
}

function Inner() {
  const { lang } = useLang();
  const params = useSearchParams();
  const refParam = params.get("ref");

  const [order, setOrder] = React.useState<StoredOrder | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("plug-empire-last-order");
    if (raw) {
      try {
        setOrder(JSON.parse(raw));
      } catch {}
    }
  }, []);

  if (!mounted) return <Skeleton />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold">
        <Check size={36} />
      </div>
      <h1 className="mt-8 font-display text-4xl tracking-tight sm:text-5xl">
        {lang === "pt" ? "Encomenda recebida!" : "Order received!"}
      </h1>
      <p className="mt-3 text-base text-muted-foreground sm:text-lg">
        {lang === "pt"
          ? "Obrigado pela tua compra. Para concluir, falta só a transferência."
          : "Thanks for your order. To complete it, all that's left is the bank transfer."}
      </p>

      <div className="mt-10 rounded-2xl border border-gold/40 bg-surface/60 p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {lang === "pt" ? "Referência da encomenda" : "Order reference"}
        </div>
        <div className="mt-2 font-mono text-3xl tracking-wider text-foreground sm:text-4xl">
          {order?.ref ?? refParam ?? "—"}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {lang === "pt"
            ? "Inclui esta referência na transferência para podermos identificar o teu pagamento."
            : "Include this reference in your transfer so we can identify your payment."}
        </p>
      </div>

      {order && (
        <div className="mt-6 rounded-2xl border border-border bg-surface/40 p-8">
          <h2 className="font-display text-lg uppercase tracking-widest text-gold">
            {lang === "pt" ? "Dados para transferência" : "Bank details"}
          </h2>
          <dl className="mt-5 grid gap-4">
            <Row label={lang === "pt" ? "Beneficiário" : "Beneficiary"} value={order.beneficiary} />
            <Row label="IBAN" value={order.iban} mono copyable />
            {order.bic && <Row label="BIC / SWIFT" value={order.bic} mono copyable />}
            <Row
              label={lang === "pt" ? "Montante" : "Amount"}
              value={formatEUR(order.total)}
              highlight
            />
            <Row label={lang === "pt" ? "Referência" : "Reference"} value={order.ref} mono copyable />
          </dl>
        </div>
      )}

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-surface/40 p-5 text-sm">
        <Mail size={18} className="mt-0.5 shrink-0 text-gold" />
        <div className="text-muted-foreground">
          {lang === "pt" ? (
            <>
              Enviámos uma confirmação para <strong className="text-foreground">{order?.email}</strong> com todos estes dados.
              Quando a transferência chegar, preparamos o envio e avisamos.
            </>
          ) : (
            <>
              We've sent a confirmation to <strong className="text-foreground">{order?.email}</strong> with all these details.
              Once the transfer lands, we'll ship and let you know.
            </>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/loja"
          className="inline-flex items-center justify-center gap-2 rounded-full btn-gold-shine px-8 py-4 text-sm font-bold uppercase tracking-widest"
        >
          {lang === "pt" ? "Continuar a comprar" : "Keep shopping"}
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-medium uppercase tracking-widest text-foreground transition-colors hover:border-gold/60 hover:text-gold"
        >
          {lang === "pt" ? "Voltar ao início" : "Back home"}
        </Link>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  copyable,
  highlight,
}: {
  label: string;
  value: string;
  mono?: boolean;
  copyable?: boolean;
  highlight?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);

  function copy() {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="flex items-center gap-2">
        <span
          className={
            (mono ? "font-mono text-sm sm:text-base " : "text-sm sm:text-base ") +
            (highlight ? "font-display text-xl font-bold text-gold " : "text-foreground ")
          }
        >
          {value}
        </span>
        {copyable && (
          <button
            type="button"
            onClick={copy}
            aria-label="Copy"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-gold hover:text-gold"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        )}
      </dd>
    </div>
  );
}
