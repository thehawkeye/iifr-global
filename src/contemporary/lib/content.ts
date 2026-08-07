/**
 * Contemporary prototype — content data model.
 *
 * The full Keystatic schema lives at /keystatic.config.ts. The
 * contemporary prototype deliberately does NOT pull from Keystatic
 * at build time, because the production runtime decision
 * (Keystatic-on-static-Hostinger is not viable) is unresolved per
 * the independent review.
 *
 * Until Murali and the technical lead sign off on a CMS strategy,
 * this file is the single, typed source of truth for the prototype
 * pages. Every page imports from here, so changing a programme
 * title, a faculty affiliation, or an event date is a one-line edit
 * followed by a build.
 *
 * Conventions:
 *   - Programme, cohort, event, faculty, insight, and partnership
 *     records mirror the rich models in the design plan
 *     (iifr-contemporary-website-design-plan.md §7), with the
 *     high-risk fields the independent review required (owner,
 *     reviewBy, status, source).
 *   - British English, sentence case for prose, no invented
 *     credentials, fees, dates, or faculty titles.
 *   - Each record has an `owner`, `lastReviewedAt`, and `status` so
 *     a future claims register can plug in without code changes.
 *   - All public-facing copy is approved per the design plan
 *     §3.4 "Evidence before aspiration": no claim is published
 *     without a source.
 */

export type ProgrammeStatus = "open" | "coming-soon" | "by-enquiry" | "archived";
export type CohortStatus = "registration-open" | "registration-closed" | "in-session" | "archived";
export type EventStatus = "upcoming" | "registration-open" | "registration-closed" | "past" | "archived";

export interface Owner {
  name: string;
  role: string;
  /** Last time the record was verified by the owner. ISO date. */
  lastReviewedAt: string;
}

export interface Cohort {
  id: string;
  name: string;
  status: CohortStatus;
  startDate: string | null;
  endDate: string | null;
  applicationDeadline: string | null;
  /** Fee is intentionally a string ("₹X,XX,XXX + GST as applicable") so we
   *  never encode a number without a verified source. Empty string means
   *  the fee is set by enquiry (e.g. custom institutional programmes). */
  fee: string;
  format: string;
  location: string;
  capacity: string;
  /** Brochure / application / external links are placeholders only. */
  applicationUrl: string;
  brochureUrl: string;
  owner: Owner;
}

export interface Programme {
  slug: string;
  title: string;
  shortName: string;
  programmeType: "certification" | "fellowship" | "workshop" | "custom";
  proposition: string;
  audience: string[];
  duration: string;
  format: string;
  outcomes: string[];
  curriculum: { module: string; description: string }[];
  faculty: { name: string; role: string }[];
  certification: string;
  cohorts: Cohort[];
  status: ProgrammeStatus;
  source: string;
  owner: Owner;
}

export interface FacultyProfile {
  slug: string;
  name: string;
  displayName: string;
  roleCategory:
    | "Academic Council"
    | "Teaching Faculty"
    | "Professor of Practice"
    | "Mentor"
    | "Speaker";
  roleAtIIFR: string;
  currentAffiliation: string;
  shortBio: string;
  expertise: string[];
  programmes: string[];
  consent: boolean;
  owner: Owner;
}

export interface Event {
  slug: string;
  title: string;
  eventType: "workshop" | "lecture" | "panel" | "fellowship" | "convening";
  summary: string;
  audience: string;
  topic: string;
  speakers: { name: string; affiliation: string }[];
  dateTime: string;
  timeZone: string;
  duration: string;
  format: string;
  registrationUrl: string;
  status: EventStatus;
  relatedProgramme: string | null;
  source: string;
  owner: Owner;
}

export interface Insight {
  slug: string;
  title: string;
  format:
    | "research-note"
    | "practitioner-essay"
    | "event-recap"
    | "faculty-conversation"
    | "case-note"
    | "programme-explainer"
    | "institutional-perspective";
  dek: string;
  authorName: string;
  authorProfile: string | null;
  publishDate: string;
  updateDate: string;
  readingTime: string;
  topic: string;
  audience: string;
  body: string;
  relatedProgramme: string | null;
  source: string;
  owner: Owner;
}

