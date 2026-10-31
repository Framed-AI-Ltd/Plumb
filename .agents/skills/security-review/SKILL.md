---
name: security-review
description: Review Plumb data boundaries, secret handling and supported security behavior.
---

Identify actual entry points, public/customer serializers, trust boundaries and dependencies in the change. Review untrusted text/HTML, URL handling, authorization claims, private fields, logging and accidental secret inclusion. Preserve unknowns and explicit draft acceptance.

Never inspect .env, AWS credential files or production credentials. Use synthetic fixtures. UI controls do not implement server authorization: this package has no verified authentication backend. Document consumer/server responsibilities without inventing a service.

Run Semgrep rules and fixtures, plus focused tests for the reachable boundary. Explain that syntax rules are guardrails, not a proof of confidentiality. Every confirmed catch needs same-PR executable feedback or the documented AGENTS fallback. Report untested paths and dependency findings with evidence.
