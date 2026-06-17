import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Fraunces,
  Cormorant_Garamond,
  Playfair_Display,
  Outfit,
  Bricolage_Grotesque,
  Unbounded,
  Instrument_Serif,
  Quicksand,
  Comfortaa,
  Baloo_2,
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

// --- Wordmark candidate fonts (used on the /wordmark comparison page) ---
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// --- New candidates: distinctive/ownable + soft/rounded directions ---
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://www.unraveledapp.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Unraveled — Level up every relationship in your life",
    template: "%s · Unraveled",
  },
  description:
    "The universal framework for healthier relationships: romantic, platonic, familial, and the one with yourself. Built to bring you off the screen and into the world.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Unraveled — Level up every relationship in your life",
    description:
      "The universal framework for healthier relationships: romantic, platonic, familial, and the one with yourself.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${cormorant.variable} ${playfair.variable} ${outfit.variable} ${bricolage.variable} ${unbounded.variable} ${instrumentSerif.variable} ${quicksand.variable} ${comfortaa.variable} ${baloo.variable} h-full antialiased`}
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