export interface InstitutionalSolution {
  slug: string;
  title: string;
  problemArea: string;
  audience: string;
  solutionType: string;
  deliveryModes: string[];
  process: { step: string; description: string }[];
  facultyMix: string;
  sectorsServed: string[];
  ctaLabel: string;
  ctaTarget: string;
  source: string;
  owner: Owner;
}

/* ==============================================================
 * Programmes
 * ============================================================== */

const standardOwner: Owner = {
  name: "IIFR Admissions",
  role: "Owner: IIFR admissions office",
  lastReviewedAt: "2026-08-04",
};

const researchOwner: Owner = {
  name: "IIFR Research Office",
  role: "Owner: IIFR research office",
  lastReviewedAt: "2026-08-04",
};

export const programmes: Programme[] = [
  {
    slug: "ecp",
    title: "Educators' Certificate Programme",
    shortName: "ECP",
    programmeType: "certification",
    proposition:
      "Translate professional experience into credible teaching, curriculum design, and academic influence.",
    audience: [
      "Senior industry professionals",
      "Aspiring Professors of Practice",
      "Faculty and educators",
      "L&D and CHRO leaders",
    ],
    duration: "8 learning days",
    format: "Cohort-based, in-person",
    outcomes: [
      "Design a course you can actually teach",
      "Build a publishable case or applied note",
      "Practise teaching in a peer-reviewed classroom",
      "Earn an EFMD-recognised certificate of completion",
    ],
    curriculum: [
      {
        module: "Foundations of teaching and learning",
        description:
          "How adults learn, designing learning outcomes, and building a course outline.",
      },
      {
        module: "Curriculum, assessment, and case writing",
        description:
          "Designing assessment, writing cases, and academic writing for practitioners.",
      },
      {
        module: "AI-enabled teaching and academic practice",
        description:
          "Responsible use of AI in teaching, research, and academic workflows.",
      },
      {
        module: "Capstone and peer teaching",
        description:
          "Teach a real session, receive structured feedback, and submit a capstone artefact.",
      },
    ],
    faculty: [
      { name: "Academic Council faculty", role: "Academic leadership" },
      { name: "Professors of Practice", role: "Practitioner faculty" },
    ],
    certification:
      "IIFR Certificate of Completion, EFMD-recognised programme (see certification language note).",
    cohorts: [
      {
        id: "ecp-2026-08",
        name: "August 2026 cohort",
        status: "registration-open",
        startDate: "2026-08-21",
        endDate: "2026-11-30",
        applicationDeadline: "2026-08-10",
        fee: "₹1,50,000 + GST as applicable",
        format: "In-person, New Delhi",
        location: "Bharatiya Vidya Bhavan, New Delhi",
        capacity: "Limited to 36 participants",
        applicationUrl: "/contemporary/start?intent=apply&programme=ecp",
        brochureUrl: "/contemporary/start?intent=brochure&programme=ecp",
        owner: standardOwner,
      },
    ],
    status: "open",
    source: "iifr.global/ecp — verified 2026-08-04",
    owner: standardOwner,
  },
  {
    slug: "efm",
    title: "Executive Fellow in Management",
    shortName: "EFM",
    programmeType: "fellowship",
    proposition:
      "A fellowship for senior practitioners pursuing applied research, teaching, and thought leadership.",
    audience: [
      "Senior industry leaders",
      "CXOs and experienced practitioners",
      "Aspiring researchers and scholars from practice",
    ],
    duration: "12+ months, modular",
    format: "Modular residencies + applied research",
    outcomes: [
      "Frame and execute an applied research project",
      "Contribute to teaching and mentoring",
      "Build a portfolio of practice-led scholarship",
      "Join a Fellow cohort across India and the Global South",
    ],
    curriculum: [
      {
        module: "Research framing and methods",
        description:
          "Designing applied research questions, methods, and ethics for practice-led work.",
      },
      {
        module: "Teaching and mentoring practice",
        description:
          "Co-teaching, mentoring, and academic citizenship for senior practitioners.",
      },
      {
        module: "Applied research residency",
        description:
          "A supervised applied research project with structured milestones.",
      },
      {
        module: "Fellowship review and dissemination",
        description:
          "Fellow review of work-in-progress, public seminar, and contribution plan.",
      },
    ],
    faculty: [
      { name: "Academic Council faculty", role: "Academic supervision" },
      { name: "Senior practitioners", role: "Practice mentorship" },
    ],
    certification:
      "IIFR Executive Fellow designation. Credential language is under review with the academic council and must not be characterised as a degree until approved.",
    cohorts: [
      {
        id: "efm-2027-02",
        name: "February 2027 cohort (intake by enquiry)",
        status: "registration-closed",
        startDate: "2027-02-15",
        endDate: "2028-04-30",
        applicationDeadline: "2026-11-30",
        fee: "By enquiry",
        format: "Modular",
        location: "New Delhi + applied research placement",
        capacity: "Small cohort",
        applicationUrl: "/contemporary/start?intent=enquire&programme=efm",
        brochureUrl: "/contemporary/start?intent=brochure&programme=efm",
        owner: standardOwner,
      },
    ],
    status: "coming-soon",
    source: "iifr.global/efm — verified 2026-08-04 (credential language under review)",
    owner: standardOwner,
  },
  {
    slug: "faculty-development",
    title: "Research and faculty development workshops",
    shortName: "Faculty Development",
    programmeType: "workshop",
    proposition:
      "Short-format workshops for faculty and institutions on teaching, research, and academic leadership.",
    audience: [
      "Existing faculty and educators",
      "Academic leaders and heads of department",
      "Institutional learning and development teams",
    ],
    duration: "1 to 5 days",
    format: "Short workshops, open or in-house",
    outcomes: [
      "Strengthen classroom teaching and assessment",
      "Improve research design and writing",
      "Build academic leadership and mentoring capacity",
      "Translate workshop learning into institutional change",
    ],
    curriculum: [
      {
        module: "Teaching excellence",
        description:
          "Lesson design, learning outcomes, assessment, and feedback in practice.",
      },
      {
        module: "Applied research methods",
        description:
          "Designing practice-relevant research questions, methods, and outputs.",
      },
      {
        module: "Academic leadership",
        description:
          "Leading departments, mentoring colleagues, and programme stewardship.",
      },
      {
        module: "AI in academic practice",
        description:
          "Responsible, transparent use of AI in teaching, research, and assessment.",
      },
    ],
    faculty: [
      { name: "Academic Council faculty", role: "Academic facilitation" },
      { name: "IIFR practice faculty", role: "Practice co-facilitation" },
    ],
    certification:
      "IIFR Certificate of Participation. Workshop-level certification, not a degree.",
    cohorts: [
      {
        id: "fd-rolling",
        name: "Rolling workshop intake",
        status: "registration-open",
        startDate: null,
        endDate: null,
        applicationDeadline: null,
        fee: "By enquiry",
        format: "Open workshops and in-house delivery",
        location: "New Delhi or at the partner institution",
        capacity: "Cohorts of 20–40",
        applicationUrl: "/contemporary/start?intent=enquire&programme=faculty-development",
        brochureUrl: "/contemporary/start?intent=brochure&programme=faculty-development",
        owner: standardOwner,
      },
    ],
    status: "by-enquiry",
    source: "iifr.global/applied-research — verified 2026-08-04",
    owner: standardOwner,
  },
  {
    slug: "executive-education",
    title: "Custom executive and institutional programmes",
    shortName: "Custom Programmes",
    programmeType: "custom",
    proposition:
      "Co-designed executive education, faculty capability, and academic leadership programmes for institutions.",
    audience: [
      "Universities and business schools",
      "Corporates and L&D functions",
      "Public institutions and sector bodies",
    ],
    duration: "Designed per engagement",
    format: "Co-designed: open, in-house, or hybrid",
    outcomes: [
      "Build the specific capability your institution needs",
      "Co-design with IIFR faculty and practice leaders",
      "Measure adoption and impact with you",
    ],
    curriculum: [
      {
        module: "Understand the challenge",
        description:
          "Diagnostic conversations with senior leaders and IIFR faculty.",
      },
      {
        module: "Co-design the intervention",
        description:
          "Joint design of curriculum, delivery, faculty mix, and outcomes.",
      },
      {
        module: "Deliver and measure",
        description:
          "Delivery, with adoption, impact, and follow-through planned in.",
      },
    ],
    faculty: [
      { name: "IIFR Academic Council", role: "Academic oversight" },
      { name: "Professors of Practice", role: "Practice co-design" },
    ],
    certification:
      "IIFR partner certificate of completion. No degree or formal qualification is implied.",
    cohorts: [
      {
        id: "exec-rolling",
        name: "Rolling institutional intake",
        status: "registration-open",
        startDate: null,
        endDate: null,
        applicationDeadline: null,
        fee: "By enquiry",
        format: "Co-designed",
        location: "Partner site or New Delhi",
        capacity: "Designed per engagement",
        applicationUrl: "/contemporary/start?intent=partner",
        brochureUrl: "/contemporary/start?intent=partner",
        owner: standardOwner,
      },
    ],
    status: "by-enquiry",
    source: "iifr.global/contact + design plan §3.2 — verified 2026-08-04",
    owner: standardOwner,
  },
];

