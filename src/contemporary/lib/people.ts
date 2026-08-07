/**
 * People published on the contemporary Research & Faculty route.
 *
 * Sources: https://iifr.global/about.php (Academic Council) and
 * https://iifr.global/research.php (Faculty). Records use only names, roles,
 * and short summaries supported by IIFR's published pages. No programme
 * involvement, contact detail, or credential is inferred.
 */

export type PeopleGroup = "academic-council" | "faculty";

export interface IifrPerson {
  slug: string;
  name: string;
  role: string;
  summary: string;
  groups: PeopleGroup[];
  sourceUrl: string;
}

const aboutSource = "https://iifr.global/about.php";
const facultySource = "https://iifr.global/research.php";

export const people: IifrPerson[] = [
  { slug: "rajendra-srivastava", name: "Prof. Rajendra Srivastava", role: "Former Dean, Indian School of Business", summary: "A leader in marketing strategy and innovation, and a former Dean of the Indian School of Business.", groups: ["academic-council", "faculty"], sourceUrl: aboutSource },
  { slug: "uday-b-desai", name: "Prof. Uday B. Desai", role: "Founding Director, IIT Hyderabad", summary: "A distinguished academician and founding Director of IIT Hyderabad, with contributions to policy, institutional governance, and research.", groups: ["faculty"], sourceUrl: facultySource },
  { slug: "charles-dhanaraj", name: "Charles Dhanaraj", role: "Professor of Strategy", summary: "Professor of Strategy in IIFR's faculty ecosystem.", groups: ["faculty"], sourceUrl: facultySource },
  { slug: "sundar-bharadwaj", name: "Sundar Bharadwaj", role: "Professor of Marketing", summary: "Professor of Marketing in IIFR's faculty ecosystem.", groups: ["faculty"], sourceUrl: facultySource },
  { slug: "vish-krishnan", name: "Vish Krishnan", role: "Professor, UC San Diego", summary: "Professor at UC San Diego in IIFR's faculty ecosystem.", groups: ["faculty"], sourceUrl: facultySource },
  { slug: "alfons-sauquet", name: "Prof. Alfons Sauquet", role: "Associate Director, EFMD Quality Services", summary: "Associate Director at EFMD Quality Services and Director of EDAF; former Global Dean of ESADE Business and Law School.", groups: ["academic-council"], sourceUrl: aboutSource },
  { slug: "manoj-kohli", name: "Mr. Manoj Kohli", role: "Chairman & Managing Partner, MK Knowledge LLP", summary: "A professional entrepreneur with senior leadership experience at SoftBank, Airtel, and SB Energy.", groups: ["academic-council"], sourceUrl: aboutSource },
  { slug: "baljit-sidhu", name: "Prof. Baljit Sidhu", role: "Professor of Accounting, University of Sydney", summary: "Professor of Accounting at the University of Sydney Business School and Joint Editor-in-Chief at Abacus.", groups: ["academic-council"], sourceUrl: aboutSource },
  { slug: "rishikesha-t-krishnan", name: "Prof. Rishikesha T. Krishnan", role: "Professor of Strategy, IIM Bangalore", summary: "A Professor of Strategy whose academic leadership includes serving as Director of IIM Indore and IIM Bangalore.", groups: ["academic-council"], sourceUrl: aboutSource },
  { slug: "nandu-nandkishore", name: "Mr. Nandu Nandkishore", role: "Professor of Practice, Indian School of Business", summary: "A global C-suite leader and Professor of Practice at the Indian School of Business.", groups: ["academic-council"], sourceUrl: aboutSource },
  { slug: "ashley-braganza", name: "Prof. Ashley Braganza", role: "Chair in Business Transformation, Brunel", summary: "Chair in Business Transformation and former Dean of Brunel Business School, and Co-Director of its Research Centre for Artificial Intelligence.", groups: ["academic-council"], sourceUrl: aboutSource },
  { slug: "gerry-george", name: "Prof. Gerry George", role: "Group Managing Director, IMU Malaysia", summary: "A scholar in entrepreneurship and innovation whose leadership experience spans management education and higher education institutions.", groups: ["academic-council"], sourceUrl: aboutSource },
  { slug: "ramakrishna-velamuri", name: "Dr. S. Ramakrishna Velamuri", role: "Former Dean, SOM, Mahindra University", summary: "A professor specialising in entrepreneurship, business model innovation, and business ethics.", groups: ["academic-council", "faculty"], sourceUrl: aboutSource },
  { slug: "john-roberts", name: "Prof. John Roberts", role: "Scientia Professor, UNSW", summary: "A scholar in marketing science and Scientia Professor at the University of New South Wales.", groups: ["academic-council"], sourceUrl: aboutSource },
  { slug: "arvind-sahay", name: "Prof. Arvind Sahay", role: "Director, MDI Gurgaon", summary: "Director and Professor of Marketing and International Business at MDI Gurgaon, with academic experience at IIM Ahmedabad and London Business School.", groups: ["academic-council"], sourceUrl: aboutSource },
  { slug: "koen-vandenbempt", name: "Dr. Koen Vandenbempt", role: "Professor of Strategic Management, University of Antwerp", summary: "Professor of Strategic Management and Associate Dean for Internationalisation at the University of Antwerp.", groups: ["academic-council"], sourceUrl: aboutSource },
  { slug: "ashish-sinha", name: "Prof. Ashish Sinha", role: "Professor of Marketing, UQ Business School", summary: "Professor of Marketing at UQ Business School and Visiting Professor at the Indian School of Business.", groups: ["academic-council", "faculty"], sourceUrl: aboutSource },
  { slug: "prakash-bagri", name: "Prakash Bagri", role: "Professor of Practice", summary: "Professor of Practice in IIFR's faculty ecosystem.", groups: ["faculty"], sourceUrl: facultySource },
  { slug: "shankar-prakash", name: "Shankar Prakash", role: "Professor of Practice", summary: "Professor of Practice in IIFR's faculty ecosystem.", groups: ["faculty"], sourceUrl: facultySource },
  { slug: "muralikrishnan-b", name: "Muralikrishnan B", role: "Professor of Practice", summary: "Professor of Practice in IIFR's faculty ecosystem.", groups: ["faculty"], sourceUrl: facultySource },
  { slug: "bhimaraya-metri", name: "Dr. Bhimaraya Metri", role: "Director, IIM Nagpur", summary: "Director of IIM Nagpur and an academic leader in management education.", groups: ["academic-council"], sourceUrl: aboutSource },
  { slug: "anil-menon", name: "Dr. Anil Menon", role: "Dean of the Crummer Graduate School of Business, Rollins College", summary: "Dean of the Crummer Graduate School of Business at Rollins College.", groups: ["academic-council"], sourceUrl: aboutSource },
  { slug: "howard-o-hunter", name: "Prof. Howard O. Hunter", role: "Academic Leader & Professor of Law", summary: "An academic leader and Professor of Law.", groups: ["academic-council"], sourceUrl: aboutSource },
];

export const peopleGroupMeta: Record<PeopleGroup, { label: string; title: string; lead: string; sourceUrl: string }> = {
  "academic-council": {
    label: "Academic Council",
    title: "Academic Council",
    lead: "The Academic Council offers strategic guidance on academic excellence, research priorities, and long-term institutional development.",
    sourceUrl: aboutSource,
  },
  faculty: {
    label: "Faculty",
    title: "Faculty",
    lead: "IIFR's faculty model blends globally connected academics, practice leaders, and scholar-practitioners who bring contemporary relevance to teaching, research, and institutional transformation.",
    sourceUrl: facultySource,
  },
};

export function getPeopleInGroup(group: PeopleGroup): IifrPerson[] {
  return people.filter((person) => person.groups.includes(group));
}

export function getPerson(slug: string): IifrPerson | undefined {
  return people.find((person) => person.slug === slug);
}
