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

## Approved source audio

When the user has approved the finished main and explicitly authorizes continued work using that approval plus audio-presence evidence, record that scope in `APPROVAL RECORD.md` and proceed without requiring another listening pass. Bind the acceptance to the approved source hash and record the actual audio-stream, visible-waveform or decoded-audio evidence. State whether anyone listened; waveform activity, a transcript and successful decoding are not listening evidence.

For each processed master or derivative, retain full audio/video decode, audio presence, expected duration and frame count, measured alignment, and complete spoken-word boundaries. For picture-only revisions, preserve the approved audio, compare against an independent same-length reference, and verify copied audio payloads when applicable. Keep actual crop, caption, editorial and claim checks. The included extraction tool's hash and duration checks do not perform all this review; record the additional evidence separately and resolve failures before delivery.

This policy carries forward source acceptance only. The named map and outputs still need approval, publication remains outside this system, and old completed review records need no rewrite. An unapproved edit or changed audio cannot inherit a listening claim from an earlier file.

## Clip selection and packaging

Choose the output count from the source's length and strongest complete, useful moments. Do not fill a fixed quota with weaker material; the production proof gate's sample counts are test coverage, not a recurring content target.

Compare candidate starts and endings across the source before choosing a range. The opening should establish the subject and a specific reason to keep watching without relying on missing context. Keep the explanation, example, or decision that pays off that opening, including any qualification needed to preserve the meaning. End after the useful thought is complete and before an unrelated aside or the next unfinished idea. Complete words at both boundaries are necessary, but do not by themselves make a strong clip. Record the opening words, closing words, and payoff in the content map, then check the actual exported boundaries at playback speed.

Record a title and social caption separately when the destination uses both fields. A social caption is not a substitute for a video title. Each should make a source-supported promise that the selected clip fulfills. Review the actual export's crop and text during the subject's greatest lean or turn, important action near the edges, the return movement, and the final frame. A clean opening still or valid map does not establish that the whole clip is framed well.

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
