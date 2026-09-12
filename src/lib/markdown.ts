import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { h } from "hastscript";
import type { Root, RootContent, ElementContent } from "hast";

export type Heading = { id: string; text: string };

function textOf(node: ElementContent | RootContent): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map(textOf).join("");
  return "";
}

/**
 * Lifts ```lang title="file" meta onto the <pre> as data-title so CSS can
 * print the little tab on the inset code panel.
 */
function rehypeCodeTitle() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "pre") return;
      const code = node.children.find(
        (c) => c.type === "element" && c.tagName === "code",
      );
      if (!code || code.type !== "element") return;
      const meta = (code.data as { meta?: string } | undefined)?.meta ?? "";
      const m = /title="([^"]+)"/.exec(meta);
      if (m) node.properties["data-title"] = m[1];
    });
  };
}

/**
 * Turns GFM footnotes into sidenotes. Each top-level block that references a
 * footnote is wrapped in <div class="fn-block"> with the notes placed before
 * it as <aside class="sidenote">. CSS floats them into the tape's margin on
 * wide screens and stacks them under the paragraph on narrow ones.
 */
function rehypeSidenotes() {
  return (tree: Root) => {
    const notes = new Map<string, ElementContent[]>();

    tree.children = tree.children.filter((node) => {
      if (
        node.type === "element" &&
        node.tagName === "section" &&
        node.properties.dataFootnotes !== undefined
      ) {
        visit(node, "element", (li) => {
          if (li.tagName !== "li" || typeof li.properties.id !== "string") return;
          visit(li, "element", (a, idx, parent) => {
            if (
              a.tagName === "a" &&
              a.properties.dataFootnoteBackref !== undefined &&
              parent &&
              typeof idx === "number"
            ) {
              parent.children.splice(idx, 1);
              return idx;
            }
          });
          notes.set(li.properties.id, li.children);
        });
        return false;
      }
      return true;
    });

    if (notes.size === 0) return;

    let counter = 0;
    const out: RootContent[] = [];
    for (const block of tree.children) {
      const found: { id: string; label: string }[] = [];
      if (block.type === "element") {
        visit(block, "element", (a) => {
          if (a.tagName !== "a" || a.properties.dataFootnoteRef === undefined) return;
          const id = String(a.properties.href ?? "").replace(/^#/, "");
          counter += 1;
          const label = String(counter);
          a.properties = { href: `#sn-${label}`, className: ["fnref"] };
          a.children = [{ type: "text", value: label }];
          found.push({ id, label });
        });
      }
      if (found.length === 0) {
        out.push(block);
        continue;
      }
      const asides = found.map((f) =>
        h("aside", { className: ["sidenote"], id: `sn-${f.label}` }, [
          h("span", { className: ["sidenote-num"] }, f.label),
          h("div", { className: ["sidenote-body"] }, notes.get(f.id) ?? []),
        ]),
      );
      out.push(h("div", { className: ["fn-block"] }, [...asides, block]));
    }
    tree.children = out;
  };
}

function collectHeadings(store: Heading[]) {
  return () => (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "h2" && typeof node.properties.id === "string") {
        store.push({ id: node.properties.id, text: textOf(node) });
      }
    });
  };
}

export async function renderMarkdown(source: string) {
  const headings: Heading[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeCodeTitle)
    .use(rehypeSidenotes) // strips the generated "Footnotes" section before headings are read
    .use(collectHeadings(headings))
    .use(rehypeStringify)
    .process(source);
  return { html: String(file), headings };
}

export function countWords(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`\[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}
