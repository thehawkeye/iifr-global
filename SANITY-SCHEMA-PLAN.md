# Sanity Schema Plan — IIFR Global Contemporary (v2)

> **Status:** Schema design only. No Sanity credentials used.
> **Blocker:** Murali must create the project at sanity.io/manage and provide a read token before any implementation card can run.
> **Generated from:** `keystatic.config.ts` (current schema) + `src/contemporary/lib/content.ts` (content.ts, the prototype's typed source of truth) + component frontmatter inspection.

---

## 1. Sanity Project / Studio Architecture

### Embedded vs. Separate Studio

**Recommendation: Embedded studio** (`/studio` route in the same Astro app) for Phase 1.

Rationale:
- Single deployment target (Vercel) — no separate hosting for Sanity Studio.
- Content editors go to `iifr.global/studio` rather than `studio.sanity.com`.
- `@sanity/astro` handles embedded studio mounting with zero extra infrastructure.
- When the team grows past 3 editors, migrate to a separate studio project with a shared dataset.

**Dataset naming:**

| Dataset | Purpose | Read token needed? |
|---|---|---|
| `production` | Live site build | Yes (read-only) |
| `staging` | Preview / draft content | Yes (read-only) |

The Astro build uses `@sanity/client` pointed at `production` by default.
Astro's preview mode (`astro preview`) or a `/preview` route points at `staging` using the same client with `useCdn: false` and `token` set.

**Token strategy:**
- `SANITY_READ_TOKEN` in `.env` — read-only, no write access.
- Token is injected into `@sanity/client` at build time only; never exposed to the browser.
- For the preview API route, pass the token server-side so Sanity returns draft content.

**Studio config location:** `sanity.config.ts` at project root, schemas in `src/sanity/schemas/`.

---

## 2. Content Type Schemas

### 2.1 `siteSettings` — Singleton

> Mirrors the Keystatic `siteSettings` singleton exactly. One document in the dataset.

| Field | Sanity Type | Notes |
|---|---|---|
| `siteName` | `string` | Required |
| `ga4Id` | `string` | Google Analytics 4 measurement ID |
| `gtmId` | `string` | Google Tag Manager ID |
| `googleAdsId` | `string` | Google Ads conversion ID |
| `metaPixelId` | `string` | Meta Pixel ID |
| `contactEmail` | `string` | Public contact email |

**GROQ (singleton read):**
```groq
*[_type == "siteSettings"][0] {
  siteName, ga4Id, gtmId, googleAdsId, metaPixelId, contactEmail
}
```

---

### 2.2 `cohort` — Object Type (embedded in `programme`)

> Not a top-level collection. Defined as a Sanity `object` type and used as an array inside `programme`.

| Field | Sanity Type | Notes |
|---|---|---|
| `id` | `string` | Required. Internal identifier, e.g. `"ecp-2026-08"` |
| `name` | `string` | Display name, e.g. `"August 2026 cohort"` |
| `status` | `string` | Select: `"registration-open"`, `"registration-closed"`, `"in-session"`, `"archived"` |
| `startDate` | `date` | ISO date, nullable |
| `endDate` | `date` | ISO date, nullable |
| `applicationDeadline` | `date` | ISO date, nullable |
| `fee` | `string` | Display string, e.g. `"Rs. 5,00,000 + GST"` — not a number |
| `format` | `string` | E.g. `"On campus, New Delhi"` |
| `location` | `string` | Venue |
| `capacity` | `string` | Nullable, e.g. `"Cohorts of 20–40"` |
| `applicationUrl` | `url` | Required |
| `brochureUrl` | `url` | Required |

---

### 2.3 `programme` — Collection

> The Keystatic schema is thin. The content.ts `Programme` interface is the ground-truth model. All missing fields below are implied by the page structure (ProgrammeCard, Hero live-cohort signal, cohort display).

**Canonical frontmatter keys preserved:** `title` → maps to `title` (slug), `status` → `status`, `tagline` → `proposition`, `description` → kept as `description` (Portable Text).

| Field | Sanity Type | Notes |
|---|---|---|
| `title` | `slug` + `name` text | Required. `name` is the display title. |
| `shortName` | `string` | E.g. `"ECP"`, `"EFM"` |
| `programmeType` | `string` | Select: `"certification"` \| `"fellowship"` \| `"workshop"` \| `"custom"` |
| `proposition` | `text` | Short value proposition — maps to Keystatic `tagline` |
| `audience` | `array<string>` | List of audience segments |
| `duration` | `string` | E.g. `"4-month programme"` |
| `format` | `string` | E.g. `"On campus, New Delhi"` |
| `description` | `array<block>` (Portable Text) | Maps to Keystatic `description` (Markdoc) |
| `outcomes` | `array<string>` | List of learning outcomes |
| `curriculum` | `array<object>` | Each item: `{ module: string, description: text }` |
| `faculty` | `array<object>` | Each item: `{ name: string, role: string }` — NOT a reference, matches content.ts |
| `certification` | `text` | Certification / credential copy |
| `cohorts` | `array<cohort>` | Embedded `cohort` objects |
| `status` | `string` | Select: `"open"` \| `"coming-soon"` \| `"by-enquiry"` \| `"archived"` |
| `source` | `string` | Verification source, e.g. `"staging-dev.iifr.global/ecp.php — verified 2026-08-10"` |
| `owner` | `object` | `{ name: string, role: string, lastReviewedAt: string }` |

**GROQ stubs:**

```groq
// All programmes (index page)
*[_type == "programme"] | order(title asc) {
  slug, title, shortName, programmeType, proposition,
  duration, format, status,
  "cohort": cohorts[status == "registration-open"][0] {
    startDate, fee, format, location
  }
}

// Single programme (getStaticPaths / getEntry)
*[_type == "programme" && slug.current == $slug][0] {
  ..., // all fields
  "curriculum": curriculum[] { module, description },
  "faculty": faculty[] { name, role },
  "cohorts": cohorts[] { id, name, status, startDate, endDate,
    applicationDeadline, fee, format, location, capacity,
    applicationUrl, brochureUrl }
}
```

---

### 2.4 `event` — Collection

> Keystatic is missing: `eventType`, `timeZone`, `duration`, `format`, `audience`, `topic`, `speakers[]`, `status`, `relatedProgramme`. All are used by `EventCard` and the events landing page.

**Canonical frontmatter keys preserved:** `title` → `title` (slug), `startDate` → `startDate` (merged into `dateTime`), `endDate` → `endDate`, `location` → `location`, `registrationUrl` → `registrationUrl`, `summary` → `summary`.

Note: Keystatic has `startDate` and `endDate` as separate fields. Sanity collapses these into `dateTime` (ISO datetime string) + `endDate` for display clarity. The `dateTime` field carries the full timestamp including timezone for correct `EventCard` rendering.

| Field | Sanity Type | Notes |
|---|---|---|
| `title` | `slug` + `name` text | Required |
| `eventType` | `string` | Select: `"workshop"` \| `"lecture"` \| `"panel"` \| `"fellowship"` \| `"convening"` |
| `summary` | `text` | Maps to Keystatic `summary` |
| `audience` | `string` | Target audience description |
| `topic` | `string` | Event topic / theme |
| `speakers` | `array<object>` | `[{ name: string, affiliation: string }]` |
| `dateTime` | `datetime` | ISO datetime including timezone |
| `endDate` | `date` | End date (optional) |
| `timeZone` | `string` | IANA tz, e.g. `"Asia/Kolkata"` |
| `duration` | `string` | Human-readable, e.g. `"2 hours"` |
| `format` | `string` | E.g. `"Online via Zoom"` |
| `location` | `string` | Maps to Keystatic `location` |
| `registrationUrl` | `url` | Maps to Keystatic `registrationUrl` |
| `status` | `string` | Select: `"upcoming"` \| `"registration-open"` \| `"registration-closed"` \| `"past"` \| `"archived"` |
| `relatedProgramme` | `string` | Nullable. Programme slug that this event belongs to. |
| `source` | `string` | Verification source |
| `owner` | `object` | `{ name, role, lastReviewedAt }` |

**GROQ stubs:**

```groq
// Events list
*[_type == "event" && status != "archived"] | order(dateTime desc) {
  slug, title, eventType, summary,
  "dateTime": dateTime, "timeZone": timeZone, "endDate": endDate,
  format, location, registrationUrl, status
}

// Single event
*[_type == "event" && slug.current == $slug][0] {
  ..., speakers[] { name, affiliation },
  "relatedProgrammeTitle": *[_type == "programme" && slug.current == relatedProgramme][0].title
}
```

---

### 2.5 `post` — Collection (maps to `Insight` in content.ts)

> Keystatic fields: `title`, `publishDate`, `author`, `excerpt`, `body`. Missing: `format`, `dek`, `authorName`, `authorProfile`, `updateDate`, `readingTime`, `topic`, `audience`, `relatedProgramme`. `dek` is the subheadline card text in `InsightCard`.

**Canonical frontmatter keys preserved:** `title` → `title` (slug), `publishDate` → `publishDate`, `author` → `authorName`, `excerpt` → `dek`, `body` → `body` (Portable Text).

| Field | Sanity Type | Notes |
|---|---|---|
| `title` | `slug` + `name` text | Required |
| `format` | `string` | Select: `"research-note"` \| `"practitioner-essay"` \| `"event-recap"` \| `"faculty-conversation"` \| `"case-note"` \| `"programme-explainer"` \| `"institutional-perspective"` |
| `dek` | `text` | Short subheadline — maps to Keystatic `excerpt` |
| `authorName` | `string` | Maps to Keystatic `author` |
| `authorProfile` | `string` | URL to author profile page, nullable |
| `publishDate` | `date` | Maps to Keystatic `publishDate` |
| `updateDate` | `date` | Last-edit date |
| `readingTime` | `string` | E.g. `"8 min read"` |
| `topic` | `string` | Thematic topic tag |
| `audience` | `string` | Target reader description |
| `body` | `array<block>` (Portable Text) | Maps to Keystatic `body` (Markdoc) |
| `relatedProgramme` | `string` | Nullable programme slug |
| `source` | `string` | Verification source |
| `owner` | `object` | `{ name, role, lastReviewedAt }` |

**GROQ stubs:**

```groq
// Insights list
*[_type == "post"] | order(publishDate desc) {
  slug, title, format, dek, authorName, publishDate, readingTime, topic
}

// Single post
*[_type == "post" && slug.current == $slug][0] {
  ..., body, authorName, authorProfile, publishDate, updateDate,
  readingTime, topic, audience, relatedProgramme
}
```

---

### 2.6 `faculty` — Collection

> Keystatic is missing: `displayName`, `roleCategory`, `roleAtIIFR`, `expertise[]`, `programmes[]`, `owner`. `portrait` is in Keystatic but not in the current content.ts people.ts — confirmed as creative-studio approved frontmatter key.

**Canonical frontmatter keys preserved:** `name` → `name` (slug), `title` → `title` (stored in `roleAtIIFR`), `affiliation` → `currentAffiliation`, `bio` → `shortBio`, `portrait` → `portrait` (image).

| Field | Sanity Type | Notes |
|---|---|---|
| `name` | `slug` + `name` text | Required. Maps to Keystatic `name` slug field. |
| `displayName` | `string` | Public-facing name (may differ from `name` for disambiguation) |
| `roleCategory` | `string` | Select: `"Academic Council"` \| `"Teaching Faculty"` \| `"Professor of Practice"` \| `"Mentor"` \| `"Speaker"` |
| `roleAtIIFR` | `string` | Maps to Keystatic `title` field |
| `currentAffiliation` | `string` | Maps to Keystatic `affiliation` |
| `shortBio` | `text` | Maps to Keystatic `bio` |
| `portrait` | `image` | With hotspot + crop enabled. Maps to Keystatic `portrait`. |
| `expertise` | `array<string>` | Tags, e.g. `["Academic governance", "Higher education strategy"]` |
| `programmes` | `array<string>` | Programme slugs this faculty is associated with |
| `consent` | `boolean` | Maps to Keystatic `consent` |
| `owner` | `object` | `{ name, role, lastReviewedAt }` |

**GROQ stubs:**

```groq
// Faculty directory
*[_type == "faculty" && consent == true] | order(displayName asc) {
  slug, displayName, roleCategory, roleAtIIFR,
  currentAffiliation, shortBio, "portrait": portrait.asset->url,
  expertise, programmes
}

// Single faculty profile
*[_type == "faculty" && slug.current == $slug][0] {
  ..., expertise, programmes,
  "portrait": portrait { asset->, hotspot, crop }
}
```

---

### 2.7 `testimonial` — Collection

> Smallest type. Maps cleanly from Keystatic. Consider using a `reference` to `programme` for `programme` instead of a plain text field — enables cross-linking in the Studio.

**Canonical frontmatter keys preserved:** `name` → `name` (slug), `quote` → `quote`, `programme` → `programme` (as reference), `consent` → `consent`.

| Field | Sanity Type | Notes |
|---|---|---|
| `name` | `slug` + `name` text | Required |
| `quote` | `text` (multiline) | Maps to Keystatic `quote` |
| `programme` | `reference<programme>` | Programme this testimonial relates to (upgrade from Keystatic plain text) |
| `consent` | `boolean` | Maps to Keystatic `consent` |

---

## 3. Image Handling

All image fields use Sanity's `image` type with hotspot and crop enabled.

### `portrait` (faculty)

```ts
{
  name: 'portrait',
  type: 'image',
  options: { hotspot: true, crop: true },
  fields: [
    { name: 'alt', type: 'string', title: 'Alt text', validation: (r: Rule) => r.required() }
  ]
}
```

**Rendering in Astro:**
```ts
const { asset, hotspot, crop } = faculty.portrait;
// hotspot/crop applied via @sanity/image-url builder
const portraitUrl = imageUrlBuilder.image(asset).crop(crop).hotspot(hotspot).width(400).url();
```

### `image` (event banners, page heroes)

Same pattern — `image` type with hotspot + crop on any banner/hero image fields added to event or page-hero schemas.

### `heroImage` (if added as a global page hero type later)

Same pattern. Hotspot focal point controls `object-position` in the Astro `<img>` style — no hardcoded percentages.

---

## 4. Fields NOT in Keystatic (Implied by v2 Page Structure)

The following are absent from `keystatic.config.ts` but are used by the current prototype components and content.ts. These are the Phase 2 schema additions.

| Field | In Type | Where Used |
|---|---|---|
| `cohort` (nested object with `id`, `status`, `fee`, `applicationUrl`, etc.) | `Programme.cohorts[]` | `ProgrammeCard` (fee, startDate), `Hero` live-cohort signal |
| `curriculum[]` (`module` + `description`) | `Programme.curriculum[]` | Programme detail page curriculum accordion |
| `outcomes[]` | `Programme.outcomes[]` | ProgrammeCard proposition, detail page |
| `faculty[]` (`name` + `role`) | `Programme.faculty[]` | Programme detail page faculty strip |
| `certification` (text) | `Programme.certification` | Programme detail page |
| `shortName` | `Programme.shortName` | `Hero` live-cohort signal: `{shortName} cohort begins` |
| `eventType` | `Event.eventType` | `EventCard` renders as tag |
| `speakers[]` (`name` + `affiliation`) | `Event.speakers[]` | Event detail page |
| `timeZone` | `Event.timeZone` | `EventCard` renders `timeZone` label |
| `duration` (event) | `Event.duration` | Event detail page |
| `format` (event) | `Event.format` | `EventCard` meta |
| `status` (event) | `Event.status` | `EventCard` shows "Past event" label |
| `relatedProgramme` | `Event.relatedProgramme` | Event-Programme cross-link |
| `audience` | `Event.audience`, `Insight.audience` | Event / Insight card metadata |
| `topic` | `Event.topic`, `Insight.topic` | Tag rendering |
| `format` (insight) | `Insight.format` | `InsightCard` type label |
| `dek` | `Insight.dek` | `InsightCard` excerpt text |
| `authorName` | `Insight.authorName` | Insight card author line |
| `authorProfile` | `Insight.authorProfile` | Author name link |
| `updateDate` | `Insight.updateDate` | "Updated" label on insight detail |
| `readingTime` | `Insight.readingTime` | Insight card |
| `relatedProgramme` | `Insight.relatedProgramme` | Insight-Programme cross-link |
| `source` | All content types | Verification source (content.ts contract) |
| `owner` | All content types | `{ name, role, lastReviewedAt }` — content.ts contract |
| `displayName` | `FacultyProfile`, `Person` | Public-facing faculty name |
| `roleCategory` | `FacultyProfile`, `Person` | FacultyCard tag |
| `expertise[]` | `FacultyProfile`, `Person` | Faculty profile detail |
| `programmes[]` | `FacultyProfile`, `Person` | Faculty-Programme association |
| `consent` | `FacultyProfile`, `Person`, `Testimonial` | Consent to publish |
| `portrait` | `FacultyProfile` | Creative-studio confirmed, maps to Keystatic `portrait` key |

---

## 5. GROQ Query Stubs (Astro Integration)

These stubs cover the three main Astro data-fetching patterns: `getStaticPaths`, index listings, and singleton reads.

### 5.1 `getStaticPaths` (programme slugs)

```groq
*[_type == "programme" && defined(slug.current)] {
  "params": { "slug": slug.current }
}
```

### 5.2 Programme index listing

```groq
*[_type == "programme"] | order(title asc) {
  slug, title, shortName, programmeType, proposition,
  duration, format, status,
  "cohort": cohorts[status == "registration-open"][0] {
    startDate, fee, format, location, applicationUrl
  }
}
```

### 5.3 Programme detail

```groq
*[_type == "programme" && slug.current == $slug][0] {
  title, shortName, programmeType, proposition, audience, duration, format,
  description, outcomes, certification, status, source,
  curriculum[] { module, description },
  faculty[] { name, role },
  cohorts[] { id, name, status, startDate, endDate,
    applicationDeadline, fee, format, location, capacity,
    applicationUrl, brochureUrl },
  owner { name, role, lastReviewedAt }
}
```

### 5.4 Events index

```groq
*[_type == "event" && status != "archived"] | order(dateTime desc) {
  slug, title, eventType, summary, dateTime, timeZone, endDate,
  format, location, registrationUrl, status, relatedProgramme
}
```

### 5.5 Event detail

```groq
*[_type == "event" && slug.current == $slug][0] {
  title, eventType, summary, audience, topic, speakers[] { name, affiliation },
  dateTime, endDate, timeZone, duration, format,
  location, registrationUrl, status, relatedProgramme,
  source, owner { name, role, lastReviewedAt }
}
```

### 5.6 Insights index

```groq
*[_type == "post"] | order(publishDate desc) {
  slug, title, format, dek, authorName, publishDate, readingTime, topic
}
```

### 5.7 Faculty directory (by role category)

```groq
*[_type == "faculty" && consent == true] | order(displayName asc) {
  slug, displayName, roleCategory, roleAtIIFR,
  currentAffiliation, shortBio,
  "portraitUrl": portrait.asset->url,
  expertise, programmes
}
```

### 5.8 Site settings singleton

```groq
*[_type == "siteSettings"][0] {
  siteName, ga4Id, gtmId, googleAdsId, metaPixelId, contactEmail
}
```

---

## 6. Implementation Order (for the follow-on implementation card)

1. Install: `@sanity/client`, `@sanity/image-url`, `sanity` (Studio), `@sanity/astro`.
2. Create `sanity.config.ts` with all schema types registered.
3. Create `src/sanity/schemas/` with all type definitions.
4. Create `src/lib/sanity.client.ts` — `@sanity/client` instance with `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_READ_TOKEN` from env.
5. Replace `src/contemporary/lib/content.ts` data with GROQ queries against Sanity.
6. Wire up image URLs via `@sanity/image-url`.
7. Add `owner` + `source` fields to all types (content.ts contract).
8. Verify build: `npm run build` passes.

---

*Ground truth sources:*
- Schema: `keystatic.config.ts`
- Content model: `src/contemporary/lib/content.ts` (lines 1–784) + `src/contemporary/lib/people.ts`
- Component frontmatter: `Hero.astro`, `PageHero.astro`, `EventCard.astro`, `ProgrammeCard.astro`, `FacultyCard.astro`
