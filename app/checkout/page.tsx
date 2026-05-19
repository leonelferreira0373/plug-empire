"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Lock,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useLang } from "@/components/providers";
import { dict } from "@/lib/i18n";
import { cn, formatEUR } from "@/lib/utils";
import { calcShipping } from "@/lib/order";

const COUNTRIES_PT = [
  "Portugal",
  "Espanha",
  "França",
  "Reino Unido",
  "Suíça",
  "Alemanha",
  "Itália",
  "Holanda",
  "Bélgica",
  "Luxemburgo",
  "Irlanda",
  "Outro",
];

export default function CheckoutPage() {
  const { lang } = useLang();
  const t = dict[lang];
  const router = useRouter();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    country: "Portugal",
    notes: "",
  });

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const shipping = mounted
    ? calcShipping(form.country, form.postcode, subtotal)
    : 0;
  const total = subtotal + shipping;

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError(lang === "pt" ? "Carrinho vazio." : "Cart is empty.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          lines: items.map((i) => ({
            slug: i.slug,
            name: i.name,
            price: i.price,
            qty: i.qty,
            size: i.size,
            color: i.color,
            image: i.image,
          })),
          shipping,
          lang,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Erro inesperado");
        setSubmitting(false);
        return;
      }
      // Store last order for the success page
      sessionStorage.setItem(
        "plug-empire-last-order",
        JSON.stringify({
          ref: data.ref,
          total: data.total,
          iban: data.iban,
          beneficiary: data.beneficiary,
          bic: data.bic,
          email: form.email,
        }),
      );
      clear();
      router.push(`/pedido/sucesso?ref=${encodeURIComponent(data.ref)}`);
    } catch (err) {
      console.error(err);
      setError(
        lang === "pt"
          ? "Falha de ligação. Tenta de novo."
          : "Connection failed. Try again.",
      );
      setSubmitting(false);
    }
  }

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Checkout</h1>
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
          {lang === "pt" ? "Carrinho vazio" : "Empty cart"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {lang === "pt"
            ? "Adiciona produtos antes de avançar para checkout."
            : "Add products before going to checkout."}
        </p>
        <Link
          href="/loja"
          className="mt-8 inline-flex items-center gap-2 rounded-full btn-gold-shine px-8 py-4 text-sm font-bold uppercase tracking-widest"
        >
          {lang === "pt" ? "Ver loja" : "Browse shop"}
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/carrinho"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
      >
        <ArrowLeft size={14} />
        {lang === "pt" ? "Voltar ao carrinho" : "Back to cart"}
      </Link>

      <div className="mt-6 border-b border-border pb-6">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Stravages
        </div>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
          Checkout
        </h1>
      </div>

      <form
        onSubmit={submit}
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]"
      >
        {/* Customer details */}
        <div className="space-y-8">
          <Section title={lang === "pt" ? "Contacto" : "Contact"}>
            <Field
              label={lang === "pt" ? "Nome completo" : "Full name"}
              required
              value={form.name}
              onChange={(v) => update("name", v)}
              autoComplete="name"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(v) => update("email", v)}
                autoComplete="email"
              />
              <Field
                label={lang === "pt" ? "Telemóvel" : "Phone"}
                type="tel"
                required
                value={form.phone}
                onChange={(v) => update("phone", v)}
                autoComplete="tel"
              />
            </div>
          </Section>

          <Section title={lang === "pt" ? "Morada de entrega" : "Shipping address"}>
            <Field
              label={lang === "pt" ? "Morada (rua, número, andar)" : "Address line"}
              required
              value={form.address}
              onChange={(v) => update("address", v)}
              autoComplete="street-address"
            />
            <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
              <Field
                label={lang === "pt" ? "Cidade" : "City"}
                required
                value={form.city}
                onChange={(v) => update("city", v)}
                autoComplete="address-level2"
              />
              <Field
                label={lang === "pt" ? "Código postal" : "Postcode"}
                required
                value={form.postcode}
                onChange={(v) => update("postcode", v)}
                autoComplete="postal-code"
              />
            </div>
            <SelectField
              label={lang === "pt" ? "País" : "Country"}
              value={form.country}
              onChange={(v) => update("country", v)}
              options={COUNTRIES_PT}
            />
            <Field
              label={lang === "pt" ? "Notas (opcional)" : "Notes (optional)"}
              value={form.notes}
              onChange={(v) => update("notes", v)}
              textarea
            />
          </Section>

          <div className="rounded-2xl border border-border bg-surface/40 p-5">
            <div className="flex items-start gap-3 text-sm">
              <Lock size={16} className="mt-0.5 shrink-0 text-gold" />
              <div className="text-muted-foreground">
                {lang === "pt"
                  ? "Pagamento por transferência bancária. Após confirmares, recebes por email o IBAN e a referência para concluir o pagamento. Os teus dados nunca são partilhados."
                  : "Bank transfer payment. Once confirmed, you'll receive the IBAN and reference by email. Your data is never shared."}
              </div>
            </div>
          </div>
        </div>

        {/* Order summary (sticky on desktop) */}
        <aside className="h-fit space-y-5 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-border bg-surface/40 p-6">
            <h2 className="font-display text-base uppercase tracking-widest text-gold">
              {lang === "pt" ? "Resumo" : "Summary"}
            </h2>
            <ul className="mt-5 space-y-4 border-b border-border pb-5">
              {items.map((item, i) => (
                <li key={`${item.slug}-${i}`} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-surface">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-black">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {item.name}
                    </span>
                    {(item.size || item.color) && (
                      <span className="text-xs text-muted-foreground">
                        {[item.size, item.color].filter(Boolean).join(" · ")}
                      </span>
                    )}
                    <span className="mt-auto font-display text-sm font-bold text-gold">
                      {formatEUR(item.price * item.qty)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">{t.cart_subtotal}</dt>
                <dd className="font-display text-base font-bold">
                  {formatEUR(subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">{t.cart_shipping}</dt>
                <dd className="text-sm">
                  {shipping === 0
                    ? lang === "pt"
                      ? "Grátis"
                      : "Free"
                    : formatEUR(shipping)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <dt className="font-semibold uppercase tracking-widest text-foreground">
                  Total
                </dt>
                <dd className="font-display text-2xl font-bold text-gold">
                  {formatEUR(total)}
                </dd>
              </div>
            </dl>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-full btn-gold-shine px-6 py-4 text-sm font-bold uppercase tracking-widest transition-opacity",
              submitting && "opacity-60",
            )}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {lang === "pt" ? "A enviar..." : "Sending..."}
              </>
            ) : (
              <>
                {lang === "pt" ? "Confirmar encomenda" : "Place order"}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-base uppercase tracking-widest text-gold">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  autoComplete,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  textarea?: boolean;
}) {
  const props = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    required,
    autoComplete,
    className:
      "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold",
  };
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </span>
      {textarea ? (
        <textarea rows={3} {...props} />
      ) : (
        <input type={type} {...props} />
      )}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
        <span className="ml-1 text-gold">*</span>
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