/* ==============================================================
 * Faculty
 * ============================================================== */

export const faculty: FacultyProfile[] = [
  {
    slug: "academic-council",
    name: "IIFR Academic Council",
    displayName: "IIFR Academic Council",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic governance and oversight",
    currentAffiliation: "IIFR, established by Bharatiya Vidya Bhavan",
    shortBio:
      "The IIFR Academic Council provides academic governance for programmes, faculty appointments, and the institute's research direction.",
    expertise: [
      "Academic governance",
      "Curriculum oversight",
      "Faculty appointments",
    ],
    programmes: ["ecp", "efm", "faculty-development", "executive-education"],
    consent: true,
    owner: {
      name: "IIFR Office of the Director",
      role: "Owner: IIFR office of the director",
      lastReviewedAt: "2026-08-04",
    },
  },
  {
    slug: "professors-of-practice",
    name: "Professors of Practice",
    displayName: "IIFR Professors of Practice",
    roleCategory: "Professor of Practice",
    roleAtIIFR: "Practice faculty across IIFR programmes",
    currentAffiliation:
      "Senior industry, policy, and academic leaders contributing to IIFR programmes",
    shortBio:
      "Senior practitioners from industry, policy, and academia who co-teach, mentor, and supervise applied work across IIFR programmes.",
    expertise: [
      "Industry and policy practice",
      "Teaching and mentoring",
      "Applied research supervision",
    ],
    programmes: ["ecp", "efm", "faculty-development"],
    consent: true,
    owner: standardOwner,
  },
  {
    slug: "research-faculty",
    name: "IIFR Research Faculty",
    displayName: "IIFR Research Faculty",
    roleCategory: "Teaching Faculty",
    roleAtIIFR: "Research supervision and methods teaching",
    currentAffiliation: "IIFR, established by Bharatiya Vidya Bhavan",
    shortBio:
      "IIFR research faculty lead methods teaching, applied research supervision, and the institute's research agenda across programmes.",
    expertise: [
      "Applied research methods",
      "Practice-led scholarship",
      "Research supervision",
    ],
    programmes: ["efm", "faculty-development"],
    consent: true,
    owner: researchOwner,
  },
];

