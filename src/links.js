// Resolves product links from runtime config. Kept free of DOM access so it can be unit tested.

const PRODUCTS = ["funnels", "conversations"];

/** Returns a normalised http(s) URL string, or null when the value is unusable. */
export function normalizeUrl(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  let url;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (url.username || url.password) return null;
  return url.toString();
}

/** Maps raw config to `{ funnels, conversations }`, each a URL string or null. */
export function resolveLinks(config) {
  const source = config && typeof config === "object" ? config : {};
  const links = {};
  for (const product of PRODUCTS) {
    links[product] = normalizeUrl(source[`${product}Url`]);
  }
  return links;
}

export { PRODUCTS };
