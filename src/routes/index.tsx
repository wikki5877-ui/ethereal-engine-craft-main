import { createFileRoute } from "@tanstack/react-router";
import { InkField } from "@/components/InkField";
import { Sculpt3D } from "@/components/Sculpt3D";
import { KineticHeadline } from "@/components/KineticHeadline";
import { Nav } from "@/components/Nav";
import { Marquee } from "@/components/Marquee";
import { PracticeList } from "@/components/PracticeList";
import { Stance } from "@/components/Stance";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] bg-ivory overflow-hidden">
      {/* Ink animation background */}
      <div className="absolute inset-0 z-0">
        <InkField className="absolute inset-0" />
      </div>

      {/* 3D sculpt — твистнутая мраморная колонна, raymarched shader */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <Sculpt3D className="absolute inset-0" />
      </div>

      {/* Gradient veils for legibility */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 40%, color-mix(in oklab, var(--ivory) 75%, transparent) 0%, transparent 70%), linear-gradient(180deg, transparent 60%, var(--ivory) 100%)",
        }}
      />

      {/* Top meta strip */}
      <div className="absolute top-20 md:top-24 inset-x-0 z-20 pointer-events-none">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12 flex items-center justify-between num-badge text-ink/60">
          <span>§ 01 — KANZLEI</span>
          <span className="hidden md:block">N 51°21′ · E 12°23′</span>
          <span>EST. MCMXC</span>
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-20 mx-auto max-w-[1400px] px-5 md:px-12 pt-32 md:pt-56 pb-16 md:pb-20">
        <KineticHeadline />

        <div className="mt-12 md:mt-24 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-6">
            <p
              className="font-display text-ink/85 text-balance"
              style={{ fontSize: "clamp(1rem, 1.45vw, 1.4rem)", fontWeight: 400, lineHeight: 1.45 }}
            >
              Hellmuth &amp; Rühling — eine Leipziger Kanzlei für Mandanten,
              denen{" "}
              <span className="italic" style={{ fontVariationSettings: '"SOFT" 100' }}>
                Diskretion, Präzision
              </span>{" "}
              und Ergebnis gleichermaßen wichtig sind.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <div className="grid grid-cols-3 gap-4 md:gap-6 border-t border-rule pt-5 md:pt-6">
              {[
                ["35+", "Jahre"],
                ["6", "Felder"],
                ["1990", "Gründung"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-ink leading-none" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2.2rem)" }}>
                    {n}
                  </div>
                  <div className="num-badge mt-2">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom corner: scroll cue */}
      <div className="absolute bottom-6 md:bottom-8 inset-x-0 z-20 pointer-events-none">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12 flex items-end justify-between">
          <div className="num-badge text-ink/60 flex items-center gap-3">
            <span className="block h-6 md:h-8 w-px bg-ink/30 animate-pulse" />
            SCROLL · § 02
          </div>
          <div className="hidden md:block num-badge text-ink/60">
            BEWEGEN SIE DEN CURSOR — DAS BILD ANTWORTET
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="bg-ivory">
      <Nav />
      <Hero />
      <Marquee />
      <PracticeList />
      <Stance />
      <Contact />
    </main>
  );
}
