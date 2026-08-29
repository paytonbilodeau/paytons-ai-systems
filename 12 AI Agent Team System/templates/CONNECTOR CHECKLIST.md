# Connector Checklist

Connect one surface at a time. Prove read access before write access. Assume every login on the platform's cloud computer is available to the whole bot roster.

## Order of connection

1. **Files or workspace.** Read-only discovery first. Name the exact write boundary: the staging folders where bots may create files, and nothing else.
2. **Email, calendar, and cloud documents.** Official sign-in flow only. First test: read one known harmless file, list the next three calendar events, summarize one harmless email thread. No send, move, delete, create, or share. If the platform supports only one account per connector, stop and record the tradeoff instead of silently replacing a connection.
3. **Team chat.** Only when a real workflow needs it. Start read-only. Never post, react, invite, or change a channel without approval.
4. **Publishing tools.** Last, and only after everything above passed. First test lists accounts and readable state without creating anything. Second test prepares a draft payload and validation report while stopping before submission. A publishing capability proven in another tool does not transfer; this platform earns its own proof.
5. **Anything with money.** Prefer not connecting it at all during a pilot. If a workflow truly requires it, read-only reporting scope only, and every financial action stays with the human.

## For every connection, record

- **Connected account identity:** [the exact account]
- **Requested scopes:** [what the consent screen actually listed]
- **Read test result:** [what was read and when]
- **Write capability:** [present or absent, and how you know]
- **Approval rule covering it:** [which require rule applies]
- **Last verified:** [date and timezone]
- **Disconnect and revoke path:** [where to cut access in one minute]

## Boundaries that survive enthusiasm

- The narrowest account that can do the job gets connected, never the widest.
- Client, financial, medical, and legal material gets its own decision before any connector touches it.
- Direct browser logins are for reading and verification during a pilot, not for automation of another person's platform against its terms.
- No API key gets pasted into chat or saved in a bot's instructions. If the official flow is unavailable, that connector waits.
