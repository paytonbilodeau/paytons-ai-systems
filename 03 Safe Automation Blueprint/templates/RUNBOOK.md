# Runbook

## Purpose

[What this automation does.]

## Owner

[Person responsible for review and changes.]

## Start

[How a run begins.]

## Inputs

[Required files, fields, or events.]

## Normal run

1. [Step.]
2. [Step.]
3. [Review point.]
4. [Receipt location.]

## Stop conditions

- [Condition that ends the run without taking action.]

## Quiet run

[What a run that produces no output means, where the log shows the difference
between no work found and work that could not be done, and how long a quiet
streak may last before someone checks it.]

## Recovery

1. [How to preserve the failed input and log.]
2. [How to return to the last safe state.]
3. [How to use the manual fallback.]

## Retry boundary

- **Temporary failures allowed to retry:** [exact signatures]
- **Failures that must stop:** [authentication, permission, conflict, validation, unknown]
- **Durable state checked before retry:** [identifier, receipt, or target state]
- **Maximum attempts and delay:** [values]
- **Known repair, if any:** [exact signature, bounded repair, preserved baseline, and test]

## Verification

[How to prove the main action completed, how to check later service health, and which full stable identifier or receipt supports each result.]

## Maintenance

[Tests and required settings to recheck after a tool, instruction, permission, or third-party update, plus the rollback condition.]
