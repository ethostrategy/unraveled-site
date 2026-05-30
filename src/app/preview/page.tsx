import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Science from "@/components/Science";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

// Hidden internal preview of the full marketing site (not yet public).
export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default function Preview() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Problem />
        <HowItWorks />
        <Features />
        <Science />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
