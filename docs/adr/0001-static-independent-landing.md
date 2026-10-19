# ADR 0001: Static, independent landing page
- **Context:** Funnels and Conversations must stay separate, standalone products with no shared runtime or code. We still want one entry point.
- **Decision:** A dependency-free static site whose only link to the apps is two configurable URLs, validated client-side.
- **Alternatives:** serving it from one of the apps (makes that app the parent of the other); a shared gateway or compose file (couples deployments).
- **Consequences:** Deploys anywhere static files can be served; the apps never depend on it; there is no single sign-on across apps.
