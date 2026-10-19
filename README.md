# Funnels & Conversations landing page

A dependency-free static page that is the entry point to two **separate, standalone** apps:
[Funnels](../funnels) and [Conversations](../conversations). It shares no code with them and talks to
neither at runtime; it only renders two links.

## Configure
Edit `config.js` (or replace it at deploy time):

```js
window.APP_CONFIG = { funnelsUrl: "https://funnels.example.com", conversationsUrl: "https://chat.example.com" };
```

Only `http(s)` URLs are accepted (see `src/links.js`). A missing or invalid URL disables that button.

## Run
```bash
npm run dev          # http://localhost:4000
npm test             # node:test, no install needed
npm run build        # outputs dist/
npm run package      # dist -> landing-dist.tgz
docker build -t landing . && docker run -p 8080:80 landing
```

To point the container at real apps without rebuilding, mount your own file:
`-v $PWD/config.js:/usr/share/nginx/html/config.js:ro`.
