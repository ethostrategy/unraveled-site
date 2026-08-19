import type { Metadata } from "next";
import Link from "next/link";
import Backdrop from "@/components/Backdrop";
import { LogoMark } from "@/components/Logo";
import QuickExit from "@/components/QuickExit";

/**
 * Public /resources — a vetted list of help + safety resources (crisis lines,
 * domestic-violence/abuse support, and where to find local shelters). The
 * newsletter's "resource worth knowing" section links here.
 *
 * Indexable. Every number and URL is verified current (see VERIFIED below);
 * re-check on each edit and bump the date.
 */

const VERIFIED = "August 2026";

export const metadata: Metadata = {
  title: "Help & Safety Resources",
  description:
    "Vetted help and safety resources: crisis lines, domestic violence and abuse support, sexual assault and mental health hotlines, and where to find local shelters and services. If you or someone you love needs help, start here.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Help & Safety Resources — Unraveled",
    description:
      "Crisis lines, domestic violence and abuse support, and where to find local shelters. If you or someone you love needs help, start here.",
    url: "/resources",
  },
};

type Item = {
  name: string;
  desc: string;
  phone?: string; // display form, e.g. "1-800-799-7233"
  text?: string; // e.g. "Text START to 88788"
  url?: string; // full https URL
  urlLabel?: string; // e.g. "thehotline.org"
};

type Section = { title: string; items: Item[]; emphasis?: boolean };

const SECTIONS: Section[] = [
  {
    title: "In an emergency",
    emphasis: true,
    items: [
      {
        name: "Call 911",
        desc: "If you're in immediate danger, or someone's life is at risk.",
        phone: "911",
      },
    ],
  },
  {
    title: "Domestic violence & abuse",
    items: [
      {
        name: "The National Domestic Violence Hotline",
        desc: "24/7 and confidential. Safety planning and referrals to local shelters.",
        phone: "1-800-799-7233",
        text: "Text START to 88788",
        url: "https://www.thehotline.org",
        urlLabel: "thehotline.org",
      },
      {
        name: "loveisrespect",
        desc: "Dating-abuse support for teens and young adults.",
        phone: "1-866-331-9474",
        text: "Text LOVEIS to 22522",
        url: "https://www.loveisrespect.org",
        urlLabel: "loveisrespect.org",
      },
    ],
  },
  {
    title: "Sexual assault",
    items: [
      {
        name: "RAINN National Sexual Assault Hotline",
        desc: "24/7 and confidential.",
        phone: "1-800-656-4673",
        url: "https://www.rainn.org",
        urlLabel: "rainn.org",
      },
    ],
  },
  {
    title: "Mental health & crisis",
    items: [
      {
        name: "988 Suicide & Crisis Lifeline",
        desc: "Call or text any time, 24/7.",
        phone: "988",
        text: "or text 988",
        url: "https://988lifeline.org",
        urlLabel: "988lifeline.org",
      },
      {
        name: "Crisis Text Line",
        desc: "Free, 24/7 support by text.",
        text: "Text HOME to 741741",
        url: "https://www.crisistextline.org",
        urlLabel: "crisistextline.org",
      },
      {
        name: "SAMHSA National Helpline",
        desc: "Free, confidential treatment referral for substance use and mental health.",
        phone: "1-800-662-4357",
      },
    ],
  },
  {
    title: "Find local help",
    items: [
      {
        name: "211",
        desc: "Local shelters, food, and support in your area.",
        phone: "211",
        url: "https://www.211.org",
        urlLabel: "211.org",
      },
      {
        name: "findhelp.org",
        desc: "Search free and reduced-cost local services by ZIP code.",
        url: "https://www.findhelp.org",
        urlLabel: "findhelp.org",
      },
    ],
  },
];

function telHref(phone: string) {
  return `tel:${phone.replace(/[^0-9]/g, "")}`;
}

function ResourceCard({ item, emphasis }: { item: Item; emphasis?: boolean }) {
  return (
    <div
      className={`glass rounded-2xl p-5 ${
        emphasis ? "ring-1 ring-[#e273ac]/45" : ""
      }`}
    >
      <h3 className="text-[16px] font-semibold text-white">{item.name}</h3>
      <p className="mt-1 text-[14px] leading-relaxed text-white/70">{item.desc}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[14px]">
        {item.phone && (
          <a
            href={telHref(item.phone)}
            className="font-semibold text-spectrum transition-opacity hover:opacity-80"
          >
            {item.phone}
          </a>
        )}
        {item.text && <span className="text-white/80">{item.text}</span>}
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-spectrum transition-opacity hover:opacity-80"
          >
            {item.urlLabel ?? item.url} &rarr;
          </a>
        )}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <div
      className="relative isolate flex min-h-dvh flex-col text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Backdrop />
      <QuickExit />

      {/* slim top bar */}
      <header className="mx-auto flex w-full max-w-3xl items-center px-5 py-6">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <span
            className="text-[1.4rem] italic leading-none text-white"
            style={{ fontFamily: "var(--font-instrument)", letterSpacing: "0.02em" }}
          >
            Unraveled
          </span>
        </Link>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-28">
        {/* hero */}
        <section className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-[#e273ac]">Help &amp; safety</p>
          <h1
            className="mt-3 text-4xl leading-[1.08] text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            Resources
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-white/85">
            If you or someone you love needs help, start here. You&apos;re not alone.
          </p>
          <p className="mx-auto mt-4 max-w-md text-[13.5px] leading-relaxed text-white/55">
            Not safe to be seen on this page? Use{" "}
            <span className="font-semibold text-white/80">Quick exit</span> (top
            right) or press <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[12px]">Esc</kbd>{" "}
            to leave instantly.
          </p>
        </section>

        {/* sections */}
        <div className="mt-14 space-y-12">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <div className="mb-4 flex items-center gap-3">
                <h2
                  className="text-2xl text-white sm:text-[1.7rem]"
                  style={{ fontFamily: "var(--font-instrument)" }}
                >
                  {section.title}
                </h2>
                <span className="h-px flex-1 bg-gradient-to-r from-spectrum-6/50 to-transparent" />
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {section.items.map((item) => (
                  <ResourceCard
                    key={item.name}
                    item={item}
                    emphasis={section.emphasis}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* spectrum hairline */}
        <div className="mx-auto mt-16 h-px w-full max-w-2xl bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />

        {/* footer note */}
        <footer className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-white/55">
          <p>
            This page isn&apos;t emergency or professional care. If you&apos;re in
            danger, call <a href="tel:911" className="text-white/80 hover:text-white">911</a>.
          </p>
          <p className="mt-2">
            Resources verified {VERIFIED}.{" "}
            <Link href="/" className="text-white/70 underline-offset-2 hover:text-white hover:underline">
              Back to unraveleduniverse.com
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
