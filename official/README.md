# QuikDB official one-click application sources

These are complete, minimal V1 applications used by the QuikDB server-owned template catalogue.
Each released catalogue version pins this repository to an exact commit and one subdirectory.

Every source has a production container, a public `/health` response with a stable marker, a
non-root runtime where the base image supports it, and no embedded customer secret. The versioned
`catalogue.json` is the release contract for identity, build/start behavior, environment needs,
resource estimates, compatibility, features, support state and health verification. The Device API
persists that contract and owns customer deployment configuration; browsers cannot override it.

Only the six applications in `catalogue.json` are official V1 one-click templates.
