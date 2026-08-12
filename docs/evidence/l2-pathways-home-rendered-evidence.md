# L2 rendered evidence: home pathway icon pass

## Scope

Updated `src/contemporary/components/AudiencePathways.astro` so each home-page pathway card has a distinct inline SVG icon, rather than relying on a Font Awesome runtime dependency that the contemporary layout does not load.

| Audience | Visual mapping | Purpose |
|---|---|---|
| Individuals | Open book | Teaching and academic influence |
| Faculty | Layered learning material with a research lens | Faculty development and applied research |
| Institutions | Columned academic building | Institutional and L&D leadership |
| Researchers | Magnifying glass with connected node | Applied research collaboration |

## Observed verification

- `npm run build` completed with exit code 0.
- Local Astro dev server returned HTTP 200 for `http://127.0.0.1:4321/contemporary`.
- The server-rendered pathway section contained four inline SVGs and all four audience labels and CTA destinations.
- A 1440 × 1800 Chromium headless screenshot is saved alongside this report: `docs/evidence/l2-pathways-home-1440.png`.
- Visual inspection of that capture confirmed that all four icons are visible, distinct, and contained within their cards. No clipping, overlap, or contrast defect was observed in the pathway section.

## Note

The screenshot includes the full pathway section at desktop width. The hover and keyboard-focus state reverses the icon badge to IIFR maroon with white icon strokes.
