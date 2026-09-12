import type { ReactNode } from "react";
import { Nav, type NavKey } from "./Nav";

/**
 * The machine you read on. Rail on the left (controls), deck in the middle
 * (the tape lives here), optional readouts on the right. On narrow screens the
 * rail collapses into a control strip above the deck and the nav drops below.
 */
export function Chassis({
  current,
  rail,
  readouts,
  railClassName,
  children,
}: {
  current: NavKey;
  rail: ReactNode;
  readouts?: ReactNode;
  railClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={readouts ? "chassis chassis--readouts" : "chassis"}>
      <aside className={railClassName ? `rail ${railClassName}` : "rail"}>
        {rail}
        <Nav current={current} className="rail-nav" />
      </aside>
      <main className="deck">
        {children}
        <Nav current={current} className="deck-nav" />
      </main>
      {readouts ? <aside className="readouts">{readouts}</aside> : null}
    </div>
  );
}
