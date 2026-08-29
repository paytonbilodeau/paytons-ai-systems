# Fleet Rules

Operating rules for the dispatcher, the board, and daily fleet use. Copy this next to the roster and adjust the numbers to your runtime and budget.

## Dispatch

- The dispatcher runs inside the always-on service and hands ready cards to workers automatically.
- Concurrency caps: [4] cards running globally, [2] per worker. Queued cards wait; that is fine.
- If nothing dispatches, check the service first, then the board's own diagnostics. A service restart kills in-flight workers, which re-queue; restart only deliberately.

## Budget

- Workers spend the same subscription pool as the front-door agent. Do not fan out what one delegation can do.
- More than about five queued cards deserves a heads-up to the user about spend before dispatching more.
- Pin a cheaper or faster model per card for mechanical chores instead of changing a worker's default.

## Verification

- Every consequential card gets a verification pass that uses a different method than the producer: run it, test it, or check the source. Re-reading the same text is not verification.
- For high-stakes output, consider one independent pass through a different model family, and log whether it caught a material defect. Keep it only if it earns its cost.

## Escalation

- Blocked cards surface to the user in one line each, batched, never as a stream of pings.
- A card that fails twice stops and waits for a human. Automatic retry past two failures hides real defects.
- Boundary incidents stop the fleet immediately and go through the incident rule in the approval boundaries.

## Hygiene

- Fleet artifacts live in card workspaces or the exact paths a card names, never scattered through the user's folders.
- The board is the record. Decisions made in chat about a card get copied onto the card.
- Review board statistics weekly: completion rate, average corrections, and which worker's cards keep failing.
