# Workspace Checklist

## System

- **Operating system and version:** [value]
- **Available storage:** [value]
- **Backup method and last successful run:** [value]
- **Primary AI app:** [value]
- **Editor:** [VS Code, Antigravity, other, or none]

## Shared assistant system

- **Canonical context source:** [folder or file]
- **Interfaces that read it directly:** [list]
- **Mirrored router or skill files:** [list or none]
- **Interfaces that need a manual handoff:** [list or none]
- **Synchronization check:** [what was verified and when]

## Working folder

- **Approved root:** [one folder]
- **Read locations:** [paths inside that root]
- **Write locations:** [paths inside that root]
- **Output folder:** [path]
- **Log folder:** [path]
- **Temporary folder:** [path]

## Excluded

- [Credential file or private category, not its contents.]

## Checks

- [ ] The source has a backup.
- [ ] The AI read the selected needed files during a harmless test.
- [ ] Any claimed read or write restriction names and verifies the enforcing
      app permission, operating-system control, sandbox, or container. A folder
      boundary by itself is not treated as enforcement.
- [ ] The AI can write a harmless test file in the output folder.
- [ ] Secret and unrelated folders are outside the workspace.
- [ ] The user knows where downloads and outputs land.
- [ ] The user can undo the setup.
- [ ] A safe longer test completed without sleep or data loss.
- [ ] Every connected interface reads the canonical context or has a current handoff.
- [ ] Mirrored instructions were compared after the latest change.

## Remaining manual steps

[Step and reason.]
