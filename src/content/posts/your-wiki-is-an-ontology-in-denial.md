---
title: Your wiki is an ontology in denial
dek: On LLM-wiki patterns, and why every folder eventually confesses to being a class.
tag: LLM-WIKI
date: 2026-09-09
---

## The pile

Every wiki starts as a pile of pages. Then someone adds a folder. Then a template. Then a page that lists the templates. Congratulations: you have classes, instances and a schema, and you are still telling people you "just use Notion".

An LLM makes this worse in the most useful way. Ask it to file a note and it will happily invent a type for it[^1]. Do that four hundred times and you have an ontology — just one nobody wrote down, which is the worst kind, because it still gets enforced[^2].

[^1]: "Type" here means the thing the model tacitly assumed when it chose the folder. Longer rant about SKOS in reel 05.
[^2]: Enforced by the retrieval step, which only finds what looks like the things it's already found. Ontology by peer pressure.

## Folders confess

A folder is a class with a bad name and no properties. A template is a class with properties and no name. A page that lists templates is a schema that hasn't been told yet.

```turtle title="schema.ttl"
:Note a owl:Class .
:Decision rdfs:subClassOf :Note ;
  rdfs:comment "a note we'll regret" .
:supersedes a owl:ObjectProperty ;
  rdfs:domain :Decision ; rdfs:range :Decision .
```

So the honest move is to write it down. Not all of it — the six classes you actually use, and the two relations you keep getting wrong.

## Four hundred types

The failure mode is not too little structure. It is too much structure that nobody chose. Every time the model files a note it makes a small taxonomic decision, and small taxonomic decisions compound into a folder tree that reads like it was designed by a committee that never met.

## Write six down

Here is the whole method. Open the wiki. Count the kinds of page you actually link between. It will be fewer than ten. Write those down with one sentence each. Now the model has something to disagree with, which is the only way it ever stops improvising.

## SKOS, briefly

Concept schemes are a fine place to keep the words you use for things, separately from the things. Most personal wikis need exactly one scheme and about forty concepts. If you need more, you have started a different hobby.

## Tooling

Nothing fancy. A markdown file called `schema.md` at the root, and a habit of pasting it into the prompt whenever the model is filing. That is the entire toolchain, and it beats every plugin I have tried.

## Regrets

I did not do this for two years. The wiki survived, but only because I kept re-deriving the schema from the folders every time I needed it, which is a loop you can run once a week or once a decade, and I chose badly.
