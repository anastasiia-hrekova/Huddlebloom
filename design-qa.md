# Design verification

Source: `docs/approved-homepage.webp` (1487 × 1058). Approved later change: Signal/Huddlebloom logo.
Browser implementation: `docs/desktop-preview.jpg`, viewport 1363 × 936 CSS pixels, density 1.
Normalization: source resized proportionally to screenshot width; viewport capture includes vertical page clipping. Comparison: `docs/comparison.jpg`; focused hero: `docs/hero-comparison.jpg`.

## Findings and fixes
- P1 initial hero CTA intersected the search bar: reduced display line height, made hero and search positions scale proportionally to viewport. Final measured CTA bottom 328, search top 339; no overlap.
- P2 initial display face was too light: switched to locally bundled Inter 900, retaining two-line layout.
- P2 source crops contained baked-in rank/counts: cleaned cover photos and implemented live data labels. Avatars extracted separately from source.
- P2 initial fixed sidebar produced narrow cards: matched sidebar proportion and desktop shell ratio to source.
- Map, source scene photography, approved lime/cobalt/ink colors and wording retained. Functional UI uses native selects and Phosphor icons.

## Required surfaces
Typography: local Cyrillic-capable Inter and Manrope, final bold display weight and readable smaller UI. Small font glyph differences from raster source remain P3.
Spacing: aligned major hero/search/filter/catalog boundaries; explicit desktop proportions and mobile breakpoints. No horizontal overflow at verified desktop viewport.
Colors: approved #07111F, #0845FF, #C5FF16 and white. Raster background edges have minor P3 differences.
Images: supplied map and approved raster wordmark, cleaned scene covers, supplied avatars; no CSS approximations of artwork.
Copy: original directory wording; demo data explicit, draft success accurately describes local-only behavior. Auth/backend are not implemented.

## Browser scenarios
Search Forma shows one business; clearing restores three. Niche Design shows Forma. Profile opens accessible modal. Draft form validates fields and saves locally, shows non-public status. Browser application error logs filtered to terminal.local: none. Browser extension metadata errors unrelated to app were observed.

## Comparison history
Initial screenshot showed oversized hero and narrow cards. First correction preserved card composition but hero overlapped search. Second correction resolved overlap and typography; final layout ratio correction aligns catalog widths. Recaptured after each visual fix.

## Follow-up
P3: finalize vector logo masters; tiny photograph variations after cleaning badge overlays. Mobile breakpoint CSS is implemented; dedicated mobile browser viewport verification remains unperformed because this browser interface exposes no viewport setter. Public registration/server and production deployment remain separate launch tasks.

final result: passed

## User-requested refinement — 2026-10-11
The latest user feedback supersedes the original search spacing and three-row ranking layout. Hero artwork restored using image generation at 1983 × 793 (original crop 795 × 313), saved as map-hd.webp. Lighten blending merges its navy edge with hero background. Added generous CTA-to-search and search-to-filter spacing. Footer divider moved outside the constrained shell.
Left directory now includes every matching profile, with independent card/list switch and shared filters. Right ranking is capped at five across the complete directory. Six explicitly marked demonstration profiles expose the difference; no real participants were invented. Sidebar CTA has no icon and centered text.
Browser verified: six card/list results, five ranking items, YouTube filter yields two list results without changing global ranking, zero sidebar CTA SVG icons, no horizontal overflow, full-width footer. New desktop-preview.jpg and list-preview.jpg replace the previous capture; earlier comparison images remain historical evidence of the original implementation.
Build and catalog tests passed. Native full-page screenshot requests intermittently timed out; final browser captures use the available screenshot output. Dedicated mobile viewport remains unverified.

## Category rankings and animated map
All uses the shared top 5; selecting creator/business/product recomputes category-only ranks in sidebar and card badges. Browser verified business ranks 1–3, product rank 1, All restores six profiles and five leaderboard entries. Search does not redefine category ranks.
Hero now layers SVG moving signals, dashed route flow and eight pulsing beacons over approved high-resolution map artwork. Decorative SVG is hidden from assistive technology; map has one accessible label. Reduced-motion preference hides moving signals and disables CSS animation. Build, five domain regression tests and Sites packaging tests passed.
