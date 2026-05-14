"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BrandMark } from "./brand-mark";
import { LangToggle, ThemeToggle } from "./toggles";
import { CartIcon } from "./cart-icon";
import { useLang } from "./providers";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Header() {
  const { lang } = useLang();
  const t = dict[lang];
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Hide header on Studio
  if (pathname?.startsWith("/studio")) return null;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/loja", label: t.nav_shop },
    { href: "/sobre", label: t.nav_about },
    { href: "/contacto", label: t.nav_contact },
  ];

  return (
    <>
      <div className="border-b border-border bg-black text-[10px] font-medium tracking-[0.22em] text-gold/90 uppercase">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center">
          {lang === "pt"
            ? "Envio para toda Portugal · Pagamento seguro via WhatsApp"
            : "Shipping across Portugal · Secure checkout via WhatsApp"}
        </div>
      </div>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-colors backdrop-blur",
          scrolled
            ? "border-border bg-background/85"
            : "border-transparent bg-background/40",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <BrandMark />
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LangToggle className="hidden sm:flex" />
            <ThemeToggle className="hidden sm:flex" />
            <CartIcon />
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobileOpen((s) => !s)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground md:hidden"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface hover:text-gold"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-3 px-3 pt-2">
                <LangToggle />
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