/* ==============================================================
 * Events
 * ============================================================== */

export const events: Event[] = [
  {
    slug: "ecp-august-2026-briefing",
    title: "ECP August 2026 cohort — pre-application briefing",
    eventType: "workshop",
    summary:
      "A live briefing for prospective ECP participants, faculty, and sponsors on the August 2026 cohort.",
    audience: "Prospective ECP participants and sponsors",
    topic: "Educator development",
    speakers: [
      { name: "IIFR Admissions", affiliation: "IIFR" },
      { name: "IIFR Faculty", affiliation: "IIFR" },
    ],
    dateTime: "2026-08-05T16:00:00+05:30",
    timeZone: "Asia/Kolkata",
    duration: "60 minutes",
    format: "Online (registration required)",
    registrationUrl: "/contemporary/start?intent=enquire&programme=ecp",
    status: "upcoming",
    relatedProgramme: "ecp",
    source: "IIFR events calendar — verified 2026-08-04",
    owner: standardOwner,
  },
  {
    slug: "ecp-cohort-1-participant-briefing",
    title: "ECP Cohort 1 — Participant Briefing",
    eventType: "workshop",
    summary:
      "An orientation and briefing session for confirmed Cohort 1 participants of the Educators' Certificate Programme: cohort cadence, applied project expectations, faculty mentorship, and the participant handbook walkthrough.",
    audience: "Confirmed ECP Cohort 1 participants",
    topic: "Educator development",
    speakers: [
      { name: "IIFR Programme Office", affiliation: "IIFR" },
      { name: "ECP Cohort 1 faculty mentors", affiliation: "IIFR Academic Council" },
    ],
    dateTime: "2026-08-14T16:00",
    timeZone: "Asia/Kolkata",
    duration: "90 minutes",
    format: "Online (registration required)",
    registrationUrl:
      "/contemporary/start?intent=enquire&programme=ecp-cohort-1-briefing",
    status: "upcoming",
    relatedProgramme: "ecp",
    source: "IIFR events calendar — added 2026-08-06 per Murali spec",
    owner: standardOwner,
  },
  {
    slug: "faculty-development-design-thinking",
    title: "Designing for learning — a faculty development workshop",
    eventType: "workshop",
    summary:
      "A short workshop on course and lesson design for faculty, programme leads, and academic leaders.",
    audience: "Faculty and academic leaders",
    topic: "Teaching excellence",
    speakers: [
      { name: "IIFR Faculty", affiliation: "IIFR" },
    ],
    dateTime: "2026-09-12T10:00:00+05:30",
    timeZone: "Asia/Kolkata",
    duration: "Half day",
    format: "In-person, New Delhi",
    registrationUrl: "/contemporary/start?intent=enquire&programme=faculty-development",
    status: "upcoming",
    relatedProgramme: "faculty-development",
    source: "IIFR events calendar — verified 2026-08-04",
    owner: standardOwner,
  },
  {
    slug: "applied-research-symposium",
    title: "IIFR applied research symposium",
    eventType: "convening",
    summary:
      "A small, by-invitation convening of IIFR researchers, faculty, and institutional partners on applied research priorities.",
    audience: "IIFR researchers, faculty, and institutional partners",
    topic: "Applied research",
    speakers: [
      { name: "IIFR Research Office", affiliation: "IIFR" },
    ],
    dateTime: "2026-11-20T09:30:00+05:30",
    timeZone: "Asia/Kolkata",
    duration: "Full day",
    format: "By invitation, New Delhi",
    registrationUrl: "/contemporary/start?intent=partner",
    status: "upcoming",
    relatedProgramme: "efm",
    source: "IIFR events calendar — verified 2026-08-04",
    owner: researchOwner,
  },
];

