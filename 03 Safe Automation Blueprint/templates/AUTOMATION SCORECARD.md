# Automation Scorecard

Score each item from 0 to 2.

| Check | 0 | 1 | 2 | Score |
|---|---|---|---|---|
| Frequency | Rare | Monthly | Weekly or daily | [0-2] |
| Digital inputs | Mostly offline or missing | Mixed | Available and readable | [0-2] |
| Repeatable steps | Different every time | Some repeated steps | Mostly the same | [0-2] |
| Quality standard | Vague | Human can judge | Observable and testable | [0-2] |
| Consequence | High or hard to reverse | Needs review | Low and reversible | [0-2] |
| Tool access | Blocked | Partial | Available | [0-2] |
| Measured value | Unknown | Likely | Time or cost is measured | [0-2] |

## Total

[0-14]

- **10-14:** Candidate for a small pilot if every risk gate passes.
- **6-9:** Improve the inputs or automate one smaller step.
- **0-5:** Keep it manual for now.

## Risk gate

Answer yes or no:

- Is the task outside financial, medical, legal, tax, employment, security, and safety decision-making or final action?
- Can a human review the result before an important action?
- Can a bad run be stopped or reversed?
- Can the system avoid credentials and unrelated private data?
- Is there a manual fallback?
- Can the result be checked against a clear standard?

If the first answer is no, the automation may prepare information but the decision and final action stay manual. If any other answer is no, reduce the scope or keep the task manual.

## Recommendation

[Pilot, reduce scope, improve inputs, or keep manual. Explain with the score and risk gate.]
