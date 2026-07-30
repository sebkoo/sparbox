# Sparbox — an AI interview simulator for mobile engineers

[![React Native](https://img.shields.io/badge/React%20Native-0.86.2-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-57-000020?logo=expo&logoColor=white)](https://expo.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**What exists today:** the foundation of a React Native app —
React Native 0.86.2, TypeScript in strict mode, MIT
licensed. There is no interview loop yet. Engineering standards, git hooks, and
app identity are the other three foundation commits.

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
no server of mine in between. It will practice *with* you; it won't whisper
answers *for* you.

## Quick start

    nvm use && npm ci && npx expo start

MIT © 2026 Ben Koo

<!-- toolchain-contract
expo=57
react-native=0.86.2
-->
