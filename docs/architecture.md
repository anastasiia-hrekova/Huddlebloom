# Expansion architecture

## Scope
The public MVP is a free directory. Do not advertise collaboration workflows or enable payment controls yet. Future fixed deal fees and paid promotion must remain separate from organic profile-view rankings.

## Domain boundaries
Profiles are independent of accounts: an owner can later manage multiple creator/business/product profiles. Profile has id, slug, ownerId, type, name, bio, tags, country, platformLinks, avatarAssetId, coverAssetId, moderationStatus, publishedAt. Model account identity separately. Add a shared TypeScript schema and runtime validation when implementing the API.

The current `profileRepository` is a replaceable data-source seam. Production should implement list(filters, cursor), getBySlug, createDraft, updateOwnedDraft, submitForModeration. UI must not call database clients directly. Use query/cache hooks with loading/error/empty states when server queries replace fixtures.

## Launch gate: shared storage and auth
Before collecting public participants, connect a server database, verified authentication, asset upload storage and moderation. Do not expose service keys in Vite environment variables. Public reads must return published profiles only; owners may write only their own drafts. Validate lengths, URLs, asset type/size server-side. Add report/remove and privacy-consent flows. Local browser drafts are temporary convenience and cannot be published implicitly.

## View ranking
Record server-side profile-detail views, not catalog impressions. Deduplicate by profile + short-lived viewer/session key and time window, exclude owner, bots and rapid refreshes; document the counting window. Compute authoritative counts on server, stable tie-break by profile id. Do not trust counts submitted by clients. Add indexes for published profile selection, slug uniqueness and view aggregation. The hero map is decorative, not a location dataset or live user telemetry.

## Future modules
1. Accounts, owned profiles, moderation and real directory launch.
2. Saved profiles and participant contact controls, subject to consent.
3. Collaboration requests, offers, deal lifecycle, notifications.
4. Billing ledger and provider adapter. Fixed fee per deal, paid promoted slots visibly labeled; paid slots must not change organic view counts. Introduce verified webhook processing, idempotency, refunds and audits only with payment launch authorization.

Keep these modules out of initial directory components. APIs should be versioned; persist drafts with schema versions; implement migrations and rollback plans once the datastore is chosen.

## Deployment
Build pipeline verifies domain tests and production build. Configure production origin, SPA fallback, security headers and cache invalidation. Domain connection, production hosting and credentials are separate launch tasks. Demo mode should not masquerade as a real participant database.
