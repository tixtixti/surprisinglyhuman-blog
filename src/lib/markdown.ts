import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";
import type { ThemeRegistration } from "shiki";
import { visit } from "unist-util-visit";
import { h } from "hastscript";
import type { Root, RootContent, ElementContent } from "hast";
import { remarkFigures } from "./figures";

export type Heading = { id: string; text: string };

function textOf(node: ElementContent | RootContent): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map(textOf).join("");
  return "";
}

/** Code panel palette: the tape's ink on the chassis well, accent for keywords. */
// NB: shiki puts the theme name on <pre> as a class, so keep it out of the CSS namespace.
const tapeTheme: ThemeRegistration = {
  name: "sh-code",
  type: "dark",
  colors: { "editor.background": "#15161a", "editor.foreground": "#d8d2c4" },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#7c776d", fontStyle: "italic" } },
    { scope: ["keyword", "storage", "storage.type", "keyword.operator.expression", "keyword.control"], settings: { foreground: "#ff9a2e" } },
    { scope: ["keyword.operator", "punctuation", "meta.brace"], settings: { foreground: "#9a958b" } },
    { scope: ["string", "string.quoted", "punctuation.definition.string"], settings: { foreground: "#7fd6a8" } },
    { scope: ["constant.numeric", "constant.language", "constant.character"], settings: { foreground: "#f6c46a" } },
    { scope: ["entity.name.type", "entity.name.class", "entity.name.interface", "support.type", "support.class", "entity.other.inherited-class"], settings: { foreground: "#f6c46a" } },
    { scope: ["entity.name.function", "support.function", "meta.function-call entity.name.function"], settings: { foreground: "#ffb870" } },
    { scope: ["variable.other.property", "meta.object-literal.key", "entity.name.tag", "support.type.property-name"], settings: { foreground: "#e9e4d8" } },
    { scope: ["variable", "variable.parameter", "variable.other.readwrite"], settings: { foreground: "#d8d2c4" } },
    { scope: ["entity.name.tag.turtle", "constant.other.turtle", "entity.other.attribute-name"], settings: { foreground: "#f6c46a" } },
  ],
};

/** Extracts `title="file"` from the code fence meta, e.g. ```ts title="schema.ts" */
function parseCodeMeta(meta: string) {
  const m = /title="([^"]+)"/.exec(meta);
  return m ? { title: m[1] } : {};
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
    .use(remarkFigures) // ```dumbbell fences become <figure class="fig">, so Shiki skips them
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeShiki, {
      theme: tapeTheme,
      fallbackLanguage: "text",
      parseMetaString: parseCodeMeta,
      transformers: [
        {
          // Lift the fence title onto <pre data-title> for the CSS tab.
          pre(node) {
            const title = (this.options.meta as { title?: string } | undefined)?.title;
            if (title) node.properties["data-title"] = title;
            delete node.properties.title; // shiki copies meta keys as attributes; no tooltip wanted
          },
        },
      ],
    })
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
