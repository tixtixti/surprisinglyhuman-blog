import { Brand } from "@/components/Brand";
import { Chassis } from "@/components/Chassis";
import { FeedTape } from "@/components/Feed";
import { PowerLed } from "@/components/PowerLed";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <Chassis
      current="feed"
      rail={
        <>
          <Brand tagline />
          <PowerLed />
        </>
      }
    >
      <div className="hero-mobile">
        <Brand tagline />
        <div className="hero-sub">
          <span>
            MODEL {site.model} · {site.author.name.toUpperCase()}
          </span>
          <span>{posts.length} ENTRIES</span>
        </div>
      </div>
      <FeedTape posts={posts} />
    </Chassis>
  );
}
