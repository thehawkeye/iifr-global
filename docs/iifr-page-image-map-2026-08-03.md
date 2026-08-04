---
title: IIFR Global — Page-to-Image Asset Map (Phase 2)
date: 2026-08-04
sources:
  - Google Doc "Copy of Images for website" — https://docs.google.com/document/d/1pOeO8eyB4onTTSM-Axmb5y7eVOuP5k6jHupae513ZG8/edit (owner muralikrishnan@gmail.com, fetched via `gog docs raw --account muralikrishnan@gmail.com`)
  - Google Doc "Images for website" — https://docs.google.com/document/d/1ZFgzISKfJ7VYXlc_th7e0xoMZ2345ptj1YBKCG64NtM (owner akshat_v@latticed.in, fetched with the same account via Drive API; reader-access granted by Murali's reauth)
reconciles:
  - T2 (t_f852bfc7) — Tier-1 pages: home, about, programmes
  - T3 (t_ea3a3920) — Tier-2 pages: ECP, EFM, Applied Research
  - T4 (t_5cc595ec) — Tier-3 pages: Research, Faculty, Contact
  - T5 (t_8c25c2c0) — Insights page
related:
  - docs/iifr-phase2-additional-changes-2026-08-03.md
  - docs/hostinger-redline-audit-phase2.md
tags: [iifr-global, phase-2, assets, image-map, heroes]
---

# IIFR Global — Page-to-Image Asset Map (Phase 2)

## Authority and sourcing

Both source documents are read-only Google Docs. No Hostinger, Vercel, or production-site mutation occurred during retrieval or mapping.

