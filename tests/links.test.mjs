import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { normalizeUrl, resolveLinks } from "../src/links.js";

test("normalizeUrl accepts http and https", () => {
  assert.equal(normalizeUrl("https://funnels.example.com"), "https://funnels.example.com/");
  assert.equal(normalizeUrl("  http://localhost:4100  "), "http://localhost:4100/");
});

test("normalizeUrl rejects unsafe or malformed values", () => {
  for (const bad of [
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    "data:text/html,<script>1</script>",
    "ftp://example.com",
    "//example.com",
    "example.com",
    "https://user:pass@example.com",
    "",
    "   ",
    null,
    undefined,
    42,
    {},
  ]) {
    assert.equal(normalizeUrl(bad), null, `should reject ${String(bad)}`);
  }
});

test("resolveLinks maps config keys and tolerates bad config", () => {
  assert.deepEqual(
    resolveLinks({ funnelsUrl: "https://f.test", conversationsUrl: "https://c.test" }),
    { funnels: "https://f.test/", conversations: "https://c.test/" },
  );
  assert.deepEqual(resolveLinks({ funnelsUrl: "https://f.test" }), {
    funnels: "https://f.test/",
    conversations: null,
  });
  for (const config of [undefined, null, "x", 3, []]) {
    assert.deepEqual(resolveLinks(config), { funnels: null, conversations: null });
  }
});

test("index.html wires both product links and the config script", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /<script src="config\.js">/);
  assert.ok((html.match(/data-product-link="funnels"/g) ?? []).length >= 2);
  assert.ok((html.match(/data-product-link="conversations"/g) ?? []).length >= 2);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /name="viewport"/);
});
