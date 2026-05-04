export function Marquee() {
  const items = [
    "SEIT 1990",
    "·",
    "LEIPZIG-GOHLIS",
    "·",
    "DISKRETION",
    "·",
    "PRÄZISION",
    "·",
    "ERGEBNIS",
    "·",
    "BUNDESWEIT TÄTIG",
    "·",
    "SECHS FACHGEBIETE",
    "·",
  ];
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t, i) => (
        <span
          key={i}
          className="font-display italic text-ivory/95"
          style={{ fontSize: "clamp(2.4rem, 9vw, 8rem)", lineHeight: 1, fontVariationSettings: '"SOFT" 100' }}
        >
          {t}
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden bg-graphite py-7 md:py-16 border-y border-ink/40">
      <div className="flex w-max animate-marquee">
        {row}{row}
      </div>
    </div>
  );
}
