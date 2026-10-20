# Changelog
All notable changes are recorded here. Format: Keep a Changelog; versioning: semver.

## [Unreleased]
### Added
- `FUNNELS_URL` / `CONVERSATIONS_URL` build variables, validated like the runtime config.
- Manual `deploy-pages` workflow for GitHub Pages and `docs/DEPLOY.md`.

## [1.0.0]
### Added
- Static landing page linking to the standalone Funnels and Conversations apps.
- Runtime configuration through `config.js`; only `http(s)` URLs without credentials are accepted.
- Dockerfile (nginx with a strict CSP) and CI workflow.
