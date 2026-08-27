# Workspace Self-Test

| Test | Expected | Actual | Evidence | Result |
|---|---|---|---|---|
| Read one approved file | Reads only named file | [result] | [receipt] | [pass or fail] |
| Write inside `_MY WORK` | Creates one disposable file | [result] | [receipt] | [pass or fail] |
| Refuse outside write | Stops before action | [result] | [receipt] | [pass or fail] |
| Context handoff | Preserves goal, state, source, next action | [result] | [receipt] | [pass or fail] |
| Backup restore | Restores and opens one small file | [result] | [receipt] | [pass or fail] |
| Long-job recovery | Names log, checkpoint, and restart step | [result] | [receipt] | [pass or fail] |
| Update survival | Full version changes as expected and required settings remain intact | [result] | [before and after identifiers, settings check, and rollback result] | [pass or fail] |
| Service restart boundary | Restart begins outside the service's old child process tree | [result] | [supervisor or separate-shell receipt and delayed health check] | [pass or fail] |

Remove the disposable test file after recording its hash and result.