/* ==============================================================
 * Insights
 * ============================================================== */

export const insights: Insight[] = [
  {
    slug: "faculty-development-rethink",
    title: "Rethinking faculty development in India",
    format: "practitioner-essay",
    dek:
      "Why continuous faculty development, mentoring, and capability building matter for the future of higher education in India.",
    authorName: "IIFR Faculty",
    authorProfile: "academic-council",
    publishDate: "2026-05-15",
    updateDate: "2026-08-04",
    readingTime: "6 min read",
    topic: "Faculty development",
    audience: "Faculty, academic leaders, L&D teams",
    body: "Continuous faculty development is no longer a workshop you attend once a year. It is the everyday work of designing learning, mentoring colleagues, and translating practice into teaching. IIFR's role is to support that work through programmes, applied research, and institutional partnerships.",
    relatedProgramme: "faculty-development",
    source: "iifr.global/blog/faculty-development — verified 2026-08-04",
    owner: standardOwner,
  },
  {
    slug: "academia-industry-bridge",
    title: "Bridging academia and industry",
    format: "practitioner-essay",
    dek:
      "How meaningful academia–industry partnerships create relevant learning, practice-led scholarship, and real institutional impact.",
    authorName: "IIFR Faculty",
    authorProfile: "professors-of-practice",
    publishDate: "2026-04-28",
    updateDate: "2026-08-04",
    readingTime: "5 min read",
    topic: "Academia–industry collaboration",
    audience: "Senior practitioners, faculty, institutional leaders",
    body: "The strongest partnerships are not transfers of money. They are shared problems, shared faculty, and shared accountability for what is taught, what is researched, and what changes in practice.",
    relatedProgramme: "ecp",
    source: "iifr.global/blog/academia-industry — verified 2026-08-04",
    owner: standardOwner,
  },
  {
    slug: "applied-research-future",
    title: "The future of applied research",
    format: "research-note",
    dek:
      "How applied research can address real-world challenges and help institutions create usable, credible, practice-relevant knowledge.",
    authorName: "IIFR Research Faculty",
    authorProfile: "research-faculty",
    publishDate: "2026-04-10",
    updateDate: "2026-08-04",
    readingTime: "7 min read",
    topic: "Applied research",
    audience: "Researchers, faculty, institutional partners",
    body: "Applied research succeeds when it is grounded in a real problem, owned by a real partner, and judged by a real outcome. The most useful work is rarely the most visible.",
    relatedProgramme: "efm",
    source: "iifr.global/blog/applied-research — verified 2026-08-04",
    owner: researchOwner,
  },
];

