# Start Here: AI Memory and Reflection System

Part of Payton's AI Systems, created and maintained by Payton Bilodeau for AI Mentorship.

Use this system when your AI keeps asking for the same context, forgets the current version of a project, or makes decisions from stale information.

## Minimum AI capability

**Write files** is the best fit because the AI can create and update the memory files inside the approved working folder. A chat-only AI can still complete the templates as text, but the user must save them and load them again in future sessions.

## Give your AI this message

```text
1. Read this folder's START HERE.md, SYSTEM.md, every file in templates, and examples/EXAMPLE PROJECT MEMORY.md.
2. Help me create a small local memory system for one project or area of work.
3. Ask what the AI needs to remember, what changes often, what evidence should be saved, and what information must stay out.
4. Propose the smallest useful file set before creating anything.
5. Save the approved working files under _MY WORK/AI Memory and Reflection.
6. Use placeholders instead of credentials or private account details.
7. Set up a session-start instruction that loads MEMORY INDEX.md.
8. If you cannot save or automatically load files, say so and give me the exact text to save or paste manually.
```

## Have these ready

- one project or area of work;
- the few files that currently hold its best context;
- an example of something your AI recently forgot or got wrong;
- a clear boundary for information that should not enter memory.

## A good first result

Your first version should have an index, one context file, one current-state file, a decision log, and a receipt log. It should be small enough that you can correct it in a few minutes.

## Load it in future sessions

If the AI tool supports project instructions, save this instruction there after confirming the path:

```text
Read _MY WORK/Agent Memory/MEMORY INDEX.md before answering project questions. Follow its source-of-truth order, check PROJECT STATE.md for current work, and name the memory file that supports a factual answer. Do not add private information or change a memory file unless I approve it.
```

If the tool cannot load that file automatically, paste the instruction at the start of each relevant session. Test a fresh session before calling the memory setup complete.
