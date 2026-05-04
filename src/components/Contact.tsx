export function Contact() {
  return (
    <section id="kontakt" className="relative bg-graphite text-ivory overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-24 md:py-48 relative">
        <div className="flex items-baseline justify-between mb-16">
          <div className="flex items-baseline gap-6">
            <span className="num-badge text-ivory/60">§ 04 — KONTAKT</span>
            <span className="hidden md:block h-px w-32 bg-ivory/20" />
          </div>
          <span className="num-badge text-ivory/60 hidden md:block">LEIPZIG · 04155</span>
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-16 items-end mb-24">
          <div className="col-span-12 md:col-span-8">
            <h2
              className="font-display leading-[0.92] text-balance"
              style={{ fontSize: "clamp(2.8rem, 8vw, 8rem)", fontWeight: 400 }}
            >
              Sprechen wir.{" "}
              <span className="italic text-ochre" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
                Kostenfrei.
              </span>{" "}
              Diskret.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="text-ivory/70 text-base leading-relaxed max-w-sm">
              Erste telefonische Einschätzung Ihrer Situation —
              unverbindlich, vertraulich, ohne Klauseln im Kleingedruckten.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-ivory/15">
          {[
            { k: "TELEFON", v: "0341 — 593 39 30", href: "tel:+493415933930" },
            { k: "E-MAIL", v: "kanzlei@hellmuth-ruehling.de", href: "mailto:kanzlei@hellmuth-ruehling.de" },
            { k: "BÜRO", v: "Lützowstraße 19 · 04155 Leipzig" },
          ].map((c) => (
            <a
              key={c.k}
              href={c.href ?? "#"}
              className="group relative py-8 md:py-14 px-0 md:px-6 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-ivory/15 block"
            >
              <div className="num-badge text-ivory/50 mb-4 md:mb-6">{c.k}</div>
              <div
                className="font-display text-ivory leading-tight transition-transform duration-500 group-hover:translate-x-2 break-words"
                style={{ fontSize: "clamp(1.2rem, 2.2vw, 2rem)", fontWeight: 400 }}
              >
                {c.v}
              </div>
              <span className="absolute left-0 bottom-0 h-px w-0 bg-ochre group-hover:w-full transition-all duration-700" />
            </a>
          ))}
        </div>

        {/* Big CTA */}
        <div className="mt-16 md:mt-32 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-8">
          <a
            href="tel:+493415933930"
            className="group inline-flex items-center justify-between md:justify-start gap-6 border border-ivory px-6 md:px-8 py-5 md:py-6 hover:bg-ochre hover:border-ochre hover:text-ink transition-colors duration-500"
          >
            <span className="font-display text-xl md:text-3xl">Erstgespräch anfragen</span>
            <span className="font-mono text-xs tracking-micro uppercase">→</span>
          </a>
          <p className="num-badge text-ivory/50 max-w-xs">
            Mo — Fr · 09:00 — 18:00 · Termine ausserhalb der Bürozeiten nach Vereinbarung
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-ivory/15">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4 num-badge text-ivory/50">
          <span>© {new Date().getFullYear()} HELLMUTH &amp; RÜHLING · RECHTSANWÄLTE</span>
          <span>IMPRESSUM · DATENSCHUTZ · MADE IN LEIPZIG</span>
        </div>
      </div>
    </section>
  );
}
