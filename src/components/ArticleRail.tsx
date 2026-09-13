"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Heading } from "@/lib/markdown";
import { PowerLed } from "./PowerLed";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/**
 * Left rail for an article: progress dial (needle = how far down the tape
 * you are), reel list (h2 sections), power LED. Progress is
 * computed from the scroll position of the element marked data-article.
 */
export function ArticleRail({ headings, mins }: { headings: Heading[]; mins: number }) {
  const [p, setP] = useState(0);
  const [reel, setReel] = useState(0);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>("[data-article]");
    if (!article) return;
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((e): e is HTMLElement => e !== null);

    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = article.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const height = rect.height;
      const viewBottom = window.scrollY + window.innerHeight;
      const raw = height <= window.innerHeight ? 1 : (viewBottom - top) / height;
      setP(Math.min(1, Math.max(0, raw)));

      const line = window.scrollY + window.innerHeight * 0.4;
      let idx = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top + window.scrollY <= line) idx = i;
      });
      setReel(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [headings]);

  const pct = Math.round(p * 100);
  const left = Math.max(0, Math.round(mins * (1 - p)));
  const reels = headings.length;
  const reelText = reels ? `REEL ${pad(reel + 1)}/${pad(reels)}` : `${mins} MIN READ`;

  return (
    <>
      <Link href="/" className="rail-back">
        ← FEED
      </Link>

      <div className="progress" role="status" aria-live="off" aria-label={`Read ${pct} percent`}>
        <div className="rail-label">PROGRESS</div>
        <div className="dial" style={{ "--p": p } as React.CSSProperties} aria-hidden="true">
          <div className="dial-arc" />
          <div className="dial-core" />
          <div className="dial-needle" />
          <div className="dial-hub" />
          <div className="dial-pct">{pct}%</div>
        </div>
        <div className="dial dial--sm" style={{ "--p": p } as React.CSSProperties} aria-hidden="true">
          <div className="dial-arc" />
          <div className="dial-core" />
          <div className="dial-needle" />
          <div className="dial-hub" />
        </div>
        <div className="progress-text">
          {reelText}
          <br />
          {left} MIN LEFT
        </div>
        <div className="progress-mobile">
          {reelText}
          <br />
          <b>{pct}%</b> · {left} MIN LEFT
        </div>
      </div>

      {reels > 0 ? (
        <div className="reels-group">
          <div className="rail-label">REELS</div>
          <nav className="reels" aria-label="Sections">
            {headings.map((h, i) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                data-state={i < reel ? "done" : i === reel ? "now" : "todo"}
              >
                {pad(i + 1)} {h.text}
              </a>
            ))}
          </nav>
        </div>
      ) : null}

      <PowerLed long={false} />
    </>
  );
}
