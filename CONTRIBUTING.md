# Contributing
- Setup: Node 20+, no dependencies. `npm test` runs `node --test`; `npm run dev` serves the site on :4000.
- Commits: conventional (`feat:`, `fix:`, `docs:`). Update `CHANGELOG.md` and any affected doc in the same commit.
- Keep the page dependency-free and independent of the apps: the only coupling is the two URLs in `config.js`.
