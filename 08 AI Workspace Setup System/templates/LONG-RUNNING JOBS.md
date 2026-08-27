# Long-Running Jobs

## Job

[What will run and expected duration.]

## Preconditions

- [ ] Computer is connected to power when needed.
- [ ] Enough storage is available.
- [ ] Network is stable or the job can resume.
- [ ] Inputs are copied and backed up.
- [ ] Output and log folders are set.
- [ ] The user approved any temporary keep-awake method.

## Checkpoints

[How often progress is saved and how a restart resumes.]

## Stop conditions

- missing input;
- failed validation;
- tool error;
- storage or network problem;
- unexpected request for broader access.

## Sleep plan

[Temporary method, operating-system version checked, start, end, and rollback.]

## Quiet finish

[How the log tells a run that found no work apart from a run that could not
finish, and when the user checks a scheduled job that has reported nothing.]

## Verification

[Output exists, result opens, log is complete, and temporary setting ended.]
