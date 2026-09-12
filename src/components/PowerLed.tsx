"use client";

/**
 * Power LED. Lit = INK mode (dark chassis), off = PAPER mode (aluminium).
 * State lives on html[data-mode] and in localStorage; CSS does the rest.
 */
export function PowerLed({ long = true }: { long?: boolean }) {
  return (
    <button
      type="button"
      className="led-btn"
      aria-label="Toggle ink / paper mode"
      onClick={() => {
        const el = document.documentElement;
        const next = el.dataset.mode === "paper" ? "ink" : "paper";
        if (next === "paper") el.dataset.mode = "paper";
        else delete el.dataset.mode;
        try {
          localStorage.setItem("sh-mode", next);
        } catch {
          /* ignore */
        }
      }}
    >
      <span className="led" aria-hidden="true" />
      <span className="led-text">
        <span className="led-text-ink">{long ? "INK MODE · CLICK FOR PAPER" : "INK MODE"}</span>
        <span className="led-text-paper">{long ? "PAPER MODE · CLICK FOR INK" : "PAPER MODE"}</span>
      </span>
      <span className="led-text-short">
        <span className="led-text-ink">INK</span>
        <span className="led-text-paper">PAPER</span>
      </span>
    </button>
  );
}
