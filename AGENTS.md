# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

# Huddlebloom approved decisions

- Name exactly Huddlebloom. Logo: Signal wordmark and lowercase h favicon with square accent.
- Approved hero is a flat dotted world map with lime/cobalt beacons, NEVER a 3D globe or portrait collage.
- Dark navy hero, white catalog, lime CTAs and cobalt view-ranking panel.
- Current positioning: free database of businesses and creators. Do not advertise collaboration yet.
- Source visual: docs/approved-homepage.webp. Typography and proportions must be compared in browser after changes.
- Demonstration profiles must remain clearly identified; local drafts are not registrations.
