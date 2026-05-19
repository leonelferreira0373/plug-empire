"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon } from "./icons";
import { useLang } from "./providers";
import { LangToggle, ThemeToggle } from "./toggles";
import { dict } from "@/lib/i18n";
import { BRAND, whatsappUrl } from "@/lib/config";

export function Footer() {
  const { lang } = useLang();
  const t = dict[lang];
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname?.startsWith("/studio")) return null;

  return (
    <footer className="gold-divider-top bg-black text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/brand/bee.png"
                  alt="Stravages"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-display text-2xl tracking-[0.2em] font-bold">
                  STRAVAGES
                </div>
                <div className="text-xs text-muted-foreground tracking-wider">
                  EST. {BRAND.founded} · LISBOA
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {t.footer_tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`https://instagram.com/${BRAND.instagram_main}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Stravages on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={whatsappUrl(
                  lang === "pt"
                    ? "Olá, vim do vosso site."
                    : "Hi, I came from your site.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <Mail size={18} />
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Shop */}
          <div>
            <div className="font-display text-sm tracking-[0.22em] text-gold uppercase">
              {t.footer_shop}
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/loja"
                  className="text-foreground/80 transition-colors hover:text-gold"
                >
                  {t.catalog_filter_all}
                </Link>
              </li>
              <li>
                <Link
                  href="/loja?cat=tocas"
                  className="text-foreground/80 transition-colors hover:text-gold"
                >
                  {lang === "pt" ? "Tocas" : "Beanies"}
                </Link>
              </li>
              <li>
                <Link
                  href="/loja?cat=balaclavas"
                  className="text-foreground/80 transition-colors hover:text-gold"
                >
                  {lang === "pt" ? "Balaclavas" : "Balaclavas"}
                </Link>
              </li>
              <li>
                <Link
                  href="/loja?cat=carteiras"
                  className="text-foreground/80 transition-colors hover:text-gold"
                >
                  {lang === "pt" ? "Carteiras" : "Wallets"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand / About */}
          <div>
            <div className="font-display text-sm tracking-[0.22em] text-gold uppercase">
              {t.footer_brand}
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/sobre"
                  className="text-foreground/80 transition-colors hover:text-gold"
                >
                  {t.footer_about}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-foreground/80 transition-colors hover:text-gold"
                >
                  {t.footer_contact}
                </Link>
              </li>
              <li>
                <a
                  href={BRAND.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 transition-colors hover:text-gold"
                >
                  Linktree
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-display text-sm tracking-[0.22em] text-gold uppercase">
              {t.footer_legal}
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/legal/privacidade"
                  className="text-foreground/80 transition-colors hover:text-gold"
                >
                  {t.footer_privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/termos"
                  className="text-foreground/80 transition-colors hover:text-gold"
                >
                  {t.footer_terms}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/devolucoes"
                  className="text-foreground/80 transition-colors hover:text-gold"
                >
                  {t.footer_returns}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/envios"
                  className="text-foreground/80 transition-colors hover:text-gold"
                >
                  {t.footer_shipping_policy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{BRAND.address}</span>
          </div>
          <div>
            © {year} Stravages. {t.footer_rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
