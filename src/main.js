import { resolveLinks, PRODUCTS } from "./links.js";

const links = resolveLinks(window.APP_CONFIG);

for (const product of PRODUCTS) {
  const url = links[product];
  for (const el of document.querySelectorAll(`[data-product-link="${product}"]`)) {
    if (url) {
      el.setAttribute("href", url);
      el.removeAttribute("aria-disabled");
    } else {
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
      el.title = "This app's URL is not configured yet. Set it in config.js.";
    }
  }
}

document.getElementById("year").textContent = String(new Date().getFullYear());
