import type { Metadata } from "next";
import { Syne, DM_Sans, Syne_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const syneMono = Syne_Mono({
  variable: "--font-syne-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://starfm-two.vercel.app"),
  title: "Star FM 102.9 | For The Brighter Side Of You — Klerksdorp Community Radio",
  description:
    "Star FM 102.9 MHz — Klerksdorp's community radio station. Live streaming 24/7 across the Southern District of North West Province. Digital literacy, community voices, and African excellence.",
  keywords: [
    "Star FM",
    "Star FM 102.9",
    "Klerksdorp radio",
    "North West Province radio",
    "community radio South Africa",
    "Matlosana radio",
    "live stream radio",
    "digital literacy radio",
  ],
  authors: [{ name: "Star FM 102.9" }],
  icons: {
    icon: "/starfm-logo-square.png",
    apple: "/starfm-logo-square.png",
  },
  openGraph: {
    title: "Star FM 102.9 | For The Brighter Side Of You",
    description:
      "Klerksdorp's community radio station. Broadcasting empowerment, digital literacy, and African excellence across North West Province.",
    url: "https://starfm-two.vercel.app",
    siteName: "Star FM 102.9",
    type: "website",
    images: [{ url: "/starfm-logo-full.png", width: 1200, height: 848 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Star FM 102.9 | For The Brighter Side Of You",
    description:
      "Klerksdorp's community radio station — live 24/7 across North West Province.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} ${syneMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
