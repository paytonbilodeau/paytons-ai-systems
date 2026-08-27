# Test Plan

## Success standard

[Observable result that must be true.]

## Test data

[Use safe sample data or copies. Do not use a live irreversible task first.]

## Cases

| Case | Input | Expected result | Risk checked | Result |
|---|---|---|---|---|
| Normal | [input] | [expected] | [check] | [pass or fail] |
| Missing input | [input] | Stop with clear reason | [check] | [pass or fail] |
| Bad format | [input] | Reject or request correction | [check] | [pass or fail] |
| Exception | [input] | Route to human review | [check] | [pass or fail] |
| Repeat run | [same input] | No duplicate action | [check] | [pass or fail] |
| Instruction inside input | [input containing a request to change the process] | Treat it as data and follow the approved automation rules | [check] | [pass or fail] |
| Nothing to do | [input that needs no action] | Report that no work was found, not silence | [check] | [pass or fail] |
| Unprocessable input | [input the tool cannot read] | Skip it, count it, and name it in the log | [check] | [pass or fail] |
| No real change | [input the automation cannot improve] | Discard the result instead of recording a change | [check] | [pass or fail] |

## Review gate

If a step approves or rejects results, record how many it approved and how many
it rejected, with the reason for each rejection. A gate that approves nothing
across several runs is investigated before the pilot is judged.

| Runs | Approved | Rejected | Most common reason |
|---|---|---|---|
| [count] | [count] | [count] | [reason] |

## Comparison

| Measure | Manual | Pilot |
|---|---|---|
| Run time | [minutes] | [minutes] |
| Review time | [minutes] | [minutes] |
| Errors | [count] | [count] |
| Rework | [minutes] | [minutes] |

## Decision

[Keep, revise, reduce scope, or retire.]
