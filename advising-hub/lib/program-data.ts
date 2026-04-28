export type ProgramRecord = {
  id: string;
  title: string;
  slug: string;
  sourceUrl: string;
  description: string;
  website?: string;
  contact?: string;
  timeline?: string;
  deadline?: string;
  duration?: string;
  creditAvailable: boolean;
  workStudyOffered: boolean;
  financialAidAvailable: boolean;
  gpaMinimumRequired: boolean;
  gpaRequirement?: string;
  periods: string[];
  colleges: string[];
  eligibleClassYears: string[];
  opportunityTypes: string[];
  fundingTypes: string[];
  sdgTags: string[];
  keywords: string[];
  imageUrl: string;
  featured?: boolean;
};

export const programs: ProgramRecord[] = [
  {
    id: "marcon-fellows",
    title: "Marcon Fellows",
    slug: "marcon-fellows",
    sourceUrl: "https://360.lehigh.edu/programs/marcon-fellows",
    description:
      "Students work on faculty-led social justice, race, and racism projects connected to Lehigh Valley community organizations. Fellows can earn a $4,000 stipend for a ten-week summer intensive, and academic credit is available for semester or annual fellowship work.",
    website: "https://marcon.lehigh.edu/",
    contact: "marconinst@lehigh.edu",
    timeline:
      "Students with antiracist policy, activism, art, technology, or research project ideas should contact the Marcon Institute for collaborators and proposal support.",
    deadline: "2026-04-30",
    duration: "10-week summer intensive with semester or annual fellowship options",
    creditAvailable: true,
    workStudyOffered: false,
    financialAidAvailable: false,
    gpaMinimumRequired: false,
    periods: ["Fall", "Spring", "Summer", "Winter"],
    colleges: [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs",
    ],
    eligibleClassYears: [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student",
    ],
    opportunityTypes: [
      "Arts",
      "Community Engagement",
      "Global & Cross Cultural",
      "Leadership Development",
      "Research",
    ],
    fundingTypes: ["Stipend", "Academic Credit"],
    sdgTags: [],
    keywords: [
      "academic credit",
      "anti-racism",
      "belonging",
      "equity",
      "diversity",
      "inclusion",
      "DE&I",
      "research",
      "Social Justice",
      "stipend",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "lussi-student-guides",
    title: "Lehigh University Student Scholars Institute (LUSSI) Student Guides",
    slug: "lehigh-university-student-scholars-institute",
    sourceUrl:
      "https://360.lehigh.edu/programs/lehigh-university-student-scholars-institute",
    description:
      "Peer mentors support F1RST+ students through one-on-one meetings, family meetings, mentor connections, resource navigation, and events organized by the Center for Student Access and Success.",
    website: "https://diversityandinclusion.lehigh.edu/studentsuccess/lussi",
    contact: "Center for Student Access and Success, inlusas@lehigh.edu",
    timeline: "Apply in March or April for the following academic year.",
    deadline: "2026-03-07",
    duration: "Academic year",
    creditAvailable: false,
    workStudyOffered: true,
    financialAidAvailable: false,
    gpaMinimumRequired: true,
    gpaRequirement: "3.00",
    periods: ["Fall"],
    colleges: [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs",
    ],
    eligibleClassYears: ["First Year", "Sophomore", "Junior", "Senior"],
    opportunityTypes: ["Leadership Development", "Peer Mentoring"],
    fundingTypes: ["Work Study"],
    sdgTags: [],
    keywords: ["mentoring", "F1RST+", "belonging", "student success"],
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "eco-rep-leadership-program",
    title: "Eco-Rep Leadership Program",
    slug: "eco-rep-leadership-program",
    sourceUrl: "https://360.lehigh.edu/programs/eco-rep-leadership-program",
    description:
      "Student leaders promote sustainable living in residence halls and Greek houses through peer education, events, and campus behavior-change initiatives.",
    website: "https://sustainability.lehigh.edu/erlp",
    contact: "ecoreps@lehigh.edu",
    timeline: "Apply in March for the following academic year.",
    deadline: "2026-03-10",
    creditAvailable: false,
    workStudyOffered: false,
    financialAidAvailable: false,
    gpaMinimumRequired: false,
    periods: ["Fall", "Spring"],
    colleges: [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs",
    ],
    eligibleClassYears: ["First Year", "Sophomore", "Junior", "Senior"],
    opportunityTypes: ["Leadership Development", "Peer Mentoring"],
    fundingTypes: ["Stipend"],
    sdgTags: [
      "#11: Sustainable Cities and Communities",
      "#12: Responsible Consumption and Production",
    ],
    keywords: ["sustainability", "peer education", "residential life"],
    imageUrl:
      "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "lehigh-med-mentors",
    title: "Lehigh Med Mentors",
    slug: "lehigh-med-mentors",
    sourceUrl: "https://360.lehigh.edu/programs/lehigh-med-mentors",
    description:
      "A student-facing health and mentoring opportunity for students exploring medicine, health careers, peer support, and professional pathways.",
    creditAvailable: false,
    workStudyOffered: false,
    financialAidAvailable: false,
    gpaMinimumRequired: false,
    periods: ["Fall", "Spring"],
    colleges: ["College of Health", "College of Arts and Sciences"],
    eligibleClassYears: ["First Year", "Sophomore", "Junior", "Senior"],
    opportunityTypes: ["Peer Mentoring", "Health", "Leadership Development"],
    fundingTypes: [],
    sdgTags: ["#3: Good Health and Well-being"],
    keywords: ["medicine", "health", "mentoring", "career exploration"],
    imageUrl:
      "https://images.unsplash.com/photo-1576765607924-719dc4dbb904?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mountaintop-summer-experience",
    title: "Mountaintop Summer Experience",
    slug: "mountaintop-summer-experience",
    sourceUrl: "https://360.lehigh.edu/programs/mountaintop-summer-experience",
    description:
      "Interdisciplinary teams pursue open-ended projects with room for research, design, creative inquiry, and social impact.",
    creditAvailable: false,
    workStudyOffered: false,
    financialAidAvailable: false,
    gpaMinimumRequired: false,
    periods: ["Summer"],
    colleges: [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs",
    ],
    eligibleClassYears: ["First Year", "Sophomore", "Junior", "Senior"],
    opportunityTypes: ["Research", "Entrepreneurship", "Creative Inquiry"],
    fundingTypes: ["Stipend"],
    sdgTags: [],
    keywords: ["innovation", "research", "teams", "impact"],
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
];

export const classYears = [
  "First Year",
  "Sophomore",
  "Junior",
  "Senior",
  "Graduate Student",
];

export const colleges = Array.from(
  new Set(programs.flatMap((program) => program.colleges)),
);

export const opportunityTypes = Array.from(
  new Set(programs.flatMap((program) => program.opportunityTypes)),
);

export function getProgramBySlug(slug: string) {
  return programs.find((program) => program.slug === slug);
}

