# L10 About page source map

## Scope

This map covers the Executive Board and Strategic Partners presentation at `/contemporary/about`. It deliberately contains no biographies, endorsements, logo claims, accreditation claims, or description of the relationship with each partner.

## Executive Board

| Page field | Source | Source location | Notes |
| --- | --- | --- | --- |
| Section label and six displayed names | Local approved About-page implementation | `src/pages/about.astro:291-332` | Existing IIFR site implementation identifies these people under `Executive Board`. |
| Chairman title: Banwarilal Purohit | Local approved About-page implementation | `src/pages/about.astro:298-302` | Reproduced verbatim. |
| Vice Chairman title: Rajendra Srivastava | Local approved About-page implementation | `src/pages/about.astro:303-307` | Reproduced verbatim. |
| Member titles: Rohit Bansal, Siva Prasad, Aruna Reddy, PR Kaushik | Local approved About-page implementation | `src/pages/about.astro:310-331` | Reproduced verbatim. |

## Strategic Partners

| Page field | Source | Source location | Notes |
| --- | --- | --- | --- |
| Partner names: Bharatiya Vidya Bhavan, LatticEd, EFMD | Local approved About-page implementation | `src/pages/about.astro:469-505` | Existing IIFR page names all three as Strategic Partners. The established local spelling is `LatticEd`. |
| Bharatiya Vidya Bhavan destination | Organisation's public site | `https://www.bhavans.info/` | Plain outbound link only. |
| LatticEd destination | Organisation's public site | `https://latticed.in/` | Plain outbound link only. |
| EFMD destination | Organisation's public site | `https://www.efmdglobal.org/` | Plain outbound link only. |

## Run-time checks

- On 2026-08-10, the isolated Vercel preview's `/contemporary/about` route returned HTTP 200.
- On the same run, each of the three external destination URLs above returned HTTP 200 after redirects.
- The live `https://iifr.global/about.php` retrieval could not be completed through the configured web extraction service, which is unavailable in this environment. The Executive Board mapping therefore relies on the repository's existing approved About-page implementation and must be reconfirmed against the live page before any production release.

## Exclusions and review note

- No partner logos are used, despite legacy local logo assets, because this scope does not establish current logo-use permission.
- No claims about partnership scope, endorsement, accreditation, certification, programme affiliation, or biographies are made.