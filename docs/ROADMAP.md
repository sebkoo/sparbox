# Roadmap

This file is the scope contract. Everything under **Shipped** is in the git history and provable at
the commit named. Everything under **Planned** is not built.

## Status

| Stage                            | Commits   | State       |
| -------------------------------- | --------- | ----------- |
| Foundation                       | 10 landed | complete    |
| M1a — the demo path              | 13        | in progress |
| M1b — proof it works             | 10        | not started |
| M2 — depth, and the record of it | 26        | not started |
| M3 — shipping proof              | 11        | not started |

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

### M1a — the demo path (13 commits)

What it produces is one recordable run: tap a bundled job description → skills and topics extracted
→ adaptive multi-turn interview → scored answers → ranked weakness report. On a phone, from a clean
clone, with no API key, against a deterministic offline provider. The agent parts are pure
TypeScript under `src/agent/` with no React Native imports, so they stay testable outside the app.

- A continuous-integration quality gate on every pull request
- A navigation skeleton: `index` / `session/[id]` / `review/[id]` / `settings`
- The interview domain as validated schemas, plus session and settings stores
- A model provider interface, with a deterministic offline provider as its first implementation —
  canned response packs and a seeded generator, which is what keeps the whole demo keyless
- **Interview Planner** — a pasted job description becomes required skills, topics, and a 3–6 stage
  plan
- Six sample job descriptions, so a first run needs no typing
- The minimal interview loop — plan, ask, score, and probe when an answer is thin — as a state
  machine over immutable reducers with a hard iteration cap, emitting a typed event stream from its
  first commit. **Question Generator** and **Adaptive Follow-up** live here
- Interviewer prompts and rubric schemas, which **Evaluation Agent** scores against
- Session screen components: transcript, composer, status
- The session screen wired to the agent's event stream — the vertical slice
- The scoring and weakness screen: scorecard, turn replay, and ranked weaknesses, each carrying the
  answer that evidenced it
- Reset and seed actions, so the demo always starts from a known state
- The README hero, with the recording of that run

What M1a deliberately does not ship: evals, unit tests, a design token system, accessibility
primitives, a network path, and an architecture document. Every one of them is M1b, which opens
four commits after the first screen — and this paragraph exists so that gap is recorded here rather
than discovered by whoever reads the history.

### M1b — proof it works (10 commits)

The repository that survives being read slowly rather than skimmed.

- A baseline eval harness against the offline provider, with a committed report carrying its own
  provenance — no key, no emulator
- Test infrastructure and real domain tests, back-filling the M1a agent core
- A debug timeline that renders the agent event stream the loop already emits
- Design tokens and accessibility-first primitives, with the M1a screens refactored onto them
- A provider-agnostic stream parser
- The primary cloud provider adapter, which is what makes the tier routing real
- Bring-your-own-key storage: keys never touch files, never touch git
- A subscription seam, with no paywall behind it yet
- `docs/ARCHITECTURE.md` — the request pipeline and the data flow, hop by hop
- The full README, extending the M1a hero rather than replacing it

### M2 — depth, and the record of it (26 commits)

An evidence backlog ordered by what each item proves, not a checklist — deliberately cuttable from
the tail.

- `modules/expo-audio-metering` — a local native module, iOS in Swift and Android in Kotlin, behind
  one TypeScript contract
- A secondary provider adapter, which is what proves the interface was real
- Quality and safety eval suites, extending the M1b baseline
- **Progress Memory** — a weakness store and a spaced-repetition scheduler, so a second session
  opens on what the first one exposed
- Session persistence, resume, and turn-by-turn replay — including explaining a weak answer and
  drafting a stronger one
- Crash reporting that scrubs transcripts and job-description text, agent telemetry on the same
  event stream, and a gallery of real failures with the fixes that closed them
- Measured performance numbers, and an accessibility audit
- Decision records with an index, the approaches that were rejected and why, and what is already
  scheduled to be deleted
- This file kept current, a published debt register, and the method and evidence documents

### M3 — shipping proof (11 commits)

- Typed local feature flags
- A Pro paywall stub behind one of them, implementing the M1b subscription seam without touching a
  call site
- Build profiles, and a release path exercised end to end to both stores' internal tracks
- The pre-release name gate, recorded in the history before any store asset exists
- `SECURITY.md` — the threat model in one page
- Store metadata, a release runbook, and v0.1.0

## How to read progress

The commit history is the record. From the ninth commit onward, `npm run typecheck`,
`npm run lint`, and `npx prettier --check .` all pass at every commit, enforced by a pre-commit hook
rather than by convention.
