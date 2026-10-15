# quikdb-official-templates

Last updated: 2026-10-15

## Purpose

Public, immutable source for the six QuikDB V1 one-click application templates. Device API pins an
approved release commit and subdirectory; customer browsers cannot override the source, runtime,
port or resource profile.

## Release gate

`.github/workflows/v1-official-templates.yml` validates the catalogue, builds every template,
starts it, checks its unique `/health` marker, scans the image and rejects any unresolved high or
critical vulnerability. A Device API release must reference the exact successful workflow run.
