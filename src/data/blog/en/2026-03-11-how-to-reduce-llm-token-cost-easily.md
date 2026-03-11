---
title: "How to reduce LLM bills effortlessly?"
description: "`rtk` (Rust Token Killer) helps you drastically reduce the tokens consumed by your LLM and shows you exactly what you’re saving."
pubDatetime: 2026-03-11T07:59:00.000Z
draft: false
tags:
  - AI
  - LLM
  - claude code
  - cursor
  - anthropic
  - token cost
  - cost optimization
  - finops
  - rtk
  - rust-token-killer
---

---

I’m guessing that, like me, you’ve already seen your Claude Code or Cursor bill **blow past the planned budget**… just because you left the tool running on a complex task for a few minutes (or hours).

Going forward, this problem tends to get worse as AI tools become embedded everywhere in our workflows: writing code, exploring a project, finding an info in a folder… you name it.

And on top of that, with the **rising cost of tokens** on the latest models, AI spend is becoming a real FinOps concern for the coming months (or even years).

So yes—but you might tell me: what can I do about it, at my scale?

The solution is simple: try to **reduce as much as possible the number of tokens** sent to the LLM, without degrading the context (or the useful information).

For that, I found a pretty “magic” solution as I’m writing this article 👇

## It’s called "_Rust Token Killer_" or `rtk` ✨

---

[**_Rust Token Killer_**](https://github.com/rtk-ai/rtk) (or `rtk` for close friends) is an open-source tool developed and maintained by French folks (cocorico 🇫🇷) that acts as a proxy for the various commands an agent / AI IDE often runs to get its work done.

Instead of calling the baseline commands provided by your system (like `ls` or `find`) — designed to be read by humans — `rtk` “wraps” them and replaces the output with optimized, less verbose alternatives, while minimizing information loss.

So forget `ls` _(~150 tokens)_

```bash
$ ls .
total 24
drwxr-xr-x@  4 myastr0  staff   128  9 mar 08:50 assets/
drwxr-xr-x@ 17 myastr0  staff   544  9 mar 18:19 components/
-rw-r--r--@  1 myastr0  staff  1338  9 mar 18:38 config.ts
-rw-r--r--@  1 myastr0  staff  1001  9 mar 19:31 constants.ts
-rw-r--r--@  1 myastr0  staff   847  9 mar 18:34 content.config.ts
drwxr-xr-x@  3 myastr0  staff    96  9 mar 18:34 data/
drwxr-xr-x@  9 myastr0  staff   288  9 mar 08:50 i18n/
drwxr-xr-x@  5 myastr0  staff   160  9 mar 18:34 layouts/
drwxr-xr-x@  5 myastr0  staff   160  9 mar 08:50 pages/
drwxr-xr-x@  4 myastr0  staff   128  9 mar 08:50 styles/
drwxr-xr-x@ 13 myastr0  staff   416  9 mar 18:34 utils
```

and say hello to `rtk ls` _(#~35 tokens **-80%**)_

```bash
$ rtk ls .
assets/
components/
data/
i18n/
layouts/
pages/
styles/
utils/
config.ts  1.3K
constants.ts  1001B
content.config.ts  847B

📊 3 files, 8 dirs (3 .ts)
```

The outputs produced by `rtk` are much less verbose, but they remain usable by an LLM for classic tasks like file exploration and context enrichment.

## Cool, it prints less text… but how do you measure what you’re saving? 📊

---

Where `rtk` really won me over is tracking. With `rtk gain`, I get a detailed report of what I’m saving _(in tokens)_.

_Below is my report from last week 👇_

```bash
$ rtk gain


📊 RTK Token Savings
════════════════════════════════════════

Total commands:    2,927
Input tokens:      11.6M
Output tokens:     1.4M
Tokens saved:      10.3M (89.2%)

By Command:
────────────────────────────────────────
Command               Count      Saved     Avg%
rtk find                324       6.8M    78.3%
rtk git status          215       1.4M    80.8%
rtk grep                227     786.7K    49.5%
rtk cargo test           16      50.1K    91.8%
```

If this report isn’t convincing enough, here’s a **breakdown** based on the official Anthropic API pricing (Claude, March 2026).

## What that means in real money 💰

---

The **10,3 M tokens saved** by `rtk` correspond here to **input context**. Using the per-million-token prices (\(MTok\)) from the [Anthropic documentation](https://docs.anthropic.com/en/docs/about-claude/pricing) for recent models:

| Model                 | Input (USD/MTok) | Output (USD/MTok) | Savings on 10,3 M tokens (USD) |
| --------------------- | ---------------- | ----------------- | ------------------------------ |
| **Claude Opus 4.6**   | 5 $              | 25 $              | **51,50 $**                    |
| **Claude Sonnet 4.6** | 3 $              | 15 $              | **30,90 $**                    |

- For **Opus 4.6**: **~51,50 $** saved over the week
- For **Sonnet 4.6**: **~30,90 $** saved over the week

---

Annualized (× 52), that’s **about 2 680 $** saved per year with _Opus 4.6_ — the number speaks for itself.

---

So, **without changing model or provider**, with `rtk` you can aim for **~1 600 $ to ~2 700 $ saved per year** (order of magnitude, depending on the model) on a single machine. At the scale of a team (e.g., 30 devs), the order of magnitude becomes significant quickly.

## So, ready to save a ton of money? 🚀

---

For that, nothing simpler: install and configure `rtk` (I’ll let you follow the [official README](https://github.com/rtk-ai/rtk)), and you’re ready to watch your bills go down! 😉

---

_Thanks for reading this far 🙇‍♂️_

_If you have feedback on this article (or if you liked it), feel free to message me on Bluesky, share it on LinkedIn, or elsewhere._
