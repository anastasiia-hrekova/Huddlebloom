# Huddlebloom

Free creator, business and digital-product directory. Ukrainian responsive frontend built from the approved dotted world-map mockup and Signal wordmark.

## Run

Node.js 22+, npm:

```sh
npm ci
npm run dev
npm test
npm run build
```

Production client output: `dist/client`. Static hosting must route navigation requests to `index.html`. The included Worker and `npm run test:sites` support Sites-compatible hosting. No deployment has been performed.

## Cloudflare Workers

Dashboard build command: `npm run build`. Deploy command: `npx wrangler deploy`.
The checked-in `wrangler.jsonc` serves only `dist/client` with SPA fallback.
Keep the plain Vite configuration: Wrangler framework auto-setup can add the Cloudflare Vite plugin and change the output to `dist`, breaking the Sites packaging step.
No Cloudflare Vite plugin is needed for this static frontend. Deploy using the repository configuration instead of auto-generated settings.

## Current behavior

- Responsive homepage, search, combined category/niche/country/platform filters and view-based sort.
- Profile detail dialogs, ranked profiles and accessible native dialogs.
- All published profiles and counters are **demonstration data**.
- Profile creation saves a **local draft only**; no public registration, server authentication, contacts or payments are enabled. The interface states this explicitly. Never use local storage as production auth or public profile storage.

## Structure

- `src/domain/catalog.js`: framework-independent selection and ranking rules.
- `src/data/profiles.js`: repository seam and demo fixtures.
- `src/components`: branding, cards and dialog primitives.
- `src/styles.css`: approved palette and responsive layout.
- `docs/architecture.md`: backend integration plan and expansion boundaries.
- `design-qa.md`: visual verification and limitations.

Artwork is raster material extracted from user-approved design references. Logo/favicon are concept rasters, not final vector masters. Replace demo photographs with participant-owned assets before public launch.
