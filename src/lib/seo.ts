/**
 * seo — port of `partials/seo.php` `iifr_seo_context()` and
 * `iifr_schema_graph()` for the Astro rebuild.
 *
 * Source: `~/Documents/Mac Mini Sync/u871210302.20260618111419/domains/
 *         iifr.global/public_html/partials/seo.php`
 *
 * The PHP `iifr_current_path()` logic that mapped `/about` → `/about.php` for
 * the canonical-URL lookup is gone: the Astro pages live at clean URLs (`/`,
 * `/about`, `/ecp`, `/blog/...`) so the lookup key is the clean path. At
 * Phase 5 cutover we will add 301s from every `.php` variant → the clean
 * path, and the canonical tags emitted by this file will keep working.
 *
 * Page metadata is kept verbatim from the PHP source (titles, descriptions,
 * keywords, OG images, schema type) so the rebuilt site preserves the same
 * search-engine footprint as the current production PHP site.
 */

import { assetUrl } from "./assetUrl";

export const SITE_URL = "https://iifr.global";
export const SITE_NAME = "IIFR";
export const INFO_EMAIL = "info@iifr.global";
export const PHONE = "+91-79818-95005";

/** The PHP map keyed by clean URL — what the Astro site actually serves. */
export interface PageSeo {
  title: string;
  description: string;
  keywords: string;
  image: string;
  type?: "website" | "article";
  schema?: "WebPage" | "Course" | "Article" | "ItemList";
  datePublished?: string;
}

