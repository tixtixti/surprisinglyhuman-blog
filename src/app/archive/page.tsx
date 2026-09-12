import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/Brand";
import { Chassis } from "@/components/Chassis";
import { PowerLed } from "@/components/PowerLed";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Archive" };

export default function ArchivePage() {
  const posts = getAllPosts();
  const years = new Map<string, typeof posts>();
  for (const p of posts) {
    const y = p.date.slice(0, 4);
    years.set(y, [...(years.get(y) ?? []), p]);
  }
  const words = posts.reduce((n, p) => n + p.words, 0);

  return (
    <Chassis
      current="archive"
      rail={
        <>
          <Brand />
          <PowerLed long={false} />
        </>
      }
    >
      <h1 className="hero">Every reel, in order</h1>
      <div className="hero-mobile">
        <Brand className="brand" />
        <div className="hero-sub">
          <span>ARCHIVE</span>
          <span>{posts.length} ENTRIES</span>
        </div>
      </div>

      <section className="tape" aria-label="Archive">
        <div className="tape-head">
          <span>FULL TAPE · NEWEST ON TOP</span>
          <span>
            {posts.length} ENTRIES · {Math.round(words / 100) / 10}K WORDS
          </span>
        </div>
        {[...years.entries()].map(([year, list]) => (
          <div key={year}>
            <div className="archive-year">{year}</div>
            {list.map((p) => (
              <Link key={p.slug} href={`/posts/${p.slug}`} className="archive-row">
                <span className="archive-num">№ {p.num}</span>
                <span className="archive-title">{p.title}</span>
                <span className="archive-meta">
                  {p.tag} · {p.mins} MIN · {p.date.slice(5)}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </section>
    </Chassis>
  );
}
