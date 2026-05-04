import { useEffect, useRef, useState } from "react";

const PRACTICES = [
  { no: "01", de: "Strafrecht",          en: "Criminal Defense",  desc: "Verteidigung mit Präzision — von der ersten Vernehmung bis zur Revision." },
  { no: "02", de: "Familienrecht",       en: "Family Law",         desc: "Scheidung, Sorgerecht, Unterhalt — diskret und entschieden." },
  { no: "03", de: "Verkehrsrecht",       en: "Traffic Law",        desc: "Bußgeld, Führerschein, Unfallregulierung — schnell und bestimmt." },
  { no: "04", de: "Mietrecht",           en: "Tenancy Law",        desc: "Für Mieter und Vermieter. Klare Verhältnisse, klare Verträge." },
  { no: "05", de: "Erbrecht",            en: "Inheritance Law",    desc: "Testament, Pflichtteil, Nachlass — Klarheit für die nächste Generation." },
  { no: "06", de: "Arbeitsrecht",        en: "Employment Law",     desc: "Kündigung, Abfindung, Vertragsgestaltung. Auf der Seite der Vernunft." },
];

export function PracticeList() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="rechtsgebiete" className="relative bg-ivory text-ink">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-24 md:py-48">
        <div className="flex items-baseline justify-between mb-14 md:mb-32">
          <div className="flex items-baseline gap-4 md:gap-6">
            <span className="num-badge">§ 02 — PRAXIS</span>
            <span className="hidden md:block h-px w-32 bg-rule" />
          </div>
          <span className="num-badge hidden md:block">SECHS FELDER</span>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sticky display */}
          <div className="hidden lg:block col-span-5 sticky top-32 self-start h-[60vh]">
            <div className="relative h-full">
              {PRACTICES.map((p, i) => (
                <div
                  key={p.no}
                  className="absolute inset-0 flex flex-col justify-center transition-all duration-700"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: `translateY(${active === i ? 0 : 20}px)`,
                  }}
                >
                  <div className="num-badge mb-6">FELD {p.no}</div>
                  <div
                    className="font-display italic text-ochre-deep leading-none mb-8"
                    style={{ fontSize: "clamp(4rem, 9vw, 9rem)", fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
                  >
                    {p.en}
                  </div>
                  <p className="font-sans-tight text-graphite/80 max-w-md text-lg leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {PRACTICES.map((p, i) => (
              <div
                key={p.no}
                ref={(el) => { itemRefs.current[i] = el; }}
                data-idx={i}
                onMouseEnter={() => setActive(i)}
                className="group relative border-t border-rule last:border-b py-7 md:py-14 cursor-pointer transition-colors"
              >
                <div className="grid grid-cols-12 gap-3 md:gap-4 items-baseline">
                  <span className="num-badge col-span-2">{p.no}</span>
                  <h3
                    className="col-span-10 font-display leading-[0.95] text-balance transition-all duration-500"
                    style={{
                      fontSize: "clamp(1.7rem, 5.5vw, 4.5rem)",
                      fontWeight: 400,
                      color: active === i ? "var(--ink)" : "oklch(0.22 0.012 250 / 0.45)",
                      transform: active === i ? "translateX(8px)" : "translateX(0)",
                    }}
                  >
                    {p.de}
                  </h3>
                </div>
                {/* mobile description */}
                <p className="lg:hidden mt-3 ml-[16.6%] pr-2 text-sm text-graphite/70 leading-relaxed">
                  {p.desc}
                </p>
                {/* hover ochre rule */}
                <span
                  className="absolute left-0 right-0 bottom-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 bg-ochre"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
