# Roadmap

This file is the scope contract. Everything under **Shipped** is in the git history and provable at
the commit named. Everything under **Planned** is not built.

## Status

| Stage                                 | Commits   | State       |
| ------------------------------------- | --------- | ----------- |
| Foundation                            | 10 landed | complete    |
| M1a — the interview loop, offline     | 13        | not started |
| M1b — bring your own key              | —         | not started |
| M2 — decision records and public docs | —         | not started |
| M3 — native module and release        | —         | not started |

## Shipped — the foundation

| #   | Commit    | What it established                                                                                                                                                                                                                                                   |
| --- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `7c3b198` | The app exists and runs: Expo SDK 57, React Native 0.86.2 on the New Architecture, TypeScript in strict mode, Expo Router, MIT licensed.                                                                                                                              |
| 2   | `66f62bf` | Code quality has a definition: strict compiler flags, a linter and a formatter with committed config, editor and line-ending normalisation, lockfile tracked.                                                                                                         |
| 3   | `4599792` | Process has machinery: git hooks that reject non-conventional commit subjects and attribution traces, plus the working agreement they enforce.                                                                                                                        |
| 4   | `eb029a3` | The app knows who it is: display name, bundle identifier, package name, version 0.1.0. Secrets cannot leak by accident — every `.env*` file is ignored except one committed example holding only commented, empty keys.                                               |
| 5   | `23b9f51` | Enforcement survives a fresh clone. `npm ci` wires the hook path, so a clone gets working hooks instead of tracked but inert ones. The ambient type declaration a bare checkout needs in order to typecheck is tracked rather than generated. CI runs the same gates. |
| 6   | `596d2d8` | A dev run no longer leaves the tree dirty: the generated ignore block the toolchain rewrites on every boot is recorded byte for byte, so the rewrite is a no-op instead of a change to review.                                                                        |
| 7   | `dfa7c2e` | Tool-written files are declared as such, so the formatter and the toolchain stop overwriting each other's bytes.                                                                                                                                                      |
| 8   | `8b83b04` | The formatting standard is applied: 25 tracked files brought into line. Formatting only — no behaviour, dependency, or config change.                                                                                                                                 |
| 9   | `4bdaff8` | The formatting standard is enforced: the pre-commit hook checks it, proven two-sided in a throwaway clone — a misformatted file is rejected, a clean one is accepted.                                                                                                 |
| 10  | `5c58b54` | One gate, one threshold: the lint script and the pre-commit hook now assert the same thing, verified two-sided. A standard that two paths defined differently was not a standard.                                                                                     |

## Planned

### M1a — the interview loop, offline (13 commits)

Paste a job description; get interviewed on the skills it actually asks for. Five named parts, all
pure TypeScript under `src/agent/` with no React Native imports so they stay testable outside the
app:

- **Interview Planner** — turns a job description into an interview plan
- **Question Generator** — produces questions from that plan
- **Adaptive Follow-up** — presses when an answer is thin
- **Evaluation Agent** — scores answers against rubrics
- **Progress Memory** — tracks what still needs work

The loop runs against a deterministic offline provider first, so it is testable without a network
or a key. Fixture-based evals under `evals/` ship in the same commit as the agent code they cover.

### M1b — bring your own key

Transcripts live in a local database on the device. Requests go straight to the provider the key
belongs to, with no server in between. Screens under `src/app/`.

### M2 — decision records and public docs

Decision records under `docs/adr/`, this file kept current as the scope contract, and the debt
register mirrored into `docs/DEBT.md`.

### M3 — native module and release

`modules/expo-audio-metering`, a local native module in Swift and Kotlin for audio level metering
during spoken answers. Store submission.

## How to read progress

The commit history is the record. From the ninth commit onward, `npm run typecheck`,
`npm run lint`, and `npx prettier --check .` all pass at every commit, enforced by a pre-commit hook
rather than by convention.
