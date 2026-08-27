# AI Skills and Automation Pack Orchestrator

This pack contains Systems 02 and 03. It turns one successful instruction or recurring task into a tested skill, then adds automation only when the task is stable enough to run safely.

## Fast first win

Turn one conversation or repeated instruction that already worked into a skill with two passing examples and one failure case. Do not begin with account connections.

## Build in this order

1. Use System 02 to define the trigger, steps, output, examples, failure boundaries, and tests.
2. Run the skill manually at least three times.
3. Use the metadata-only Skills HQ to record its location, version, tests, and usage. It does not copy the skill body or read private chats.
4. Use System 03 only if a repeated step is measurable, recoverable, and worth automating.
5. Keep sends, purchases, publishing, deletion, and permission changes behind visible approval.

Copy `templates/SYSTEM ROI TRACKER.md` into `_MY WORK`. Record ten real runs and compare total setup, run, review, error, and rework time. A faster run that needs more correction is not a win.

## Give your AI this message

```text
Read this orchestrator, READ ME FIRST.md, SETUP GUIDE.md, and the START HERE.md files for Systems 02 and 03. Ask for one repeated instruction or task that has already produced a good result. Build and test the smallest skill first. Record only metadata in Skills HQ. If the skill is stable after real runs, score one automation pilot. Never apply a skill improvement automatically, widen access, connect an account, send, publish, delete, or buy without my approval. Save approved work under _MY WORK/Skills and Automation and record ten real runs.
```
