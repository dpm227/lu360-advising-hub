export type ProgramRecord = {
  id: string;
  title: string;
  slug: string;
  sourceUrl: string;
  description: string;
  website?: string;
  contact?: string;
  timeline?: string;
  costFunding?: string;
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
  imageAlt?: string;
  photoUrls: string[];
  featured?: boolean;
};

export const programs: ProgramRecord[] = [
  {
    "id": "marcon-fellows",
    "title": "Marcon Fellows",
    "slug": "marcon-fellows",
    "sourceUrl": "https://360.lehigh.edu/programs/marcon-fellows",
    "description": "The Marcon Institute was established through a gift from Charlie Marcon in 2021. The Institute’s core activity is to prepare and deploy scholars, the Marcon Fellows , who show dedication to research that influences perspectives, practices, and policies on racial justice. Students selected as Marcon Fellows will spend the summer working on faculty-led projects in the areas of social justice, race, and racism in the Lehigh Valley. The ideal project would involve a small group of students working in a way that connects with a Lehigh Valley community organization to enhance the work of that organization in social justice, anti-racism, or related areas. Selected students will earn $4,000 each for ten weeks.",
    "website": "https://marcon.lehigh.edu/",
    "contact": "marconinst@lehigh.edu",
    "timeline": "If you have a project idea for antiracist policy, activism, art, technology, or research and want support for your project, to find collaborators, or get assistance formulating a proposal – contact us at marconinst@lehigh.edu.",
    "costFunding": "$4000 stipend for summer intensive. Academic credit offered for semester or annual fellowship.",
    "deadline": "2026-04-30",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring",
      "Summer",
      "Winter"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Arts",
      "Community Engagement",
      "Global & Cross Cultural",
      "Leadership Development",
      "Research"
    ],
    "fundingTypes": [
      "Stipend",
      "Academic Credit"
    ],
    "sdgTags": [],
    "keywords": [
      "academic credit",
      "anti-racism",
      "belonging",
      "equity",
      "diversity",
      "inclusion",
      "DE&I",
      "research",
      "Social Justice",
      "stipend"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.43.15%20PM.png?itok=eBPnhIF4",
    "imageAlt": "Mothers of Sierra Leone",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.43.15%20PM.png?itok=aG8Qmhup",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.43.15%20PM.png?itok=1ZKYyPQ0",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.43.15%20PM.png?itok=BWkw_emd",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.43.15%20PM.png?itok=YamZQiNp",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.43.15%20PM.png?itok=MzfBs2tB",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.43.15%20PM.png?itok=Bqs5aU7y",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.43.15%20PM.png?itok=67cPWidZ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.43.15%20PM.png?itok=5AkQIh37",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.43.15%20PM.png?itok=eBPnhIF4",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.43.15%20PM.png?itok=sHXgHMaH"
    ],
    "featured": true
  },
  {
    "id": "peer-health-advisors",
    "title": "Peer Health Advisors",
    "slug": "peer-health-advisors",
    "sourceUrl": "https://360.lehigh.edu/programs/peer-health-advisors",
    "description": "The Peer Health Advisors are students trained by Health Advancement & Prevention Strategies staff members and other campus experts to help advance the health and safety of their peers at Lehigh University. Peer Health Advisors provide peer-to-peer support, advice, resources and programming to promote health behaviors.",
    "website": "https://studentaffairs.lehigh.edu/content/peer-health-advisors",
    "contact": "inhaps@lehigh.edu / Jenna Rose / Yen DeBellis",
    "timeline": "Applications due September 21, 2025",
    "costFunding": "Volunteer opportunity. 4-credit class in the spring semester is a prerequisite to join the organization.",
    "deadline": "2026-09-21",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Creative Inquiry",
      "Leadership Development",
      "Peer Mentoring",
      "Research",
      "Work-Integrated Learning"
    ],
    "fundingTypes": [
      "Academic Credit",
      "Volunteer"
    ],
    "sdgTags": [],
    "keywords": [
      "data",
      "health",
      "health initiatives",
      "peer advising",
      "resources",
      "safety",
      "support",
      "peer support",
      "volunteer",
      "volunteering"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Peer_Health_Advisors.jpg?itok=NgVjJXgz",
    "imageAlt": "peer health advisors",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Peer_Health_Advisors.jpg?itok=emEHnKgx",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Peer_Health_Advisors.jpg?itok=f_R1SDtA",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Peer_Health_Advisors.jpg?itok=HJPhiLFj",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Peer_Health_Advisors.jpg?itok=fvSxvKYJ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Peer_Health_Advisors.jpg?itok=GWJoyRsL",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Peer_Health_Advisors.jpg?itok=wcMIVBpl",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Peer_Health_Advisors.jpg?itok=vq32nbpQ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Peer_Health_Advisors.jpg?itok=Efk3OH1c",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Peer_Health_Advisors.jpg?itok=NgVjJXgz",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Peer_Health_Advisors.jpg?itok=esEeWy8Q"
    ],
    "featured": true
  },
  {
    "id": "break-silence-peer-educators",
    "title": "Break the Silence Peer Educators",
    "slug": "break-silence-peer-educators",
    "sourceUrl": "https://360.lehigh.edu/programs/break-silence-peer-educators",
    "description": "Break the Silence or BTS is a peer education organization whose mission is to spread awareness about gender violence including sexual assault, intimate partner abuse, stalking, sexual exploitation, and sexual harassment and to prevent gender violence through healthy sexuality education. BTS facilitates trainings on topics such as sexuality education, consent, sex communication, bystander intervention, relationships, and gender based violence. Their goal is to make their peers feel comfortable, empowered, and educated so that sex and pleasure can become part of everyday conversations.",
    "website": "https://studentaffairs.lehigh.edu/content/break-silence",
    "contact": "inssie@lehigh.edu; 610-758-1303",
    "timeline": "Apply by September 30, 2025",
    "costFunding": "No cost/funded through the SSIE office, optional 2 credit peer educator course during spring semester, academic credit can also be offered for a WGSS internship",
    "deadline": "2026-09-30",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Leadership Development",
      "Peer Mentoring",
      "Research"
    ],
    "fundingTypes": [
      "Academic Credit",
      "No Compensation",
      "Volunteer"
    ],
    "sdgTags": [],
    "keywords": [
      "BTS",
      "Break The Silence",
      "gender violence",
      "intimate partner abuse",
      "internship",
      "peer mentor",
      "sexuality",
      "sexual assault",
      "sex education",
      "survivor",
      "Title IX",
      "trauma informed",
      "volunteer"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/BTS%20Tabling.png?itok=fjceE_5Q",
    "imageAlt": "",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/BTS%20Tabling.png?itok=eaaj_IEv",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/BTS%20Tabling.png?itok=6ev_GsJs",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/BTS%20Tabling.png?itok=FLOTuMLZ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/BTS%20Tabling.png?itok=HtMgV7cS",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/BTS%20Tabling.png?itok=n7aS_ZOV",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/BTS%20Tabling.png?itok=BHEIt5v3",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/BTS%20Tabling.png?itok=N7mKrOBv",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/BTS%20Tabling.png?itok=pgZ2KF0q",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/BTS%20Tabling.png?itok=fjceE_5Q",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/BTS%20Tabling.png?itok=XY40VwlA"
    ],
    "featured": true
  },
  {
    "id": "lehighsiliconvalley",
    "title": "LehighSiliconValley",
    "slug": "lehighsiliconvalley",
    "sourceUrl": "https://360.lehigh.edu/programs/lehighsiliconvalley",
    "description": "LehighSiliconValley is the Baker Institute's flagship week-long winter term program immersing students in the San Francisco Bay Area entrepreneurial ecosystem. Cost: $5,295 plus airfare, financial aid available",
    "website": "https://go.lehigh.edu/lsv",
    "contact": "bakerinfo@lehigh.edu",
    "timeline": "Applications for LSV2026 are due Oct 16, 2025.",
    "deadline": "2026-10-16",
    "duration": "Full time for 1 day on campus, 3 days remote and 5 days in person.",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": true,
    "gpaMinimumRequired": false,
    "periods": [
      "Winter"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Entrepreneurship"
    ],
    "fundingTypes": [
      "Academic Credit"
    ],
    "sdgTags": [],
    "keywords": [
      "Entrepreneurship",
      "startup",
      "Silicon Valley",
      "California",
      "tech",
      "Tech Industry",
      "business",
      "Lehigh Silicon Valley",
      "LSV",
      "Baker Institute",
      "Hands-on learning",
      "idea",
      "San Francisco"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/LehighSiliconValley.PNG?itok=LtOupO5L",
    "imageAlt": "",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/LehighSiliconValley.PNG?itok=OGDMkJG8",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/LehighSiliconValley.PNG?itok=K-eifQYj",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/LehighSiliconValley.PNG?itok=ssuQxwZf",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/LehighSiliconValley.PNG?itok=bxpKeX-J",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/LehighSiliconValley.PNG?itok=0P-DAkAi",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/LehighSiliconValley.PNG?itok=-XSaoIAk",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/LehighSiliconValley.PNG?itok=NXMmMpFk",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/LehighSiliconValley.PNG?itok=22460sGz",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/LehighSiliconValley.PNG?itok=LtOupO5L",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/LehighSiliconValley.PNG?itok=aZXHnhd9"
    ],
    "featured": true
  },
  {
    "id": "office-residence-life-gryphon-society",
    "title": "Office of Residence Life Gryphon Society",
    "slug": "office-residence-life-gryphon-society",
    "sourceUrl": "https://360.lehigh.edu/programs/office-residence-life-gryphon-society",
    "description": "The Gryphon is a paraprofessional, undergraduate student staff member of the Office of Residence Life. The Gryphon plays a vital role in facilitating an atmosphere of community upon a specific building or area (depending on their assignment). The Gryphon receives direct supervision from an Assistant Director or Graduate Assistant, and the Associate Director(s) provides indirect supervision.",
    "website": "https://studentaffairs.lehigh.edu/content/gryphon-society",
    "contact": "gryphon@lehigh.edu",
    "timeline": "The application for the 2026-2027 school year is due Friday, Oct 24th at 12PM. Gryphons commit for the entire academic year (August-May). There are limited positions available over the summer for current Gryphons.",
    "costFunding": "Single room, stipend of $3010 distributed biweekly",
    "deadline": "2026-10-24",
    "duration": "August-May (entire academic year); Fall, Winter, & Spring semesters",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring",
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Leadership Development",
      "Peer Mentoring"
    ],
    "fundingTypes": [
      "Stipend",
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [
      "gryphon",
      "gryphon society",
      "leadership",
      "leader",
      "paraprofessional",
      "peer support",
      "peer engagement",
      "residence life",
      "stipend",
      "undergraduate"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Residence%20Life%20Gryphon%20Team%20-%20August%202023.jpg?itok=uaP965qO",
    "imageAlt": "",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Residence%20Life%20Gryphon%20Team%20-%20August%202023.jpg?itok=ptVwvpCS",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Residence%20Life%20Gryphon%20Team%20-%20August%202023.jpg?itok=s4Y1UnGg",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Residence%20Life%20Gryphon%20Team%20-%20August%202023.jpg?itok=88qW6LLw",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Residence%20Life%20Gryphon%20Team%20-%20August%202023.jpg?itok=hDeroYzm",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Residence%20Life%20Gryphon%20Team%20-%20August%202023.jpg?itok=8INW2nR3",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Residence%20Life%20Gryphon%20Team%20-%20August%202023.jpg?itok=jcOhnHtj",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Residence%20Life%20Gryphon%20Team%20-%20August%202023.jpg?itok=P06GOAmy",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Residence%20Life%20Gryphon%20Team%20-%20August%202023.jpg?itok=aILE6gMO",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Residence%20Life%20Gryphon%20Team%20-%20August%202023.jpg?itok=uaP965qO",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Residence%20Life%20Gryphon%20Team%20-%20August%202023.jpg?itok=ElZLYSRZ"
    ],
    "featured": true
  },
  {
    "id": "spring-innovation-internship",
    "title": "Spring Innovation Internship",
    "slug": "spring-innovation-internship",
    "sourceUrl": "https://360.lehigh.edu/lehigh-360/lehigh-360-high-impact-programs-database/spring-innovation-internship",
    "description": "Innovation Internship is a cutting-edge academic program that immerses students in part-time, real-world internships with startups. Students spend the semester working remotely on real projects with real impact while connecting with Silicon Valley leaders through a weekly class session. Innovation Internship (BUS-178) is a 3-credit course available to rising sophomores, juniors, seniors, and graduate students across the university – any major can apply! During this 15-week internship, students gain practical experience by spending 10-15 hours per week interning with a startup, developing their entrepreneurial mindset and skills. Students selected into the program are paired with startups across various industries as they work alongside founders and business leaders on mission-critical projects. Interns add meaningful value and produce a number of resume-ready deliverables for the company. The internship is facilitated through a 3-credit course, led by Lehigh@NasdaqCenter, that meets weekly. The weekly class session features Silicon Valley entrepreneurs and industry leaders. This enables students to put classroom knowledge into action in real-world business environments while expanding their skill sets and network.",
    "website": "https://westcoast.lehigh.edu/academic-programs/innovation-internship",
    "contact": "Dr. Sarah Leedberg, Assistant Director, Innovation Programs sel523@lehigh.edu",
    "timeline": "Internships run for the spring and fall semester. The application for the spring 2025 cohort is now closed. Applications for fall 2025 is now closed.",
    "costFunding": "No cost",
    "deadline": "2026-10-26",
    "duration": "15 weeks",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Entrepreneurship",
      "Leadership Development",
      "Work-Integrated Learning"
    ],
    "fundingTypes": [
      "Academic Credit"
    ],
    "sdgTags": [],
    "keywords": [
      "Silicon Valley",
      "Entrepreneurship",
      "startup",
      "internship",
      "innovation",
      "nasdaq",
      "fall",
      "fall semester"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=q-LwBVuX",
    "imageAlt": "Lehigh@NasdaqCenter Innovation Internship",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=Q7JwSuGN",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=Ou-nqOUb",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=M9FhX1o_",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=dst30Lno",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=SZ3cU8eK",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=OrzTPBJd",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=fZbnWcGC",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=oNr_lBqv",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=q-LwBVuX",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=WUxqkluF"
    ],
    "featured": true
  },
  {
    "id": "lehigh-valley-social-impact-fellowship",
    "title": "Lehigh Valley Social Impact Fellowship",
    "slug": "lehigh-valley-social-impact-fellowship",
    "sourceUrl": "https://360.lehigh.edu/programs/lehigh-valley-social-impact-fellowship",
    "description": "Lehigh Valley Social Impact Fellows are a cohort of undergraduate and graduate students who address social and economic challenges in the south Bethlehem community and broader Lehigh Valley region. LVSIFs advance their projects in the Spring and Fall semesters and have the option of working on their project in the summer at Mountaintop. The courses, workshops, retreats, and immersive experiences of this program integrate experiential learning, research, and entrepreneurial engagement with students leading original and ambitious projects with local partners. Projects are mentored by Lehigh faculty with students making substantial intellectual contributions along the way.",
    "website": "https://creativeinquiry.lehigh.edu/mountaintop-programs/lehigh-valley-social-impact-fellowship",
    "contact": "Bill Whitney, wrw210@lehigh.edu",
    "timeline": "Application for 2026 cohort will open in October 2025. Two semesters (Spring followed by Fall). 3 Academic Credits per semester.",
    "costFunding": "No cost to students",
    "deadline": "2026-11-02",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Creative Inquiry",
      "Entrepreneurship",
      "Global & Cross Cultural",
      "Leadership Development",
      "Research"
    ],
    "fundingTypes": [
      "Academic Credit"
    ],
    "sdgTags": [],
    "keywords": [
      "academic credit",
      "Allentown",
      "App Development",
      "Arts",
      "Bethlehem",
      "South Bethlehem",
      "business",
      "climate",
      "conferences",
      "Creative Inquiry",
      "Diplomacy",
      "economic development",
      "education",
      "Entrepreneurship",
      "ethics",
      "Experiential",
      "Industry Partnerships",
      "Lehigh Valley",
      "Lehigh County",
      "Lehigh Valley Social Impact Fellowship",
      "LVSIF",
      "Impact",
      "health",
      "Humanities",
      "Northampton County",
      "Sustainable Development Goals",
      "Pennsylvania",
      "sustainability",
      "Social Science",
      "Web Development",
      "Immersive",
      "Social Entrepreneurship",
      "Social Impact",
      "research",
      "publications"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Community%20Mapping.jpg?itok=m8FyM38f",
    "imageAlt": "",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Community%20Mapping.jpg?itok=FmacwHyK",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Community%20Mapping.jpg?itok=s9QXkVVV",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Community%20Mapping.jpg?itok=pz2RdHb8",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Community%20Mapping.jpg?itok=EJpl0sBz",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Community%20Mapping.jpg?itok=UdD9d51K",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Community%20Mapping.jpg?itok=2xFQhLf-",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Community%20Mapping.jpg?itok=c9LyV0SF",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Community%20Mapping.jpg?itok=U2qC7o2x",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Community%20Mapping.jpg?itok=m8FyM38f",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Community%20Mapping.jpg?itok=CePFMel5"
    ],
    "featured": true
  },
  {
    "id": "india-global-social-impact-fellowship",
    "title": "India Global Social Impact Fellowship",
    "slug": "india-global-social-impact-fellowship",
    "sourceUrl": "https://360.lehigh.edu/lehigh-360/lehigh-360-high-impact-programs-database/india-global-social-impact-fellowship",
    "description": "Global Social Impact Fellows are a cohort of undergraduate and graduate students who address sustainable development challenges in low-resource countries. GSIFs advance their projects in the Spring and Fall semesters, and in the summer, travel for 2-3 weeks of fieldwork. The courses, workshops, retreats, and immersive experiences of this program integrate experiential learning, research, and entrepreneurial engagement with students leading original and ambitious projects with in-country partners in diverse countries. Projects are mentored by Lehigh faculty with students making substantial intellectual contributions along the way.",
    "website": "https://creativeinquiry.lehigh.edu/impact-fellowships/global-social-impact-fellowship",
    "contact": "Bill Whitney, wrw210@lehigh.edu",
    "timeline": "Application for 2026 cohort will open in October 2025. Program runs for two semesters (Spring followed by Fall) plus summer fieldwork.",
    "costFunding": "$1500-2000 needed for fieldwork - financial assistance is available and offered to nearly all students according to need. 3 Academic Credits per semester for two semesters.",
    "deadline": "2026-11-02",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": true,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring",
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Creative Inquiry",
      "Entrepreneurship",
      "Global & Cross Cultural",
      "Leadership Development",
      "Research"
    ],
    "fundingTypes": [
      "Academic Credit",
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [
      "App Development",
      "academic credit",
      "funding",
      "Global Social Impact Fellowship",
      "GSIF",
      "Impact",
      "Creative Inquiry",
      "health",
      "education",
      "Humanitarian Technology",
      "Sustainable Development Goals",
      "Global Challenges",
      "climate",
      "sustainability",
      "Humanities",
      "Social Science",
      "business",
      "Africa",
      "Central Asia",
      "Southeast Asia",
      "Sierra Leone",
      "Kazakhstan",
      "Philippines",
      "Experiential",
      "Immersive",
      "global",
      "Social Entrepreneurship",
      "Entrepreneurship",
      "Social Impact",
      "research",
      "Industry Partnerships",
      "conferences",
      "publications",
      "ethics",
      "Diplomacy"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=yMPytv-i",
    "imageAlt": "Sierra Leone: CareAlert",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=GJNsI8pZ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=S8n68Bne",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=GYwttt3b",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=5qk1EKTM",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=ad4FRT6w",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=MZHxyT61",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=Q5i6xCGm",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=0kLYmb0r",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=yMPytv-i",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=obrQwTVQ"
    ],
    "featured": true
  },
  {
    "id": "campus-sustainable-impact-fellowship",
    "title": "Campus Social Impact Fellowship",
    "slug": "campus-sustainable-impact-fellowship",
    "sourceUrl": "https://360.lehigh.edu/programs/campus-sustainable-impact-fellowship",
    "description": "Campus Social Impact Fellows are a cohort of undergraduate and graduate students who address challenges related to the UN Sustainable Development Goals on Lehigh's campus. CSIFs advance their projects in the Spring and Fall semesters and have the option of working on their project in the summer at Mountaintop. The courses, workshops, retreats, and immersive experiences of this program integrate experiential learning, research, and entrepreneurial engagement with students leading original and ambitious projects with partners on campus and across the region. Projects are mentored by Lehigh faculty with students making substantial intellectual contributions along the way.",
    "website": "https://creativeinquiry.lehigh.edu/mountaintop-programs/campus-sustainable-impact-fellowship",
    "contact": "Bill Whitney, wrw210@lehigh.edu",
    "timeline": "Application for 2026 cohort will open in Oct 2025. Two semesters (Spring followed by Fall). 3 Academic Credits per semester for two semesters.",
    "costFunding": "No cost to students",
    "deadline": "2026-11-02",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Creative Inquiry",
      "Entrepreneurship",
      "Research"
    ],
    "fundingTypes": [
      "Academic Credit"
    ],
    "sdgTags": [],
    "keywords": [
      "academic credit",
      "Bethlehem",
      "Campus Sustainable Impact Fellowship",
      "CSIF",
      "South Bethlehem",
      "Southside",
      "Lehigh Valley",
      "Sustainability Plan",
      "Sustainability Plan 2030",
      "Office of Sustainability",
      "Impact",
      "Creative Inquiry",
      "health",
      "education",
      "behavior",
      "Humanities",
      "Sustainable Development Goals",
      "UN SDGs",
      "climate",
      "sustainability",
      "Social Science",
      "economic development",
      "experiential learning",
      "Social Entrepreneurship",
      "Entrepreneurship",
      "Social Impact",
      "environmental impact",
      "climate change",
      "research",
      "Campus Partnerships",
      "conferences",
      "publications",
      "ethics",
      "Diplomacy"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202025-07-14%20at%204.59.30%20PM.png?itok=hsmgHLZl",
    "imageAlt": "ImpactTrails",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Screen%20Shot%202025-07-14%20at%204.59.30%20PM.png?itok=J3U6Qm56",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%204.59.30%20PM.png?itok=hR1EmVoX",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Screen%20Shot%202025-07-14%20at%204.59.30%20PM.png?itok=u55pnbLN",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%204.59.30%20PM.png?itok=uHlAkdJ9",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Screen%20Shot%202025-07-14%20at%204.59.30%20PM.png?itok=LxWKVM1s",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%204.59.30%20PM.png?itok=bezZTmBb",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Screen%20Shot%202025-07-14%20at%204.59.30%20PM.png?itok=rn5mEivg",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%204.59.30%20PM.png?itok=2-IOMiWU",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202025-07-14%20at%204.59.30%20PM.png?itok=hsmgHLZl",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%204.59.30%20PM.png?itok=NL9Igiji"
    ],
    "featured": false
  },
  {
    "id": "sierra-leone-global-social-impact-fellowship",
    "title": "Sierra Leone Global Social Impact Fellowship",
    "slug": "sierra-leone-global-social-impact-fellowship",
    "sourceUrl": "https://360.lehigh.edu/lehigh-360/lehigh-360-high-impact-programs-database/sierra-leone-global-social-impact-fellowship",
    "description": "Global Social Impact Fellows are a cohort of undergraduate and graduate students who address sustainable development challenges in low-resource countries. GSIFs advance their projects in the Spring and Fall semesters, and in the summer, travel for 2-3 weeks of fieldwork. The courses, workshops, retreats, and immersive experiences of this program integrate experiential learning, research, and entrepreneurial engagement with students leading original and ambitious projects with in-country partners in diverse countries. Projects are mentored by Lehigh faculty with students making substantial intellectual contributions along the way.",
    "website": "https://creativeinquiry.lehigh.edu/impact-fellowships/global-social-impact-fellowship",
    "contact": "Bill Whitney, wrw210@lehigh.edu",
    "timeline": "Application for 2026 cohort will open in October 2025. Program runs for two semesters (Spring followed by Fall) plus summer fieldwork.",
    "costFunding": "$1500-2000 needed for fieldwork - financial assistance is available and offered to nearly all students according to need. 3 Academic Credits per semester for two semesters.",
    "deadline": "2026-11-02",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": true,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring",
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Creative Inquiry",
      "Entrepreneurship",
      "Global & Cross Cultural",
      "Leadership Development",
      "Research"
    ],
    "fundingTypes": [
      "Academic Credit",
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [
      "App Development",
      "academic credit",
      "funding",
      "Global Social Impact Fellowship",
      "GSIF",
      "Impact",
      "Creative Inquiry",
      "health",
      "education",
      "Humanitarian Technology",
      "Sustainable Development Goals",
      "Global Challenges",
      "climate",
      "sustainability",
      "Humanities",
      "Social Science",
      "business",
      "Africa",
      "Central Asia",
      "Southeast Asia",
      "Sierra Leone",
      "Kazakhstan",
      "Philippines",
      "Experiential",
      "Immersive",
      "global",
      "Social Entrepreneurship",
      "Entrepreneurship",
      "Social Impact",
      "research",
      "Industry Partnerships",
      "conferences",
      "publications",
      "ethics",
      "Diplomacy"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=yMPytv-i",
    "imageAlt": "Sierra Leone: CareAlert",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=GJNsI8pZ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=S8n68Bne",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=GYwttt3b",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=5qk1EKTM",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=ad4FRT6w",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=MZHxyT61",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=Q5i6xCGm",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=0kLYmb0r",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=yMPytv-i",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=obrQwTVQ"
    ],
    "featured": false
  },
  {
    "id": "silicon-valley-social-impact-fellowship",
    "title": "Silicon Valley Social Impact Fellowship",
    "slug": "silicon-valley-social-impact-fellowship",
    "sourceUrl": "https://360.lehigh.edu/programs/silicon-valley-social-impact-fellowship",
    "description": "Silicon Valley Social Impact Fellows are a cohort of undergraduate and graduate students who address social and economic challenges in the fast-growing and ever-changing tech hubs of the San Francisco Bay Area and Silicon Valley. SVSIFs advance their projects in the Spring and Fall semesters, with 2-3 weeks of fieldwork in the Bay Area during the summer. The courses, workshops, retreats, and immersive experiences of this program integrate experiential learning, research, and entrepreneurial engagement with students leading original and ambitious projects with partners on campus and across the region. Projects are mentored by Lehigh faculty with students making substantial intellectual contributions along the way.",
    "website": "https://creativeinquiry.lehigh.edu/mountaintop-programs/silicon-valley-social-impact-fellowship",
    "contact": "Bill Whitney, wrw210@lehigh.edu",
    "timeline": "Application for 2026 cohort will open in October 2025. Program runs for two semesters (Spring followed by Fall) with fieldwork typically taking place in late May/early June.",
    "costFunding": "Approx. $500 needed for fieldwork. Financial support available for most students according to need. 3 Academic Credits per semester for two semesters.",
    "deadline": "2026-11-02",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": true,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring",
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Creative Inquiry",
      "Entrepreneurship",
      "Global & Cross Cultural",
      "Research"
    ],
    "fundingTypes": [
      "Academic Credit",
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [
      "academic credit",
      "Silicon Valley Social Impact Fellowship",
      "SVSIF",
      "San Francisco",
      "Bay Area",
      "California",
      "Lehigh@NasdaqCenter",
      "Silicon Valley",
      "Oakland",
      "Berkeley",
      "San Jose",
      "Northern California",
      "Impact",
      "Creative Inquiry",
      "health",
      "education",
      "Arts",
      "Humanities",
      "food security",
      "gender",
      "public health",
      "Urban Planning",
      "Urban Economic Development",
      "storytelling",
      "climate",
      "sustainability",
      "Social Science",
      "business",
      "Web Development",
      "App Development",
      "Experiential",
      "Immersive",
      "Social Entrepreneurship",
      "Entrepreneurship",
      "Social Impact",
      "research",
      "Industry Partnerships",
      "Tech Industry",
      "Technology",
      "Humanitarian Technology",
      "conferences",
      "publications",
      "ethics",
      "Diplomacy"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/SVSIF.png?itok=fQP6mp2F",
    "imageAlt": "",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/SVSIF.png?itok=39KBMj3f",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/SVSIF.png?itok=V97IaCG1",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/SVSIF.png?itok=_95yiguF",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/SVSIF.png?itok=_U4q6FUu",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/SVSIF.png?itok=Tud9G_I_",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/SVSIF.png?itok=d3nInjk7",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/SVSIF.png?itok=V7AfRfs3",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/SVSIF.png?itok=WE5g0nUp",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/SVSIF.png?itok=fQP6mp2F",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/SVSIF.png?itok=ro7yfwJb"
    ],
    "featured": false
  },
  {
    "id": "kazakhstan-global-social-impact-fellowship",
    "title": "Kazakhstan Global Social Impact Fellowship",
    "slug": "kazakhstan-global-social-impact-fellowship",
    "sourceUrl": "https://360.lehigh.edu/lehigh-360/lehigh-360-high-impact-programs-database/kazakhstan-global-social-impact-fellowship",
    "description": "Global Social Impact Fellows are a cohort of undergraduate and graduate students who address sustainable development challenges in low-resource countries. GSIFs advance their projects in the Spring and Fall semesters, and in the summer, travel for 2-3 weeks of fieldwork. The courses, workshops, retreats, and immersive experiences of this program integrate experiential learning, research, and entrepreneurial engagement with students leading original and ambitious projects with in-country partners in diverse countries. Projects are mentored by Lehigh faculty with students making substantial intellectual contributions along the way.",
    "website": "https://creativeinquiry.lehigh.edu/impact-fellowships/global-social-impact-fellowship",
    "contact": "Bill Whitney, wrw210@lehigh.edu",
    "timeline": "Application for 2026 cohort will open in October 2025. Program runs for two semesters (Spring followed by Fall) plus summer fieldwork.",
    "costFunding": "$1500-2000 needed for fieldwork - financial assistance is available and offered to nearly all students according to need. 3 Academic Credits per semester for two semesters.",
    "deadline": "2026-11-02",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": true,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring",
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Creative Inquiry",
      "Entrepreneurship",
      "Global & Cross Cultural",
      "Leadership Development",
      "Research"
    ],
    "fundingTypes": [
      "Academic Credit",
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [
      "App Development",
      "academic credit",
      "funding",
      "Global Social Impact Fellowship",
      "GSIF",
      "Impact",
      "Creative Inquiry",
      "health",
      "education",
      "Humanitarian Technology",
      "Sustainable Development Goals",
      "Global Challenges",
      "climate",
      "sustainability",
      "Humanities",
      "Social Science",
      "business",
      "Africa",
      "Central Asia",
      "Southeast Asia",
      "Sierra Leone",
      "Kazakhstan",
      "Philippines",
      "Experiential",
      "Immersive",
      "global",
      "Social Entrepreneurship",
      "Entrepreneurship",
      "Social Impact",
      "research",
      "Industry Partnerships",
      "conferences",
      "publications",
      "ethics",
      "Diplomacy"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=yMPytv-i",
    "imageAlt": "Sierra Leone: CareAlert",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=GJNsI8pZ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=S8n68Bne",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=GYwttt3b",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=5qk1EKTM",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=ad4FRT6w",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=MZHxyT61",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=Q5i6xCGm",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=0kLYmb0r",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=yMPytv-i",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=obrQwTVQ"
    ],
    "featured": false
  },
  {
    "id": "global-social-impact-fellowship",
    "title": "Philippines Global Social Impact Fellowship",
    "slug": "global-social-impact-fellowship",
    "sourceUrl": "https://360.lehigh.edu/programs/global-social-impact-fellowship",
    "description": "Global Social Impact Fellows are a cohort of undergraduate and graduate students who address sustainable development challenges in low-resource countries. GSIFs advance their projects in the Spring and Fall semesters, and in the summer, travel for 2-3 weeks of fieldwork. The courses, workshops, retreats, and immersive experiences of this program integrate experiential learning, research, and entrepreneurial engagement with students leading original and ambitious projects with in-country partners in diverse countries. Projects are mentored by Lehigh faculty with students making substantial intellectual contributions along the way.",
    "website": "https://creativeinquiry.lehigh.edu/impact-fellowships/global-social-impact-fellowship",
    "contact": "Bill Whitney, wrw210@lehigh.edu",
    "timeline": "Application for 2026 cohort will open in October 2025. Program runs for two semesters (Spring followed by Fall) plus summer fieldwork.",
    "costFunding": "$1500-2000 needed for fieldwork - financial assistance is available and offered to nearly all students according to need. 3 Academic Credits per semester for two semesters.",
    "deadline": "2026-11-02",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": true,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring",
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Creative Inquiry",
      "Entrepreneurship",
      "Global & Cross Cultural",
      "Leadership Development",
      "Research"
    ],
    "fundingTypes": [
      "Academic Credit",
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [
      "App Development",
      "academic credit",
      "funding",
      "Global Social Impact Fellowship",
      "GSIF",
      "Impact",
      "Creative Inquiry",
      "health",
      "education",
      "Humanitarian Technology",
      "Sustainable Development Goals",
      "Global Challenges",
      "climate",
      "sustainability",
      "Humanities",
      "Social Science",
      "business",
      "Africa",
      "Central Asia",
      "Southeast Asia",
      "Sierra Leone",
      "Kazakhstan",
      "Philippines",
      "Experiential",
      "Immersive",
      "global",
      "Social Entrepreneurship",
      "Entrepreneurship",
      "Social Impact",
      "research",
      "Industry Partnerships",
      "conferences",
      "publications",
      "ethics",
      "Diplomacy"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=yMPytv-i",
    "imageAlt": "Sierra Leone: CareAlert",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=GJNsI8pZ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=S8n68Bne",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=GYwttt3b",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=5qk1EKTM",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=ad4FRT6w",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=MZHxyT61",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=Q5i6xCGm",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=0kLYmb0r",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=yMPytv-i",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Screen%20Shot%202025-07-14%20at%205.06.47%20PM.png?itok=obrQwTVQ"
    ],
    "featured": false
  },
  {
    "id": "nextgen-pathways-transformative-impact",
    "title": "NextGen Pathways to Transformative Impact Fellowship",
    "slug": "nextgen-pathways-transformative-impact",
    "sourceUrl": "https://360.lehigh.edu/lehigh-360/lehigh-360-high-impact-programs-database/nextgen-pathways-transformative-impact",
    "description": "NextGen Pathways to Transformative Impact Fellowship is listed in Lehigh360's high-impact programs database.",
    "deadline": "2026-11-02",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [],
    "eligibleClassYears": [],
    "opportunityTypes": [
      "Creative Inquiry"
    ],
    "fundingTypes": [
      "Academic Credit"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "",
    "imageAlt": "",
    "photoUrls": [],
    "featured": false
  },
  {
    "id": "iacocca-international-internship-program",
    "title": "Iacocca International Internship Program",
    "slug": "iacocca-international-internship-program",
    "sourceUrl": "https://360.lehigh.edu/programs/iacocca-international-internship-program",
    "description": "The Iacocca International Internship Program is a mostly-funded opportunity to live and work in another country over the summer and is open to all Lehigh degree seeking students from all disciplines. Participation begins in January and ends in September, and the travel dates are 6-10 weeks over the summer. Wrap-around curriculum enables student-guided learning and peer-to-peer support. Students who are interested in enhancing their career readiness and developing intercultural competency are encouraged to apply.",
    "website": "https://global.lehigh.edu/internships",
    "contact": "inliii@lehigh.edu",
    "timeline": "Please check the IIIP student website for information about sessions, locations for 2026, and the application portal opening. Join the interest list here to receive regular email updates.",
    "costFunding": "This is a mostly-funded experience, including airfare, housing and most meals. Students are responsible for passport and visa (where applicable) fees, innoculations (if needed), as well as some meals and any additional travel they want to do beyond the internship experience.",
    "deadline": "2026-11-10",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": true,
    "gpaMinimumRequired": true,
    "periods": [
      "Summer",
      "Spring",
      "Winter"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs",
      "College of Education"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Global & Cross Cultural",
      "Leadership Development",
      "Research",
      "Work-Integrated Learning"
    ],
    "fundingTypes": [
      "Stipend",
      "Academic Credit",
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Iacocca%20International%20Internship%20Program%202023_1.JPG?itok=Zz4R9maz",
    "imageAlt": "",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Iacocca%20International%20Internship%20Program%202023_1.JPG?itok=LtfZGk09",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Iacocca%20International%20Internship%20Program%202023_1.JPG?itok=b130ZRwc",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Iacocca%20International%20Internship%20Program%202023_1.JPG?itok=88Yb7xG_",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Iacocca%20International%20Internship%20Program%202023_1.JPG?itok=3kBH9NuY",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Iacocca%20International%20Internship%20Program%202023_1.JPG?itok=E5ACs8cz",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Iacocca%20International%20Internship%20Program%202023_1.JPG?itok=aSbiI4Ef",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Iacocca%20International%20Internship%20Program%202023_1.JPG?itok=61GYHhUd",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Iacocca%20International%20Internship%20Program%202023_1.JPG?itok=nx0qSYdd",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Iacocca%20International%20Internship%20Program%202023_1.JPG?itok=Zz4R9maz",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Iacocca%20International%20Internship%20Program%202023_1.JPG?itok=NwyxYb8C"
    ],
    "featured": false
  },
  {
    "id": "uganda-sustainable-livelihoods-program",
    "title": "Uganda Sustainable Livelihoods Program",
    "slug": "uganda-sustainable-livelihoods-program",
    "sourceUrl": "https://360.lehigh.edu/programs/uganda-sustainable-livelihoods-program",
    "description": "Uganda Sustainable Livelihoods Program is a research & internship based program in Bududa, Uganda. Students can intern at local organizations, including Pathways Development Initiative, which has a primary school and youth sports programs, or Buskika Health Centre, where students can shadow medical staff and assist with public health outreach. Students can also conduct social research under the direction of Professor Austin on topics related to health, education, the environment, women's empowerment, or community development.",
    "contact": "Professor Kelly Austin (kellyaustin@lehigh.edu)",
    "costFunding": "Students typically apply for full funding through the Iacocca International Internship Program or other sources.",
    "deadline": "2026-12-01",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Global & Cross Cultural",
      "Leadership Development",
      "Research",
      "Work-Integrated Learning"
    ],
    "fundingTypes": [
      "Funded Expenses",
      "Volunteer"
    ],
    "sdgTags": [],
    "keywords": [
      "Africa",
      "community development",
      "community engagement",
      "education",
      "health",
      "internship",
      "Pathways Development Initiative",
      "public health",
      "research",
      "sustainable development",
      "Uganda",
      "work-integrated learning",
      "youth empowerment",
      "sports",
      "Zion Community Clinic"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Uganda%20Sustainable%20Livelihoods%20Program.jpg?itok=VAUiUuUR",
    "imageAlt": "",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Uganda%20Sustainable%20Livelihoods%20Program.jpg?itok=EIz40Y0C",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Uganda%20Sustainable%20Livelihoods%20Program.jpg?itok=lDZPuUp1",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Uganda%20Sustainable%20Livelihoods%20Program.jpg?itok=ZPaHS6gK",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Uganda%20Sustainable%20Livelihoods%20Program.jpg?itok=IabN1GTG",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Uganda%20Sustainable%20Livelihoods%20Program.jpg?itok=0FZxXBXd",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Uganda%20Sustainable%20Livelihoods%20Program.jpg?itok=cV6SL4UU",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Uganda%20Sustainable%20Livelihoods%20Program.jpg?itok=G9Mh7Xs2",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Uganda%20Sustainable%20Livelihoods%20Program.jpg?itok=uUE_KehV",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Uganda%20Sustainable%20Livelihoods%20Program.jpg?itok=VAUiUuUR",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Uganda%20Sustainable%20Livelihoods%20Program.jpg?itok=QROa6Zvk"
    ],
    "featured": false
  },
  {
    "id": "orientation-leader-ofye-staff",
    "title": "Orientation Leader, OFYE Staff",
    "slug": "orientation-leader-ofye-staff",
    "sourceUrl": "https://360.lehigh.edu/programs/orientation-leader-ofye-staff",
    "description": "An Orientation Leader serves as a resource for the academic and social transition for first-year students on the OFYE Staff. They participate in Spring and Summer training, guide students through 4 days of Orientation and serve as support throughout the fall in their role in NavigateLU. Click here for more information about the Orientation Leader (including Transfer Orientation Leader) Candidate Nomination Form : https://forms.gle/WJ57TQCkAvntisCs9",
    "website": "https://studentaffairs.lehigh.edu/content/be-orientation-leader",
    "contact": "Nicole Burke, nmb518@lehigh.edu",
    "timeline": "Apply by Friday, January 23 at 12 noon. Commitment for training in spring 2026, orientation in August 2026 and NavigateLU in fall 2026.",
    "costFunding": "Volunteer opportunity - no cost to student, training provided",
    "deadline": "2027-01-23",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring",
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior"
    ],
    "opportunityTypes": [
      "Leadership Development",
      "Peer Mentoring"
    ],
    "fundingTypes": [
      "No Compensation",
      "Volunteer"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "",
    "imageAlt": "",
    "photoUrls": [],
    "featured": false
  },
  {
    "id": "camp-hawk-counselors",
    "title": "Camp Hawk Counselors",
    "slug": "camp-hawk-counselors",
    "sourceUrl": "https://360.lehigh.edu/programs/camp-hawk-counselors",
    "description": "Camp Hawk Counselors serve as a resource for the academic and social transition for first-year students on the OFYE Staff. They participate in Spring and Summer training, assist with Move-In week logistics, guide students through a weekend retreat in the Poconos in September, and act as a resource throughout the fall semester. Click here for more information about Camp Hawk Counselor positions. Candidate Nomination Form : https://forms.gle/WJ57TQCkAvntisCs9",
    "website": "https://studentaffairs.lehigh.edu/content/be-camp-hawk-counselor",
    "contact": "Stefanie Burke; sdb212@lehigh.edu",
    "timeline": "Application deadline is 12:00 Noon on Friday, January 24th",
    "costFunding": "No cost to students",
    "deadline": "2027-01-23",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring",
      "Winter"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior"
    ],
    "opportunityTypes": [
      "Leadership Development",
      "Peer Mentoring"
    ],
    "fundingTypes": [
      "No Compensation",
      "Volunteer"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Camp%20Hawk%20Group%20photo.jpg?itok=T-ro43yz",
    "imageAlt": "Camp Hawk Group photo",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Camp%20Hawk%20Group%20photo.jpg?itok=1VaoqKv5",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Camp%20Hawk%20Group%20photo.jpg?itok=CmIHPjiE",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Camp%20Hawk%20Group%20photo.jpg?itok=dGhVKbOn",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Camp%20Hawk%20Group%20photo.jpg?itok=hS-dyF0G",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Camp%20Hawk%20Group%20photo.jpg?itok=nUsH1FVS",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Camp%20Hawk%20Group%20photo.jpg?itok=eqcAjNeD",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Camp%20Hawk%20Group%20photo.jpg?itok=PJPqtjr7",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Camp%20Hawk%20Group%20photo.jpg?itok=rspKKnRi",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Camp%20Hawk%20Group%20photo.jpg?itok=T-ro43yz",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Camp%20Hawk%20Group%20photo.jpg?itok=SOuanG1i"
    ],
    "featured": false
  },
  {
    "id": "startup-academy",
    "title": "Startup Academy",
    "slug": "startup-academy",
    "sourceUrl": "https://360.lehigh.edu/programs/startup-academy",
    "description": "Startup Academy is an immersive, 10-week academic practicum and entrepreneurial talent accelerator based in the heart of the San Francisco Bay Area—one of the world’s most vibrant startup ecosystems. Through a three-credit course, students engage in rigorous, hands-on learning while contributing directly to high-growth startups and innovation teams. Paired with Bay Area founders and industry leaders, students apply entrepreneurial thinking, market analysis, innovation strategy, and product development skills to real business challenges. Students live in residence in San Francisco for 8-weeks during the summer program, with housing, daily breakfast, and dinner provided* (lunch is self-arranged), fostering a tight-knit, collaborative community. The combination of academic rigor, industry immersion, and network access makes the Lehigh Startup Academy a powerful launchpad for both student career trajectories and the growth ambitions of participating companies. *You must attend a mandatory info session to qualify to apply - See dates and times on website page here Cost: *Need-based financial aid available through Startup Academy, Student Opportunity Fund, and the High-Impact Experience Opportunity Fellowship.",
    "website": "https://westcoast.lehigh.edu/academic-programs/startup-academy",
    "contact": "Sam Dewalt, Managing Director, Lehigh@NasdaqCenter/Sarah Leedberg, Assistant Director, Innovation Programs/ Marina Odierno, Associate Director of Professional Development, College of Business",
    "timeline": "Applications due January 26, 2026",
    "deadline": "2027-01-26",
    "duration": "10 weeks",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Entrepreneurship",
      "Leadership Development",
      "Work-Integrated Learning"
    ],
    "fundingTypes": [
      "Academic Credit",
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Nasdaq-Lehigh_2022_011_4.jpg?itok=s40qGn3z",
    "imageAlt": "students talking",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Nasdaq-Lehigh_2022_011_4.jpg?itok=_PfrWLbQ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Nasdaq-Lehigh_2022_011_4.jpg?itok=YY5PLHTJ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Nasdaq-Lehigh_2022_011_4.jpg?itok=ScHdbv09",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Nasdaq-Lehigh_2022_011_4.jpg?itok=8-FTQ0Sh",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Nasdaq-Lehigh_2022_011_4.jpg?itok=a6b7VCNn",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Nasdaq-Lehigh_2022_011_4.jpg?itok=B4VeovBw",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Nasdaq-Lehigh_2022_011_4.jpg?itok=gw-ViOQf",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Nasdaq-Lehigh_2022_011_4.jpg?itok=BThYj2Mq",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Nasdaq-Lehigh_2022_011_4.jpg?itok=s40qGn3z",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Nasdaq-Lehigh_2022_011_4.jpg?itok=JMNMPY_r"
    ],
    "featured": false
  },
  {
    "id": "stem-summer-institute",
    "title": "STEM Summer Institute",
    "slug": "stem-summer-institute",
    "sourceUrl": "https://360.lehigh.edu/programs/stem-summer-institute",
    "description": "STEM-SI is a 10-week research-intensive training program that bridges long-standing summer programs (REUs, BDSI, ATLSS) across the STEM Community at the University. The structure provides undergraduate researchers, who will work individually or as part of team with one or more faculty members, extensive opportunities for intellectual and professional development that are fully integrated with their research experience. Our objective is to accelerate research capabilities and prepare participating students for leadership roles to address the increasingly complex societal problems requiring solutions that draw on STEM fields. Application Instructions: One faculty recommendation required to apply. 2026 Student Recommendation Form from Faculty",
    "website": "https://summer.lehigh.edu/stem-si",
    "contact": "STEM-SI Administrative Team: instemsi@lehigh.edu",
    "costFunding": "This is a paid opportunity. Students will receive a $6000 stipend.",
    "deadline": "2027-01-30",
    "duration": "10 weeks",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Summer"
    ],
    "colleges": [],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior"
    ],
    "opportunityTypes": [
      "Research"
    ],
    "fundingTypes": [
      "Stipend"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/STEMSI.jpg?itok=1IQ6EFfO",
    "imageAlt": "StemSI",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/STEMSI.jpg?itok=0ZgWhXew",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/STEMSI.jpg?itok=3bXJG4pL",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/STEMSI.jpg?itok=oMDbw7cT",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/STEMSI.jpg?itok=RkzC1f1F",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/STEMSI.jpg?itok=oV1nkmt0",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/STEMSI.jpg?itok=XvU9vw_6",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/STEMSI.jpg?itok=rh4FzNvB",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/STEMSI.jpg?itok=W0lWfDbw",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/STEMSI.jpg?itok=1IQ6EFfO",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/STEMSI.jpg?itok=lBjNQz2L"
    ],
    "featured": false
  },
  {
    "id": "RTA-Summer-Internship",
    "title": "Research Translation AcceLUrator Summer Internship",
    "slug": "RTA-Summer-Internship",
    "sourceUrl": "https://360.lehigh.edu/programs/RTA-Summer-Internship",
    "description": "Lehigh’s Research Translation AcceLUrator Summer Internship is a 10-week paid opportunity open to Lehigh University students and students from other universities. Participants will join a unified cohort, working on Research Translational Projects led by Lehigh faculty. Alongside hands-on research, interns will engage in career development workshops, gain insights into the fundamentals of research translation, and collaborate with peers across disciplines.",
    "contact": "rta@lehigh.edu",
    "timeline": "Applications are being accepted until January 31, 2025. Program runs for 10 weeks over the summer.",
    "costFunding": "This is a paid opportunity. Students will receive a $6,000 stipend as well as an additional $1,500 contribution towards housing and meal costs.",
    "deadline": "2027-01-31",
    "duration": "10 weeks",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Leadership Development",
      "Research"
    ],
    "fundingTypes": [
      "Stipend",
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [
      "research",
      "internship",
      "Hands-on learning",
      "leadership development"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/RTA_internship.jpg?itok=wKHVIaCb",
    "imageAlt": "RTA_internship",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/RTA_internship.jpg?itok=Dyg-knIE",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/RTA_internship.jpg?itok=fcOLE-qz",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/RTA_internship.jpg?itok=rCbh1YNC",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/RTA_internship.jpg?itok=Ba6w-U91",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/RTA_internship.jpg?itok=-J0y3j12",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/RTA_internship.jpg?itok=_m7sawNE",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/RTA_internship.jpg?itok=I-cC8KQM",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/RTA_internship.jpg?itok=gKgJSOud",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/RTA_internship.jpg?itok=wKHVIaCb",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/RTA_internship.jpg?itok=eMqjl2AS"
    ],
    "featured": false
  },
  {
    "id": "martindale-student-associates-honors-program",
    "title": "Martindale Student Associates Honors Program",
    "slug": "martindale-student-associates-honors-program",
    "sourceUrl": "https://360.lehigh.edu/programs/martindale-student-associates-honors-program",
    "description": "The Martindale Student Associates enables a select group of 12 Lehigh juniors--from across Lehigh's four undergraduate colleges--to explore business, economic, social and public policy issues outside their scope of classroom study. Students travel internationally to the place of research and participate in meetings and discussions with thought leaders from government, business, social, academic and research institutions. The 15-month program is fully funded and participants conduct research and write solo-authored academic articles pertaining to the country to become published authors before they graduate.",
    "website": "https://business.lehigh.edu/centers/martindale-center/programs/martindale-student-associates-honors-program",
    "contact": "Todd Watkins, Executive Director, taw4@lehigh.edu and Trisha Alexy, Program Manager, tsa2@lehigh.edu, 610-533-6262",
    "timeline": "Students apply in the winter of their junior year. Program runs spring semester junior year through spring semester senior year, including 2 weeks summer travel in May between junior and senior year.",
    "costFunding": "$0 Cost to Student, Fully funded program",
    "deadline": "2027-01-31",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring",
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "Nominations",
      "Junior"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Creative Inquiry",
      "Global & Cross Cultural",
      "Leadership Development",
      "Peer Mentoring",
      "Research",
      "Work-Integrated Learning"
    ],
    "fundingTypes": [
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Martindale_Morocco_cohort.JPG?itok=SP0txzg9",
    "imageAlt": "",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Martindale_Morocco_cohort.JPG?itok=ZbDV6wfm",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Martindale_Morocco_cohort.JPG?itok=mOKhFQXG",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Martindale_Morocco_cohort.JPG?itok=8ZcJezZY",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Martindale_Morocco_cohort.JPG?itok=5kl-mNok",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Martindale_Morocco_cohort.JPG?itok=L_c51bb5",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Martindale_Morocco_cohort.JPG?itok=6hJVrMRX",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Martindale_Morocco_cohort.JPG?itok=8cyjbp2n",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Martindale_Morocco_cohort.JPG?itok=G08A96Yl",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Martindale_Morocco_cohort.JPG?itok=SP0txzg9",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Martindale_Morocco_cohort.JPG?itok=fQhvpVzw"
    ],
    "featured": false
  },
  {
    "id": "trac-writing-fellows-program",
    "title": "TRAC Writing Fellows Program",
    "slug": "trac-writing-fellows-program",
    "sourceUrl": "https://360.lehigh.edu/programs/trac-writing-fellows-program",
    "description": "The TRAC Writing Fellows Program is a central aspect of Writing Across the Curriculum at Lehigh. TRAC Fellows serve as peer writing coaches who hold individual and small group conferences with undergraduate students, read and respond with written feedback to works in progress, assist students conducting research, and act as resources for students using instructional technologies.",
    "website": "https://lts.lehigh.edu/research-teaching-learning/writing-across-curriculum and trac.lehigh.edu",
    "contact": "tracfellows@lehigh.edu",
    "timeline": "The TRAC Writing Fellows Program is open to undergraduate students from all academic majors who will begin their sophomore or junior year at Lehigh as of Fall 2026. We invite faculty, staff, and current TRAC Fellows to nominate students beginning November and until February",
    "costFunding": "No cost to student, academic credit and stipends offered",
    "deadline": "2027-02-13",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Nominations"
    ],
    "opportunityTypes": [
      "Leadership Development",
      "Peer Mentoring",
      "Research"
    ],
    "fundingTypes": [
      "Stipend",
      "Academic Credit"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/TRAC%20Fellow%20nominations%20flier%2C%20Fall%202025%20and%20Spring%202026%20%281%29.jpg?itok=sTnR6SUW",
    "imageAlt": "TRAC Fellow nominations flier",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/TRAC%20Fellow%20nominations%20flier%2C%20Fall%202025%20and%20Spring%202026%20%281%29.jpg?itok=T3jlHpxI",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/TRAC%20Fellow%20nominations%20flier%2C%20Fall%202025%20and%20Spring%202026%20%281%29.jpg?itok=ShaV9nWi",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/TRAC%20Fellow%20nominations%20flier%2C%20Fall%202025%20and%20Spring%202026%20%281%29.jpg?itok=0XW-Nw9r",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/TRAC%20Fellow%20nominations%20flier%2C%20Fall%202025%20and%20Spring%202026%20%281%29.jpg?itok=ry2c7ZMR",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/TRAC%20Fellow%20nominations%20flier%2C%20Fall%202025%20and%20Spring%202026%20%281%29.jpg?itok=6TSpDHVc",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/TRAC%20Fellow%20nominations%20flier%2C%20Fall%202025%20and%20Spring%202026%20%281%29.jpg?itok=hEPOEWHx",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/TRAC%20Fellow%20nominations%20flier%2C%20Fall%202025%20and%20Spring%202026%20%281%29.jpg?itok=TSyFcwKt",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/TRAC%20Fellow%20nominations%20flier%2C%20Fall%202025%20and%20Spring%202026%20%281%29.jpg?itok=EYXIOBhH",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/TRAC%20Fellow%20nominations%20flier%2C%20Fall%202025%20and%20Spring%202026%20%281%29.jpg?itok=sTnR6SUW",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/TRAC%20Fellow%20nominations%20flier%2C%20Fall%202025%20and%20Spring%202026%20%281%29.jpg?itok=k2wWX5PQ"
    ],
    "featured": false
  },
  {
    "id": "ccpd-career-intern",
    "title": "CCPD Career Fellow",
    "slug": "ccpd-career-intern",
    "sourceUrl": "https://360.lehigh.edu/programs/ccpd-career-intern",
    "description": "Your role as a Career Fellow would be to support the CCPD mission to provide career education and connections that support student success. CCPD collaborates with students, campus leaders, alumni, parents, employer partners and key volunteers to create a campus ecosystem that supports a forward thinking strategic direction to enhance Lehigh’s national brand in career and professional development. The CF’s primary roles will be to serve as ambassadors of CCPD across campus and to educate students on various career related skills.",
    "website": "https://careercenter.lehigh.edu/career-fellows",
    "contact": "Aislinn Strohecker ( ars518@lehigh.edu )",
    "timeline": "Apply in January-February",
    "costFunding": "Hourly Pay",
    "deadline": "2027-02-17",
    "duration": "Fall and spring semesters",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Leadership Development",
      "Peer Mentoring"
    ],
    "fundingTypes": [
      "Hourly Pay"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/CCPD.jpg?itok=UR5h5Wiw",
    "imageAlt": "CCPD office",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/CCPD.jpg?itok=AKC_SAlI",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/CCPD.jpg?itok=8LgOcQ8y",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/CCPD.jpg?itok=T3pv_32u",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/CCPD.jpg?itok=U5YYT9tK",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/CCPD.jpg?itok=3-hkmLKg",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/CCPD.jpg?itok=nzRTUB0X",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/CCPD.jpg?itok=sAy2y0JS",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/CCPD.jpg?itok=rYxRloE2",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/CCPD.jpg?itok=UR5h5Wiw",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/CCPD.jpg?itok=EdHyh7L1"
    ],
    "featured": false
  },
  {
    "id": "lehigh-university-student-scholars-institute",
    "title": "Lehigh University Student Scholars Institute (LUSSI) Student Guides",
    "slug": "lehigh-university-student-scholars-institute",
    "sourceUrl": "https://360.lehigh.edu/programs/lehigh-university-student-scholars-institute",
    "description": "LUSSI Program Student Guides are peer mentors in the program that supports F1RST+ students in the cohort base program, starting with structures 1st year programming. Student Guides work in pairs to support 20-25 students by facilitating monthly one-on-one meetings, bi-monthly \"family meetings\", connect students with faculty and staff mentors in the program as well as resources across the university and support events organized by the Center for Student Access and Success. The role begins with training prior to the start of the program in August, followed by pre-orientation for the program participants and an academic year of engagement with the 1st year student participants.",
    "website": "https://diversityandinclusion.lehigh.edu/studentsuccess/lussi",
    "contact": "Center for Student Access and Success, inlusas@lehigh.edu",
    "timeline": "Apply in March/April for following academic year",
    "costFunding": "This opportunity qualifies for work study for Student Guides",
    "deadline": "2027-03-01",
    "duration": "Academic year",
    "creditAvailable": false,
    "workStudyOffered": true,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring",
      "Summer",
      "Winter"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior"
    ],
    "opportunityTypes": [
      "Leadership Development",
      "Peer Mentoring"
    ],
    "fundingTypes": [
      "Work Study"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/20230823_LUSSI_Drone_MLS-3.jpg?itok=6Wfwka36",
    "imageAlt": "LUSSI",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/20230823_LUSSI_Drone_MLS-3.jpg?itok=THLNnsqE",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/20230823_LUSSI_Drone_MLS-3.jpg?itok=iWImZL24",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/20230823_LUSSI_Drone_MLS-3.jpg?itok=0BXjK2dO",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/20230823_LUSSI_Drone_MLS-3.jpg?itok=LYv3xrss",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/20230823_LUSSI_Drone_MLS-3.jpg?itok=LHkc7grv",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/20230823_LUSSI_Drone_MLS-3.jpg?itok=j5Uq_vvL",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/20230823_LUSSI_Drone_MLS-3.jpg?itok=h8HBGu01",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/20230823_LUSSI_Drone_MLS-3.jpg?itok=gcLKUWo5",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/20230823_LUSSI_Drone_MLS-3.jpg?itok=6Wfwka36",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/20230823_LUSSI_Drone_MLS-3.jpg?itok=gS4J8jdA"
    ],
    "featured": false
  },
  {
    "id": "hatchery-summer-intensive",
    "title": "The Hatchery: Student Idea Accelerator",
    "slug": "hatchery-summer-intensive",
    "sourceUrl": "https://360.lehigh.edu/programs/hatchery-summer-intensive",
    "description": "The Hatchery, run by the Baker Institute for Entrepreneruship Creativity and Innovation, is a place to create new ideas and hatch those ideas into early stage businesses to be supported in EUREKA! and other programs. The Hatchery Summer Intensive specifically is a full time four week program for participants to focus on the advancement of their ideas through direct content, coaching, and inspiring guests.",
    "website": "https://go.lehigh.edu/hatchery",
    "contact": "bakerinfo@lehigh.edu",
    "timeline": "Application Deadline EXTENDED to March 2, 2026 @11:59PM",
    "costFunding": "No cost program, with housing stipends for those with qualifying financial need. Can apply for project funding through EUREKA! while in the Hatchery.",
    "deadline": "2027-03-02",
    "duration": "4 weeks",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": true,
    "gpaMinimumRequired": true,
    "periods": [
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Entrepreneurship"
    ],
    "fundingTypes": [
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Hatchery.PNG?itok=WaYI7UIN",
    "imageAlt": "",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Hatchery.PNG?itok=n5H1XvnR",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Hatchery.PNG?itok=76o2nr-u",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Hatchery.PNG?itok=HJUeuzK5",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Hatchery.PNG?itok=d9CXJ8nD",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Hatchery.PNG?itok=TYO2Z4u2",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Hatchery.PNG?itok=4juSKzII",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Hatchery.PNG?itok=3fZJpNKV",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Hatchery.PNG?itok=SeasnnP8",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Hatchery.PNG?itok=WaYI7UIN",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Hatchery.PNG?itok=_FgH1d0N"
    ],
    "featured": false
  },
  {
    "id": "global-citizenship-practitioner-leaders",
    "title": "Global Citizenship Practitioner - Leaders in Residence",
    "slug": "global-citizenship-practitioner-leaders",
    "sourceUrl": "https://360.lehigh.edu/programs/global-citizenship-practitioner-leaders",
    "description": "The Global Citizenship Practitioner - Leaders in Residence is a one-year residency within the Office of International Affairs/Office of the AVP designed for a small group of sophomores who want to think deeply about how we transform ourselves, how we engage with diverse others, and how we create and sustain change in the world. The residency involves intense engagement with an intimate cohort that loosely represents the global majority in its make-up. Those who are invited to join come ready to do the deep personal work required to take on the world’s issues and ready to learn from one another. They are already considering taking part in later OIA engagements (Iacocca internships, study abroad, application for competitive fellowships, etc.) and looking towards a perhaps-undefined but decidedly global path ahead.",
    "website": "https://global.lehigh.edu/global-citizenship/certificate",
    "contact": "inavpgl@lehigh.edu",
    "timeline": "This program will not be running for the 2025-26 school year.",
    "costFunding": "4-credits over two classes, one in fall semester, one in spring semester",
    "deadline": "2027-03-10",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "Sophomore"
    ],
    "opportunityTypes": [
      "Global & Cross Cultural",
      "Leadership Development"
    ],
    "fundingTypes": [
      "Academic Credit"
    ],
    "sdgTags": [],
    "keywords": [
      "global",
      "international",
      "Social Impact",
      "leadership"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Global_Citizenship_Pract.jpeg?itok=OMvRaBo5",
    "imageAlt": "study abroad students sitting at a table",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Global_Citizenship_Pract.jpeg?itok=JKAcViMu",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Global_Citizenship_Pract.jpeg?itok=aRNwZNWj",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Global_Citizenship_Pract.jpeg?itok=mKJebInS",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Global_Citizenship_Pract.jpeg?itok=8b0nyVTj",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Global_Citizenship_Pract.jpeg?itok=3N5QY0q4",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Global_Citizenship_Pract.jpeg?itok=og6-Dz4V",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Global_Citizenship_Pract.jpeg?itok=HSHxbanW",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Global_Citizenship_Pract.jpeg?itok=zORZ8JT4",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Global_Citizenship_Pract.jpeg?itok=OMvRaBo5",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Global_Citizenship_Pract.jpeg?itok=6UXd8WEB"
    ],
    "featured": false
  },
  {
    "id": "lehigh-med-mentors",
    "title": "Lehigh Med Mentors",
    "slug": "lehigh-med-mentors",
    "sourceUrl": "https://360.lehigh.edu/programs/lehigh-med-mentors",
    "description": "The Med Mentors are pre-health juniors and seniors who have been selected and trained to provide peer mentoring for pre-health students. Med Mentors are paired with first-year or transfer students who are interested in health careers. Med Mentors provide knowledge about their own health profession journey and how to navigate being pre-health at Lehigh.",
    "website": "Learn more about the Med Mentor responsibilities and eligibility requirements.",
    "contact": "aum221@lehigh.edu (Autumn Moser, Associate Director, Pre-Professional Advising)",
    "timeline": "Commit for one full year (summer - spring)",
    "costFunding": "No cost, volunteer",
    "deadline": "2027-03-28",
    "duration": "One full year (summer - spring)",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring",
      "Summer",
      "Winter"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Leadership Development",
      "Peer Mentoring"
    ],
    "fundingTypes": [
      "No Compensation",
      "Volunteer"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Med_Mentors.jpg?itok=gZ9rkdYN",
    "imageAlt": "Med Mentors",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Med_Mentors.jpg?itok=Q87X6IWK",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Med_Mentors.jpg?itok=6e1PqgOZ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Med_Mentors.jpg?itok=TLaIBLVp",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Med_Mentors.jpg?itok=cdVnAIB4",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Med_Mentors.jpg?itok=4VXZ27Vk",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Med_Mentors.jpg?itok=BYp52izq",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Med_Mentors.jpg?itok=nWUymWwR",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Med_Mentors.jpg?itok=hstpxwN_",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Med_Mentors.jpg?itok=gZ9rkdYN",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Med_Mentors.jpg?itok=38Z7Ih8V"
    ],
    "featured": false
  },
  {
    "id": "innovation-internship",
    "title": "Fall Innovation Internship",
    "slug": "innovation-internship",
    "sourceUrl": "https://360.lehigh.edu/programs/innovation-internship",
    "description": "Innovation Internship is a cutting-edge academic program that immerses students in part-time, real-world internships with startups. Students spend the semester working remotely on real projects with real impact while connecting with Silicon Valley leaders through a weekly class session. Innovation Internship (BUS-178) is a 3-credit course available to rising sophomores, juniors, seniors, and graduate students across the university – any major can apply! During this 15-week internship, students gain practical experience by spending 10-15 hours per week interning with a startup, developing their entrepreneurial mindset and skills. Students selected into the program are paired with startups across various industries as they work alongside founders and business leaders on mission-critical projects. Interns add meaningful value and produce a number of resume-ready deliverables for the company. The internship is facilitated through a 3-credit course, led by Lehigh@NasdaqCenter, that meets weekly. The weekly class session features Silicon Valley entrepreneurs and industry leaders. This enables students to put classroom knowledge into action in real-world business environments while expanding their skill sets and network.",
    "website": "https://westcoast.lehigh.edu/academic-programs/innovation-internship",
    "contact": "Dr. Sarah Leedberg, Assistant Director, Innovation Programs sel523@lehigh.edu",
    "timeline": "Internships run for the spring and fall semester. The application for the spring 2025 cohort is now closed. Applications for fall 2025 is now closed.",
    "costFunding": "No cost",
    "deadline": "2027-03-29",
    "duration": "15 weeks",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Entrepreneurship",
      "Leadership Development",
      "Work-Integrated Learning"
    ],
    "fundingTypes": [
      "Academic Credit"
    ],
    "sdgTags": [],
    "keywords": [
      "Silicon Valley",
      "Entrepreneurship",
      "startup",
      "internship",
      "innovation",
      "nasdaq",
      "fall",
      "fall semester"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=q-LwBVuX",
    "imageAlt": "Lehigh@NasdaqCenter Innovation Internship",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=Q7JwSuGN",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=Ou-nqOUb",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=M9FhX1o_",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=dst30Lno",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=SZ3cU8eK",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=OrzTPBJd",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=fZbnWcGC",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=oNr_lBqv",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=q-LwBVuX",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Lehigh%40NasdaqCenter-Bell-1024x683.jpeg?itok=WUxqkluF"
    ],
    "featured": false
  },
  {
    "id": "flight45-athletics-leadership",
    "title": "Flight45 Athletics Leadership",
    "slug": "flight45-athletics-leadership",
    "sourceUrl": "https://360.lehigh.edu/programs/flight45-athletics-leadership",
    "description": "Flight45 is a comprehensive and integrated effort to educate, promote, develop and inspire leadership within the Lehigh Athletics community.",
    "website": "https://lehighsports.com/feature/flight45",
    "contact": "Julie Ammary, Director of Athletics Leadership Development & Cait Gillard, Assistant Director of Athletics Leadership Development",
    "costFunding": "No cost to students",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring",
      "Summer",
      "Winter"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Leadership Development",
      "Peer Mentoring"
    ],
    "fundingTypes": [
      "No Compensation"
    ],
    "sdgTags": [],
    "keywords": [
      "athletics",
      "athletic leadership",
      "leadership",
      "high performance",
      "flight45",
      "sports"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.33.49%20PM.png?itok=FTq-RLQx",
    "imageAlt": "Womens bbteam",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.33.49%20PM.png?itok=aTNPH6US",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.33.49%20PM.png?itok=L83U0E_Z",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.33.49%20PM.png?itok=PJrtcgS_",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.33.49%20PM.png?itok=HOKRsflr",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.33.49%20PM.png?itok=Cz0HMXXl",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.33.49%20PM.png?itok=iCVICaAj",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.33.49%20PM.png?itok=byYfS8hr",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.33.49%20PM.png?itok=jkkDYYGa",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.33.49%20PM.png?itok=FTq-RLQx",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Screen%20Shot%202024-11-02%20at%209.33.49%20PM.png?itok=-3jpwI6Y"
    ],
    "featured": false
  },
  {
    "id": "luun-youth-representative-program",
    "title": "LU/UN Youth Representative Program",
    "slug": "luun-youth-representative-program",
    "sourceUrl": "https://360.lehigh.edu/programs/luun-youth-representative-program",
    "description": "Founded in 2008, Lehigh University's United Nations Youth Representative Program matches UN-accredited NGOs with high-achieving undergraduate and graduate students who serve as that NGO’s voice at the United Nations. Youth Representatives meet with global decision makers, participate in international conferences, and moderate briefings broadcast worldwide. Our Youth Representatives speak on the floor of the General Assembly and advocate on a variety of platforms related to agenda at the United Nations and worldwide.",
    "website": "https://global.lehigh.edu/un-partnership/youth-representative-program",
    "contact": "Elena Reiss - elr312@lehigh.edu",
    "timeline": "LU/UN Youth Representative positions open up on a rolling basis. Sign up for the LU/UN Partnership Weekly Update to stay up to date on the upcoming opportunities.",
    "costFunding": "While some financial support is available, participants are encouraged to seek additional funding sources for conferences, UN trips, etc.",
    "duration": "1 academic year with the option to extend based on performance",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Creative Inquiry",
      "Global & Cross Cultural",
      "Leadership Development"
    ],
    "fundingTypes": [
      "Funded Expenses",
      "No Compensation",
      "Volunteer"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/LU%3AEN.png?itok=2vOk_ny8",
    "imageAlt": "LU/UN",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/LU%3AEN.png?itok=wyWJ25zr",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/LU%3AEN.png?itok=tSSVn6Sl",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/LU%3AEN.png?itok=phXfec1q",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/LU%3AEN.png?itok=4PFl5kcU",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/LU%3AEN.png?itok=_Mlksg9o",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/LU%3AEN.png?itok=tLtx-o77",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/LU%3AEN.png?itok=bSNceHLV",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/LU%3AEN.png?itok=jpEqtTzF",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/LU%3AEN.png?itok=2vOk_ny8",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/LU%3AEN.png?itok=b2slOm_k"
    ],
    "featured": false
  },
  {
    "id": "ROTC",
    "title": "Reserve Officers' Training Corps (ROTC)",
    "slug": "ROTC",
    "sourceUrl": "https://360.lehigh.edu/programs/ROTC",
    "description": "The Reserve Officers' Training Corps (ROTC) is a college program offered at more than 1,700 colleges and universities across the United States that prepares young adults to become officers in the U.S. Military.",
    "website": "https://studentaffairs.lehigh.edu/content/military-science-and-leadership-rotc",
    "contact": "610-758-3272",
    "timeline": "ROTC follows RAS add/drop deadlines. Army scholarship deadlines differ.",
    "costFunding": "No additional fees. Must be a registered student. Scholarships available. Contracted Cadets receive $420.00 a month during the academic school year. Academic credit offered. The number of credits accepted towards a major may differ. Levels: Freshman 1 credit; Sophomore 1; Junior 2; Senior 3. This is a 4 year program so a class in each level must be completed. Graduate students are eligible if they have a min of 2 years available to pursue ROTC courses.",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Leadership Development"
    ],
    "fundingTypes": [
      "Stipend"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/rotc_0.jpeg?itok=lEWYx39I",
    "imageAlt": "students in ROTC",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/rotc_0.jpeg?itok=M87wYoFM",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/rotc_0.jpeg?itok=tYk3pPYw",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/rotc_0.jpeg?itok=CUqdpMA4",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/rotc_0.jpeg?itok=rIVeMtWn",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/rotc_0.jpeg?itok=MAJV5ogw",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/rotc_0.jpeg?itok=WAJY3HIR",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/rotc_0.jpeg?itok=ONDDpL69",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/rotc_0.jpeg?itok=XYNuA2YU",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/rotc_0.jpeg?itok=lEWYx39I",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/rotc_0.jpeg?itok=fS9PP3ZE"
    ],
    "featured": false
  },
  {
    "id": "study-abroad",
    "title": "Study Abroad",
    "slug": "study-abroad",
    "sourceUrl": "https://360.lehigh.edu/programs/study-abroad",
    "description": "Studying abroad is an experience like no other. By living and learning in a different culture, you'll broaden your understanding of the world and even gain a different perspective on your own country. With more than 250 programs, there's something for any major or interest. Meet with an advisor to help find the right one for you.",
    "website": "https://global.lehigh.edu/study-abroad",
    "contact": "studyabroad@lehigh.edu",
    "timeline": "Varies on program",
    "costFunding": "Varies on program",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": true,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring",
      "Summer",
      "Winter"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior"
    ],
    "opportunityTypes": [
      "Arts",
      "Community Engagement",
      "Creative Inquiry",
      "Entrepreneurship",
      "Global & Cross Cultural",
      "Leadership Development",
      "Research",
      "Work-Integrated Learning"
    ],
    "fundingTypes": [
      "Academic Credit",
      "Funded Expenses",
      "No Compensation"
    ],
    "sdgTags": [],
    "keywords": [
      "abroad",
      "global",
      "academic credit",
      "community",
      "community engagement",
      "research"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Lehigh%20University%20Office%20of%20International%20Affairs%20Homepage%20Banner.jpg?itok=zBnoH9If",
    "imageAlt": "study abroad",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Lehigh%20University%20Office%20of%20International%20Affairs%20Homepage%20Banner.jpg?itok=5oe3tZLk",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Lehigh%20University%20Office%20of%20International%20Affairs%20Homepage%20Banner.jpg?itok=XrKmNLjy",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Lehigh%20University%20Office%20of%20International%20Affairs%20Homepage%20Banner.jpg?itok=l4CUlnP6",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Lehigh%20University%20Office%20of%20International%20Affairs%20Homepage%20Banner.jpg?itok=y9r7ivzf",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Lehigh%20University%20Office%20of%20International%20Affairs%20Homepage%20Banner.jpg?itok=v-lfHF0k",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Lehigh%20University%20Office%20of%20International%20Affairs%20Homepage%20Banner.jpg?itok=rmlYxj5N",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Lehigh%20University%20Office%20of%20International%20Affairs%20Homepage%20Banner.jpg?itok=NMvjpf5B",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Lehigh%20University%20Office%20of%20International%20Affairs%20Homepage%20Banner.jpg?itok=atHdY2AK",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Lehigh%20University%20Office%20of%20International%20Affairs%20Homepage%20Banner.jpg?itok=zBnoH9If",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Lehigh%20University%20Office%20of%20International%20Affairs%20Homepage%20Banner.jpg?itok=pJY3kUvr"
    ],
    "featured": false
  },
  {
    "id": "eureka-venture-program",
    "title": "EUREKA! Venture Program",
    "slug": "eureka-venture-program",
    "sourceUrl": "https://360.lehigh.edu/programs/eureka-venture-program",
    "description": "The Joan F. & John M. Thalheimer '55 EUREKA! Venture Program is the Baker Institute's signature initiative in support of student venture founders from idea to product, service, and business model development - and all the steps in between.",
    "website": "https://go.lehigh.edu/eureka",
    "contact": "bakerinfo@lehigh.edu",
    "timeline": "Monthly pitch nights can be found at https://go.lehigh.edu/baker",
    "costFunding": "Mentorship and financial awards given, no cost",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring",
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Entrepreneurship",
      "Leadership Development"
    ],
    "fundingTypes": [
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/EUREKA%21_0.JPG?itok=RyM1jV5f",
    "imageAlt": "",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/EUREKA%21_0.JPG?itok=5CccGG5G",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/EUREKA%21_0.JPG?itok=rtpkUXQp",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/EUREKA%21_0.JPG?itok=ccWzzVJG",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/EUREKA%21_0.JPG?itok=2NhZbhBZ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/EUREKA%21_0.JPG?itok=oJ1gN6Ys",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/EUREKA%21_0.JPG?itok=MRs8sY4q",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/EUREKA%21_0.JPG?itok=6tFyoSqR",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/EUREKA%21_0.JPG?itok=BTELiuYZ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/EUREKA%21_0.JPG?itok=RyM1jV5f",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/EUREKA%21_0.JPG?itok=hbCVk-e7"
    ],
    "featured": false
  },
  {
    "id": "luag-lab",
    "title": "LUAG Lab",
    "slug": "luag-lab",
    "sourceUrl": "https://360.lehigh.edu/programs/luag-lab",
    "description": "Located in the Main Galleries at Lehigh University Art Galleries, the LUAG LAB is an interdisciplinary student project and exhibition space that features the research of Lehigh University students from different disciplines. With mentorship from LUAG staff and faculty, students are guided through the experience - from exhibition design to budgeting, installation, promotion, programming, and more.",
    "website": "https://luag.lehigh.edu",
    "contact": "Elise Schaffer, ejs421@lehigh.edu",
    "timeline": "Deadlines are dependent on semester. Exhibitions run for the duration of the fall and spring semesters.",
    "costFunding": "No cost to students, funded expenses",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Arts"
    ],
    "fundingTypes": [
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [
      "artwork",
      "creativity",
      "Lehigh University Art Galleries",
      "LUAG",
      "LUAG LAB",
      "Student Artwork",
      "Student Exhibition"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/LUAG_LAB.jpeg?itok=vReNRfex",
    "imageAlt": "LUAG Lab",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/LUAG_LAB.jpeg?itok=AYTUouk2",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/LUAG_LAB.jpeg?itok=GTysUHtx",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/LUAG_LAB.jpeg?itok=Ey4kCNPj",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/LUAG_LAB.jpeg?itok=9pfoTIkB",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/LUAG_LAB.jpeg?itok=X80K9s3D",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/LUAG_LAB.jpeg?itok=aWJgN-oD",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/LUAG_LAB.jpeg?itok=ggpkhrlT",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/LUAG_LAB.jpeg?itok=VOx0ihDD",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/LUAG_LAB.jpeg?itok=vReNRfex",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/LUAG_LAB.jpeg?itok=ycoRNDG-"
    ],
    "featured": false
  },
  {
    "id": "equity-reps",
    "title": "Equity Reps",
    "slug": "equity-reps",
    "sourceUrl": "https://360.lehigh.edu/programs/equity-reps",
    "description": "Equity Reps are student staff who work with the Gender, Leadership, & Empowerment Center (GLE) on events, research projects, fundraising, and so much more! By helping people understand how sex/gender affects all aspects of their lives, we build inclusive leaders, empower people to be their true selves, and foster a community where everyone can belong. The Center provides education in feminist praxis and real-world skills to prepare Equity Reps for feminist work beyond Lehigh.",
    "website": "https://inclusivebelonging.lehigh.edu/gender-leadership-and-empowerment-center",
    "contact": "incge@lehigh.edu",
    "timeline": "Students can express interest throughout the academic year. Minimum of 1 semester commitment.",
    "costFunding": "Work study and/or academic credit opportunities available.",
    "duration": "Minimum 1 semester",
    "creditAvailable": true,
    "workStudyOffered": true,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Global & Cross Cultural",
      "Leadership Development",
      "Peer Mentoring",
      "Research",
      "Work-Integrated Learning"
    ],
    "fundingTypes": [
      "Work Study",
      "Academic Credit",
      "Funded Expenses",
      "Volunteer"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Copy%20of%20Homepage%20collage.png?itok=-GRXBHZU",
    "imageAlt": "GLE",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Copy%20of%20Homepage%20collage.png?itok=hyMszQLR",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Copy%20of%20Homepage%20collage.png?itok=XSdjoXhh",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Copy%20of%20Homepage%20collage.png?itok=Oj_ndNgJ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Copy%20of%20Homepage%20collage.png?itok=ok9hjmcL",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Copy%20of%20Homepage%20collage.png?itok=1JbiPMDj",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Copy%20of%20Homepage%20collage.png?itok=o9LJPyYI",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Copy%20of%20Homepage%20collage.png?itok=d68OBeVQ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Copy%20of%20Homepage%20collage.png?itok=lry0WWh6",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Copy%20of%20Homepage%20collage.png?itok=-GRXBHZU",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Copy%20of%20Homepage%20collage.png?itok=s9QRxXH_"
    ],
    "featured": false
  },
  {
    "id": "mountaintop-summer-experience",
    "title": "Mountaintop Summer Experience",
    "slug": "mountaintop-summer-experience",
    "sourceUrl": "https://360.lehigh.edu/programs/mountaintop-summer-experience",
    "description": "Mountaintop Summer Experience projects are interdisciplinary deep dives where faculty, students, and external partners come together and take new intellectual, creative, and/or artistic pathways that lead to transformative new innovations, new expressions, and new questions. We expect students to take radical ownership in their projects, and envision faculty mentors as partners and co-creators striving to propel their projects forward on the journey towards tangible, sustainable impact: impact which builds the skillsets, mindsets, and portfolios of pioneers and change-makers in a rapidly changing world. *all applicants must also be an Impact Fellow",
    "website": "https://creativeinquiry.lehigh.edu/mountaintop-programs/mountaintop-summer-experience",
    "contact": "Bill Whitney, wrw210@lehigh.edu",
    "timeline": "Apply in late March for following summer. Program runs for 10 weeks (June through early August).",
    "costFunding": "Stipend provided for Fellows.",
    "duration": "10 weeks (June - August)",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Arts",
      "Community Engagement",
      "Creative Inquiry",
      "Entrepreneurship",
      "Leadership Development",
      "Peer Mentoring",
      "Research"
    ],
    "fundingTypes": [
      "Stipend",
      "No Compensation"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Mountaintop.jpeg?itok=IbNWJvb6",
    "imageAlt": "",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Mountaintop.jpeg?itok=HC_TsbsQ",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Mountaintop.jpeg?itok=VNrez-hg",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Mountaintop.jpeg?itok=E4znHUfc",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Mountaintop.jpeg?itok=DpltfYiF",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Mountaintop.jpeg?itok=D1R22CIr",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Mountaintop.jpeg?itok=FmjVtLRt",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Mountaintop.jpeg?itok=lFAQiydr",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Mountaintop.jpeg?itok=w-EAhcoe",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Mountaintop.jpeg?itok=IbNWJvb6",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Mountaintop.jpeg?itok=iO0wedI3"
    ],
    "featured": false
  },
  {
    "id": "rapidly-accelerated-research-experience-rare",
    "title": "Rapidly Accelerated Research Experience (RARE)",
    "slug": "rapidly-accelerated-research-experience-rare",
    "sourceUrl": "https://360.lehigh.edu/programs/rapidly-accelerated-research-experience-rare",
    "description": "Rapidly Accelerated Research Experience (RARE) is a focused pre-admission-to-graduation STEM (Science, Technology, Engineering, and Mathematics) immersion program. The overarching goal of the program is to provide opportunities for participating students to develop outstanding scientific skills in an environment that emphasizes preparation for leadership in addressing the increasingly complex issues facing the sciences, engineering, and society in the 21st century.",
    "website": "https://hhmi.cas.lehigh.edu/content/rare",
    "contact": "Neal Simon (ngs0) and Vassie Ware (vcw0)",
    "timeline": "Students must apply after admission in the spring and before enrollment",
    "costFunding": "No cost - stipends, work study, research credit and funded expenses offered",
    "duration": "Throughout undergraduate years",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": true,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring",
      "Summer"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science"
    ],
    "eligibleClassYears": [
      "First Year"
    ],
    "opportunityTypes": [
      "Creative Inquiry",
      "Entrepreneurship",
      "Research"
    ],
    "fundingTypes": [
      "Stipend",
      "Work Study",
      "Academic Credit",
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "",
    "imageAlt": "",
    "photoUrls": [],
    "featured": false
  },
  {
    "id": "music-ensembles",
    "title": "Music Ensembles",
    "slug": "music-ensembles",
    "sourceUrl": "https://360.lehigh.edu/programs/music-ensembles",
    "description": "Music Ensembles both for credit and not for credit include the Marching 97, Wind Ensemble, Symphonic Band, Jazz Ensemble, Jazz Orchestra, Jazz Combos, University Choir, Treble Choir (Dolce), Tenor/Bass Choir-Glee Club, Choral Union, Lehigh University Philharmonic, Chamber Music. These groups meet regularly to rehearse, give public concerts, and include student management and leadership opportunities.",
    "website": "https://music.cas.lehigh.edu/content/ensembles",
    "contact": "Paul Salerni",
    "timeline": "Some groups have auditions at the beginning of the school year; others require no audition, but each ensemble is a credited course and starts in the first week of class of any given semester. Option for 1 credit per ensemble, or 0 credit.",
    "costFunding": "No cost to students, two merit scholarships available: the Performing Arts Scholarship and Snyder Scholarships",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": true,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Arts",
      "Community Engagement",
      "Creative Inquiry",
      "Global & Cross Cultural",
      "Leadership Development"
    ],
    "fundingTypes": [
      "Academic Credit"
    ],
    "sdgTags": [],
    "keywords": [
      "Chamber Music",
      "Treble Choir",
      "academic credit",
      "leadership",
      "Marching 97",
      "Wind Ensemble",
      "Symphonic Band",
      "Jazz Ensemble",
      "Jazz Orchestra",
      "Jazz Combos",
      "University Choir",
      "Dolce",
      "Tenor/Bass Choir",
      "Glee Club",
      "Choral Union",
      "Lehigh University Philharmonic"
    ],
    "imageUrl": "",
    "imageAlt": "",
    "photoUrls": [],
    "featured": false
  },
  {
    "id": "rossin-research-scholars",
    "title": "Rossin Research Scholars",
    "slug": "rossin-research-scholars",
    "sourceUrl": "https://360.lehigh.edu/lehigh-360/lehigh-360-high-impact-programs-database/rossin-research-scholars",
    "description": "Rossin Research Scholars is listed in Lehigh360's high-impact programs database.",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Summer"
    ],
    "colleges": [
      "P.C. Rossin College of Engineering & Applied Science"
    ],
    "eligibleClassYears": [],
    "opportunityTypes": [
      "Research"
    ],
    "fundingTypes": [
      "Stipend"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "",
    "imageAlt": "",
    "photoUrls": [],
    "featured": false
  },
  {
    "id": "lehigh-ventures-lab",
    "title": "Lehigh Ventures Lab",
    "slug": "lehigh-ventures-lab",
    "sourceUrl": "https://360.lehigh.edu/programs/lehigh-ventures-lab",
    "description": "Powered by the College of Business and the Baker Institute for Entrepreneurship Lehigh Ventures Lab is the most direct support ever offered to Lehigh founders. Available to current students, faculty members and recent alum with advanced externally rationalized business ideas. If you have an earlier stage idea check out EUREKA! for early stage venture idea support.",
    "website": "https://go.lehigh.edu/ventureslab",
    "contact": "inlvl@lehigh.edu",
    "timeline": "Rolling deadline to apply",
    "costFunding": "No cost, funding available",
    "duration": "6 - 12 months",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": true,
    "periods": [
      "Fall",
      "Spring",
      "Summer",
      "Winter"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Entrepreneurship",
      "Leadership Development"
    ],
    "fundingTypes": [
      "Funded Expenses"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Lehigh%20Ventures%20Lab.jpg?itok=SK0Am1To",
    "imageAlt": "",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/Lehigh%20Ventures%20Lab.jpg?itok=o8lTph1F",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/Lehigh%20Ventures%20Lab.jpg?itok=uEYGpv3a",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/Lehigh%20Ventures%20Lab.jpg?itok=gDXP4SLb",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/Lehigh%20Ventures%20Lab.jpg?itok=A-EpmgxE",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/Lehigh%20Ventures%20Lab.jpg?itok=0fGd-Zr_",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/Lehigh%20Ventures%20Lab.jpg?itok=zsXh6TCf",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/Lehigh%20Ventures%20Lab.jpg?itok=jHJv48D0",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/Lehigh%20Ventures%20Lab.jpg?itok=323NPmEK",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/Lehigh%20Ventures%20Lab.jpg?itok=SK0Am1To",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/Lehigh%20Ventures%20Lab.jpg?itok=thQbjGax"
    ],
    "featured": false
  },
  {
    "id": "mentor-collective",
    "title": "Mentor Collective",
    "slug": "mentor-collective",
    "sourceUrl": "https://360.lehigh.edu/programs/mentor-collective",
    "description": "Mentor Collective at Lehigh is a peer mentorship program designed to help you make the most of your first year of college. As a first year student, you will be carefully matched with an experienced Lehigh student on campus who shares your interests and background and can help you reach your goals at Lehigh!",
    "website": "https://diversityandinclusion.lehigh.edu/studentsuccess/mentor-collective",
    "contact": "Center for Student Access and Success, inlusas@lehigh.edu",
    "timeline": "MentOr Registration Link",
    "costFunding": "Volunteer opportunity - no cost to students",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring",
      "Summer",
      "Winter"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "Sophomore",
      "Junior",
      "Senior"
    ],
    "opportunityTypes": [
      "Leadership Development",
      "Peer Mentoring"
    ],
    "fundingTypes": [
      "Volunteer"
    ],
    "sdgTags": [],
    "keywords": [
      "leadership",
      "leadership development",
      "Mentor Collective",
      "peer mentor",
      "volunteer",
      "volunteering"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/mentor%20collective.jpg?itok=Nx4vEGoi",
    "imageAlt": "mentor collective",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/mentor%20collective.jpg?itok=NTmcNROO",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/mentor%20collective.jpg?itok=hQ0hzHkv",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/mentor%20collective.jpg?itok=hkNZrfRz",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/mentor%20collective.jpg?itok=eth8GPgc",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/mentor%20collective.jpg?itok=W7PkD1YP",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/mentor%20collective.jpg?itok=Q5Efhwt8",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/mentor%20collective.jpg?itok=4dyvG0uO",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/mentor%20collective.jpg?itok=6O4Edxwp",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/mentor%20collective.jpg?itok=Nx4vEGoi",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/mentor%20collective.jpg?itok=7x8T_YnW"
    ],
    "featured": false
  },
  {
    "id": "theatre-productions",
    "title": "Theatre Productions",
    "slug": "theatre-productions",
    "sourceUrl": "https://360.lehigh.edu/programs/theatre-productions",
    "description": "The Department of Theatre thrives on collaborative creativity, uniting students, faculty, staff, and guest artists. The heart of our performances is the 300-seat Diamond Theater at the Zoellner Arts Center, featuring predominantly student actors under faculty or guest artist direction. Occasionally, exceptional students have the opportunity to direct or design. Additionally, we host professional performers and have a creative space in the intimate Black Box Theater at Zoellner, fostering a close-knit and distinctive theater community.",
    "website": "https://theatre.cas.lehigh.edu/content/theatre-department-lehigh",
    "contact": "Kashi Johnson",
    "timeline": "Rolling deadlines to apply.",
    "costFunding": "The department grants a variable number of performing arts scholarships to incoming first year students each year.",
    "duration": "2 semesters",
    "creditAvailable": true,
    "workStudyOffered": false,
    "financialAidAvailable": true,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "College of Arts and Sciences",
      "College of Education",
      "College of Business",
      "College of Health",
      "P.C. Rossin College of Engineering & Applied Science",
      "Intercollegiate Programs"
    ],
    "eligibleClassYears": [
      "First Year",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate Student"
    ],
    "opportunityTypes": [
      "Arts",
      "Community Engagement",
      "Creative Inquiry",
      "Global & Cross Cultural",
      "Leadership Development"
    ],
    "fundingTypes": [
      "Academic Credit"
    ],
    "sdgTags": [],
    "keywords": [
      "academic credit",
      "Acting",
      "Arts",
      "production",
      "Auditions",
      "Directing",
      "Drama",
      "performing arts",
      "scholarship",
      "Stagecraft",
      "Theatre Arts",
      "Theater Studies"
    ],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/theatre.jpg?itok=K3HzkI79",
    "imageAlt": "Theatre Productions",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/theatre.jpg?itok=xQAQMd47",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/theatre.jpg?itok=duATeiOE",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/theatre.jpg?itok=Cy7NY6O-",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/theatre.jpg?itok=_iz551qV",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/theatre.jpg?itok=b0XIRx8y",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/theatre.jpg?itok=HUn5_iRS",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/theatre.jpg?itok=vpRaKf3h",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/theatre.jpg?itok=S_ruwUnI",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/theatre.jpg?itok=K3HzkI79",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/theatre.jpg?itok=iyFunBOt"
    ],
    "featured": false
  },
  {
    "id": "eckardt-scholars-program",
    "title": "Eckardt Scholars Program",
    "slug": "eckardt-scholars-program",
    "sourceUrl": "https://360.lehigh.edu/programs/eckardt-scholars-program",
    "description": "The Eckardt Scholars Program is a highly selective and unique honors program in the College of Arts and Sciences. The program emphasizes deep intellectual curiosity, independent work, and close mentoring relationships between the very highest achieving students and faculty at Lehigh.",
    "website": "https://eckardtscholars.cas.lehigh.edu/content/welcome",
    "contact": "admissions@lehigh.edu",
    "timeline": "This highly selective program is restricted to a small number of especially qualified students, some of whom are enrolled at the time of admission to the university and the rest as first-semester sophomores. Entering first-year students may join the program at the invitation of the admissions office. Rising sophomores are nominated by faculty to join the program, and are evaluated on the basis of their academic records, an interview with the Eckardt Scholars Program Director, and written statements of educational goals.",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [],
    "colleges": [
      "College of Arts and Sciences"
    ],
    "eligibleClassYears": [
      "First Year",
      "Nominations",
      "Sophomore"
    ],
    "opportunityTypes": [
      "Creative Inquiry",
      "Leadership Development"
    ],
    "fundingTypes": [],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/eckardt_scholars_2016_gathering.jpg?itok=H4M8gs3t",
    "imageAlt": "Eckardt Scholars Program Gathering",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/eckardt_scholars_2016_gathering.jpg?itok=huZMVZyt",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/eckardt_scholars_2016_gathering.jpg?itok=_zJaCy1K",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/eckardt_scholars_2016_gathering.jpg?itok=e_LgU7cF",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/eckardt_scholars_2016_gathering.jpg?itok=EqPV9B7i",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/eckardt_scholars_2016_gathering.jpg?itok=UOgcdmB2",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/eckardt_scholars_2016_gathering.jpg?itok=gER-JfF1",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/eckardt_scholars_2016_gathering.jpg?itok=tWBA1zPi",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/eckardt_scholars_2016_gathering.jpg?itok=1xX2IArF",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/eckardt_scholars_2016_gathering.jpg?itok=H4M8gs3t",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/eckardt_scholars_2016_gathering.jpg?itok=IU7XC5op"
    ],
    "featured": false
  },
  {
    "id": "rossin-junior-fellows",
    "title": "Rossin Junior Fellows",
    "slug": "rossin-junior-fellows",
    "sourceUrl": "https://360.lehigh.edu/programs/rossin-junior-fellows",
    "description": "Rossin Junior Fellows are undergraduate students who serve as ambassadors for the P.C. Rossin College of Engineering and Applied Science. These students help with recruiting efforts and peer mentoring, foster professional development and promote STEM on campus and in the local community.",
    "website": "https://engineering.lehigh.edu/meche/undergraduate/rossin-junior-fellows",
    "contact": "Robin Armbruster, rma2@lehigh.edu",
    "timeline": "Students selected through department nomination during the spring semester",
    "costFunding": "Volunteer opportunity - no cost to student",
    "creditAvailable": false,
    "workStudyOffered": false,
    "financialAidAvailable": false,
    "gpaMinimumRequired": false,
    "periods": [
      "Fall",
      "Spring"
    ],
    "colleges": [
      "P.C. Rossin College of Engineering & Applied Science"
    ],
    "eligibleClassYears": [
      "Sophomore",
      "Junior",
      "Senior"
    ],
    "opportunityTypes": [
      "Community Engagement",
      "Leadership Development",
      "Peer Mentoring"
    ],
    "fundingTypes": [
      "Volunteer"
    ],
    "sdgTags": [],
    "keywords": [],
    "imageUrl": "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/baja.jpg?itok=trKoZiJP",
    "imageAlt": "mechE",
    "photoUrls": [
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl/public/images/ci-project/baja.jpg?itok=NriQLszp",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xl_1_5/public/images/ci-project/baja.jpg?itok=TO0rNlKA",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l/public/images/ci-project/baja.jpg?itok=LHCVseLw",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_l_1_5/public/images/ci-project/baja.jpg?itok=QSTOVhWv",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md/public/images/ci-project/baja.jpg?itok=TSh1w2UR",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_md_1_5/public/images/ci-project/baja.jpg?itok=L7Bwy3Yr",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm/public/images/ci-project/baja.jpg?itok=9tXWpqJg",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_sm_1_5/public/images/ci-project/baja.jpg?itok=yIweXtgy",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs/public/images/ci-project/baja.jpg?itok=trKoZiJP",
      "https://360.lehigh.edu/sites/lehigh360.lehigh.edu/files/styles/gallery_large_xs_1_5/public/images/ci-project/baja.jpg?itok=aHHs0CO2"
    ],
    "featured": false
  }
];

export const classYears = Array.from(
  new Set(programs.flatMap((program) => program.eligibleClassYears)),
);

export const colleges = Array.from(
  new Set(programs.flatMap((program) => program.colleges)),
);

export const opportunityTypes = Array.from(
  new Set(programs.flatMap((program) => program.opportunityTypes)),
);

export function getProgramBySlug(slug: string) {
  return programs.find((program) => program.slug === slug);
}
