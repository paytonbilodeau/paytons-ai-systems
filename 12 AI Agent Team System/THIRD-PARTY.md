# Third-Party and Dependency Notes

This system is a method for running an agent team on a hosted bot platform. It ships no platform, no account, and no connector.

## Hosted bot platforms

- Several vendors sell hosted agent products where bots run on cloud computers, connect to accounts, and execute routines. Features, usage limits, model access, security model, and prices change often. Verify everything against current official documentation before relying on it.
- Understand the security model before connecting anything: on many platforms every bot shares one cloud computer, so every login is available to the whole roster, and platform staff or subprocessors may have their own access paths under the vendor's policies.
- The platform's approval and review features are vendor code. Test that they actually block what they claim to block, using the acceptance tests, before trusting them.

## Connected accounts

- Each connector grants the platform standing access to a real account. Read the requested scopes, connect the narrowest account that can do the job, and record the revoke path before connecting.
- Client, financial, medical, and legal material deserves its own decision: many vendor terms and professional obligations restrict routing such data through a third-party cloud.

## Subscriptions and spend

- A paid pilot should have an end date and a keep-or-cancel test written before the first payment renews. The scorecard in this folder exists for that decision.
- Watch for usage-based charges on top of the subscription, and for the platform quietly preferring its own paid add-ons.

## Not included

- no platform recommendation that survives contact with current pricing pages;
- no uptime, security, or data-handling guarantee for any vendor;
- no connector setup performed for you;
- no promise that a platform's current free tier stays free.

This file describes dependencies and boundaries; it is not legal advice.
