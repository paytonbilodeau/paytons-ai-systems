# Independent Skill Review

The reviewer receives the current skill, proposal, tests, and outputs. It does not receive the desired verdict.

| Gate | Pass condition | Result | Evidence |
|---|---|---|---|
| Reproduces failure | New test fails before the change | [pass or fail] | [receipt] |
| Fixes failure | New test passes after the change | [pass or fail] | [receipt] |
| Preserves behavior | Original tests still pass | [pass or fail] | [receipt] |
| Scope | Change addresses one observed failure | [pass or fail] | [diff] |
| Permissions | No access was silently widened | [pass or fail] | [review] |
| Privacy | No private input entered the package | [pass or fail] | [review] |
| Rollback | Snapshot can restore the prior version | [pass or fail] | [test] |

Recommendation: [approve, revise, or reject]. The user makes the final decision.
