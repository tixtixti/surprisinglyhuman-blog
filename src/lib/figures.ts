import { visit } from "unist-util-visit";
import { h } from "hastscript";
import type { Root, RootContent } from "mdast";
import type { ElementContent } from "hast";

/**
 * Dumbbell charts from a ```dumbbell fence. Drawn in HTML/CSS rather than SVG
 * so labels keep their size on narrow screens. One row per line:
 *
 *   legend: without -> with
 *   series: Sonnet, Jev
 *   caption: optional note under the chart
 *   terms (11): 0.36 -> 0.86 | 0.23 -> 0.82
 *
 * Values run 0–1 and are printed as written, so a decimal comma stays a comma.
 * A single value (no arrow) draws one dot. `(11)` is the optional sample size.
 */
const ROW = /^(.+?)(?:\s*\((\d+)\))?\s*:\s*(.+)$/;
const TICKS = ["0", "0.25", "0.5", "0.75", "1"];

/** Position on the 0–1 scale as a percentage of the track. */
const pct = (v: string) => {
  const x = Math.min(1, Math.max(0, Number(v.replace(",", ".")) || 0));
  return +(x * 100).toFixed(1);
};

function dumbbell(source: string): ElementContent[] {
  let legend: string[] = [];
  let series: string[] = [];
  let caption = "";
  const groups: { label: string; n?: string; pairs: string[][] }[] = [];

  for (const line of source.split("\n")) {
    const m = ROW.exec(line.trim());
    if (!m) continue;
    const [, key, n, rest] = m;
    if (key === "legend") legend = rest.split("->").map((s) => s.trim());
    else if (key === "series") series = rest.split(",").map((s) => s.trim());
    else if (key === "caption") caption = rest;
    else groups.push({ label: key, n, pairs: rest.split("|").map((p) => p.split("->").map((s) => s.trim())) });
  }

  const comma = groups.some((g) => g.pairs.some((p) => p.some((v) => v.includes(","))));

  const line = (pair: string[], i: number) => {
    const from = pair[0];
    const to = pair[pair.length - 1];
    const moved = from !== to;
    const lo = Math.min(pct(from), pct(to));
    const hi = Math.max(pct(from), pct(to));
    return h("div", { className: ["db-line", `fig-s${i + 1}`] }, [
      h("span", { className: ["db-name"] }, series[i] ?? ""),
      h("div", { className: ["db-track"], ariaHidden: "true" }, [
        ...(moved
          ? [
              h("i", { className: ["db-bar"], style: `left:${lo}%;width:${+(hi - lo).toFixed(1)}%` }),
              h("i", { className: ["db-dot", "db-dot--from"], style: `left:${pct(from)}%` }),
            ]
          : []),
        h("i", { className: ["db-dot"], style: `left:${pct(to)}%` }),
      ]),
      h("span", { className: ["db-val"] }, [...(moved ? [`${from} → `] : []), h("b", to)]),
    ]);
  };

  return [
    ...(legend.length === 2
      ? [
          h("div", { className: ["fig-legend"] }, [
            h("span", [h("i", { className: ["fig-mark", "fig-mark--from"] }), legend[0]]),
            h("span", [h("i", { className: ["fig-mark"] }), legend[1]]),
          ]),
        ]
      : []),
    h("div", { className: ["db"] }, [
      ...groups.map((g) =>
        h("div", { className: ["db-group"] }, [
          h("div", { className: ["db-cat"] }, [g.label, ...(g.n ? [h("span", `n = ${g.n}`)] : [])]),
          h("div", { className: ["db-lines"] }, g.pairs.map(line)),
        ]),
      ),
      h("div", { className: ["db-group", "db-axis"], ariaHidden: "true" }, [
        h("div", { className: ["db-cat"] }),
        h("div", { className: ["db-lines"] }, [
          h("div", { className: ["db-line"] }, [
            h("span", { className: ["db-name"] }),
            h(
              "div",
              { className: ["db-ticks"] },
              TICKS.map((t) => h("span", { style: `left:${pct(t)}%` }, comma ? t.replace(".", ",") : t)),
            ),
            h("span", { className: ["db-val"] }),
          ]),
        ]),
      ]),
    ]),
    ...(caption ? [h("figcaption", caption)] : []),
  ];
}

/**
 * Swaps ```dumbbell fences for <figure class="fig">. The node is replaced, not
 * annotated: hName on a code node lands on the inner <code>, still inside <pre>.
 */
export function remarkFigures() {
  return (tree: Root) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "dumbbell" || !parent || typeof index !== "number") return;
      const title = /title="([^"]+)"/.exec(node.meta ?? "")?.[1];
      parent.children[index] = {
        type: "figure",
        data: {
          hName: "figure",
          hProperties: { className: ["fig"], ...(title ? { dataTitle: title, ariaLabel: title } : {}) },
          hChildren: dumbbell(node.value),
        },
      } as unknown as RootContent;
    });
  };
}
