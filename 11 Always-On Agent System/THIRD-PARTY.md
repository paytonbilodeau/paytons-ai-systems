# Third-Party and Dependency Notes

This system is a design and operating method. It ships no agent software. The runtime, the messaging channel, and the AI subscriptions are all third-party choices the user makes and pays for separately.

## Agent runtime

- Several open-source always-on agent runtimes exist, and the field changes quickly. Verify the current official documentation, license, update cadence, and security posture of any runtime before installing it.
- Prefer a runtime that authenticates through a subscription you already pay for, keeps credentials in a supported secure store, and can run additional headless profiles for workers.
- A worked reference for one specific runtime, written by this library's author and installed end to end by a file-aware AI, is public at [github.com/paytonbilodeau/hermes-agent-kit](https://github.com/paytonbilodeau/hermes-agent-kit). Treat it as one concrete example, not as the only valid runtime.

## Messaging channel

- Connecting an agent to a personal messaging account may be restricted by that platform's terms of service. Verify current terms and prefer officially supported bot or integration routes where they exist.
- The channel provider can see message metadata and content according to its own policies. Do not route confidential material through a channel you have not evaluated.

## AI subscriptions and billing

- Flat-rate subscriptions and metered API access behave very differently under an always-on agent that can run work at any hour. Pin which subscription or account each provider connection uses, and require approval before enabling any new paid provider or key.
- Included-usage limits, model names, and prices change. Check current official pricing pages before relying on a cost assumption.

## Not included

- no bundled runtime, binary, or installer;
- no messaging credentials or channel setup performed for you;
- no hosted service, uptime guarantee, or support plan;
- no promise that any specific runtime remains maintained.

This file describes dependencies and boundaries; it is not legal advice.
