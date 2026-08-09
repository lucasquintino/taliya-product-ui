# Security Strategy

**Status**: planned; implementation blocked by `GATE-SDD-APPROVED`
**Primary requirements**: FR-032 through FR-035, FR-040 through FR-044
**Security boundary**: frontend component packages, their source/dependency/build/publish supply chain, and documented consumer obligations

## Current Security Conclusion

The runtime dependency graph was clean in the 2026-08-08 production audit: 0 low, 0 moderate, 0 high, and 0 critical findings. The full development/build/publish toolchain was not clean: 1 low, 3 moderate, 13 high, and 0 critical findings.

This distinction matters. A runtime-clean tarball can still be compromised by a vulnerable build or publish tool. Publication remains blocked until both relevant graphs meet the release policy.

Current GitHub workflows also use mutable major action tags rather than immutable commit SHAs. The publish workflow grants `id-token: write` but still supplies `NPM_TOKEN`, so trusted publishing is not yet the exclusive release identity. These are supply-chain gaps, not evidence of an active compromise.

## Trust Boundaries and Threats

| Boundary | Primary threats | Required control |
| --- | --- | --- |
| Contributor input -> source | malicious code, unsafe sink, secret insertion, dependency confusion | review, SAST, secret scan, rule gates |
| Dependency registry -> lockfile | compromised/transitive package, typosquat, vulnerable toolchain | frozen lockfile, dependency review, dual audits, allowlisted registry |
| Source -> CI runner | workflow injection, mutable action, excessive permission, untrusted script | SHA-pinned actions, least privilege, protected events/environment |
| CI -> package artifact | stale or substituted output, untracked generated code | clean build, source/artifact hashes, package allowlist, provenance |
| Release identity -> registry | token theft, unauthorized publish, wrong package/version | OIDC trusted publishing, protected environment, exact-artifact publish |
| Package -> consuming browser | XSS, unsafe URL, unsafe HTML, style/data leakage | typed safe defaults, protocol validation, documented trust contracts |
| Library -> consuming system | false claims about auth/tenant/backend controls | explicit responsibility matrix and integration security tests |

## Gate Set

| Gate | Minimum contract | Failure consequence |
| --- | --- | --- |
| `G-SEC-RUNTIME` | production dependency audit; 0 critical/high | block merge for introduced finding and block release |
| `G-SEC-TOOLCHAIN` | full dependency audit including build/publish path; 0 critical/high at release | block release |
| `G-SEC-SAST` | static analysis for TypeScript/React/workflows and unsafe patterns | block relevant change |
| `G-SEC-SECRETS` | full-history-aware secret detection for changed content and release source | block merge/release; rotate exposed material |
| `G-PACK` | allowlisted package files, no secret/source-map/private path leakage | block release |
| `G-PROVENANCE` | source, lockfile, workflow, artifact, SBOM, and attestations agree | block release |
| `G-RELEASE` | protected identity/environment publishes the already-certified artifacts | block publication |

Every gate has a controlled negative probe. A scanner command that reports a finding but exits zero is a gate failure.

## Dependency and Toolchain Policy

- Runtime and full-toolchain audits remain separate evidence artifacts.
- New critical/high findings block the introducing PR.
- Any critical/high finding in a tool used to build, test, sign, attest, or publish blocks release even if it is a dev dependency.
- Moderate/low findings require triage, owner, reachability/exploitability rationale, and removal target; they cannot be silently ignored.
- Lockfile changes trigger dependency review plus `G-SEC-RUNTIME` and `G-SEC-TOOLCHAIN`.
- Install uses the frozen lockfile and disables unapproved lifecycle scripts where feasible.
- New dependencies require ownership, license, maintenance, bundle-cost, and threat review.
- Overrides are time-bounded and cannot hide the underlying advisory from evidence.

## Secure React and Package Coding Rules

