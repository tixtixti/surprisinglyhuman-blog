import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostRow({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="post-row">
      <div className="post-num" aria-hidden="true">
        {post.num}
      </div>
      <div>
        <div className="post-title">{post.title}</div>
        {post.dek ? <div className="post-dek">{post.dek}</div> : null}
      </div>
      <div className="post-meta">
        <span>{post.tag}</span>
        <span>{post.mins} MIN</span>
        <span>{post.date}</span>
      </div>
    </Link>
  );
}
