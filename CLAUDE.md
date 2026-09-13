# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is pnpm.

```bash
pnpm dev     # http://localhost:3000 — drafts are visible here
pnpm build   # static export to ./out — drafts excluded
pnpm lint    # eslint (next core-web-vitals + typescript configs)
```

There is no test suite. Use `pnpm build` to verify changes: it type-checks, renders every post through the markdown pipeline, and fails if static export breaks.

## Architecture

A fully static blog: Next.js 16 App Router with `output: "export"` (see `next.config.ts`). There is no server runtime, so anything that needs one won't work: dynamic routes without `generateStaticParams`, cookies, server actions, API routes that aren't `force-static`, or image optimization. The site deliberately has no backend, cookies, or analytics. The only browser state is `localStorage` (`sh-mode` for ink/paper mode).

**Content flow.** Markdown posts in `src/content/posts/*.md` → `src/lib/posts.ts` → pages.
- The filename is the slug. Frontmatter: `title`, `dek`, `tag`, `date` (YYYY-MM-DD), plus optional `lang` (BCP 47, sets `lang` on the article, e.g. `fi`) and `draft`.
- `tag` should be one of `CHANNELS` in `src/lib/site.ts`.
- `load()` sorts posts oldest-first and assigns entry numbers (`num`, oldest = №1). Adding a post with an earlier date renumbers the posts after it. `getAllPosts()` returns newest-first.
- Drafts are filtered out only when `NODE_ENV === "production"`. The in-memory cache is also production-only, so markdown edits show up live in dev.
- YAML turns bare dates into `Date` objects; `load()` converts them back to strings. Keep that conversion if you touch parsing.

**Markdown pipeline** (`src/lib/markdown.ts`): remark-parse → gfm → rehype → slug → Shiki → `rehypeSidenotes` → heading collection → stringify. Plugin order matters:
- Shiki uses the custom `sh-code` theme. Shiki adds the theme name to `<pre>` as a class, so don't reuse that name as a CSS class. A code fence's `title="…"` meta becomes `<pre data-title>`, which CSS renders as a tab.
- `rehypeSidenotes` removes the GFM footnotes section. It wraps each top-level block that cites a footnote in `div.fn-block` and puts `aside.sidenote` elements before it. CSS floats these into the margin on wide screens and stacks them below the paragraph on narrow ones.
- Headings are collected after sidenotes so the footnote section's heading isn't included. Only `h2` headings are collected; they become the numbered "reels" in `ArticleRail`.
- Reading time is `countWords` / `site.wordsPerMinute` (220). Code fences don't count toward words.

**Layout.** Every page renders inside `<Chassis>` (`src/components/Chassis.tsx`): a left `rail` for controls, a center `deck` holding the "tape" (content), and optional right `readouts`. On narrow screens the rail becomes a strip above the content. `Nav` renders twice (`rail-nav` and `deck-nav`), and CSS shows one. Most components are server components. `ArticleRail` (tracks scroll progress via the `[data-article]` element) and `PowerLed` (ink/paper toggle) are client components.

**Styling.** Nearly all styling is hand-written CSS in `src/app/globals.css`, built on CSS custom-property tokens. Tailwind v4 is imported but rarely used. Ink mode is the default `:root` token set, and paper mode overrides tokens under `html[data-mode="paper"]`. An inline script in `layout.tsx` restores the mode before first paint. For theme changes, edit tokens instead of adding per-component colors. Fonts (Big Shoulders, Literata, Azeret Mono) come from `next/font` in `layout.tsx` and are exposed as `--font-display`, `--font-serif`, and `--font-mono`.

**Site config.** Identity, author, spec sheet, and channels live in `src/lib/site.ts`. `site.url` comes from `NEXT_PUBLIC_SITE_URL`, which RSS (`src/app/feed.xml/route.ts`, static) and `metadataBase` use. About-page LinkedIn and email buttons stay hidden while those fields are empty. The About page uses `public/portrait.jpg` if it exists at build time.

The visual design comes from the Claude Design project "Surprisingly Human" (`surprisinglyhuman chassis.dc.html`, system SH-01 "Chassis"). The code uses its vocabulary: chassis, rail, deck, tape, reels, readouts.
