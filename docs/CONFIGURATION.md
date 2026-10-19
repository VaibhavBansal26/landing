# Configuration
Set in `config.js` as `window.APP_CONFIG`. Anything missing or invalid disables the matching button (see `src/links.js`).

| Key | Default | Required | Example | Notes |
|---|---|---|---|---|
| `funnelsUrl` | `http://localhost:4100` | no | `https://funnels.example.com` | `http(s)` only, no embedded credentials |
| `conversationsUrl` | `http://localhost:4200` | no | `https://chat.example.com` | same rules |

Other environment: `PORT` (default 4000) for `npm run dev` / `npm start` only.
In Docker, mount your own file over `/usr/share/nginx/html/config.js`; the container serves it with `Cache-Control: no-store`.
