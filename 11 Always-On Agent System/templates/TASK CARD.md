# Task Card

One card is one delegation with one deliverable. A vague card wastes a worker run; a good card could be handed to a capable stranger.

## Card

- **Title:** [the deliverable in one line]
- **Assignee:** [worker name]
- **Context:** [what the worker needs to know, in full sentences]
- **Exact inputs:** [file paths, links, or data the worker starts from]
- **Success criteria:** [how anyone could check the result is done and correct]
- **Output location:** [exact path or destination for the result]
- **Maximum runtime:** [30 minutes default; 2 hours ceiling]
- **Verification method:** [a different method than production: execute it, test it, or check the source]

## Card-writing rules

- One deliverable per card. Split anything with "and" in the title.
- Check the board before creating a card. Comment on or unblock an existing card instead of duplicating it.
- Always set the runtime cap. The dispatcher kills and re-queues a card that passes it, and repeated failures block the card for human attention.
- Long cards checkpoint progress as card comments at each stage boundary: done so far, verified state, next step. A killed run then costs one step, not the whole card.
- A blocked card means the worker needs input only the user has. Surface it in one line, record the answer on the card, then release it.

## Judging the result

Judge the card by the verified outcome, never by activity. Turns used, files touched, and effort described are not results. If the success criteria are not met, the card is not done, whatever the worker says.
