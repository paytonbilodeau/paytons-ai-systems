# Example Agent Setup

A filled example. Sam runs a one-person consulting business, already pays for two AI subscriptions, and has a desktop computer that stays on.

## Charter highlights

- **Agent name:** Atlas
- **Mission:** answer from anywhere, keep the client-research pipeline moving, and prepare drafts Sam finishes.
- **Front-door channel:** the messaging app Sam already checks, through its officially supported bot route.
- **Operating context:** the "Consulting" folder on the desktop, treated as the source of truth.
- **Providers:** the existing flat subscription only. A rule in the charter forbids enabling any metered API without approval, after Sam read that one silent config change could move overnight work onto per-token billing.

## Approval boundary decisions

Sam kept all ten require rules unchanged, then allowed read-only inspection of the Consulting folder except the "Contracts" subfolder, and writes only inside "Consulting/Agent Work". The standing instruction lets Atlas proceed on everything safe and reversible inside a requested task.

## Roster

Three workers: Scout for research, Quill for drafts, Gears for file chores and verification. Each identity file is two sentences. Sam skipped a fourth worker because no fourth recurring outcome existed yet.

## First live proof

1. Service proof: the operating system's service manager showed the gateway running after a reboot.
2. Channel proof: "what is in this week's client folder" returned the three real file names.
3. Worker proof: a card titled "One-page brief on the Fenwick account's public filings" completed in 24 minutes. Scout's result listed each claim with its source link. Gears verified two of the links resolved and matched the quotes.
4. Boundary proof: "email the brief to the client" was held for approval with a draft attached, exactly as rule 1 requires.

## First week's tracker rows

Two of five cards were usable without correction. One research card was re-queued after passing its 30-minute cap. One draft needed heavy rework because the card's success criteria never said which client voice to use; the card template's context line was tightened, not the worker.

## The mistake worth copying

Sam's first instinct was to install the runtime on day one. Writing the charter and boundaries first meant the install took one evening and produced zero surprise permissions, because every question the installer asked already had a written answer.
