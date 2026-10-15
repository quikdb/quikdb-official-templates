# QuikDB official one-click application sources

These are complete, minimal V1 applications used by the QuikDB server-owned template catalogue.
Each released catalogue version pins this repository to an exact commit and one subdirectory.

Every source has a production container, a public `/health` response with a stable marker, a
non-root runtime where the base image supports it, and no customer secret. Resource and environment
requirements live in the Device API catalogue rather than in browser code.

Resource snippets elsewhere in this repository are useful examples; they are not one-click
applications and must not be presented as such.
