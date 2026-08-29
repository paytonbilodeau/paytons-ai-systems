# Memory Bridge

Use this when your durable context lives in local files and the platform keeps its own cloud workspace and app memory. The bridge keeps them in sync without ever letting the platform write into your canonical files.

## The rule that makes it safe

The platform never writes into your memory, instruction, skill, automation, or script folders. Staging plus a reviewed import is the only inbound path.

## Components

- **Outbound digest.** A small script or manual routine lists which canonical files changed in the window: filenames and headings only, never body content. The platform reads the digest and refreshes its working context from the current files it is allowed to read. Exclude private-marked files and anything secret-bearing from the digest.
- **Inbound staging.** The platform writes proposed memory notes into one staging folder inside its approved write path. Notes are labeled as untrusted candidate data. Anything matching secret patterns, private markers, or an unreasonable size goes to a quarantine folder for human review and is never imported automatically.
- **Promotion.** Staged notes enter your normal memory-review flow like any other captured note. They earn their way into canonical files during your regular consolidation, with no shortcut.

## Who runs what

- **The platform:** one daily routine, exactly one, that refreshes its context from the digest, stages any queued notes, and mirrors its own roster and routine state to a folder your local tools can read.
- **Your local sessions:** run the sync after a durable change, or any time, to flush staged notes. No second scheduler; the platform's single routine is the schedule, local runs are catch-up.

## Rules

1. A durable fact stated inside the platform gets staged the same day. A fact living only in platform memory is a bug.
2. Exactly one bridge. If a parallel mechanism appears, merge it and keep one script and one routine.
3. A digest older than [4] days is stale; re-run before relying on it. If the computer was asleep at routine time, record the miss and run with a wider window the next day.
4. Quarantined notes are reviewed by a human, never auto-imported, never pasted into chat.
5. Nothing in the bridge sends, publishes, spends, or touches external systems.
6. The bridge never copies your files wholesale into platform storage.

## Fill in

- **Digest location:** [path]
- **Staging folder:** [path inside the platform's approved write boundary]
- **Quarantine folder:** [path]
- **Routine name and time:** [one name, one daily time]
- **Stale threshold:** [days]
