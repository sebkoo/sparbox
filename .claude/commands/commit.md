---
description: Stage and commit exactly one logical unit with a Conventional Commit message
argument-hint: [optional hint, e.g. "just the parser fix"]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git restore:*), Bash(git commit:*)
---
## Context
- Status: !`git status --porcelain`
- Unstaged: !`git diff --stat`
- Staged: !`git diff --cached --stat`
- Recent style: !`git log --oneline -8`

## Task
Create ONE atomic commit. $ARGUMENTS
1. Group changes into logical units; pick the single unit $ARGUMENTS points at
   (else the most self-contained). Stage ONLY its paths — never `git add -A`.
2. Review every staged diff hunk by hunk: drop unrelated whitespace or formatting
   changes (`git restore --staged` + re-stage precisely); confirm every staged
   file belongs to exactly this one logical unit. Run `git diff --check`.
3. Message: `type(scope): imperative subject` (≤72 chars). Body = WHY, never a
   description of the obvious. Reference the ADR if one covers this change.
4. NEVER include AI attribution, whichever tool adds it — Co-Authored-By,
   "Generated with …", session links, tool banners. The commit-msg hook rejects
   the common patterns; the rule covers the rest. Never pass --no-verify; if a hook fails, fix the cause.
5. After committing: `git log -1 --format='%an <%ae>%n%B'` — verify identity and
   message. If unrelated changes remain, name the next /commit — don't commit them.
