/* ============================================================
   ISTD BANGALORE CHAPTER — SITE CONTENT
   ------------------------------------------------------------
   Every editable string on the site lives in this one file.
   Sections marked ⚠ PLACEHOLDER use invented sample content —
   replace with the real chapter details when you have them.
   Nothing here requires touching component code.
   ============================================================ */

export interface CommitteeMember {
  name: string;
  designation: string;
  organisation?: string;
  photoUrl?: string;
}

export interface EventItem {
  title: string;
  date: string;       // display string, e.g. "14 Sep 2026"
  mode: 'In-person' | 'Online' | 'Hybrid';
  imageUrl?: string;
  venue?: string;
  description: string;
  status: 'Upcoming' | 'Past';
}

export interface MembershipTier {
  name: string;
  audience: string;
  fee: string;
  benefits: string[];
}

export const SITE = {
  orgName: 'Indian Society for Training & Development (ISTD)',
  chapterName: 'ISTD Bangalore Chapter',
  shortName: 'ISTD Bangalore',
  motto: 'Skill, learning, and capability development for a future-ready India',
  established: '1970', // parent Society founding year
  logoUrl: 'assets/istd-logo-purple.png',       // for light backgrounds (navbar, hero seal)
  logoUrlLight: 'assets/istd-logo-white.jpeg',   // for dark backgrounds (footer)
};

// ⚠ PLACEHOLDER — confirm current chapter address/contact
export const CONTACT = {
  addressLines: [
    '#17, Unit 16, Casa Capitol,',
    'Wood Street, Ashok Nagar,',
    'Bengaluru – 560 025, Karnataka',
  ],
  phone: '+91 80 0000 0000',
  email: 'contact@istdbangalore.com',
  officeHours: 'Mon–Fri, 10:00 AM – 5:30 PM',
  mapEmbedUrl: 'https://www.google.com/maps?q=Casa+Capitol+Wood+Street+Ashok+Nagar+Bengaluru&output=embed',
};

// ⚠ PLACEHOLDER — replace with the About copy specific to the Bangalore chapter
export const ABOUT = {
  intro: `The ISTD Bangalore Chapter supports the Nation for training, skill development, employability, and lifelong learning in line with the National Mission and the evolving needs of a digital and innovation-led economy. The Chapter brings together HR and L&D professionals, trainers, educators, employers, and institutions across Karnataka to build practical, inclusive, and outcomes-focused learning ecosystems.`,
  mission: `To strengthen people, organisations, and institutions through training and development that is evidence-based, industry-relevant, and future-ready. ISTD Bangalore enables capability building for professionals, youth, academia, enterprise, and public institutions across the skill, learning, leadership, and workforce development landscape.`,
  history: `The Indian Society for Training & Development is a national-level professional and non-profit body established in April 1970 and registered under the Societies Registration Act, 1860. The Bangalore Chapter contributes to ISTD’s national mission by advancing trainer development, continuing education, professional exchange, and sector-linked learning programmes aligned with the changing priorities of the Indian economy, including digital skills, employability, entrepreneurship, and sustainable livelihoods.`,
  pillars: [
    { title: 'TRAIN & ASSESS', text: 'Build workforce capability through competency-based learning, practice-oriented training, assessing, and structured pathways across sectors.' },
    { title: 'CONNECT EXPERTISE', text: 'Create forums where industry, academia, trainers, learners, and public institutions can collaborate on practical solutions for employability and learning effectiveness.' },
    { title: 'BUILD WORKFORCE', text: 'Support youth and professionals with digital fluency, leadership, entrepreneurship, and career readiness aligned to India’s evolving skill ecosystem.' }
  ]
};

