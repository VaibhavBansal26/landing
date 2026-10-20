# Deploying the landing page for free

The page is static, so the zero-signup option is **GitHub Pages** (included with your GitHub account).
The address will be `https://<your-github-user>.github.io/landing/` (`https://vaibhavbansal26.github.io/landing/` for this repo).

## Steps
1. Repo **Settings > Pages > Build and deployment > Source: GitHub Actions** (one time).
2. Repo **Settings > Secrets and variables > Actions > Variables**: add `FUNNELS_URL` and `CONVERSATIONS_URL` with the public addresses of the two apps once they are deployed (see their `docs/DEPLOY.md`). A link whose variable is unset stays disabled on the page.
3. **Actions > deploy-pages > Run workflow.** The workflow runs the tests, builds with those variables, and publishes.
4. Open the address. Re-run the workflow whenever the app URLs change.

The workflow is `workflow_dispatch` only: nothing is published until you run it.

## How the URLs get into the page
`npm run build` copies the site to `dist/`. If `FUNNELS_URL` / `CONVERSATIONS_URL` are set it writes `dist/config.js` from them; the build fails on anything that is not a plain `http(s)` URL (no `javascript:`, no embedded credentials). Without them the committed `config.js` (localhost defaults) is used.

```bash
FUNNELS_URL=https://funnels.example.com CONVERSATIONS_URL=https://chat.example.com npm run build
```

## Other free hosts
Any static host works: Cloudflare Pages (`yourname.pages.dev`, build command `npm run build`, output `dist`, set the two variables in its settings) or Netlify. Use the same two variables.

## Custom domain
GitHub Pages: Settings > Pages > Custom domain, then add the DNS record it shows. A domain costs money (roughly $10 a year); `github.io`, `pages.dev` and `netlify.app` addresses are free.
