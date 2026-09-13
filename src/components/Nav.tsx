import Link from "next/link";

export type NavKey = "feed" | "archive" | "about" | "rss" | "none";

const ITEMS: { key: NavKey; label: string; href: string }[] = [
  { key: "feed", label: "FEED", href: "/" },
  { key: "archive", label: "ARCHIVE", href: "/archive" },
  // About is hidden until it is finished; restore by renaming src/app/_about back to about.
  // { key: "about", label: "ABOUT", href: "/about" },
  { key: "rss", label: "RSS", href: "/feed.xml" },
];

export function Nav({ current, className }: { current: NavKey; className: string }) {
  return (
    <nav className={className} aria-label="Site">
      {ITEMS.map((it) =>
        it.key === "rss" ? (
          <a key={it.key} href={it.href}>
            {it.label}
          </a>
        ) : (
          <Link key={it.key} href={it.href} aria-current={current === it.key ? "page" : undefined}>
            {it.label}
          </Link>
        ),
      )}
    </nav>
  );
}
