export type Channel = {
  /** Tag used in post frontmatter and shown on the tape. */
  tag: string;
  /** Short label for the mobile toggle. */
  short: string;
};

export const CHANNELS: Channel[] = [
  { tag: "ONTOLOGY", short: "ONTO" },
  { tag: "LLM-WIKI", short: "WIKI" },
  { tag: "AGENTS", short: "AGNT" },
];

export const site = {
  name: "Surprisingly Human",
  model: "SH-01",
  tagline: "Long dives on AI, by a mostly human",
  description:
    "Long dives on ontologies, LLM-wikis and agents. Written by a human, slowly enough to notice.",
  author: {
    name: "Timo Tuononen",
    short: "T. Tuononen",
    title: "Surprisingly human AI engineer",
    outfit: "Nitor",
    city: "Helsinki",
    // TODO: fill in before launch. Buttons are hidden while empty.
    linkedin: "",
    email: "",
  },
  // TODO: set NEXT_PUBLIC_SITE_URL in the deployment (used for RSS + metadata).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://surprisinglyhuman.com",
  spec: [
    { k: "ROLE", v: "Senior AI Engineer" },
    { k: "OUTFIT", v: "Nitor" },
    { k: "RUNTIME", v: "10 yrs IT · code + teams" },
    { k: "CURRENT LOAD", v: "Agents, agentic systems" },
    { k: "PSYCHOLOGISTS", v: "10 yrs, marriage → co-founder" },
  ],
  wordsPerMinute: 220,
};
