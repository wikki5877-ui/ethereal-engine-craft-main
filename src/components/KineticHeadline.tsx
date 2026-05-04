import { useEffect, useRef, useState } from "react";

/**
 * KineticHeadline — заголовок собирается по словам / буквам с маской,
 * с акцентом на одно слово, набранное Fraunces italic.
 */
export function KineticHeadline() {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const lines: Array<Array<{ t: string; italic?: boolean; ochre?: boolean }>> = [
    [{ t: "Recht" }, { t: "ist" }, { t: "kein" }],
    [{ t: "Formular" }, { t: "—" }, { t: "es ist" }],
    [{ t: "eine", italic: true }, { t: "Haltung.", italic: true, ochre: true }],
  ];

  let wordIndex = 0;

  return (
    <h1
      ref={ref}
      className="font-display text-ink leading-[0.92] tracking-[-0.025em]"
      style={{ fontSize: "clamp(2.6rem, 9vw, 9.5rem)", fontWeight: 400 }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((w, wi) => {
            const i = wordIndex++;
            const delay = 80 + i * 90;
            return (
              <span key={wi} className="word-mask mr-[0.22em] last:mr-0">
                <span
                  style={{
                    animationDelay: shown ? `${delay}ms` : "9999ms",
                    animationPlayState: shown ? "running" : "paused",
                    fontStyle: w.italic ? "italic" : "normal",
                    color: w.ochre ? "var(--ochre-deep)" : undefined,
                    fontVariationSettings: w.italic ? '"SOFT" 100, "WONK" 1' : undefined,
                  }}
                >
                  {w.t}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
