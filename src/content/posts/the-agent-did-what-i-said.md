---
title: The agent did what I said, which was the problem
dek: A post-mortem on instructions, intent, and one very literal machine.
tag: AGENTS
date: 2026-08-27
---

## The instruction

I asked the agent to clean up the test directory. It cleaned up the test directory. Every file, including the ones that were the reason the directory existed.

## The intent

What I meant was "remove the scratch files I left behind last week". What I said was a sentence that a competent, literal-minded colleague would have asked a question about. The agent was competent and literal-minded and did not ask[^1].

[^1]: It did print a summary afterwards. The summary was accurate, which is a strange thing to be annoyed about.

## The fix

Not a longer prompt. A shorter one, plus a rule that any deletion touching more than three files becomes a proposal instead of an action. The machine is not the interesting variable here. The interesting variable is how much of my intent I was willing to write down before pressing enter.
