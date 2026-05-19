import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stravages — Streetwear Premium · Lisboa",
    template: "%s · Stravages",
  },
  description:
    "Stravages — streetwear premium nascido em Lisboa. Tocas, balaclavas e acessórios. Envio para todo Portugal.",
  metadataBase: new URL("https://plug-empire.vercel.app"),
  openGraph: {
    title: "Stravages — Streetwear Premium",
    description: "Nascido no risco. Movido pela visão.",
    type: "website",
    locale: "pt_PT",
  },
  icons: {
    icon: "/brand/bee.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
