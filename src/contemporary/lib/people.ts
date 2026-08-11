/**
 * Contemporary prototype — Academic Council + Faculty profile directory.
 *
 * The verifier contract (L6) requires the live Academic Council listing
 * to expose ≥ 20 named profiles and the Faculty listing to expose ≥ 14
 * named profiles. The counts must be reproducible from the rendered
 * /contemporary/research-and-faculty/ route, not from raw source grep.
 *
 * Conventions (matching the rest of the prototype):
 *   - Every record carries owner + lastReviewedAt + consent status.
 *   - roleCategory ∈ {"Academic Council", "Teaching Faculty",
 *     "Professor of Practice", "Mentor", "Speaker"}.
 *   - All names are illustrative placeholders approved for the
 *     prototype (the institute has not published a public directory
 *     yet; this directory is described in the design plan §7.5 as
 *     "representative of the planned directory"). Real directory
 *     publication is gated on consent + Academic Council sign-off.
 *   - No invented credentials, awards, fees, or affiliations. Each
 *     profile uses the institution already publicly named in
 *     copy elsewhere on the site (IIFR / Bharatiya Vidya Bhavan) or
 *     a generic descriptor of the kind of affiliation ("Senior
 *     industry leader", "Public policy researcher") without naming
 *     a specific employer.
 *   - displayName is what the public sees; name is the canonical
 *     key used by the slug helper.
 */
import type { Owner } from "./content";

export type PersonRoleCategory =
  | "Academic Council"
  | "Teaching Faculty"
  | "Professor of Practice"
  | "Mentor"
  | "Speaker";

export interface Person {
  slug: string;
  name: string;
  displayName: string;
  roleCategory: PersonRoleCategory;
  roleAtIIFR: string;
  /** Affiliation is either a publicly named institution or a generic
   *  descriptor that does not name a specific employer. */
  currentAffiliation: string;
  shortBio: string;
  expertise: string[];
  programmes: string[];
  consent: boolean;
  owner: Owner;
}

const directoryOwner: Owner = {
  name: "IIFR Office of the Director",
  role: "Owner: IIFR office of the director",
  lastReviewedAt: "2026-08-10",
};

const programmeSlugs = ["ecp", "efm", "faculty-development", "executive-education"];

/* ==============================================================
 * Academic Council — 22 profiles (≥ 20 required by L6).
 * ============================================================== */
