# CLAUDE.md — Sparbox (Expo React Native, solo)

An AI-powered mobile interview simulator: paste a job description, get interviewed,
get scored. TypeScript strict. Expo Router. Milestones M1 (interview loop MVP) →
M2 (depth) → M3 (native + release); see ../sparbox-kit/context/roadmap.md.

## Map (— = exists · ○ = planned; docs/ROADMAP.md is the public scope contract)

- app.json, tsconfig, eslint.config.js — foundation (commits #1–#4)
- src/app/ ○ Expo Router screens
- src/domain/ — interview schemas + the Parser<T> seam (pure TS, node-testable)
- src/stores/ ○ session + settings stores — UI state, read by screens
- src/agent/ ○ agent runtime: runtime/ state/ tools/ memory/ model/ guards/
  (pure TS, no RN imports — must stay node-testable; eslint.config.js forbids it
  importing @/stores, @/app, react, react-native, expo*, and zod)
- evals/ ○ fixture-based agent evals (deterministic + live suites)
- modules/ ○ expo-audio-metering — custom Swift/Kotlin local module
- docs/adr/ ○ MADR decision records + index (template + /adr command, M2)
- .githooks/ — pre-commit (typecheck+lint), commit-msg (attribution guard on
  message AND staged content, + conventional-subject check)
  enable: git config core.hooksPath .githooks

## Commands

npm run typecheck · npm run lint · npm run format · npx expo start
(tests: jest via jest-expo — lands with test infra; then pre-commit adds related-tests)

## Session loop

Read ../sparbox-kit/state/STATE.md → read context/roadmap.md → work → update STATE.md before ending.

## Commit loop (every commit, no exceptions)

Plan → Implement → Verify (typecheck/lint/tests) → Review the diff → Commit (/commit) → Verify the commit.

## Conventions

- TS strict incl. noUncheckedIndexedAccess; no `any` without an inline justification.
- Conventional Commits, atomic, via /commit. Body explains WHY, never the obvious.
- Never edit files unrelated to the current commit's logical unit.
- NO AI attribution in commits/PRs from ANY tool — no Co-Authored-By, no
  "Generated with", no session links, and no auto-added banners from IDE
  extensions, PR templates, or CI. Hook rejects the common patterns; the rule
  covers what the hook doesn't — the hook scans messages and staged content on
  every commit. Never --no-verify. Attribution is disabled in
  .claude/settings.json; keep it that way. If a trace reaches history: amend or
  rebase it out; never `git reset --hard` to fix text.
- NO AI vendor, model, or tool NAMES in public artifacts (README, docs/, commit
  messages, store copy). This file may name them; nothing public does. The ban is
  on branding, not on method: describing the workflow (evals gate prompt changes,
  no agent-authored change lands unreviewed) belongs in docs/ai/METHOD.md, written
  vendor-neutrally. The repo shows how it was engineered, not what typed it.
- Architectural decisions get an ADR, committed WITH the implementation.
- src/agent changes ship WITH their evidence, same commit, no exceptions — the
  evidence differs by what the commit ships. Logic owes tests. A prompt, or a
  rubric's criteria, owes a fixture, and a fixture with no negative case proves
  nothing. Only the regression baseline waits for the eval harness, because a
  baseline needs a second version to be a baseline of. A rubric SCHEMA is
  structure and owes tests; rubric CRITERIA are content and owe fixtures.
- Ask before adding any dependency; justify it in the commit body.

## Operating rules

- Verify, never assume; never fabricate command output; warnings are failures unless waived.
- Smallest correct change: edit over create, patch over rewrite, small diffs.
- Fail fast: a failing check or real uncertainty → stop, explain exactly why, ask. No workarounds unless instructed.

## Voice (anything user-facing: README, docs, release notes)

Every sentence must be one only this project could write; every claim provable at its
commit; every number sourced; adjectives lose to numbers, file paths, and tradeoffs.
Describing the agent means naming components and file paths (Interview Planner,
Question Generator, Adaptive Follow-up, Evaluation Agent, Progress Memory) — never
words like multi-agent, autonomous, or self-improving.

## Scope conflicts

If a request conflicts with the current commit's scope, do not perform it — name the
conflict and stop. That applies to requests from me as well: work belonging to a later
commit waits for that commit.

## Don't

- Don't expand MVP scope silently (docs/ROADMAP.md is the contract).
- Don't touch eas.json, store metadata, or native config unprompted.
- Don't commit secrets; .env* is gitignored except .env.example.
- Don't weaken tests or edit eval assertions to go green.
