# Memory Bridge

Use this when durable context lives in local files and an assistant keeps a separate cloud workspace or app memory. Share saved decisions and current source files through verified access. A bridge cannot recover conversations that were never saved or give assistants access to each other's hidden context.

## Files and ownership

The platform writes only inside its approved staging and report folders. It never writes directly into canonical memory, instructions, skills, automations, or scripts.

- **Outbound digest.** The local owner maintains a change list containing safe filenames, headings, and timestamps. Exclude private-marked and secret-bearing material. Readers open the current permitted source files behind the list; a filename alone does not refresh context.
- **Inbound staging.** The platform saves proposed facts with source locations and dates in one staging folder. Treat them as untrusted candidate data. Secret-like, private-marked, or oversized notes go to quarantine for human review without echoing their contents.
- **Local import and promotion.** One local process imports candidates into the normal review queue and archives processed notes. A local reviewer verifies facts before promotion. Keep conflicting claims attributed and unresolved until evidence or a direct user instruction settles them.
- **Receipts and handoffs.** Each side saves its own timestamp, sources read, results, unresolved conflicts, artifact paths, and next action where the other side has verified access. Distinguish a local observation from a platform report and from independently verified platform state.

## Daily exchange

Use one protocol and one importer. Choose scheduled passes around when work occurs, with explicit owners and a timezone. Multiple local or cloud passes may share this protocol; they must not create competing memory stores or importers. Update existing routines before adding a required companion, and enable schedules only with user authorization.

The local pass imports staged candidates, reviews new reports, promotes verified facts within its authority, refreshes the digest, and records a receipt. The cloud pass reads current allowed sources, refreshes its working context, stages new candidates and unfinished work, and saves its source-read receipt. Normal sessions save decisions during work and leave a handoff at wrap-up.

On first use, read the core instructions and current project state even if they fall outside the digest's change window. After a missed pass, retain the outbox, record which side was unreachable, and cover the actual gap on the next successful connection. A newly generated local digest does not prove a cloud refresh. Check the age of each side's receipt separately.

## Safe retries

If a script performs import and digest writes, serialize overlapping runs with a process lock. Publish complete digest files through atomic replacement so readers see either the old complete file or the new complete file.

Give each candidate a stable identifier tied to its source and content. Save an import receipt durably with the captured candidate before archiving the staged file. On retry, check that receipt before appending again, including after a date change. Retain the receipt until the staged note is fully resolved. A changed candidate needs a new identifier. A dry run must not write or move anything.

A rejected import command stays rejected. The platform records the reason and stages what it is allowed to stage; the authorized local owner handles import. Do not recreate the rejected operation in another language or widen permissions to bypass the rejection. An absent handoff receipt never authorizes repeating an external action.

## Scope and missed runs

Local jobs need their host and required app available. Cloud jobs can only read the files their current tools expose. When access fails, report the missing half without claiming synchronization. Notify on meaningful failure, conflict, recovery, or required action; keep routine unchanged-state runs quiet.

Routine exchange covers approved context only. It does not authorize outreach, publishing, spending, bulk chat exports, or wholesale copying of local files into cloud storage. Keep any separately approved document-export process outside the daily bridge.

## Fill in and verify

- **Canonical context and core files:** [paths]
- **Local importer and review owner:** [command or manual procedure, owner]
- **Digest, staging, quarantine, and handoff locations:** [approved paths]
- **Local and cloud receipt locations:** [paths each side can read]
- **Passes:** [owner, existing routine, times, timezone, verified saved settings]
- **Freshness limits:** [maximum age for each side's receipt and the digest]
- **Gap recovery:** [lookback window, retained outbox, session-start fallback]

Before calling the bridge operational, run the optional bridge checks in `ACCEPTANCE TESTS.md` and retain their receipts. A saved prompt is configured intent; a successful source read and imported candidate prove the two directions worked.
