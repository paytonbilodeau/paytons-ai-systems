# Visual Storytelling and Motion System

These instructions are for the AI helping the user.

## Goal

Turn approved narration into a beat-by-beat visual plan and neutral renderable motion package in which every visual supports the meaning.

## Four visual lanes

1. **Designed explanation:** Type, shapes, diagrams, numbers, and structure clarify an idea. Never imitate a real interface or document.
2. **Real footage as evidence:** Supplied footage, an official asset, or a verified recording proves what happened. Evidence is not decoration.
3. **Physical metaphor:** A simple physical relationship makes an abstract point easier to grasp without pretending the metaphor is evidence.
4. **Restrained hybrid:** One primary lane plus a small supporting element from another. Do not stack unrelated effects.

Use evidence when the viewer needs proof. Use explanation when the viewer needs understanding. A generated reconstruction is not real evidence and must not be presented as one.

## Process

1. Confirm the narration is approved and list factual claims.
2. Break it into beats with non-overlapping frame ranges.
3. Write the meaning of each beat before choosing a visual.
4. Choose one lane and explain the choice.
5. Record assets, source, rights, and whether an item is evidence or illustration.
6. Build captions around reading time and target-platform safe areas.
7. Complete fact parity before rendering.
8. Validate the JSON beat map with the supplied tool.
9. Storyboard the smallest useful motion. Avoid movement without a job.
10. Use the neutral starter or hand the render plan to another editor.
11. Render a short test, inspect readability and timing, and remove audio from transparent overlays.
12. Record the result and one improvement based on evidence.

## Motion rules

- Give each beat a clear entry, hold, and exit.
- Let important information settle before it leaves.
- Keep a stable hierarchy so motion does not compete with narration.
- Do not keep a source, date, provenance, or changing condition footer on
  screen when the main visual already explains the point. Put supporting
  metadata in the caption or source record unless attribution needs its own
  evidence beat.
- Use consistent easing, spacing, type, and color from the approved style card.
- Keep captions and important objects inside the target platform's safe area.
- Use deterministic timing. The same inputs should produce the same frames.
- Simulate physics once with a fixed timestep and fixed seed, then store transforms by frame. Do not run a live simulation inside a renderer that may request frames out of order.
- Derive physical-impact sound cues from the same stored frame data as the picture. Do not hand-time an impact that the rendered motion can prove.
- Give every emphasis sound a readable visual event on its exact rendered
  frame. A sound with no matching state change is an orphan cue and fails
  review.
- When a visual communicates direction or offset, move the value toward the
  side supported by the source and place its measurement label on that side.
- Transparent overlay renders contain no sound. Mix sound in the final editor using the separate SFX timeline.
- Do not animate invented evidence, fabricated screenshots, false numbers, or approximated logos.

## Optional generation adapter

Generation is an asset route, not the system. Before using it, record the provider, model, date, current price unit, expected number of attempts, privacy setting, usage right, and fallback in `PROVIDER COSTS.md`. Keep prompts source-grounded. If the provider is unavailable or unsuitable, use typography, shapes, supplied footage, or static authorized images.

For generated illustration or animation, use a keyframe-first preservation gate:

1. Generate or build the opening still from the approved style card.
2. Review the still for subject identity, line or shape language, palette, composition, safe areas, text surfaces, and factual accuracy before buying or rendering motion.
3. Prefer deterministic layer entrances, pose swaps, masks, accent fills, and text reveals when they can carry the beat.
4. Use an image-to-video model only when the action genuinely needs generated motion.
5. Ask for one primary action, a locked camera by default, no new objects or words, no identity or palette changes, and a final frame that settles as a complete composition.
6. Add exact words and official logos after generation. Do not rely on a video model to preserve either.
7. Review the opening, change, and settled ending. Reject drift even when the middle motion looks impressive.

Keep the style specification separate from the provider adapter. A model can change without changing the visual system.

## Test and evidence

Run `node --test tests/*.test.mjs`, then validate the filled beat-map JSON. Render a 5 to 10 second test only after the plan passes. Inspect the opening, busiest frame, caption hold, exit, alpha channel when needed, and absence of audio in an overlay. Build contact sheets from exact frame indexes so every label names the frame that was actually reviewed. For transparent work, probe exact frames inside each transition window and at an intended transparent gap. Save the commands, results, and reviewed frame indexes.

## Ten-run measurement

Use `TEN-RUN MOTION TRACKER.md`. Record planning, asset, render, review, and rework time; validation failures; fact corrections; render attempts; and whether the motion was approved. Do not infer views or sales from a render.

## Maintenance loop

After an observed failure, change one routing, timing, readability, or asset rule. Add a test when the failure can be checked mechanically. Re-run the neutral fixture and one reviewed sample before replacing a working version.

## Safety and human review

The user verifies narration, facts, rights, current provider terms, and the final render. Installing packages, downloading assets, spending money, or publishing requires separate approval. The starter does not contain private media or third-party marks.
