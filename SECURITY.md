# Security boundary

This repository publishes a presentation-only React component library. Package code does not provide consumer authentication, authorization, tenant isolation, CSP/CSRF enforcement, rate limiting, storage protection, backend audit logging, or secret management. Those controls belong to the integrating application and its infrastructure.

Consumers must validate untrusted data, choose a secure CSP, protect CSRF/session tokens, enforce authorization and tenant boundaries server-side, apply rate limits, and monitor backend audit trails. The library only enforces its own package direction, unsafe-sink, dependency, provenance, and release checks.

Report a suspected library vulnerability privately to the maintainers before public disclosure.
