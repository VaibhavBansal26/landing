// Copies the static site into dist/. No bundling: the site is plain HTML, CSS and ES modules.
import { cpSync, rmSync, mkdirSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
for (const entry of ["index.html", "styles.css", "config.js", "src"]) {
  cpSync(entry, `dist/${entry}`, { recursive: true });
}
console.log("Built dist/");
