import { site } from "@/lib/site";

export function SpecSheet({ className }: { className?: string }) {
  return (
    <div className={className ? `plate ${className}` : "plate"}>
      <div className="plate-inner">
        <div className="plate-title">SPECIFICATION</div>
        {site.spec.map((s) => (
          <div key={s.k} className="spec-row">
            <span className="spec-k">{s.k}</span>
            <span className="spec-v">{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
