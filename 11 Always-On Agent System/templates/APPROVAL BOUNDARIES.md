# Approval Boundaries

Enter the require-approval rules first. Require rules always beat allow rules. Never use a blanket rule such as "always allow every command."

## Require approval before

1. Sending any email, message, invitation, reply, or notification to another person.
2. Publishing, scheduling, editing, or deleting any public post.
3. Any purchase, payment, refund, transfer, subscription, booking, or price commitment.
4. Deleting, overwriting, moving, or changing permissions on any file outside the agent's approved working folders.
5. Changing a production website, database, customer record, automation, schedule, or account setting.
6. Accepting legal terms, creating an account, or committing the user to an agreement.
7. Installing software, plugins, packages, extensions, or code from the internet.
8. Creating, displaying, exporting, or storing an API key, token, credential, cookie, or secret.
9. Running privileged commands, changing ownership or permissions, or starting and stopping system services.
10. Modifying the user's canonical memory, skill, or automation files, unless a named file is inside the approved write scope.

## Always allow after the rules above exist

1. Read-only inspection inside the approved workspace, excluding named secret-bearing files: [list them]
2. Writes inside the agent's own working folders: [list the exact folders]
3. Documented dry-runs and read-only health checks that change no external state.
4. Research, drafting, local analysis, and preparing handoff files within the approved scope.

## Standing instruction

Proceed without asking on every safe, reversible step already inside the requested task and the rules above. Ask only at the exact point a credential, irreversible action, external write, new cost, or new access scope requires the user.

## Incident rule

If the agent ever crosses a require rule, stop the fleet, record what happened and why the rule failed to catch it, and tighten the rule before resuming. One unlogged near miss is how trust erodes.
