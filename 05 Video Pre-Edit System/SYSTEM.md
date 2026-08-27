# Video Pre-Edit System

These instructions are for the AI helping the user.

## Goal

Create a reversible, reviewable first edit that removes the easy work without making creative decisions for the editor.

The included `tools/video_pre_edit.py` is the maintained reference implementation. It uses local FFmpeg and ffprobe. Its core does not need a Python package or paid API.

## Safe default

Make a cut only because:

- FFmpeg detected a quiet pause using the approved threshold and padding;
- the speaker used an exact agreed restart marker and local timed words found it;
- the user supplied an exact `--cut START-END` range;
- the user reviewed and approved the dry-run report.

Do not guess that a repeated idea is a bad take. Teaching and natural speech repeat useful points, and similarity alone can delete wanted content.

## Process

1. Confirm a flattened SDR source with one video and one audio track, plus a new `.mp4` output path.
2. Keep the original unchanged.
3. Check the video's duration and streams. Reject HDR, high-bit-depth, multivideo, or multiaudio input and ask for a flattened SDR copy.
4. Ask the setup questions in `PRE-EDIT BRIEF.md`.
5. Confirm Python 3.11+, FFmpeg, and ffprobe. Do not install or download anything without approval.
6. Choose the exact silence, approved-range, protected-range, marker, and audio options.
7. Mark any protected media or music ranges.
8. Run `--dry-run`, show the dry-run report and generated plan, and wait for approval.
9. Render a short copied test with `--from-plan` so every approved option carries forward.
10. Write a report with every cut and reason.
11. Verify the output opens, has audio and video, and has the expected duration.
12. Ask the user to review the flagged cuts before wider use.

## Restart rules

The user may choose other phrases. Payton's current working pattern uses:

- `cut cut`: remove the spoken mistake and marker, then keep the corrected restart;
- `full stop restart`: discard earlier material and begin after the last marker.

Marker detection is off by default. It requires `--detect-restarts` plus either local Whisper or `--words-json`. The phrase match is exact. If the transcript looks corrupt, the tool disables transcript-driven cuts and reports the fallback.

The full-restart rule is also off by default. It requires both `--detect-full-stop-restart` and `--confirm-full-restart`. It can remove a large opening and refuses to cross a protected range.

## Silence and media rules

- Silence cutting is on by default at a conservative `-40 dB`, `0.8` second minimum, with `150 ms` kept on each side. Use `--keep-silence` to disable it.
- Adjust one setting at a time after reviewing a dry run.
- Preserve deliberate pauses when the user wants a slower pace.
- Add each clip, music section, generated sound, or deliberate pause as a repeatable `--protect START-END` range using original-source timestamps.
- Do not use this tool directly on HDR, multicamera, multitrack audio, subtitle-bearing, or edit-master media. Make a flattened SDR working copy.

## Audio rules

Audio cleanup is off by default. `--enhance-audio` applies local high-pass and low-pass filters, light EQ, compression, measured fixed gain toward `-16 LUFS`, and a `-1.5 dBFS` limiter ceiling. Fixed gain avoids the opening volume ramp that dynamic normalization can create.

This is a practical speech starting point, not certified true-peak delivery compliance. Meter again in the final editor when a platform or client has a delivery specification.

The tool does not call paid audio services.

## Output rules

- The source is never an allowed output.
- Existing outputs and reports are refused unless the user explicitly supplies `--overwrite`.
- Rendering happens in a temporary folder, then the tool verifies the video stream, audio stream, and planned duration before moving it to the approved output.
- The output is a standard 8-bit H.264/AAC MP4. Video is re-encoded. Source metadata is stripped, and the encoder may add new technical tags. Subtitle streams, chapters, extra audio or video tracks, HDR, and high-bit-depth inputs are rejected before rendering.
- Reports use basenames, not full local paths, and do not include transcript text.

## Report rules

Record:

- each removed time range;
- the reason for each cut;
- each protected range;
- source and output duration;
- total time removed;
- audio processing applied;
- transcript warnings;
- any single long cut;
- any choice that still needs human review.

Flag a total reduction above 45 percent and every cut longer than 15 seconds. Every spoken-marker cut is marked for review.

## Success check

The output exists as a new file, contains one video and one audio stream, has the planned duration, preserves protected content, matches the approved rules, and has a report that lets a human review every important change. The user, not the tool, approves the edit.

## Test and evidence

Run `tools/setup_doctor.py`, then the unit tests and synthetic FFmpeg test in `tests`. Save the dry-run plan, rendered-copy hash, source hash, media probe, and edit report. A passing fixture does not approve cuts in a real recording.

## Ten-run measurement

Use `TEN-RUN EDIT TRACKER.md`. Record source length, dry-run time, render time, review and rework, proposed and rejected cuts, protected-range failures, and whether the handoff was usable.

## Maintenance loop

Save a known-good edit profile only after repeated reviewed runs. Re-run setup and fixture tests after Python, FFmpeg, operating-system, or optional-model changes. Keep the prior profile until the new one passes.

## Safety and human review

Keep the source immutable and use a new output name. The tool prepares a first pass, not the final creative edit. A person watches the result, checks every flagged cut, and approves the editor handoff.
