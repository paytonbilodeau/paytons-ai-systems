# Filled Example: Local Workshop Workspace

This fictional example shows a manual plan for a user whose AI can write files but cannot inspect system settings or run commands.

## System

- **Operating system:** User reported a current desktop operating system. Version still needs an on-screen check.
- **Available storage:** User reported more than 20 GB free. Not verified by the AI.
- **Backup:** User reported that the working folder is included in a daily backup. Last successful run still needs a manual check.
- **Primary AI app:** Can read and write files in the selected working folder.
- **Editor:** None needed for the first task.

## Working folder

```text
AI Workspace/
  00 Inbox/
  01 Context/
  02 Projects/
  03 Outputs/
  04 Logs/
  05 Archive/
  99 Temporary/
```

- **Read:** `01 Context` and one selected folder inside `02 Projects`.
- **Write:** `03 Outputs`, `04 Logs`, and `99 Temporary`.
- **Excluded:** Password storage, financial records, health records, personal photo libraries, and unrelated project folders.

## Permissions

| Capability | Decision | Approval |
|---|---|---|
| Read selected files | Allowed inside the named folders | Approve when a new folder is added |
| Write outputs | Allowed in the three output folders | Review new filenames before a large batch |
| Run commands | Not available | Keep manual |
| Network access | Not needed for the first task | Ask if the task changes |
| Connected apps | None | Keep manual |

## Model choice

Use the normal model for organizing workshop notes. Test a stronger reasoning option only if the task becomes a multi-step plan and the normal result misses stated constraints.

## Longer job plan

- Connect the computer to power.
- Check the backup on screen.
- Run a harmless 10-minute file-sorting test with copied files.
- Keep the display setting unchanged.
- If the computer sleeps, stop and verify a current temporary keep-awake option before changing any setting.

## Verification state

- Folder read and write: Ready for a harmless test.
- Backup: User-reported, not verified.
- Sleep behavior: Not tested.
- Command access: Not available.
- Rollback: Delete the copied test outputs and remove the app's permission to the working folder.
