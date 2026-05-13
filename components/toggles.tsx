"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useLang } from "./providers";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isLight = mounted && theme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Activate dark mode" : "Activate light mode"}
      className={cn(
        "relative flex h-8 w-14 items-center rounded-full border border-border bg-surface px-1 transition-colors hover:border-gold/60",
        className,
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full bg-gold text-black transition-transform",
          isLight ? "translate-x-6" : "translate-x-0",
        )}
      >
        {isLight ? <Sun size={14} /> : <Moon size={14} />}
      </span>
    </button>
  );
}

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-border bg-surface p-0.5 text-xs font-medium",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setLang("pt")}
        aria-pressed={lang === "pt"}
        className={cn(
          "rounded-full px-3 py-1 transition-colors",
          lang === "pt"
            ? "bg-gold text-black"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "rounded-full px-3 py-1 transition-colors",
          lang === "en"
            ? "bg-gold text-black"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        EN
      </button>
    </div>
  );
}
