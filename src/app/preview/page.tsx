import Backdrop from "@/components/Backdrop";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Pyramid from "@/components/Pyramid";
import LockedWorld from "@/components/LockedWorld";
import Founders from "@/components/Founders";
// import Media from "@/components/Media"; // hidden until the live IG feed is wired
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ShareDialog from "@/components/ShareDialog";

// The full marketing site. Served at the clean root "/" for members via a
// middleware rewrite; the /preview route itself redirects to "/".
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
        <Pyramid />
        <Founders />
        <LockedWorld />
        {/* <Media /> — hidden until the live IG feed is wired (re-add this + the import above) */}
        <CTA />
      </main>
      <Footer />
      <ShareDialog />
    </div>
  );
}
