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
    default: "Plug Empire — Streetwear Premium · Luanda",
    template: "%s · Plug Empire",
  },
  description:
    "Plug Empire — streetwear premium nascido em Luanda. Tocas, balaclavas, fatos e carteiras em couro. Envio para toda Angola.",
  metadataBase: new URL("https://plugempire.com"),
  openGraph: {
    title: "Plug Empire — Streetwear Premium",
    description: "Todo o sonho é possível. Basta acreditar.",
    type: "website",
    locale: "pt_AO",
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