const PAGES: Record<string, PageSeo> = {
  "/": {
    title:
      "IIFR | Faculty Development, Applied Research & Academic Leadership",
    description:
      "International Institute for Faculty & Research advances faculty development, applied research, academic leadership and pracademic education across India and the Global South.",
    keywords:
      "faculty development institute India, academic leadership, applied research, pracademic education, IIFR",
    image: "assets/images/hero-home.webp",
    type: "website",
  },
  "/about": {
    title: "About IIFR | Faculty Research & Academic Leadership Institute",
    description:
      "Learn about IIFR, an autonomous academic institute strengthening faculty capability, research excellence and practice-academic leadership in India and the Global South.",
    keywords:
      "about IIFR, faculty research institute, academic leadership India, higher education leadership",
    image: "assets/images/about-hero.jpeg",
  },
  "/programmes": {
    title: "IIFR Programmes | ECP, EFM & Faculty Development Workshops",
    description:
      "Explore IIFR programmes for educators, researchers, senior executives and institutions, including ECP, EFM and research-led faculty development workshops.",
    keywords:
      "IIFR programmes, faculty development programmes, educator certification, executive fellow in management, academic workshops",
    image: "assets/images/academy/5.jpeg",
    schema: "ItemList",
  },
  "/ecp": {
    title:
      "Educators Certificate Programme ECP | Professor of Practice Pathway | IIFR",
    description:
      "Apply for IIFR ECP, an EFMD-certified 8-learning-day programme in New Delhi for Professor of Practice aspirants, AI-enabled educators, faculty, CHROs and L&D leaders.",
    keywords:
      "Educators Certificate Programme, ECP India, Professor of Practice, EFMD Certification, AI-enabled teaching, curriculum and course design, academic writing and case development, L&D leaders",
    image: "assets/images/ecp/landing/iifr_image_01.webp",
    schema: "Course",
  },
  "/efm": {
    title:
      "Executive Fellow in Management EFM | Doctoral-Equivalent Fellowship | IIFR",
    description:
      "IIFR Executive Fellow in Management is a doctoral-equivalent fellowship for CXOs and senior practitioners pursuing applied research, teaching and thought leadership.",
    keywords:
      "Executive Fellow in Management, EFM India, doctoral equivalent fellowship, executive doctorate alternative, applied research fellowship",
    image: "assets/images/efm/efm-hero.png",
    schema: "Course",
  },
  "/applied-research": {
    title: "Research & Faculty Workshops | Applied Research Programmes | IIFR",
    description:
      "Short-format IIFR workshops build teaching excellence, research capability, academic leadership and applied research skills for faculty and institutions.",
    keywords:
      "faculty workshops India, applied research workshops, teaching excellence workshop, academic leadership programme",
    image: "assets/images/research/workshops-hero.jpg",
    schema: "Course",
  },
  "/research": {
    title: "Faculty & Applied Research for Real-World Impact | IIFR",
    description:
      "IIFR connects global scholars, practice faculty and institutional partners to advance applied research, teaching innovation and faculty excellence.",
    keywords:
      "applied research institute India, faculty research, research and faculty, teaching innovation",
    image: "assets/images/research/research-banner.jpg",
  },
  "/faculty": {
    title: "IIFR Faculty | Global Scholars, Practitioners & Academic Leaders",
    description:
      "Meet IIFR faculty and advisors: globally connected scholars, accomplished practice leaders and pracademics shaping faculty development and research.",
    keywords:
      "IIFR faculty, academic leaders India, global scholars, pracademic faculty",
    image: "assets/images/academy/1.jpeg",
  },
  "/apply": {
    title: "Apply to IIFR | ECP & EFM Admissions",
    description:
      "Apply to IIFR programmes including the Educators Certificate Programme and Executive Fellow in Management. Review eligibility, cohorts and admissions steps.",
    keywords:
      "apply IIFR, ECP admissions, EFM admissions, faculty development admission, executive fellowship admission",
    image: "assets/images/academy/2.jpeg",
  },
  "/contact": {
    title: "Contact IIFR | Admissions, Partnerships & Programmes",
    description:
      "Contact IIFR in New Delhi for admissions, institutional partnerships, faculty development programmes, research collaborations and executive education enquiries.",
    keywords:
      "contact IIFR, IIFR admissions, faculty development partnership, academic collaboration India",
    image: "assets/images/academy/7.jpeg",
  },
  "/privacy-policy": {
    title: "Privacy Policy | IIFR",
    description:
      "Read the IIFR Privacy Policy covering personal data collection, use, cookies, data retention, security, DPDP rights and grievance contact details.",
    keywords:
      "IIFR privacy policy, data protection, DPDP Act, personal data, privacy rights",
    image: "assets/images/about-hero.jpeg",
  },
  "/insights": {
    title:
      "IIFR Insights | Faculty Development, Applied Research & Higher Education",
    description:
      "Read IIFR insights on faculty development, applied research, academic leadership, industry-academia collaboration and the future of higher education.",
    keywords:
      "faculty development insights, applied research articles, higher education leadership, academic leadership articles",
    image: "assets/images/academy/3.jpeg",
  },
  "/blog/faculty-development": {
    title: "Rethinking Faculty Development in India | IIFR Insights",
    description:
      "Why continuous faculty development, mentoring and capability building matter for the future of higher education in India.",
    keywords:
      "faculty development India, higher education capability building, faculty mentoring, teaching excellence",
    image: "assets/images/insights/rethinking.png",
    schema: "Article",
    datePublished: "2026-05-15",
  },
  "/blog/academia-industry": {
    title: "Bridging Academia and Industry | IIFR Insights",
    description:
      "How meaningful academia-industry partnerships can create relevant learning, practice-led scholarship and real-world impact.",
    keywords:
      "academia industry collaboration, pracademic, industry academia partnership, practice led education",
    image: "assets/images/insights/academia.png",
    schema: "Article",
    datePublished: "2026-04-28",
  },
  "/blog/applied-research": {
    title: "The Future of Applied Research | IIFR Insights",
    description:
      "How applied research can address real-world challenges and help institutions create usable, credible and practice-relevant knowledge.",
    keywords:
      "future of applied research, practice relevant research, scholar practitioner, applied management research",
    image: "assets/images/insights/future.png",
    schema: "Article",
    datePublished: "2026-04-10",
  },
};

const DEFAULT_SEO: PageSeo = {
  title: "IIFR | International Institute for Faculty & Research",
  description:
    "IIFR advances faculty development, applied research, teaching excellence and academic leadership across India and the Global South.",
  keywords:
    "IIFR, faculty development, applied research, academic leadership",
  image: "assets/images/hero-home.webp",
};

