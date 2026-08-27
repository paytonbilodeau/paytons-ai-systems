# Content Waterfall System

These instructions are for the AI helping the user.

## Goal

Turn one approved long source into selected long cutdowns, mid-length clips, shorts, email and text drafts, and captions that remain traceable to the source.

## Source-grounded process

1. Record the audience, source label, hash, duration, and approved privacy boundary.
2. Create or import a transcript. Exact captions require real word start and end times.
3. Build `CLAIM LEDGER.md` with one ID for each usable source claim.
4. Create a content map with source ranges, claim IDs, format, title, and intended result.
5. Check that a derivative adds no unsupported fact, result, quote, or implication.
6. Show the entire map and obtain a separate approval record.
7. Validate the JSON map before extraction.
8. Extract only approved video items into a new folder.
9. Rebase exact word timestamps for each clip and create captions.
10. Draft platform packages manually from approved claims. Keep publication manual.
11. Review A/V sync, crop, caption readability, claim fidelity, source immutability, and output receipts.
12. Record performance only after publication, then write the next-capture brief without changing source facts.

## Output ranges

- **Long cutdown:** 2 to 30 minutes.
- **Mid-length clip:** 5 to 20 minutes.
- **Short:** 20 to 90 seconds.
- **Email, text post, and caption:** Any positive approved source range with at least one claim ID.

These ranges are product defaults, not platform guarantees. Check current platform limits before delivery.

## No-new-claims rule

A content map proves traceability, not truth by itself. Every output must cite claim IDs that exist in the ledger, and a person must compare the draft with the cited source. Do not invent context, numbers, outcomes, quotes, endorsements, chronology, certainty, or causal claims. When a transition needs context the source does not contain, label it for the user's addition and reapproval.

## Local tool boundary

`transcript_adapter.py` normalizes supplied segment and word timing. It does not transcribe. `content_waterfall.py` validates the map, rebases exact word timings, creates VTT captions, and extracts approved clips with FFmpeg. It refuses absolute paths in shared data, checks the source hash, uses a new output directory, and verifies that the source hash did not change.

The included tool uses static crop and source dimensions. Dynamic face tracking is not included or claimed. An editor may use the validated map as an EDL-style handoff instead.

## Test and evidence

Run both Python test files. The synthetic end-to-end test creates neutral audio and video, validates a map, extracts an approved short, probes its duration, rebases captions, and verifies the source hash. Then run the documented production proof gate in `CURRENT LIMITS AND PROOF.md`. Synthetic evidence proves mechanics only.

## Ten-run measurement

Use `TEN-RUN CONTENT TRACKER.md` and `PERFORMANCE LEDGER.md`. Record transcript, map, approval, extraction, review, and rework time; output count; rejected items; claim corrections; actual provider cost; and source hash. Performance is descriptive and does not prove causation.

## Maintenance loop

After ten runs, use `WINNER REVIEW.md` to compare approved formats, topics, openings, and failures. Change selection rules only when repeated evidence supports the change. Never rewrite source facts to fit a past winner. Put capture improvements in `NEXT CAPTURE BRIEF.md`.

## Safety and human review

Use copied or low-consequence source material for the first run. Keep the original immutable. The user separately approves the content map, reviews every derivative, confirms rights and privacy, and performs publication outside this system.
