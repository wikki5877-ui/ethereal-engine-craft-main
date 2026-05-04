export function Stance() {
  const tenets = [
    {
      no: "I",
      kicker: "VERTRAUEN",
      body: "Ein Mandat beginnt nicht mit einem Vertrag, sondern mit einem Gespräch. Wir hören zu, bevor wir antworten.",
    },
    {
      no: "II",
      kicker: "PRÄZISION",
      body: "Jede Akte wird gelesen — nicht überflogen. Jeder Satz im Schriftsatz wiegt.",
    },
    {
      no: "III",
      kicker: "ERGEBNIS",
      body: "Wir messen unsere Arbeit nicht in Stunden, sondern in dem, was am Ende für Sie steht.",
    },
  ];

  return (
    <section id="haltung" className="relative bg-ivory text-ink">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-24 md:py-48">
        <div className="flex items-baseline justify-between mb-20">
          <div className="flex items-baseline gap-6">
            <span className="num-badge">§ 03 — HALTUNG</span>
            <span className="hidden md:block h-px w-32 bg-rule" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 md:col-span-5">
            <p
              className="font-display text-balance leading-[1.05]"
              style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)", fontWeight: 400 }}
            >
              Drei Sätze, an denen wir uns seit{" "}
              <span className="italic text-ochre-deep" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
                fünfunddreißig Jahren
              </span>{" "}
              messen lassen.
            </p>
          </div>

          <div className="col-span-12 md:col-span-7 grid grid-cols-1 gap-px bg-rule">
            {tenets.map((t) => (
              <article
                key={t.no}
                className="bg-ivory p-6 md:p-12 group relative overflow-hidden"
              >
                <div className="flex items-baseline justify-between mb-5 md:mb-6">
                  <span
                    className="font-display italic text-ochre-deep"
                    style={{ fontSize: "1.8rem", fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
                  >
                    {t.no}
                  </span>
                  <span className="num-badge">{t.kicker}</span>
                </div>
                <p className="font-display text-pretty text-ink/90 leading-snug" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.55rem)", fontWeight: 400 }}>
                  {t.body}
                </p>
                <span className="absolute left-0 bottom-0 h-px w-0 bg-ochre group-hover:w-full transition-all duration-1000 ease-out" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
