/**
 * contemporary-seo — page-level SEO metadata + JSON-LD for the
 * contemporary prototype.
 *
 * The Phase 2 seo.ts already covers the migrated pages; this file
 * handles contemporary-specific routes (e.g. /contemporary, the new
 * programme pages, etc.) with the richer metadata the design plan
 * calls for: per-page title, description, canonical, JSON-LD type,
 * and structured-data extras for Course/Event/Person/Organization.
 *
 * The contemporary prototype never uses `CollegeOrUniversity` in
 * JSON-LD until the IIFR legal/degree-granting status has been
 * approved (per the independent review §3.7).
 */

import type { Programme, Cohort, Event, FacultyProfile } from "./content";
import type { Person } from "./people";

type FacultyOrPerson = FacultyProfile | Person;

export const SITE_URL = "https://iifr.global-contemporary-test-jt1c8rz0b-thehawkeyes-projects.vercel.app";
export const SITE_NAME = "IIFR";
export const INFO_EMAIL = "info@iifr.global";
export const PHONE = "+91-79818-95005";

export interface CpSeo {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  image: string;
  type: "website" | "article";
  schema: "WebPage" | "Course" | "Event" | "Person" | "ItemList" | "Organization";
  datePublished?: string;
}

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const ORG: Record<string, unknown> = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "International Institute for Faculty & Research",
  alternateName: "IIFR",
  url: `${SITE_URL}/`,
  email: INFO_EMAIL,
  telephone: PHONE,
  description:
    "An autonomous academic institute established by Bharatiya Vidya Bhavan, strengthening faculty capability, research excellence, and academic leadership across India and the Global South.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bharatiya Vidya Bhavan Campus, KG Marg, Copernicus Marg",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110001",
    addressCountry: "IN",
  },
  founder: {
    "@type": "Organization",
    name: "Bharatiya Vidya Bhavan",
  },
  areaServed: ["India", "Global South"],
  sameAs: [
    "https://www.linkedin.com/company/international-institute-for-faculty-research/",
  ],
};

const WEBSITE: Record<string, unknown> = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-IN",
};

export function organisationGraph(): Record<string, unknown> {
  return { "@context": "https://schema.org", "@graph": [ORG, WEBSITE] };
}

export function programmeCourseSchema(
  programme: Programme,
  cohort: Cohort,
  canonical: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORG,
      WEBSITE,
      {
        "@type": "Course",
        "@id": `${canonical}#course`,
        name: programme.title,
        description: programme.proposition,
        provider: { "@id": ORG_ID },
        url: canonical,
        inLanguage: "en-IN",
        hasCourseInstance: {
          "@type": "CourseInstance",
          name: cohort.name,
          courseMode: cohort.format.includes("Online") ? "online" : "onsite",
          location: cohort.location,
          startDate: cohort.startDate,
          endDate: cohort.endDate,
          maximumAttendeeCapacity: cohort.capacity,
        },
        offers: {
          "@type": "Offer",
          price: cohort.fee,
          priceCurrency: "INR",
          url: cohort.applicationUrl,
          availability:
            cohort.status === "registration-open"
              ? "https://schema.org/InStock"
              : "https://schema.org/PreOrder",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Programmes", item: `${SITE_URL}/programmes` },
          {
            "@type": "ListItem",
            position: 3,
            name: programme.title,
            item: canonical,
          },
        ],
      },
    ],
  };
}

export function eventSchema(event: Event, canonical: string): Record<string, unknown> {
  const start = event.dateTime;
  const end =
    event.duration.includes("Full day")
      ? undefined
      : event.duration.includes("Half day")
        ? undefined
        : new Date(
            new Date(event.dateTime).getTime() + 60 * 60 * 1000,
          ).toISOString();
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORG,
      WEBSITE,
      {
        "@type": "Event",
        "@id": `${canonical}#event`,
        name: event.title,
        description: event.summary,
        startDate: start,
        endDate: end,
        eventAttendanceMode:
          event.format.toLowerCase().includes("online")
            ? "https://schema.org/OnlineEventAttendanceMode"
            : "https://schema.org/OfflineEventAttendanceMode",
        eventStatus:
          event.status === "past" || event.status === "archived"
            ? "https://schema.org/EventCancelled"
            : "https://schema.org/EventScheduled",
        location:
          event.format.toLowerCase().includes("online")
            ? { "@type": "VirtualLocation", url: event.registrationUrl }
            : { "@type": "Place", name: event.format },
        organizer: { "@id": ORG_ID },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Events", item: `${SITE_URL}/events` },
          { "@type": "ListItem", position: 3, name: event.title, item: canonical },
        ],
      },
    ],
  };
}

export function facultyPersonSchema(
  faculty: FacultyOrPerson,
  canonical: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORG,
      WEBSITE,
      {
        "@type": "Person",
        "@id": `${canonical}#person`,
        name: faculty.displayName,
        description: faculty.shortBio,
        affiliation: { "@id": ORG_ID },
        jobTitle: faculty.roleAtIIFR,
        worksFor: { "@id": ORG_ID },
        url: canonical,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Research & faculty", item: `${SITE_URL}/research-and-faculty` },
          { "@type": "ListItem", position: 3, name: faculty.displayName, item: canonical },
        ],
      },
    ],
  };
}

export function programmesListSchema(programmes: Programme[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORG,
      WEBSITE,
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/programmes#list`,
        name: "IIFR programmes",
        itemListElement: programmes.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/programmes/${p.slug}`,
          name: p.title,
        })),
      },
    ],
  };
}
