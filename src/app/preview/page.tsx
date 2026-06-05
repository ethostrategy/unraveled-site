import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Pyramid from "@/components/Pyramid";
import WhyDifferent from "@/components/WhyDifferent";
import ProductGlimpse from "@/components/ProductGlimpse";
import LockedWorld from "@/components/LockedWorld";
import Founders from "@/components/Founders";
import Media from "@/components/Media";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ShareDialog from "@/components/ShareDialog";

// Hidden internal preview of the full marketing site (not yet public).
export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default function Preview() {
  return (
    <div
      className="relative isolate flex min-h-dvh flex-col text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Backdrop />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Pyramid />
        <ProductGlimpse />
        <LockedWorld />
        <Founders />
        <WhyDifferent />
        <Media />
        <CTA />
      </main>
      <Footer />
      <ShareDialog />
    </div>
  );
}