/** Normalise a request path so "/about/" → "/about", defaults "/" → "/". */
function normalisePath(path: string): string {
  if (!path) return "/";
  let p = path.split("?")[0].split("#")[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  if (p === "" || p === "/index") return "/";
  return p;
}

export interface SeoContext {
  path: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  image: string;
  type: "website" | "article";
  schema: "WebPage" | "Course" | "Article" | "ItemList";
  datePublished: string | null;
}

/**
 * Resolve the SEO context for a given request path. Mirrors the PHP
 * `iifr_seo_context()` shape so `SeoHead.astro` can read from it 1:1.
 */
export function seoContext(path: string): SeoContext {
  const clean = normalisePath(path);
  const data = PAGES[clean] ?? DEFAULT_SEO;

  const type: "website" | "article" =
    data.type ?? (data.schema === "Article" ? "article" : "website");
  const schema = data.schema ?? "WebPage";

  const canonical = `${SITE_URL}${clean === "/" ? "/" : clean}`;
  const image = assetUrl(data.image);

  return {
    path: clean,
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    canonical,
    image,
    type,
    schema,
    datePublished: data.datePublished ?? null,
  };
}

/** Strip the trailing "| IIFR" pipe from a title for use in JSON-LD names. */
function shortTitle(title: string): string {
  return title.replace(/\s+\|\s+IIFR.*$/, "");
}

/**
 * Build the JSON-LD `@graph` payload for the current page. Mirrors the PHP
 * `iifr_schema_graph()` output: organization + website + webpage always;
 * breadcrumb on non-home pages; Course/Article/ItemList extras when the
 * page declares them.
 */
export function schemaGraph(seo: SeoContext): Record<string, unknown> {
  const orgId = `${SITE_URL}/#organization`;
  const siteId = `${SITE_URL}/#website`;
  const pageId = `${seo.canonical}#webpage`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": ["CollegeOrUniversity", "Organization"],
      "@id": orgId,
      name: "International Institute for Faculty & Research",
      alternateName: "IIFR",
      url: `${SITE_URL}/`,
      logo: assetUrl("assets/logo.png"),
      email: INFO_EMAIL,
      telephone: PHONE,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Bharatiya Vidya Bhavan Campus, KG Marg, Copernicus Marg",
        addressLocality: "New Delhi",
        addressRegion: "Delhi",
        postalCode: "110001",
        addressCountry: "IN",
      },
      sameAs: [
        "https://www.linkedin.com/company/international-institute-for-faculty-research/",
      ],
      areaServed: ["India", "Global South"],
    },
    {
      "@type": "WebSite",
      "@id": siteId,
      url: `${SITE_URL}/`,
      name: "IIFR",
      publisher: { "@id": orgId },
      inLanguage: "en-IN",
    },
    {
      "@type": "WebPage",
      "@id": pageId,
      url: seo.canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: { "@id": siteId },
      about: { "@id": orgId },
      primaryImageOfPage: { "@type": "ImageObject", url: seo.image },
      inLanguage: "en-IN",
    },
  ];

  if (seo.path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${seo.canonical}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: shortTitle(seo.title),
          item: seo.canonical,
        },
      ],
    });
  }

  if (seo.schema === "Course") {
    graph.push({
      "@type": "Course",
      "@id": `${seo.canonical}#course`,
      name: shortTitle(seo.title),
      description: seo.description,
      provider: { "@id": orgId },
      url: seo.canonical,
      inLanguage: "en-IN",
    });
  } else if (seo.schema === "Article") {
    graph.push({
      "@type": "Article",
      "@id": `${seo.canonical}#article`,
      headline: shortTitle(seo.title),
      description: seo.description,
      image: [seo.image],
      author: { "@id": orgId },
      publisher: { "@id": orgId },
      datePublished: seo.datePublished,
      dateModified: seo.datePublished,
      mainEntityOfPage: { "@id": pageId },
      inLanguage: "en-IN",
    });
  } else if (seo.schema === "ItemList") {
    graph.push({
      "@type": "ItemList",
      "@id": `${seo.canonical}#programmes`,
      name: "IIFR Programmes",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          url: `${SITE_URL}/ecp`,
          name: "Educators Certificate Programme",
        },
        {
          "@type": "ListItem",
          position: 2,
          url: `${SITE_URL}/efm`,
          name: "Executive Fellow in Management",
        },
        {
          "@type": "ListItem",
          position: 3,
          url: `${SITE_URL}/applied-research`,
          name: "Research and Faculty Workshops",
        },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/** Convenience accessor used by the offcanvas / nav / footer components. */
export const siteInfo = {
  url: SITE_URL,
  name: SITE_NAME,
  email: INFO_EMAIL,
  phone: PHONE,
} as const;
