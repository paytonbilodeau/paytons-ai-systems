# Consolidate Your Assistant Setup

Use this plan when several assistants, services, or schedules have become harder to maintain than the work they perform. Choose one primary assistant, preserve the useful work, and retire each duplicate only after its replacement is proven. A team can remain useful when it owns a distinct outcome; fewer running agents is a decision to test, not a promise of equal capability.

## Intended result

- **Primary assistant and working interface:** [choice]
- **Canonical context and skill folders:** [approved folder labels]
- **Work that must continue:** [outcomes]
- **Services or interfaces to retire:** [names]
- **Communication channels to retain or retire:** [explicit user choice]
- **Review owner:** [person]
- **Existing authorization and actions still needing approval:** [scope]

## Inventory before changing anything

| Outcome | Current executor and trigger | State and source files | Proposed owner | Replacement evidence | Status |
|---|---|---|---|---|---|
| [weekly review] | [app schedule or service] | [prompt, last receipt, pending work] | [primary assistant] | [safe rehearsal and result] | [inventoried] |

Check app schedules, operating-system jobs, editor startup tasks, hosted routines, worker processes, and updater jobs within the approved scope. Distinguish an AI executor from useful infrastructure such as file capture or delivery. Give each outcome one active owner. Record retained services explicitly so a broad cleanup does not stop unrelated work.

## Preserve context and recovery

1. Save useful instructions, custom skills, decisions, unfinished work, and completion receipts into the approved workspace. Keep a source record for imported material. Do not import raw chat histories or credentials without a separate scoped decision.
2. Mark retired instructions as history. Imported prompts cannot reactivate an old provider, restore a canceled schedule, or override current approval and privacy rules.
3. Complete `BACKUP RECOVERY.md`. Include the new schedule prompts and any retained custom context needed for restoration. Test one restore into a separate folder before relying on the backup.
4. Update the current router to name the primary assistant, its context source, and its real access limits. Retain compatibility files that a working tool still needs.

## Transfer one outcome at a time

1. Read the old workflow's inputs, cutoff dates, duplicate checks, approvals, last completed receipt, and pending work. Preserve those rules in the replacement.
2. Rehearse the replacement with copied data or a dry run. Inspect the artifact or target state. A saved prompt or schedule alone is not proof that it works.
3. At the approved handover, pause the old trigger and reconcile any running job. Enable the replacement only after confirming there will be one executor for the same outcome.
4. Check the first real run and its receipt. If it fails, preserve the result and determine whether it changed the target before retrying. Restore the old executor only with an explicit rollback decision and after disabling its replacement.
5. Inspect the retired trigger again after the next ordinary app or service restart. Record that it remained disabled. Preserve its configuration privately for recovery instead of silently leaving it as a competing fallback.

Use the primary assistant's supported scheduler when it meets the need. Keep a readable copy of each prompt in the workspace. Record whether execution requires the host awake, a network connection, or an open app. A missed-run check must use the same completion record and duplicate protection as the main trigger.

## Notifications and access

- **Allowed notification hours and timezone:** [user choice]
- **Explicit exceptions:** [none or approved conditions]
- **Pending result location:** [receipt or task]
- **Daytime catch-up and duplicate check:** [method]
- **Approved notification destination:** [task or channel]

Keep unchanged runs quiet while still recording what was checked. Save failures and deferred results for the next allowed window unless the user approved an exception. Preserve the original cutoff and action IDs when catching up. A request for one overnight update does not change the standing notification policy.

If a communication channel must survive the move, prove both incoming and outgoing access before disconnecting its old transport. If the user chooses to retire the channel, record that choice. An ordinary mobile chat is not proof that it can read the local workspace or resume the intended task.

## Completion record

- **Transferred and verified outcomes:** [list and receipts]
- **Old executors and triggers confirmed stopped:** [list and inspection time]
- **Retained infrastructure:** [list and reason]
- **Restored backup sample:** [file, comparison, and result]
- **Unverified or unreachable locations:** [list]
- **Remaining dependencies and capacity limits:** [facts]
- **Rollback location and owner:** [record]

Call the consolidation complete only for the locations and outcomes that were checked. Leave unreachable services and untested replacements open with a named next action.
