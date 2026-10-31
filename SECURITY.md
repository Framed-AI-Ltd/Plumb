# Security policy

## Supported versions

Only the latest `0.x` release gets fixes until 1.0.

## Reporting a vulnerability

Please **don't open a public issue**. Report it privately through GitHub: **Security → Report a vulnerability** on this repository (private vulnerability reporting). Include the affected component or version, what an attacker could do, and steps to reproduce.

We aim to acknowledge reports within 3 working days and to agree on a fix and disclosure date with you.

## Scope notes

Plumb is a client-side component library. Things that matter most:

- **Private data in customer views.** `EstimateBreakdown view="customer"`, `SharePreview`, `CommentThread` visibility, and `CommandMenu hiddenCount` must never render contractor-only content. A leak is a security bug.
- **Rendering untrusted content.** Components render text as React text (escaped). Plumb never uses `dangerouslySetInnerHTML`. Contact links encode email addresses and strip phone numbers to digits.
- **Uploads.** `FileDrop` checks type and size in the browser for convenience only; servers must validate every file again.
- **Image URLs** (`MediaGrid`, `SourceViewer`, `ProviderCard`) are rendered as given; apps must only pass URLs they trust.
