# Skill Catalog

Eighteen proven skill patterns from a working one-person AI setup, written as build recipes. Each one has run in real production; none of them is hypothetical. Pick the ones that match work you actually repeat, then build each with `templates/SKILL TEMPLATE.md` and test it with `templates/TEST CASES.md`. Do not build the whole catalog; a skill nobody triggers is inventory, not capability.

Each entry names the job, the trigger phrases to put in the skill description, the inputs, the output, and the safety line that experience says the skill needs.

## Writing and content

**1. Voice-note to finished draft.** Job: turn a rambling voice memo or transcript into a finished piece that still sounds like you. Trigger: "turn this into a post," "clean this up," a pasted transcript. Inputs: the raw speech and the target format. Output: the draft plus a list of what was changed. Safety: preserve the speaker's route through the idea; never invent claims they did not make.

**2. Writing quality gate.** Job: diagnose a draft in four layers, purpose, voice, padding, surface patterns, and fix the deepest first. Trigger: "does this read like AI," "check this before I send it." Inputs: the draft and its audience. Output: named findings with locations, then an edited version on request. Safety: detection quotes evidence; it never claims to prove authorship.

**3. Short-form script writer.** Job: write a spoken script with a graded hook, one idea, and a payoff inside the platform's length. Trigger: "write a short for," "script this idea." Inputs: the idea, the audience, three past scripts for voice. Output: the script formatted for reading from a phone, spoken copy separated from production notes. Safety: every factual claim traceable; hooks obey your packaging constitution.

**4. Title and thumbnail variants.** Job: produce packaging options and judge them with an honesty floor and a boldness obligation. Trigger: "titles for this," "thumbnail ideas." Inputs: the finished work and its real contents. Output: ranked options with the filtered ones named and the reason. Safety: no promised content the work does not contain.

**5. Repurposing mapper.** Job: mine one long recording for clips, posts, and email angles with timestamps back to source. Trigger: "what is in this recording," "repurpose this." Inputs: the transcript with timestamps. Output: a content map with exact quotes, approved before anything is produced. Safety: derivatives quote the source; no invented paraphrase presented as a quote.

## Communication

**6. Inbox triage.** Job: classify new email into action, waiting, and reference, and draft replies for the action pile. Trigger: "triage my inbox," a schedule. Inputs: read access to the mailbox. Output: labeled messages and unsent drafts. Safety: the skill never sends; sending stays a human act.

**7. Meeting ingest.** Job: pull the recording notes or transcript of a meeting you name, extract decisions and commitments, and file them where your memory system expects them. Trigger: "I had a meeting with," "what did we decide." Inputs: access to where transcripts land. Output: decisions, owners, dates, and exact quotes for anything consequential. Safety: quote the transcript rather than the auto-summary; summaries drift.

**8. Message catch-up digest.** Job: summarize unread group and direct messages across a period into what needs a reply, what changed, and what can be ignored. Trigger: "catch me up." Inputs: read access to the message export or app. Output: a short digest with reply drafts prefilled but unsent. Safety: prefill, never auto-send; transcripts stay local.

**9. Status report writer.** Job: assemble a weekly status update from the actual work record: commits, files changed, tasks closed, decisions logged. Trigger: "write my weekly update," a schedule. Inputs: the period and access to the work record. Output: a short update in your voice, outcomes first. Safety: the strongest true framing, never an untrue one.

## Operations and analysis

**10. KPI report.** Job: build a recurring metrics report ordered by business impact, comparing the current window against the previous one, from the real data sources. Trigger: "run the numbers," "how did last week go," a schedule. Inputs: named sources and the window rule. Output: one report file with every number traceable to its source. Safety: verify against the freshest source at delivery time; a stale cache that looks right is the classic miss.

**11. Research brief with verification.** Job: answer a question from primary sources with claims separated from inference, each with a link and date. Trigger: "research," "is it true that." Inputs: the question and any constraints. Output: a brief with a claims table and confidence levels. Safety: preserve what could not be confirmed instead of rounding it up to fact.

**12. Lead list builder.** Job: assemble a prospect list from public sources with dedupe, enrichment, and a verification pass before anyone acts on it. Trigger: "build a list of." Inputs: the target definition and approved sources. Output: a clean list with source per row. Safety: public data only, respect platform terms, and no outreach without a separate human-approved step.

**13. Scheduled job with a seeded test.** Job: any recurring automated send or publish, guarded by a seeded test run that a human sees before the real audience does. Trigger: the schedule itself. Inputs: the content source and the audience rule. Output: the test artifact, then the live run only after the test passed. Safety: never push unseeded; the test recipient is the gate.

## Media

**14. Video pre-edit pass.** Job: a conservative first cut of raw footage: silence removal, marked-restart detection, a report of every cut for human review. Trigger: "edit this recording." Inputs: the file and the cut rules. Output: an edit the final editor finishes, plus the cut report. Safety: marker-driven cuts only; automatic guessing about which take was wanted deletes real content.

**15. Audio enhancement handoff.** Job: send finished audio through a preset-based enhancement service and re-attach the result to the video. Trigger: "enhance the audio," naming a mic preset. Inputs: the file and the preset name. Output: the enhanced file plus the transcript artifacts the pipeline downstream expects. Safety: run only the step named; do not chain into publishing uninvited.

**16. Style-card image generation.** Job: generate images that match a locked visual style card, with text and logos composed in the scene in one pass. Trigger: the style's name. Inputs: the card, the concept, any official logo assets. Output: the image plus a QA pass at full size and phone size. Safety: real logos come from official assets and are never redrawn; misspelled or pasted-on text means regenerate, not patch.

**17. Publishing pipeline.** Job: take a finished piece through upload, thumbnail, post creation, and verification across your named destinations, with a receipt at each stage. Trigger: "ship it," "upload these." Inputs: the finished files and the destination map. Output: live links plus a receipt log. Safety: batch stages run as barriers across all items, and any step that makes content public confirms scope with the human first.

## Meta

**18. Skill health dashboard.** Job: an inventory of every skill you have: location, version, last real run, and drift between copies in different tools. Trigger: "skills status," a monthly review. Inputs: metadata only, never skill bodies or chat history. Output: the dashboard this system's `tools/skills_hq.py` builds. Safety: metadata only, and retirement is archiving, never deletion.

## Worked public references

Two complete, running examples of catalog patterns are public and free to study: a daily research-verify-write-publish news brief at [github.com/paytonbilodeau/today-in-ai](https://github.com/paytonbilodeau/today-in-ai), and an always-on personal agent installation at [github.com/paytonbilodeau/hermes-agent-kit](https://github.com/paytonbilodeau/hermes-agent-kit). Read them as references for shape and safety rails, then build yours against your own tools.
