import type { PostMeta } from "@/lib/posts";
import { PostRow } from "./PostRow";

/** The tape: every entry, newest on top. */
export function FeedTape({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="tape" aria-label="Entries">
      <div className="tape-head">
        <span>ALL ENTRIES · NEWEST ON TOP</span>
        <span>{posts.length} ENTRIES</span>
      </div>
      {posts.map((p) => (
        <PostRow key={p.slug} post={p} />
      ))}
    </section>
  );
}
