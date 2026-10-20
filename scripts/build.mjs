// Copies the static site into dist/. No bundling: the site is plain HTML, CSS and ES modules.
// FUNNELS_URL and CONVERSATIONS_URL (optional) overwrite dist/config.js, so a deploy can set the app links
// without editing the repo. Values are validated with the same rules the page uses at runtime.
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { normalizeUrl } from "../src/links.js";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
for (const entry of ["index.html", "styles.css", "config.js", "src"]) {
  cpSync(entry, `dist/${entry}`, { recursive: true });
}

const fromEnv = { funnelsUrl: process.env.FUNNELS_URL, conversationsUrl: process.env.CONVERSATIONS_URL };
if (fromEnv.funnelsUrl !== undefined || fromEnv.conversationsUrl !== undefined) {
  const config = {};
  for (const [key, raw] of Object.entries(fromEnv)) {
    if (raw === undefined || raw === "") continue; // unset: the button stays disabled
    const url = normalizeUrl(raw);
    if (!url) throw new Error(`${key}: "${raw}" is not a valid http(s) URL`);
    config[key] = url;
  }
  writeFileSync("dist/config.js", `window.APP_CONFIG = ${JSON.stringify(config, null, 2)};\n`);
  console.log("Wrote dist/config.js from environment:", Object.keys(config).join(", ") || "(no links)");
}
console.log("Built dist/");