/* ==============================================================
 * Institutional solutions
 * ============================================================== */

export const institutionalSolutions: InstitutionalSolution[] = [
  {
    slug: "faculty-capability",
    title: "Faculty capability building",
    problemArea:
      "How do we help our faculty teach, assess, and mentor more effectively?",
    audience: "Universities, business schools, public institutions",
    solutionType: "Capability programme",
    deliveryModes: [
      "Open enrolment (IIFR workshops)",
      "In-house delivery at the partner institution",
      "Hybrid cohort programmes",
    ],
    process: [
      {
        step: "Understand the challenge",
        description:
          "Diagnostic conversations with senior leaders and IIFR faculty.",
      },
      {
        step: "Co-design the intervention",
        description:
          "Joint design of curriculum, delivery, faculty mix, and outcomes.",
      },
      {
        step: "Deliver and measure",
        description:
          "Delivery, with adoption, impact, and follow-through planned in.",
      },
    ],
    facultyMix:
      "IIFR Academic Council faculty co-teaching with Professors of Practice.",
    sectorsServed: [
      "Higher education",
      "Public institutions",
      "Sector bodies",
    ],
    ctaLabel: "Discuss a faculty capability need",
    ctaTarget: "/contemporary/start?intent=partner&topic=faculty-capability",
    source: "Design plan §6.5 + iifr.global/contact — verified 2026-08-04",
    owner: standardOwner,
  },
  {
    slug: "executive-education",
    title: "Custom executive education",
    problemArea:
      "How do we commission academic-grade learning for our leaders and experts?",
    audience: "Corporates, L&D functions, sector bodies",
    solutionType: "Executive education",
    deliveryModes: [
      "Custom in-house programmes",
      "Modular executive residencies",
      "Hybrid cohort programmes",
    ],
    process: [
      {
        step: "Understand the business problem",
        description:
          "Diagnostic conversations with senior leaders and IIFR faculty.",
      },
      {
        step: "Co-design the programme",
        description:
          "Joint design of curriculum, faculty, and outcomes.",
      },
      {
        step: "Deliver and measure",
        description:
          "Delivery, with adoption, impact, and follow-through planned in.",
      },
    ],
    facultyMix:
      "IIFR faculty with senior practitioners from industry and policy.",
    sectorsServed: [
      "Corporate L&D",
      "Public sector leadership",
      "Sector bodies",
    ],
    ctaLabel: "Discuss an executive education need",
    ctaTarget: "/contemporary/start?intent=partner&topic=executive-education",
    source: "Design plan §6.5 + iifr.global/contact — verified 2026-08-04",
    owner: standardOwner,
  },
  {
    slug: "academic-industry-partnerships",
    title: "Academic–industry research partnerships",
    problemArea:
      "How do we collaborate on applied research that is methodologically sound and practically useful?",
    audience: "Universities, corporates, public institutions, sector bodies",
    solutionType: "Research partnership",
    deliveryModes: [
      "Joint research projects",
      "Research residency placements",
      "Faculty and practitioner secondments",
    ],
    process: [
      {
        step: "Frame the question together",
        description:
          "Joint framing of the research question, partner, and method.",
      },
      {
        step: "Co-execute the research",
        description:
          "Joint research with IIFR faculty and the partner team.",
      },
      {
        step: "Publish and translate",
        description:
          "Outputs, dissemination, and translation into institutional practice.",
      },
    ],
    facultyMix: "IIFR Research Faculty and partner research teams.",
    sectorsServed: [
      "Higher education",
      "Corporate R&D",
      "Public policy",
      "Sector bodies",
    ],
    ctaLabel: "Discuss a research partnership",
    ctaTarget: "/contemporary/start?intent=partner&topic=research",
    source: "Design plan §7.4 + iifr.global/contact — verified 2026-08-04",
    owner: researchOwner,
  },
];