- `dangerouslySetInnerHTML`, direct DOM HTML assignment, `eval`, dynamic code construction, and equivalent sinks are forbidden unless an approved trust-boundary contract and sanitizer test exist.
- URLs supplied through props are validated against an allowlist of protocols; `javascript:`, untrusted `data:`, and ambiguous protocol-relative values are rejected where navigation can occur.
- Components do not interpolate untrusted values into executable CSS, selector, URL, or HTML contexts.
- External links receive an explicit navigation/referrer policy appropriate to the contract.
- Logs, thrown errors, stories, fixtures, and artifacts contain no credentials, tokens, personal production data, or machine-local secrets.
- Browser storage, authentication tokens, tenant identifiers, and permission decisions are not owned by this library.
- File-upload components present prepared state/callbacks; the consumer owns MIME/content validation, scanning, storage, authorization, and size enforcement.
- Public callbacks expose intent, not privileged execution. The consuming application authorizes every sensitive action.

## Workflow and Publication Hardening

- Pin every third-party action to a reviewed immutable commit SHA; retain the human-readable release tag in a comment or update record.
- Declare workflow and job permissions explicitly; default to `contents: read` and grant only the minimal additional permission.
- Do not expose secrets to untrusted pull-request code or interpolate untrusted values into shell scripts.
- Protect the npm release environment with required reviewers and branch/tag policy.
- Use npm trusted publishing/OIDC as the primary identity; remove long-lived automation tokens from the normal path.
- Build once from a clean certified revision, hash artifacts, test those exact tarballs, and publish those exact tarballs without rebuilding.
- Generate SBOM and signed provenance/attestation tied to commit, lockfile, workflow, and artifact hashes.
- Enforce package content allowlists and reject unexpected files, source maps containing private source/path data, workspace references, or undeclared dependencies.
- Synchronize package versions and changelog/changeset decisions before certification.

## Library vs Consuming-System Responsibilities

| Library guarantees | Consuming system must guarantee |
| --- | --- |
| safe rendering defaults and controlled sinks | authentication and session management |
| accessible presentation of allowed/blocked state | authorization and tenant isolation |
| typed prepared-data/callback contracts | backend validation and ownership checks |
| protocol-safe link components where provided | CSP, CSRF protection, secure headers, rate limiting |
| no bundled secrets or production data | secret storage, encryption, audit logging, incident controls |
| UI states for upload/payment/agent actions | file scanning, payment enforcement, billing entitlements, agent/tool authorization |

Storybook states such as `blocked-permission` demonstrate presentation only. They are not authorization controls.

## Waiver and Severity Rules

A normal waiver cannot accept secret exposure, data exfiltration, unauthorized publication, malicious package substitution, or equivalent irreversible critical risk. Critical/high release-path dependency findings block publication. Any permitted lower-severity exception must be exact in rule and scope, risk-assessed, owned, approved, linked to a removal issue, protected by compensating controls, and expire within the policy window. An active waiver yields the machine-readable status `risk-accepted`, never `100% conformant` or unqualified certification; human reports may display "accepted risk" without changing that serialized value.

## Incident and Recovery Contract

If a secret, malicious dependency, unauthorized publication, or artifact mismatch is detected:

1. stop publication and consumer recommendation;
2. revoke/rotate affected credentials and identities;
3. preserve logs, hashes, provenance, and affected versions;
4. deprecate or unpublish only through the registry incident policy;
5. notify known consumers with affected versions and mitigations;
6. rebuild from a known-clean revision and re-run every release gate;
7. record root cause and add a negative probe or policy improvement.

## Phase Plan

1. P1 establishes security rule IDs, owners, severity, waiver policy, and library/consumer responsibility boundaries.
2. P2 supplies the deterministic runner, provenance schema, exit propagation, and negative-probe infrastructure used by security gates.
3. P3 establishes the generic packed-consumer/browser infrastructure consumed later by security checks; it does not certify unsafe HTML/evaluation or URL-protocol sinks.
4. P7/T165 inventories and guards unsafe HTML/evaluation and URL-protocol sinks, while the rest of P7 resolves runtime/toolchain findings, adds dependency review/SAST/secret detection, pins workflow actions, minimizes permissions, validates package exposure, and moves release identity to protected trusted publishing.
5. The later release-certification phase consumes current P7 evidence while certifying and publishing the exact artifacts; it does not defer security implementation to release time.

## Exit Criteria

Security hardening is complete only when the runtime and release-toolchain policies pass, actions are immutable, permissions are least-privileged, secret and static scans are blocking, unsafe sinks have zero unapproved occurrence, package contents/SBOM/provenance agree, protected OIDC publishing releases the exact tested artifacts, and system-level responsibilities are not misrepresented as library guarantees.
