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

## Digital-product store import

Choose Digital-продукт when creating a draft, paste an App Store or Google Play application URL and import. Empty name/bio fields are filled; existing edits are preserved. The full store description, developer and website can be reviewed and edited. Available icon/screenshot URLs, categories, rating/count, price/currency, version, age rating, languages and other returned metadata are saved in `storeProduct` within the local draft. Store ratings are separate from Huddlebloom rankings. Switching to a creator/business excludes store metadata on save.

`GET /api/store-import?url=...` runs server-side: Apple uses the public iTunes lookup API in the URL's storefront (UA by default); Google Play uses the Ukrainian public listing's SoftwareApplication JSON-LD plus full description and screenshot markup. Google markup may change; missing fields are omitted and unavailable imports return a visible error without deleting the existing draft. No installs, private analytics or developer-account data are fabricated. Image URLs are references, not downloaded assets. Only HTTPS App Store/Play app links are accepted; credentials, custom ports, other hosts and upstream redirects are blocked. Upstream requests have a 12s timeout and 4MiB response limit. Cloudflare caches successful metadata for an hour. Before public scale, add edge rate limiting appropriate to hosting traffic.

`npm run dev` includes the API middleware. `npm run build` packages the API wrapper for Sites without changing the original asset-worker sources/tests. `wrangler.jsonc` now deploys `worker/app.js` with the `ASSETS` binding and routes `/api/*` through the Worker. Pure static hosting cannot run the importer; use the included Worker or compatible Sites server. No production deployment is performed by these scripts.