/* ==============================================================
 * Lookup helpers
 * ============================================================== */

export function getProgramme(slug: string): Programme | undefined {
  return programmes.find((p) => p.slug === slug);
}

export function getFaculty(slug: string): FacultyProfile | undefined {
  return faculty.find((f) => f.slug === slug);
}

export function getEvent(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function getSolution(slug: string): InstitutionalSolution | undefined {
  return institutionalSolutions.find((s) => s.slug === slug);
}

/* ==============================================================
 * Display helpers
 *
 * Murali instruction 2026-08-06 (broadened from the morning's
 * ECP-only correction): every user-facing date on the contemporary
 * site must render as dd-mmm-yyyy. ISO values stay internal so:
 *   - JSON-LD structured data keeps schema.org-valid ISO-8601
 *     startDate/endDate (do NOT pipe user-facing fields into the
 *     seo.ts graph).
 *   - Source-of-truth strings (lastReviewedAt, source citations,
 *     updateDate) remain greppable as ISO.
 *
 * Apply formatDDMMMYYYY at every render site that displays a date.
 * Do NOT apply it on JSON-LD outputs (seo.ts).
 * ============================================================== */

const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/**
 * Format an ISO-8601 date (YYYY-MM-DD, optional time suffix) as
 * dd-mmm-yyyy for user-facing surfaces. Returns the input unchanged
 * if it is null, empty, or unparseable — never throw on display.
 */
export function formatDDMMMYYYY(iso: string | null | undefined): string {
  if (!iso) return "";
  // Match the leading YYYY-MM-DD so we ignore any time component.
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const year = m[1];
  const monthIndex = Number.parseInt(m[2], 10) - 1;
  const day = Number.parseInt(m[3], 10).toString().padStart(2, "0");
  if (monthIndex < 0 || monthIndex > 11) return iso;
  return `${day}-${MONTH_SHORT[monthIndex]}-${year}`;
}
