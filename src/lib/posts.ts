import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { countWords, renderMarkdown, type Heading } from "./markdown";
import { site } from "./site";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

export type PostMeta = {
  slug: string;
  /** Sequential entry number, oldest = 1. */
  num: number;
  title: string;
  dek: string;
  tag: string;
  date: string; // YYYY-MM-DD
  words: number;
  mins: number;
};

export type Post = PostMeta & {
  html: string;
  headings: Heading[];
};

type Frontmatter = {
  title: string;
  dek?: string;
  tag: string;
  date: string;
  draft?: boolean;
};

let cache: { metas: PostMeta[]; bodies: Map<string, string> } | null = null;

function load() {
  if (cache) return cache;
  const files = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))
    : [];
  const raw = files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
      const raw = data as Omit<Frontmatter, "date"> & { date: string | Date };
      // YAML parses bare dates into Date objects; keep the canonical YYYY-MM-DD string.
      const date =
        raw.date instanceof Date ? raw.date.toISOString().slice(0, 10) : String(raw.date);
      const fm: Frontmatter = { ...raw, date };
      return { slug, fm, content };
    })
    .filter((p) => !p.fm.draft)
    .sort((a, b) => (a.fm.date < b.fm.date ? -1 : a.fm.date > b.fm.date ? 1 : 0));

  const bodies = new Map<string, string>();
  const metas: PostMeta[] = raw.map((p, i) => {
    bodies.set(p.slug, p.content);
    const words = countWords(p.content);
    return {
      slug: p.slug,
      num: i + 1,
      title: p.fm.title,
      dek: p.fm.dek ?? "",
      tag: p.fm.tag,
      date: p.fm.date,
      words,
      mins: Math.max(1, Math.round(words / site.wordsPerMinute)),
    };
  });
  cache = { metas, bodies };
  return cache;
}

/** Newest first. */
export function getAllPosts(): PostMeta[] {
  return [...load().metas].reverse();
}

export async function getPost(slug: string): Promise<Post | null> {
  const { metas, bodies } = load();
  const meta = metas.find((m) => m.slug === slug);
  const body = bodies.get(slug);
  if (!meta || body === undefined) return null;
  const { html, headings } = await renderMarkdown(body);
  return { ...meta, html, headings };
}

export function getStats() {
  const metas = load().metas;
  const words = metas.reduce((n, m) => n + m.words, 0);
  const latest = metas[metas.length - 1]?.date;
  const daysSince = latest
    ? Math.max(0, Math.floor((Date.now() - new Date(latest).getTime()) / 86_400_000))
    : null;
  return { entries: metas.length, words, latest, daysSince };
}

export function formatNum(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function pad(n: number, width = 2): string {
  return n.toString().padStart(width, "0");
}
