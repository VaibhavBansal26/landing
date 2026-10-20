import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const build = (env) =>
  execFileSync("node", ["scripts/build.mjs"], { cwd: root, env: { PATH: process.env.PATH, ...env }, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
const builtConfig = () => readFileSync(join(root, "dist", "config.js"), "utf8");

test("without env vars the repo config.js is copied unchanged", () => {
  build({});
  assert.equal(builtConfig(), readFileSync(join(root, "config.js"), "utf8"));
});

test("FUNNELS_URL and CONVERSATIONS_URL overwrite the built config", () => {
  build({ FUNNELS_URL: "https://funnels.example.com", CONVERSATIONS_URL: "https://chat.example.com" });
  const cfg = builtConfig();
  assert.match(cfg, /"funnelsUrl": "https:\/\/funnels\.example\.com\/"/);
  assert.match(cfg, /"conversationsUrl": "https:\/\/chat\.example\.com\/"/);
});

test("a missing URL leaves that link unset so its button is disabled", () => {
  build({ FUNNELS_URL: "https://funnels.example.com", CONVERSATIONS_URL: "" });
  const cfg = builtConfig();
  assert.match(cfg, /funnelsUrl/);
  assert.doesNotMatch(cfg, /conversationsUrl/);
});

test("unsafe or malformed URLs fail the build instead of shipping", () => {
  for (const bad of ["javascript:alert(1)", "not a url", "ftp://x.example", "https://u:p@x.example"]) {
    assert.throws(() => build({ FUNNELS_URL: bad }), /not a valid http\(s\) URL/, bad);
  }
});
