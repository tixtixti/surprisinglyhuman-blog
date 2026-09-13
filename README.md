# Surprisingly Human

Static blog + bio. Next.js 16 (App Router, `output: "export"`), TypeScript, no backend, no cookies, no analytics. The only browser state is one `localStorage` key (`sh-mode`) for the ink/paper mode.

Design source: Claude Design project "Surprisingly Human", file `surprisinglyhuman chassis.dc.html` (system SH-01, "Chassis").

## Run

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static site in ./out
```

## Writing

Posts are markdown files in `src/content/posts/`. Filename = URL slug.

```md
---
title: Your wiki is an ontology in denial
dek: One-line standfirst shown on the tape.
tag: LLM-WIKI          # ONTOLOGY | LLM-WIKI | AGENTS (see src/lib/site.ts)
date: 2026-09-09
draft: false           # optional
---

## First reel

Body text. `##` headings become numbered reels in the article rail.
A footnote[^1] becomes a margin note on wide screens and an amber strip under the paragraph on narrow ones.

[^1]: The note.

```turtle title="schema.ttl"
code panels take an optional title tab
```
```

Entry numbers are assigned chronologically (oldest = №1). Reading time is words / 220.

## Where things live

- `src/lib/site.ts` — name, tagline, author, channels, spec sheet, site URL. Fill in `linkedin` / `email` to show those buttons on About.
- `src/lib/posts.ts` — reads content, computes numbers, stats.
- `src/lib/markdown.ts` — remark/rehype pipeline, sidenote + code-title plugins.
- `src/components/` — Chassis (rail / deck / readouts layout), PowerLed (ink/paper toggle), FeedTape + PostRow (entry list), ArticleRail (progress dial + reels).
- `src/app/globals.css` — all styling and the ink/paper tokens.
- `public/portrait.jpg` — drop a photo here and About picks it up at build.
- `/feed.xml` — RSS, generated at build.

Set `NEXT_PUBLIC_SITE_URL` in the deployment so RSS links and metadata use the real domain.
