"use client";

import Image from "next/image";
import { Mail, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { useLang } from "@/components/providers";
import { dict } from "@/lib/i18n";
import { BRAND, whatsappUrl } from "@/lib/config";
import type { ContactContent } from "@/lib/site-content";

export function ContactoClient({
  content,
}: {
  content: ContactContent | null;
}) {
  const { lang } = useLang();
  const t = dict[lang];

  const headline =
    (lang === "pt" ? content?.headlinePT : content?.headlineEN) ?? t.contact_title;
  const intro =
    (lang === "pt" ? content?.introPT : content?.introEN) ??
    (lang === "pt"
      ? "Atendimento direto da casa. Encomendas, dúvidas sobre tamanhos, parcerias — escolhe o canal."
      : "Direct from the house. Orders, sizing questions, partnerships — pick a channel.");

  const email = content?.email ?? BRAND.email;
  const whatsapp = content?.whatsapp ?? BRAND.whatsapp;
  const igMain = content?.instagramMain ?? BRAND.instagram_main;
  const linktree = content?.linktree ?? BRAND.linktree;
  const address = content?.address ?? BRAND.address;
  const hours =
    (lang === "pt" ? content?.hoursPT : content?.hoursEN) ??
    (lang === "pt"
      ? "Respondemos via WhatsApp todos os dias, das 09h às 22h (hora de Lisboa). Para encomendas urgentes, menciona na primeira mensagem."
      : "We reply on WhatsApp every day, 9 AM to 10 PM (Lisbon time). For urgent orders, mention it in your first message.");

  const channels = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value:
        lang === "pt"
          ? "Resposta rápida — atendimento de loja"
          : "Fast reply — store support",
      href: `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        lang === "pt"
          ? "Olá! Vim do site Stravages."
          : "Hi! I came from the Stravages site.",
      )}`,
      cta: lang === "pt" ? "Falar agora" : "Chat now",
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      cta: lang === "pt" ? "Enviar email" : "Send email",
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: `@${igMain}`,
      href: `https://instagram.com/${igMain}`,
      cta: lang === "pt" ? "Ver perfil" : "View profile",
    },
    {
      icon: ExternalLink,
      label: "Linktree",
      value: linktree.replace(/^https?:\/\//, ""),
      href: linktree,
      cta: lang === "pt" ? "Abrir" : "Open",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
        Stravages
      </div>
      <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
        {headline}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
        {intro}
      </p>

      <div className="mt-12 grid gap-3 sm:gap-4">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/40 p-5 transition-colors hover:border-gold/60 hover:bg-surface"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-black">
              <c.icon size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {c.label}
              </div>
              <div className="mt-1 truncate text-base font-semibold text-foreground">
                {c.value}
              </div>
            </div>
            <span className="hidden text-xs font-bold uppercase tracking-widest text-gold sm:inline-flex">
              {c.cta} →
            </span>
          </a>
        ))}
      </div>

      <div className="mt-12 flex items-center gap-3 rounded-2xl border border-border bg-surface/40 p-5 text-sm text-muted-foreground">
        <MapPin size={18} className="shrink-0 text-gold" />
        <span>
          {lang === "pt"
            ? `Operação: ${address}. Sourcing internacional em USA, Emirados, Turquia e Namíbia.`
            : `Based in ${address}. International sourcing across USA, UAE, Turkey and Namibia.`}
        </span>
      </div>

      <div className="relative mt-16 overflow-hidden rounded-2xl border border-border bg-black p-8 sm:p-12">
        <div className="absolute -right-12 -top-12 h-64 w-64 opacity-10">
          <Image src="/brand/bee.png" alt="" fill className="object-contain" />
        </div>
        <div className="relative">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {lang === "pt" ? "Horário de resposta" : "Response hours"}
          </div>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {hours}
          </p>
        </div>
      </div>
    </div>
  );
}