// ⚠ PLACEHOLDER — replace with actual office bearers for the current term
export const COMMITTEE: CommitteeMember[] = [
  { name: 'Dr. Rashmi M.J.', designation: 'Chairwoman', organisation: 'ISTD Bangalore Chapter', photoUrl: 'assets/committee/chairperson.jpeg' },
  { name: 'J I Samkumar J.', designation: 'Vice Chairman', organisation: 'ISTD Bangalore Chapter', photoUrl: 'assets/committee/vice-chairperson.jpeg' },
  { name: 'Samuel P.', designation: 'Interim Honorary Secretary', organisation: 'ISTD Bangalore Chapter', photoUrl: 'assets/committee/secretary.jpeg' },
  { name: 'Tabitha P.', designation: 'Honorary Treasurer', organisation: 'ISTD Bangalore Chapter', photoUrl: 'assets/committee/treasurer.jpeg' },
  { name: 'Megha S.', designation: 'MC Member', photoUrl: 'assets/committee/mc-member3.jpeg' },
  { name: 'Roopa S.', designation: 'MC Member', photoUrl: 'assets/committee/mc-member1.jpeg' },
  { name: 'Arjun Manohar', designation: 'MC Member', photoUrl: 'assets/committee/mc-member2.jpeg' },
  { name: 'Sunand Sampath', designation: 'MC Member', photoUrl: 'assets/committee/mc-member3.jpeg' }
];

// ⚠ PLACEHOLDER — replace with the real events calendar
export const EVENTS: EventItem[] = [
  {
    title: 'Leadership For Social Transformation',
    date: '7 Sep 2026',
    mode: 'Online',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85',
    venue: 'Microsoft Teams',
    description: 'Leadership for Social Change is designed to equip participants with the knowledge, skills and practical tools required to lead social initiatives, engage communities and create sustainable social impact.',
    status: 'Upcoming',
  },
  {
    title: 'Monthly Chapter Meet: AI in Corporate Learning',
    date: '28 Aug 2026',
    mode: 'Hybrid',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85',
    venue: 'Chapter Office + Online',
    description: 'A member session on using AI responsibly for content development, assessment, productivity, and personalised learning paths.',
    status: 'Upcoming',
  },
  {
    title: 'Southern Region Conference 2026',
    date: '20–21 Nov 2026',
    mode: 'In-person',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=85',
    venue: 'Bengaluru (venue TBA)',
    description: 'The annual gathering of ISTD chapters across South India, exploring future skills, workforce transitions, learning innovation, and inclusive growth.',
    status: 'Upcoming',
  },
  {
    title: 'Workshop: Training Needs Analysis for L&D Teams',
    date: '18 Mar 2026',
    mode: 'Online',
    description: 'A practitioner workshop on diagnosing capability gaps and translating evidence into a focused learning and performance plan.',
    status: 'Past',
  },
];

// ⚠ PLACEHOLDER — confirm current fee structure with the chapter office
export const MEMBERSHIP: MembershipTier[] = [
  {
    name: 'Individual Member',
    audience: 'Practising trainers, HR/L&D professionals',
    fee: '₹[amount] / year',
    benefits: [
      'Voting rights at chapter general body meetings',
      'Discounted fees on Diploma and certificate programmes',
      'Access to the Indian Journal of Training & Development',
      'Invitations to chapter meets and the Southern Region Conference',
    ],
  },
  {
    name: 'Institutional Member',
    audience: 'Training institutes, corporate L&D departments',
    fee: '₹[amount] / year',
    benefits: [
      'Multiple nominated representatives',
      'Priority access to workplace learning and in-house training collaborations',
      'Listing in the chapter\u2019s institutional directory',
      'Access to the Indian Journal of Training & Development',
    ],
  },
  {
    name: 'Student Member',
    audience: 'Students enrolled in HR / L&D programmes',
    fee: '₹[amount] / year',
    benefits: [
      'Concessional Diploma and certificate programme fees',
      'Mentorship and career conversations through chapter members',
      'Eligibility for student paper presentations',
    ],
  },
];

// ⚠ PLACEHOLDER — swap in real photos once available; using empty state for now
export const GALLERY: { caption: string; imageUrl?: string }[] = [
  { caption: 'Certified Train the Trainer — Batch 23 valedictory' },
  { caption: 'Southern Region Conference 2025, panel discussion' },
  { caption: 'Monthly chapter meet on blended learning design' },
  { caption: 'Diploma programme convocation' },
  { caption: 'Chapter office bearers with visiting IFTDO delegates' },
  { caption: 'Workshop on training needs analysis' },
];
