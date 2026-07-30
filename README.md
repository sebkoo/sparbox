# Sparbox — an AI interview simulator for mobile engineers

[![CI](https://github.com/sebkoo/sparbox/actions/workflows/ci.yml/badge.svg)](https://github.com/sebkoo/sparbox/actions/workflows/ci.yml)
[![React Native](https://img.shields.io/badge/React%20Native-0.86.2-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-57-000020?logo=expo&logoColor=white)](https://expo.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**What exists today:** the foundation of a React Native app. There is no interview
loop yet.

**What it is being built into:** paste the job description you're applying
against; an agent plans an interview around the skills it actually asks for,
presses when an answer is thin, scores answers against rubrics, and tracks what
you still need to fix. Runs offline against a deterministic provider; bring your
own API key when you want a real model.

The plan is public and the history is the record: every commit from here to the
app stores is one reviewable step.

## Why

Interview coaching moved online, into closed web services that hold your interview
transcripts on their servers. I'm a senior iOS
engineer going cross-platform, building the coach I wanted: open source,
mobile-first, bring-your-own-key. Transcripts will live in a local database on
your phone, and prompts will go straight to the provider you bring a key for —
no server of mine in between. It will practice _with_ you; it won't whisper
answers _for_ you.

## Bird's-eye view

```
sparbox/
├── src/app/        ○  screens (Expo Router)
├── src/agent/      ○  the interview loop — pure TypeScript, no React Native
│                      imports, node-testable
├── evals/          ○  fixture-based agent evals
├── modules/        ○  expo-audio-metering — local native module (Swift, Kotlin)
├── docs/adr/       ○  decision records
├── .githooks/      —  typecheck · lint · format · commit-message checks, on every commit
└── app.json · tsconfig.json · eslint.config.js · .prettierrc
                    —  the toolchain contract

—  exists today                                              ○  planned
```

## Progress

One list, in order, from the first commit to the stores. Numbered entries are shipped commits, one
each. Milestone entries ahead cover several commits and split into numbered steps as those commits
land, so nothing below them renumbers. Hashes and per-commit detail:
[docs/ROADMAP.md](docs/ROADMAP.md).

**Foundation — complete, commits 1–10**

- ✅ **1. The app exists and runs** — Expo SDK 57, React Native 0.86.2 on the New Architecture, TypeScript in strict mode, MIT licensed
- ✅ **2. Code quality has a definition** — strict compiler flags, a linter and a formatter with committed config, lockfile tracked
- ✅ **3. Process has machinery** — commit hooks that reject non-conventional subjects, and the working agreement they enforce
- ✅ **4. The app knows who it is** — display name, bundle identifier, version, and env hygiene: no `.env*` file is committed except one example holding empty keys
- ✅ **5. Enforcement survives a fresh clone** — `npm ci` wires the hook path, and the type declaration a bare checkout needs to typecheck is tracked rather than generated
- ✅ **6. A dev run leaves the tree clean** — the ignore block the toolchain rewrites on every boot is recorded byte for byte, so the rewrite is a no-op
- ✅ **7. Tool-written files are declared** — the formatter and the toolchain stop overwriting each other's bytes
- ✅ **8. The formatting standard is applied** — 25 tracked files brought into line, formatting only
- ✅ **9. The formatting standard is enforced** — checked by the pre-commit hook, proven two-sided in a throwaway clone
- ✅ **10. One gate, one threshold** — the lint script and the hook now agree on whether a warning is a failure

**Since the foundation**

- ✅ **11. The plan is public** — the scope contract lands in [docs/ROADMAP.md](docs/ROADMAP.md), and this ladder with it
- ✅ **12. The front page stops repeating the ladder** — the intro's claim of a four-commit foundation stopped being true at the fifth
- ✅ **13. The scope contract says what is actually planned** — the published milestones were re-derived rather than copied, and described a split that was never the plan
- ✅ **14. The quality gate is visible** — the badge above; the workflow behind it has run on every push and pull request since the fifth commit
- ✅ **15. The testing rule says what it actually requires** — logic owes tests, a prompt or a rubric's criteria owes a fixture, and only the regression baseline waits for the eval harness
- ✅ **16. The ladder stops claiming milestones** — a heading naming a milestone goes wrong the first time a commit lands inside that milestone without belonging to it, which had already happened here
- ✅ **17. Navigation has the shape of the demo** — `index → session/[id] → review/[id]`, plus `settings`, replace the two-tab starter; the route tree is the deep-link config, so `sparbox://session/123` already resolves
- ✅ **18. The lint gate agrees with itself on generated files** — `.expo/` was already out of scope for `npm run lint`; the pre-commit hook's broader `eslint .` excludes it too now, so a locally generated file can't fail one path while passing the other

**Ahead**

- 🔜 **M1a. The demo path** — 12 of 14 commits remain. Tap a bundled job description, get interviewed on the skills it actually asks for, get scored, and get a ranked weakness report — on a phone, from a clean clone, with no API key, against a deterministic offline provider. **Interview Planner** → **Question Generator** → **Adaptive Follow-up** → **Evaluation Agent**, pure TypeScript under `src/agent/`. Ends with the recording of that run at the top of this page.
- **M1b. Proof it works** — an eval harness with a committed report, test infrastructure, a debug timeline of the agent's own events, design tokens and accessibility primitives, the network path with bring-your-own-key storage, and the architecture document.
- **M2. Depth, and the record of it** — `modules/expo-audio-metering` in Swift and Kotlin for spoken answers; quality and safety eval suites; **Progress Memory**, so a second session opens on what the first one exposed; persistence and turn-by-turn replay; telemetry and a gallery of real failures; decision records, rejected approaches, and future removals.
- **M3. Shipping proof** — feature flags, a paywall stub behind one of them, build profiles, an exercised release path to both stores, a security document, and v0.1.0.

<!-- progress-contract
commits=18
-->

## Quick start

    nvm use && npm ci && npx expo start

MIT © 2026 Ben Koo

<!-- toolchain-contract
expo=57
react-native=0.86.2
-->