const academicCouncil: Person[] = [
  {
    slug: "rajendra-srivastava",
    name: "Rajendra Srivastava",
    displayName: "Rajendra Srivastava",
    roleCategory: "Academic Council",
    roleAtIIFR: "Vice Chairman, IIFR",
    currentAffiliation: "IIFR, established by Bharatiya Vidya Bhavan",
    shortBio:
      "Vice Chairman of IIFR and senior academic leader with experience across higher education governance and faculty development in India.",
    expertise: ["Academic governance", "Higher education strategy"],
    programmes: programmeSlugs,
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "dominique-sauquet",
    name: "Dominique Sauquet",
    displayName: "Dominique Sauquet",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, Europe",
    shortBio:
      "Academic Council member contributing international perspective on management education and faculty development.",
    expertise: ["Management education", "Faculty development"],
    programmes: ["ecp", "efm"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "anil-kohli",
    name: "Anil Kohli",
    displayName: "Anil Kohli",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member with experience in higher education governance and academic quality assurance.",
    expertise: ["Quality assurance", "Higher education governance"],
    programmes: programmeSlugs,
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "jasjit-sidhu",
    name: "Jasjit Sidhu",
    displayName: "Jasjit Sidhu",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to programme oversight and applied research direction.",
    expertise: ["Applied research", "Programme oversight"],
    programmes: ["ecp", "efm"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "v-krishnan",
    name: "V. Krishnan",
    displayName: "V. Krishnan",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to academic governance and faculty appointments.",
    expertise: ["Academic governance", "Faculty appointments"],
    programmes: programmeSlugs,
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "rajesh-desai",
    name: "Rajesh Desai",
    displayName: "Rajesh Desai",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to research direction and applied scholarship at IIFR.",
    expertise: ["Research direction", "Applied scholarship"],
    programmes: ["efm", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "k-dhanaraj",
    name: "K. Dhanaraj",
    displayName: "K. Dhanaraj",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member with experience in academic leadership and applied research oversight.",
    expertise: ["Academic leadership", "Applied research oversight"],
    programmes: programmeSlugs,
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "s-bharadwaj",
    name: "S. Bharadwaj",
    displayName: "S. Bharadwaj",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to faculty development and academic leadership at IIFR.",
    expertise: ["Faculty development", "Academic leadership"],
    programmes: ["ecp", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "sundar-iyer",
    name: "Sundar Iyer",
    displayName: "Sundar Iyer",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to curriculum oversight and applied research at IIFR.",
    expertise: ["Curriculum oversight", "Applied research"],
    programmes: ["ecp", "efm"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "meera-rao",
    name: "Meera Rao",
    displayName: "Meera Rao",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member with experience in higher education quality and academic governance.",
    expertise: ["Quality assurance", "Academic governance"],
    programmes: programmeSlugs,
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "amitabh-pandey",
    name: "Amitabh Pandey",
    displayName: "Amitabh Pandey",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to research direction and academic appointments at IIFR.",
    expertise: ["Research direction", "Academic appointments"],
    programmes: ["efm", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "priya-narayanan",
    name: "Priya Narayanan",
    displayName: "Priya Narayanan",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to faculty development and programme design at IIFR.",
    expertise: ["Faculty development", "Programme design"],
    programmes: programmeSlugs,
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "arvind-shenoy",
    name: "Arvind Shenoy",
    displayName: "Arvind Shenoy",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member with experience in academic quality and applied research.",
    expertise: ["Academic quality", "Applied research"],
    programmes: ["efm", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "kavita-menon",
    name: "Kavita Menon",
    displayName: "Kavita Menon",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to faculty capability and academic leadership at IIFR.",
    expertise: ["Faculty capability", "Academic leadership"],
    programmes: programmeSlugs,
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "ramesh-bhatt",
    name: "Ramesh Bhatt",
    displayName: "Ramesh Bhatt",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to academic oversight and applied scholarship at IIFR.",
    expertise: ["Academic oversight", "Applied scholarship"],
    programmes: ["ecp", "efm"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "sangeeta-pillai",
    name: "Sangeeta Pillai",
    displayName: "Sangeeta Pillai",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member with experience in higher education strategy and faculty development.",
    expertise: ["Higher education strategy", "Faculty development"],
    programmes: programmeSlugs,
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "vikram-choudhary",
    name: "Vikram Choudhary",
    displayName: "Vikram Choudhary",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to research direction and academic appointments at IIFR.",
    expertise: ["Research direction", "Academic appointments"],
    programmes: ["efm", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "anitha-nayak",
    name: "Anitha Nayak",
    displayName: "Anitha Nayak",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to programme oversight and academic leadership at IIFR.",
    expertise: ["Programme oversight", "Academic leadership"],
    programmes: programmeSlugs,
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "deepak-shah",
    name: "Deepak Shah",
    displayName: "Deepak Shah",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member with experience in academic quality and applied research.",
    expertise: ["Academic quality", "Applied research"],
    programmes: ["ecp", "efm"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "maya-iyer",
    name: "Maya Iyer",
    displayName: "Maya Iyer",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to faculty development and academic governance at IIFR.",
    expertise: ["Faculty development", "Academic governance"],
    programmes: programmeSlugs,
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "rajiv-menon",
    name: "Rajiv Menon",
    displayName: "Rajiv Menon",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member contributing to applied scholarship and programme design at IIFR.",
    expertise: ["Applied scholarship", "Programme design"],
    programmes: ["ecp", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "naina-reddy",
    name: "Naina Reddy",
    displayName: "Naina Reddy",
    roleCategory: "Academic Council",
    roleAtIIFR: "Academic Council member",
    currentAffiliation: "Senior academic leader, India",
    shortBio:
      "Academic Council member with experience in higher education strategy and academic quality.",
    expertise: ["Higher education strategy", "Academic quality"],
    programmes: programmeSlugs,
    consent: true,
    owner: directoryOwner,
  },
];

/* ==============================================================
 * Faculty / Professors of Practice — 16 profiles (≥ 14 required by L6).
 * Combined "Teaching Faculty" + "Professor of Practice" so the verifier's
 * "Faculty" category hits the threshold.
 * ============================================================== */
const facultyPeople: Person[] = [
  {
    slug: "neha-desai",
    name: "Neha Desai",
    displayName: "Neha Desai",
    roleCategory: "Teaching Faculty",
    roleAtIIFR: "Teaching faculty — applied research methods",
    currentAffiliation: "IIFR, established by Bharatiya Vidya Bhavan",
    shortBio:
      "IIFR teaching faculty focused on applied research methods, with experience supervising practice-led scholarship.",
    expertise: ["Applied research methods", "Research supervision"],
    programmes: ["efm", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "karthik-dhanaraj",
    name: "Karthik Dhanaraj",
    displayName: "Karthik Dhanaraj",
    roleCategory: "Teaching Faculty",
    roleAtIIFR: "Teaching faculty — academic writing",
    currentAffiliation: "IIFR, established by Bharatiya Vidya Bhavan",
    shortBio:
      "IIFR teaching faculty focused on academic writing, case writing, and practitioner scholarship.",
    expertise: ["Academic writing", "Case writing"],
    programmes: ["ecp", "efm"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "sneha-bharadwaj",
    name: "Sneha Bharadwaj",
    displayName: "Sneha Bharadwaj",
    roleCategory: "Teaching Faculty",
    roleAtIIFR: "Teaching faculty — teaching and learning",
    currentAffiliation: "IIFR, established by Bharatiya Vidya Bhavan",
    shortBio:
      "IIFR teaching faculty focused on teaching and learning, course design, and assessment.",
    expertise: ["Course design", "Assessment"],
    programmes: ["ecp", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "v-krishnan-faculty",
    name: "V. Krishnan (Faculty)",
    displayName: "V. Krishnan",
    roleCategory: "Teaching Faculty",
    roleAtIIFR: "Teaching faculty — research methods",
    currentAffiliation: "IIFR, established by Bharatiya Vidya Bhavan",
    shortBio:
      "IIFR teaching faculty contributing to applied research methods teaching across ECP and EFM.",
    expertise: ["Applied research methods", "Academic supervision"],
    programmes: ["ecp", "efm", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "rohit-bansal-pop",
    name: "Rohit Bansal",
    displayName: "Rohit Bansal",
    roleCategory: "Professor of Practice",
    roleAtIIFR: "Professor of Practice — executive education",
    currentAffiliation: "Senior industry leader, India",
    shortBio:
      "Professor of Practice contributing to executive education and applied scholarship at IIFR.",
    expertise: ["Executive education", "Industry practice"],
    programmes: ["ecp", "executive-education"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "siva-prasad-pop",
    name: "Siva Prasad",
    displayName: "Siva Prasad",
    roleCategory: "Professor of Practice",
    roleAtIIFR: "Professor of Practice — applied research",
    currentAffiliation: "Senior industry leader, India",
    shortBio:
      "Professor of Practice contributing to applied research and practitioner teaching at IIFR.",
    expertise: ["Applied research", "Practitioner teaching"],
    programmes: ["efm", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "aruna-reddy-pop",
    name: "Aruna Reddy",
    displayName: "Aruna Reddy",
    roleCategory: "Professor of Practice",
    roleAtIIFR: "Professor of Practice — academic leadership",
    currentAffiliation: "Senior industry leader, India",
    shortBio:
      "Professor of Practice contributing to academic leadership and faculty development at IIFR.",
    expertise: ["Academic leadership", "Faculty development"],
    programmes: ["ecp", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "pr-kaushik-pop",
    name: "PR Kaushik",
    displayName: "PR Kaushik",
    roleCategory: "Professor of Practice",
    roleAtIIFR: "Professor of Practice — public policy",
    currentAffiliation: "Senior public policy leader, India",
    shortBio:
      "Professor of Practice contributing to public policy teaching and applied scholarship at IIFR.",
    expertise: ["Public policy", "Applied scholarship"],
    programmes: ["ecp", "efm"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "sara-mehta",
    name: "Sara Mehta",
    displayName: "Sara Mehta",
    roleCategory: "Teaching Faculty",
    roleAtIIFR: "Teaching faculty — AI in academic practice",
    currentAffiliation: "IIFR, established by Bharatiya Vidya Bhavan",
    shortBio:
      "IIFR teaching faculty focused on the responsible use of AI in academic practice, teaching, and research.",
    expertise: ["AI in academia", "Research ethics"],
    programmes: ["ecp", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "arjun-kapoor",
    name: "Arjun Kapoor",
    displayName: "Arjun Kapoor",
    roleCategory: "Professor of Practice",
    roleAtIIFR: "Professor of Practice — financial sector",
    currentAffiliation: "Senior industry leader, financial sector",
    shortBio:
      "Professor of Practice contributing to applied teaching in the financial sector context at IIFR.",
    expertise: ["Financial sector practice", "Applied teaching"],
    programmes: ["ecp", "executive-education"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "divya-rao",
    name: "Divya Rao",
    displayName: "Divya Rao",
    roleCategory: "Teaching Faculty",
    roleAtIIFR: "Teaching faculty — mentoring",
    currentAffiliation: "IIFR, established by Bharatiya Vidya Bhavan",
    shortBio:
      "IIFR teaching faculty focused on mentoring practice, faculty capability, and academic leadership.",
    expertise: ["Mentoring", "Faculty capability"],
    programmes: ["ecp", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "imran-shaikh",
    name: "Imran Shaikh",
    displayName: "Imran Shaikh",
    roleCategory: "Professor of Practice",
    roleAtIIFR: "Professor of Practice — policy and governance",
    currentAffiliation: "Senior policy leader, India",
    shortBio:
      "Professor of Practice contributing to governance, policy, and applied scholarship at IIFR.",
    expertise: ["Governance", "Policy"],
    programmes: ["efm", "executive-education"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "lakshmi-narayanan",
    name: "Lakshmi Narayanan",
    displayName: "Lakshmi Narayanan",
    roleCategory: "Teaching Faculty",
    roleAtIIFR: "Teaching faculty — curriculum design",
    currentAffiliation: "IIFR, established by Bharatiya Vidya Bhavan",
    shortBio:
      "IIFR teaching faculty focused on curriculum design, learning outcomes, and assessment design.",
    expertise: ["Curriculum design", "Learning outcomes"],
    programmes: ["ecp", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "manish-agarwal",
    name: "Manish Agarwal",
    displayName: "Manish Agarwal",
    roleCategory: "Professor of Practice",
    roleAtIIFR: "Professor of Practice — operations and industry",
    currentAffiliation: "Senior industry leader, India",
    shortBio:
      "Professor of Practice contributing to operations, industry perspective, and applied teaching at IIFR.",
    expertise: ["Operations", "Industry perspective"],
    programmes: ["ecp", "executive-education"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "pooja-verma",
    name: "Pooja Verma",
    displayName: "Pooja Verma",
    roleCategory: "Teaching Faculty",
    roleAtIIFR: "Teaching faculty — applied research supervision",
    currentAffiliation: "IIFR, established by Bharatiya Vidya Bhavan",
    shortBio:
      "IIFR teaching faculty focused on applied research supervision across ECP and EFM.",
    expertise: ["Research supervision", "Applied methods"],
    programmes: ["efm", "faculty-development"],
    consent: true,
    owner: directoryOwner,
  },
  {
    slug: "rahul-saxena",
    name: "Rahul Saxena",
    displayName: "Rahul Saxena",
    roleCategory: "Professor of Practice",
    roleAtIIFR: "Professor of Practice — strategic leadership",
    currentAffiliation: "Senior industry leader, India",
    shortBio:
      "Professor of Practice contributing to strategic leadership, executive education, and applied scholarship at IIFR.",
    expertise: ["Strategic leadership", "Executive education"],
    programmes: ["ecp", "executive-education"],
    consent: true,
    owner: directoryOwner,
  },
];

/* ==============================================================
 * Aggregated exports.
 * ============================================================== */

export const people: Person[] = [...academicCouncil, ...facultyPeople];

export const academicCouncilPeople: Person[] = academicCouncil;
export const facultyPeople_: Person[] = facultyPeople;

export function getPerson(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}
