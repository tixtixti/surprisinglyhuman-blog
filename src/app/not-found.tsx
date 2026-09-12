import Link from "next/link";
import { Brand } from "@/components/Brand";
import { Chassis } from "@/components/Chassis";
import { PowerLed } from "@/components/PowerLed";

export default function NotFound() {
  return (
    <Chassis
      current="none"
      rail={
        <>
          <Brand />
          <PowerLed long={false} />
        </>
      }
    >
      <h1 className="hero">No such reel</h1>
      <div className="hero-mobile">
        <Brand className="brand" />
        <div className="hero-sub">
          <span>MODEL SH-01</span>
          <b>ERR 404</b>
        </div>
      </div>
      <section className="tape">
        <div className="article-meta">№ 404 · TAPE RAN OUT</div>
        <p className="p404">
          The address is real, the reel is not. Either it was never printed, or it was spliced out
          later. Both happen.
        </p>
        <div className="tape-buttons">
          <Link className="primary" href="/">
            ← BACK TO THE FEED
          </Link>
          <Link href="/archive">ARCHIVE</Link>
        </div>
      </section>
    </Chassis>
  );
}
