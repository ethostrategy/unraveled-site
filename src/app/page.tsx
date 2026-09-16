import Backdrop from "@/components/Backdrop";
import EntranceVeil from "@/components/EntranceVeil";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Pyramid from "@/components/Pyramid";
import LockedWorld from "@/components/LockedWorld";
import JoinBand from "@/components/JoinBand";
import Footer from "@/components/Footer";
import ShareDialog from "@/components/ShareDialog";

/**
 * The public homepage. Previously this was a splash "door" that gated the whole
 * site behind an email wall; now the full marketing site is public and the
 * signup lives inside it (Hero + JoinBand). The old "being let in" reveal is
 * preserved as a one-time <EntranceVeil/> flourish — a moment, not a gate.
 */
export default function Home() {
  return (
    <div
      className="relative isolate flex min-h-dvh flex-col text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <EntranceVeil />
      <Backdrop />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Pyramid />
        <LockedWorld />
        <JoinBand />
      </main>
      <Footer />
      <ShareDialog />
    </div>
  );
}
