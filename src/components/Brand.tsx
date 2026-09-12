import Link from "next/link";
import { site } from "@/lib/site";

export function Brand({ className = "brand", tagline = false }: { className?: string; tagline?: boolean }) {
  return (
    <div className="brand-block">
      <Link href="/" className={className} aria-label="Surprisingly Human, home">
        Surpri-
        <br />
        singly
        <br />
        <span className="brand-accent">Human</span>
      </Link>
      {tagline ? <p className="brand-tagline">{site.tagline}</p> : null}
    </div>
  );
}
