# Sparbox — an AI interview simulator for mobile engineers

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
├── src/agent/      ○  runtime/ · state/ · tools/ · memory/ · model/ · guards/
│                      pure TypeScript, no React Native imports, node-testable
├── evals/          ○  fixture-based evals, shipped in the same commit as the agent code
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
- ✅ **12. The front page stops repeating the ladder** — the intro's claim of a four-commit foundation stopped being true at the fifth

**Ahead**

- 🔜 **M1a. The interview loop, offline** — commits 11–23. Paste a job description, get interviewed on the skills it actually asks for. Five named parts under `src/agent/`, pure TypeScript: **Interview Planner** → **Question Generator** → **Adaptive Follow-up** → **Evaluation Agent** → **Progress Memory**. Runs against a deterministic offline provider, so the loop is testable without a network or a key. Fixture-based evals ship in the same commit as the agent code they cover.
- **M1b. Bring your own key** — transcripts in a local database on the phone; requests go straight to the provider your key belongs to, with no server in between. Screens under `src/app/`.
- **M2. Records in the open** — decision records under `docs/adr/`, this scope contract kept current, and the debt register published rather than kept private.
- **M3. Native audio metering, then release** — `modules/expo-audio-metering` in Swift and Kotlin, for spoken answers — then the app stores.

<!-- progress-contract
commits=12
-->

## Quick start

    nvm use && npm ci && npx expo start

MIT © 2026 Ben Koo

<!-- toolchain-contract
expo=57
react-native=0.86.2
-->
