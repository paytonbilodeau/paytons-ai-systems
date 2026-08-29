# Start Here: AI Workspace Setup System

Part of Payton's AI Systems, created and maintained by Payton Bilodeau.

Use this system to give a file-aware AI a clear working folder, safer permissions, suitable model choices, and a reliable setup for longer jobs.

If you use AI in several places, such as an editor, desktop app, web app, phone,
or voice tool, this guide also helps you define one canonical context source and
safe handoffs between those interfaces.

## Minimum AI capability

**Chat only** can guide the user through a manual checklist based on settings the user reports. **Local inspection** is needed to verify the computer directly, and **run named tools** is required for a test command. **Read files** verifies only the files the AI actually opens. The AI must separate user-reported settings from settings it verified itself.

## Give your AI this message

```text
Read this folder's START HERE.md, SYSTEM.md, every file in templates, tools/setup_doctor.py, and examples/EXAMPLE WORKSPACE PLAN.md. First tell me whether you can inspect local settings or only guide me. Mark every setting as user-reported or verified. Ask which AI interfaces I use and which can read the workspace directly. Propose one canonical context source, narrow permissions, backup and recovery, explicit handoffs, and a self-test. Run the setup doctor only after I approve the read-only command. Do not install software, change sleep behavior, change permissions, run other commands, or move files without approval. Save the approved plan under _MY WORK/AI Workspace Setup.
```

## Have these ready

- Mac or Windows version;
- the AI desktop app or web tool you use;
- VS Code, Antigravity, or another editor if you want folder-based work;
- every other AI interface you want to treat as part of the same working system;
- one folder the AI may use;
- your backup method;
- whether you run jobs longer than a few minutes;
- whether you prefer typing, built-in dictation, or another voice tool.

## A good first result

The result should define one clear folder, approval-based permissions, excluded secrets, a model choice tied to the task, and a tested plan for longer jobs. If several AI interfaces are involved, it should also identify the canonical context source, direct readers, mirrored files, and manual handoffs. If the AI cannot run the test, it should give the user a manual checklist and leave the state as unverified.