| Doc | Doc Id | Owner | Pages covered | Image count | Role |
|---|---|---|---|---|---|
| "Images for website" (canonical set) | `1ZFgzISKfJ7VYXlc_th7e0xoMZ2345ptj1YBKCG64NtM` | akshat_v@latticed.in | About, Insights, Programmes, Applied Research | **8** (2 options per page) | Full option canvas |
| "Copy of Images for website" (Murali's pick) | `1pOeO8eyB4onTTSM-Axmb5y7eVOuP5k6jHupae513ZG8` | muralikrishnan@gmail.com | About, Insights, Programmes, Applied Research | **4** (one selection per page) | Murali's preferred selection |

`gog docs raw` (JSON Documents.Get) and `gog docs structure` returned identical content for both accounts. The eight unique images downloaded from both docs for visual characterization have unique md5s — no cross-doc duplicates are masking distinct images.

## Per-page selections (Murali's "Copy" doc, the canonical assignment)

The V1 ("Copy of Images for website") doc is interpreted as Murali's per-page selection out of V2's two options each. Recommended convention: site asset paths under `public/assets/images/<page-slug>/<slug>.<ext>`.

### About Us — `/about` — T2 (`t_f852bfc7`)

- **Murali's selection:** Google inline oid `kix.duhkwvhnhae1` → asset path `public/assets/images/about/about-hero.jpeg`
- **Visual:** Bharatiya Vidya Bhavan (IIFR) institutional building exterior — "भारतीय विद्या भवन" signage visible on the building façade, framed at a 3/4 angle. Trees and a paved courtyard occupy the left foreground; the building sits on the right side, slightly sky-skewed. Daylight, muted earth tones.
- **Banner crop (16:9 / 21:9):** right-aligned focal. Keep the building's 3/4 façade on the right ~60% of the frame; allow the left 40% to read as soft foreground (sky + branches + courtyard) so overlay text can sit on the left without conflict.
- **Mobile (<768 px):** keep the same crop; the right-side composition holds at narrower widths.
- **V2 alternative also available (not used by Murali's pick):** oid `kix.u6u81493ve5m` — same BVB campus but with a sign arch visible on the right side.

### Insights — `/insights` — T5 (`t_8c25c2c0`)

- **Murali's selection:** Google inline oid `kix.81shob2g5xdl` → asset path `public/assets/images/insights/insights-hero.jpeg`
- **Visual:** three academics collaborating in a dimly lit library or reading-room. Single warm desk lamp on the left side of the frame balances a paper chart and open laptop on the wood table. Subjects occupy centre to right, looking toward the lamp.
- **Banner crop (16:9 / 21:9):** centre-right focal. Subjects on the right; soften the lit lamp area or compose overlay text on the right column (reversed from typical "text-left" because the lamp already occupies the left).
- **Mobile (<768 px):** keep composition centred; the lamp point-light is a useful focal anchor.
- **V2 alternative also available (not used by Murali's pick):** oid `kix.f6tqsklyy6ux` — similar three-academics framing, slightly different lighting; subjects more centred.

### Programmes — `/programmes` — T2 (`t_f852bfc7`)

- **Murali's selection:** Google inline oid `kix.jxxv351f2la4` → asset path `public/assets/images/programmes/programmes-hero.jpeg` (replacing the current `academy/5.jpeg` reference)
- **Visual:** tiered lecture hall seen from behind the audience. A standing presenter faces the audience from the front of the hall, one arm raised mid-gesture. Audience seating recedes into the foreground; wood paneling and bright windows behind the presenter create a luminous backdrop.
- **Banner crop (16:9 / 21:9):** bottom-weighted composition. Subjects (audience + presenter) spread across the full frame; presenter is small but the gesture gives the photo a focal point. Overlay text reads well centred on the lower-centre band.
- **Mobile (<768 px):** works because the presenter sits high in the frame and the audience fills the lower third — text overlay can sit in the upper third without subject conflict.
- **V2 alternative also available (not used by Murali's pick):** oid `kix.uzj87bbl7r7` — single faculty member mid-presentation in boardroom; closer shot, smaller audience (3–4 visible). Less "programme-scale" than the lecture-hall shot.
- **Programme page ALREADY uses `academy/5.jpeg`** in the rendered build; the Murali-picked hero is a **swap, not an addition**. Update the inline `background-image:url(...)` in `src/pages/programmes.astro:22` to point at the new asset.

### Applied Research — `/applied-research` — T3 (`t_ea3a3920`)

- **Murali's selection:** Google inline oid `kix.msdc8ocmlav2` → asset path `public/assets/images/applied-research/applied-research-hero.jpeg`
- **Visual:** consulting-style research meeting. Six seated adults around a curved wood table; one standing presenter mid-discussion in the centre-right of the frame. Laptops open, papers, sticky notes, and a wall-mounted screen showing a pie chart on the left edge of the frame. Bright, even daylight.
- **Banner crop (16:9 / 21:9):** centre-right focal. Subjects span the full width — the standing presenter is the focal anchor on the right; overlay text can sit on the left, but watch the wall-screen pie chart on the far-left (it will not collide if you reserve the left 25–30% for text only at ≥1440 px).
- **Mobile (<768 px):** the standing presenter stays visible; composition holds. If the wall-screen chart is cropped, that's fine.
- **V2 alternative also available (not used by Murali's pick):** oid `kix.okzzz8i7tizw` — standing presenter in dark-walled boardroom with a wall screen behind him; six people seated around a U-shape conference table. Stronger "research presentation" feel.

## Image-to-oid quick reference

For one-to-many reconciliation (e.g. if Murali supplies a second source later), use the oid mapping rather than md5 alone:

| Source oid | Local filename | Assigned page |
|---|---|---|
| `kix.duhkwvhnhae1` | `about-hero.jpeg` | About (Murali's pick) |
| `kix.u6u81493ve5m` | (reserved: `about-hero-alt.jpeg`) | About (V2 Option 2 — unused) |
| `kix.f6tqsklyy6ux` | (reserved: `insights-hero-alt.jpeg`) | Insights (V2 Option 1 — unused) |
| `kix.81shob2g5xdl` | `insights-hero.jpeg` | Insights (Murali's pick) |
| `kix.jxxv351f2la4` | `programmes-hero.jpeg` | Programmes (Murali's pick) |
| `kix.uzj87bbl7r7` | (reserved: `programmes-hero-alt.jpeg`) | Programmes (V2 Option 2 — unused) |
| `kix.msdc8ocmlav2` | `applied-research-hero.jpeg` | Applied Research (Murali's pick) |
| `kix.okzzz8i7tizw` | (reserved: `applied-research-hero-alt.jpeg`) | Applied Research (V2 Option 2 — unused) |

## Outstanding gaps to surface to Murali (do not fabricate)

The "Images for website" canvas only covers **four pages** of the Phase-2 build. Items the Phase-2 change register marked as "image/video dependent" — for which this asset map does NOT yet have a designated image — must NOT be inferred or substituted from Hostinger:

| Page | Change-register requirement | Status | Recommended action |
|---|---|---|---|
| `/` (home) | Hero `assets/images/hero-home.webp` reference — currently missing on disk | **No doc entry.** Murali's canvas does not include a home-page hero selection. | Surface to Murali: ask whether the home hero stays the same as Programmes (a swap of `academy/5.jpeg`) or whether a new asset is needed. Do not invent. |
| `/ecp` — ECP hero | T3 change register: "Improve hero photo alignment and programme snapshot/card alignment" | **No doc entry.** | Surface to Murali: ask whether the Programmes hero image is also intended for ECP (a sub-page), or a distinct image is needed. |
| `/ecp` — ECP programme snapshot card | Change register: snapshot/card alignment | Card image `ecp-card.png` already in source assets; no replacement requested in canvas. | No action from this map. |
| `/efm` — EFM hero | Change register: "Improve hero text visibility, image alignment/crop" | **No doc entry.** | Surface to Murali: ask whether Programmes hero also serves EFM. |
| `/efm` — EFM Programme Overview | Change register: "Programme Overview must not reuse the hero image" — needs **distinct** hero and overview images | **No doc entry.** Surface — this is the explicit two-asset gate. | Surface to Murali. Do not pick Programme Overview from same doc. |
| `/applied-research` — "How We Deliver" icons | Restore/fix missing icons | Already in source assets; no replacement requested in canvas. | No action from this map. |
| `/research`, `/faculty`, `/contact` | Hero text readability fixes | **No doc entry.** | Surface to Murali: ask whether their current heroes are sufficient and only the overlay/contrast needs work, or whether a new asset is needed. |
| `/insights` — Read More CTAs | Visibility fix | Cosmetic, not an asset swap. | No action from this map. |
| Global favicon | Brand favicon | **No doc entry.** | Already flagged as `t_1af67bcf`-dependent in the change register. |
| Photo-shoot videos | Possible edited videos for any of the above | **No doc entry.** | Surface to Murali; nothing to map yet. |

## Implementation guidance for downstream coders

This map is a deliverable, not a build instruction. Implementation rules:

1. **No Hostinger write.** Add assets under `public/assets/images/<page-slug>/` only.
2. **Do NOT change image paths outside the four pages above** unless Murali confirms.
3. **For each affected page:**
   - Drop the new image under the `public/assets/images/<page-slug>/` path listed above.
   - Update the inline `background-image:url(${assetUrl("...")})` reference in the page's `iifr-page-hero__bg` div.
   - Update the change-register's "image/video dependent" cell from "wait" to the asset path used.
4. **Mobile check required.** All four banner images are already wide-format (1916×821 to 1774×887) and hold composition at <768 px width.
5. **Verification evidence:** desktop and mobile preview screenshots showing the new hero in place; the new asset path recorded in the change register's acceptance-evidence cell.
6. **No image fallback to a random Hostinger image.** If the asset isn't present in `public/assets/images/<page-slug>/`, the coder MUST surface the gap rather than substituting.

## Source preservation

Read-only retrieval commands used (no writes performed outside `docs/iifr-page-image-map-2026-08-03.md` in the local Astro repo):

```text
gog auth list                                                    # both accounts; tokens refreshed 2026-08-04
gog drive search IIFR --account muralikrishnan@gmail.com         # discovered "Copy of Images for website" + "Images for website"
gog docs raw 1pOeO8eyB4onTTSM-Axmb5y7eVOuP5k6jHupae513ZG8 \
    --account muralikrishnan@gmail.com --json > /tmp/iifr_imgmap_raw.json
gog docs raw 1ZFgzISKfJ7VYXlc_th7e0xoMZ2345ptj1YBKCG64NtM \
    --account muralikrishnan@gmail.com --json > /tmp/iifr_imgmap_v2_raw.json
```

Eight unique images were downloaded from the Docs-internal source URIs to a local tmp scratch space (`/tmp/iifr_imgs/`) for visual characterization of focal point, framing, dominant colours, lighting, and overlay-text positioning. **No image was committed, uploaded, or written into the repo** as part of this map's production.

## Re-deriving image bytes for downstream use

The canonical source for these images is the Google Docs themselves. When a downstream coder needs to materialise an asset under `public/assets/images/<page-slug>/`, the same two retrieval commands above can be re-run; then extract the `inlineObjects[oid].inlineObjectProperties.embeddedObject.imageProperties.sourceUri` field and `curl` it. Worked example for the About hero:

```text
# Re-derive the JSON:
gog docs raw 1ZFgzISKfJ7VYXlc_th7e0xoMZ2345ptj1YBKCG64NtM \
    --account muralikrishnan@gmail.com --json > /tmp/iifr_imgmap_v2_raw.json

# Pull the sourceUri of the chosen image (oid kix.duhkwvhnhae1 → about-hero):
python3 -c "
import json
d = json.load(open('/tmp/iifr_imgmap_v2_raw.json'))
print(d['inlineObjects']['kix.duhkwvhnhae1']['inlineObjectProperties']
      ['embeddedObject']['imageProperties']['sourceUri'])
"

# Download and place under the public/ tree:
mkdir -p public/assets/images/about
curl -L -o public/assets/images/about/about-hero.jpeg '<SOURCE_URI_HERE>'
```

The `sourceUri` typically expires after a short period — materialise within the same session as the curl. The kix.* oids and their assigned target filenames above are stable because they live in the underlying Google Doc revision history.

This indirection keeps the asset map small (no image bytes in this repo) while still letting downstream workers re-derive the bytes from the same authoritative source.
