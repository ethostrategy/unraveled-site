import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
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

const siteUrl = "https://unraveled.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Unraveled — Know you're ready for love that lasts",
    template: "%s · Unraveled",
  },
  description:
    "Unraveled is the relationship readiness and emotional-health app that helps you understand your patterns, heal what holds you back, and walk into your next relationship clear and ready.",
  keywords: [
    "relationship readiness",
    "emotional health",
    "relationship app",
    "self-discovery",
    "attachment",
    "dating readiness",
    "mental wellness",
  ],
  authors: [{ name: "Unraveled" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Unraveled — Know you're ready for love that lasts",
    description:
      "Understand your patterns, heal what holds you back, and show up ready. The relationship readiness and emotional-health app.",
    siteName: "Unraveled",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unraveled — Know you're ready for love that lasts",
    description:
      "The relationship readiness and emotional-health app. Understand your patterns, heal what holds you back, show up ready.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
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
