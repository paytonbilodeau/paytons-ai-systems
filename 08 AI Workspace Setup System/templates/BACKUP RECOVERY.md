# Backup and Recovery Plan

- **Canonical working root:** [folder label]
- **Backup method:** [method]
- **Backup frequency:** [frequency]
- **Last verified backup:** [date and evidence]
- **Files excluded:** [secrets and temporary files]
- **Recovery destination:** [safe separate location]
- **Recovery steps:** [steps]
- **Recovery test:** [small file restored and checked]
- **Owner:** [person]

Do not call a configured backup verified until a file has been restored and opened.

## Coverage and exclusions

- **Required sources:** [context, instructions, custom skills, code, schedule prompts, and retained migration records]
- **Optional sources:** [folders that may legitimately be absent]
- **Excluded material:** [credentials, authentication/session stores, raw chats, caches, dependencies, and media not covered by this backup]
- **Skipped source report:** [exact paths and reasons, without secret values]
- **Private recovery destination and access check:** [approved account or device, permissions, and evidence]

Stop a real backup when a required source is missing or unreadable. Report missing optional sources separately. A backup that omits a custom skill or reference cannot restore that item; record the gap instead of calling the archive complete. Keep private recovery copies separate from public templates and research exports.

## Verification and retention

Record the archive's file inventory and checksums. Reopen the archive, restore a small representative sample into a separate folder, compare its contents, and open it with the intended tool. For an approved offsite copy, read back its size and checksum or equivalent destination evidence before calling the transfer verified.

If the transfer fails, keep the verified local archive and a receipt with the failure category. Check whether the remote copy already exists before retrying the same archive. Never put credential values or raw provider error bodies in the receipt.

- **Owned backup filename pattern:** [exact pattern]
- **Retention count or age:** [user choice]
- **Pruning condition:** [successful verification and approved retention policy]
- **Restore steps after credential loss:** [secure reconnection steps, without credentials]

Apply retention only to backups this workflow owns. Preserve unrelated and historical backups unless their removal is separately approved.
