import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Fraunces,
  Outfit,
  Newsreader,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Apex is the canonical host (www → apex redirect lives in Netlify).
const siteUrl = "https://unraveleduniverse.com";

const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Unraveled — Level up every relationship in your life",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Unraveled — Level up every relationship in your life",
    template: "%s · Unraveled",
  },
  description:
    "The universal framework for healthier relationships: romantic, platonic, familial, and the one with yourself. Built to bring you off the screen and into the world.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "healthy relationships",
    "relationship skills",
    "relationship framework",
    "platonic relationships",
    "family relationships",
    "communication",
    "emotional health",
    "connection",
  ],
  authors: [{ name: "Unraveled" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Unraveled — Level up every relationship in your life",
    description:
      "The universal framework for healthier relationships: romantic, platonic, familial, and the one with yourself.",
    siteName: "Unraveled",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unraveled — Level up every relationship in your life",
    description:
      "The universal framework for healthier relationships: romantic, platonic, familial, and the one with yourself.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${outfit.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0926] text-white">
        {/* Mark JS-enabled before paint so reveal animations only apply with JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
