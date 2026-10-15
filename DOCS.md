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

The V1 release pinned by Device API is source commit
`7b5fc3023820a6613204f132c593c2734860d26d`. Its independent exact-commit gate passed all six
build, zero-high/critical scan and live-health checks in
`quikdb/quikdb-templates` Actions run `38746049261`.
