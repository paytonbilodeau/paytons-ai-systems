# Shared Workspace and Handoff Protocol

## Cloud folders

```text
workspace/
  context/    pointers and small approved working context
  handoffs/   one file per cross-bot handoff
  outputs/    finished artifacts
  logs/       run records, source links, failures, and usage notes
  state/      roster, routine inventory, and the pilot scorecard
```

The cloud folders are shared working state. The user's own files remain the master memory.

## Handoff packet

Save one file per handoff, named with a UTC timestamp and task slug:

```text
TASK:
Exact desired outcome

CURRENT OWNER:
Bot responsible now

NEXT OWNER:
Bot receiving the work

SOURCES:
Links and exact file paths

COMPLETED:
What is finished and how it was checked

REMAINING:
What still needs work

APPROVAL STATE:
Allowed, approval required, or blocked

STOP CONDITIONS:
Conditions that must halt the next step

RETURN TO FRONT DOOR:
What the final result must contain
```

Do not put secrets, customer data, or private-marked material into a handoff unless the task requires it and the destination is approved.

## Consequential action packet

Before an external or difficult-to-reverse action, prepare:

```text
TASK:
REQUESTER AND VERIFIED AUTHORITY:
EVIDENCE:
TARGET:
PROPOSED ACTION:
TOOLS AND ACCESS:
SIDE EFFECTS:
REVERSIBILITY AND ROLLBACK:
WORST CREDIBLE IMPACT:
HUMAN APPROVER:
STOP CONDITIONS:
DEADLINE AND WHY:
AUDIT EVIDENCE REQUIRED:
```

Check four things:

1. Evidence: does the current source support the action?
2. Permission: may the requester and the bot authorize it?
3. Reversibility: is the rollback real and tested?
4. Impact: what is the worst credible outcome?

One failed check stops execution. A new target, cost, tool, recipient, or side effect requires a new review.

## Final result standard

The front door returns:

- the outcome;
- sources and file paths;
- what changed;
- validation performed;
- external state with exact status;
- anything not verified;
- the next decision only when the user must make one.

A bot's claim that it finished is not the evidence. Reopen the artifact or external system and check it.
