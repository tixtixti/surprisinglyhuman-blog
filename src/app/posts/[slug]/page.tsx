import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleRail } from "@/components/ArticleRail";
import { Chassis } from "@/components/Chassis";
import { getAllPosts, getPost } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.dek,
    openGraph: { type: "article", title: post.title, description: post.dek, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <Chassis
      current="none"
      railClassName="article-rail"
      rail={<ArticleRail headings={post.headings} mins={post.mins} />}
    >
      <article className="tape tape--article" data-article lang={post.lang}>
        <div className="article-meta">
          № {post.num} · {post.tag} · {post.mins} MIN · {post.date} · {site.author.short.toUpperCase()}
          {post.draft ? " · DRAFT" : null}
        </div>
        <h1 className="article-title">{post.title}</h1>
        <div className="article-rule" aria-hidden="true" />
        <div className="article-body" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Chassis>
  );
}
