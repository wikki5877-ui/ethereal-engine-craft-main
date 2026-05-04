import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links: Array<[string, string]> = [
    ["Praxis", "#rechtsgebiete"],
    ["Haltung", "#haltung"],
    ["Kontakt", "#kontakt"],
  ];

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled || open ? "color-mix(in oklab, var(--ivory) 92%, transparent)" : "transparent",
        backdropFilter: scrolled || open ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled || open ? "1px solid var(--rule)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" onClick={() => setOpen(false)} className="flex items-baseline gap-3">
          <span className="font-display text-lg md:text-xl text-ink leading-none">
            H<span className="italic text-ochre-deep">&amp;</span>R
          </span>
          <span className="hidden sm:block num-badge">RECHTSANWÄLTE · LEIPZIG</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="link-underline text-sm tracking-wide text-ink/80 hover:text-ink">
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#kontakt"
          className="hidden md:inline-flex group items-center gap-3 border border-ink/80 px-4 py-2 text-xs tracking-micro uppercase hover:bg-ink hover:text-ivory transition-colors duration-500"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ochre group-hover:bg-ivory transition-colors" />
          Erstgespräch
        </a>

        {/* Burger */}
        <button
          aria-label="Menü"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden relative w-10 h-10 -mr-2 flex items-center justify-center"
        >
          <span
            className="absolute h-px w-6 bg-ink transition-all duration-500"
            style={{ transform: open ? "rotate(45deg)" : "translateY(-5px)" }}
          />
          <span
            className="absolute h-px w-6 bg-ink transition-all duration-500"
            style={{ transform: open ? "rotate(-45deg)" : "translateY(5px)" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-[max-height] duration-700 ease-out"
        style={{ maxHeight: open ? "100vh" : "0px" }}
      >
        <div className="px-5 pt-4 pb-10 flex flex-col gap-1">
          {links.map(([label, href], i) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline justify-between border-b border-rule py-5"
            >
              <span
                className="font-display text-ink"
                style={{ fontSize: "clamp(2rem, 9vw, 3rem)", fontWeight: 400, lineHeight: 1 }}
              >
                {label}
              </span>
              <span className="num-badge text-ink/50">0{i + 1}</span>
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-3 border border-ink px-5 py-4 text-xs tracking-micro uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ochre" />
            Erstgespräch anfragen
          </a>
        </div>
      </div>
    </header>
  );
}
