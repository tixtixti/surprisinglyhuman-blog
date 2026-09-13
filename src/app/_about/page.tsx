import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Brand } from "@/components/Brand";
import { Chassis } from "@/components/Chassis";
import { PowerLed } from "@/components/PowerLed";
import { SpecSheet } from "@/components/SpecSheet";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.author.name}, ${site.author.title}.`,
};

// Drop a photo at public/portrait.jpg and it gets riveted onto the plate.
const PORTRAIT = ["portrait.jpg", "portrait.png", "portrait.webp"].find((f) =>
  fs.existsSync(path.join(process.cwd(), "public", f)),
);

function Portrait() {
  return (
    <div className="portrait">
      {PORTRAIT ? (
        <img src={`/${PORTRAIT}`} alt={site.author.name} />
      ) : (
        <span>
          PORTRAIT PLATE
          <br />
          (drop public/portrait.jpg)
        </span>
      )}
    </div>
  );
}

export default function AboutPage() {
  const { author } = site;
  return (
    <Chassis
      current="about"
      rail={
        <>
          <Brand />
          <PowerLed long={false} />
        </>
      }
    >
      <div className="about-grid">
        <div className="about-left">
          <Portrait />
          <SpecSheet />
        </div>
        <div>
          <h1 className="about-name">
            Timo
            <br />
            Tuononen
          </h1>
          <div className="about-sub">
            {author.title.toUpperCase()} · {author.outfit.toUpperCase()} · {author.city.toUpperCase()}
          </div>
        </div>
      </div>

      <SpecSheet className="about-plate-mobile" />

      <section className="tape tape--about about-body">
        <p>
          A decade in IT building software and leading teams. When the AI shift came I moved to
          building and managing agents and agentic solutions — the software kind, mostly.
        </p>
        <p>
          On the human side I&apos;ve been surrounded by psychologists for ten years, in
          arrangements ranging from marriage to co-founding. It shows in the writing: this blog is
          about what machines do to the way we think, written slowly enough to notice.
        </p>
        <p>
          I post here to learn in public. If a piece helps you, or you think it&apos;s wrong, either
          one is a good reason to write.
        </p>
        <div className="tape-buttons">
          {author.linkedin ? (
            <a className="primary" href={author.linkedin} rel="me noopener">
              LINKEDIN
            </a>
          ) : null}
          {author.email ? <a href={`mailto:${author.email}`}>EMAIL</a> : null}
          <a href="/feed.xml">RSS</a>
        </div>
      </section>
    </Chassis>
  );
}
