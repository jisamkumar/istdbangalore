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
  mode: 'In-Person' | 'Online' | 'Hybrid';
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
  logoUrlLight: 'assets/istd-logo-purple.png',   // ISTD logo used in the footer
};

// ⚠ PLACEHOLDER — confirm current chapter address/contact
export const CONTACT = {
  addressLines: [
    '#17, Unit 16, Casa Capitol,',
    'Wood Street, Ashok Nagar,',
    'Bengaluru – 560 025, Karnataka',
  ],
  phone: '',
  email: 'chapter@istdbangalore.com',
  officeHours: 'Mon–Fri, 10:00 AM – 5:30 PM',
  mapEmbedUrl: 'https://www.google.com/maps?q=Casa+Capitol+Wood+Street+Ashok+Nagar+Bengaluru&output=embed',
  socialLinks: [
    { label: 'LinkedIn', url: 'https://in.linkedin.com/in/ISTDBangalore', icon: 'linkedin' },
    { label: 'X', url: 'https://x.com/ISTDBangalore', icon: 'x' },
    { label: 'Facebook', url: 'https://www.facebook.com/ISTDBangalore', icon: 'facebook' },
    { label: 'Instagram', url: 'https://www.instagram.com/ISTDBangalore', icon: 'instagram' },
    { label: 'YouTube', url: 'https://www.youtube.com/@ISTDBangalore', icon: 'youtube' },
  ],
};

// ⚠ PLACEHOLDER — replace with the About copy specific to the Bangalore chapter
export const ABOUT = {
  intro: `The ISTD Bangalore Chapter supports the Nation on training, skill development, employability, and lifelong learning in line with the National Mission and the evolving needs of a digital and innovation-led economy. The Chapter brings together L&D and HR professionals, trainers, educators, institutions, and employers across Karnataka to build practical, inclusive, and outcome-focused learning ecosystems.`,
  mission: `To strengthen people, institutions, and organisations through training and development that is evidence-based, industry-relevant, and future-ready. ISTD Bangalore enables capability building for youth, professionals, academia, enterprise, and public institutions across the skill, learning, leadership, and workforce development landscape.`,
  history: `The Indian Society for Training & Development is a national-level professional and non-profit body established in April 1970 and registered under the Societies Registration Act, 1860. The Bangalore Chapter contributes to ISTD’s national mission by advancing trainer development, continuing education, professional exchange, and sector-linked learning programmes aligned with the changing priorities of the Indian economy, including digital skills, employability, entrepreneurship, and sustainable livelihoods.`,
  pillars: [
    { title: 'TRAIN & ASSESS', text: 'Build workforce capability through competency-based learning, practice-oriented training, assessments, and structured pathways across sectors.' },
    { title: 'CONNECT EXPERTISE', text: 'Create forums where public organizations, industries, institutions, trainers, and students can collaborate on realtime solutions for employability and learning effectiveness.' },
    { title: 'BUILD FUTURE', text: 'Support youth and professionals with digital fluency, leadership, entrepreneurship, and career readiness aligned to the evolving skill ecosystem.' }
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
  { name: 'Sunand Sampath', designation: 'MC Member', photoUrl: 'assets/committee/mc-member4.jpeg' }
];

// ⚠ PLACEHOLDER — replace with the real events calendar
export const EVENTS: EventItem[] = [
  {
    title: 'Intrapreneurship',
    date: '12 September 2026',
    mode: 'Online',
    imageUrl: 'assets/1.jpg',
    description: 'The key to remain relevant and achieve success in the BANI (Brittle, Anxious, Non-Linear, and Incomprehensible) world is by learning how to renew yourself constantly.',
    status: 'Past',
  },
  {
    title: 'From Learning to Behaviour Change',
    date: '3 October 2026',
    mode: 'Online',
    imageUrl: 'assets/2.jpg',
    description: 'Why Training does not always create the Performance?',
    status: 'Upcoming',
  },
  {
    title: 'Distruptive Innovation',
    date: '31 October 2026',
    mode: 'In-Person',
    imageUrl: 'assets/3.jpg',
    description: 'The world is changing faster than ever. Technologies, customer expectations, business models and workplace practices that seemed futuristic yesterday are becoming everyday realities today.',
    status: 'Upcoming',
  },
  {
    title: 'ISTD Bangalore Chapter Conference 2026',
    date: 'To be scheduled',
    mode: 'In-Person',
    imageUrl: 'assets/4.jpg',
    venue: 'Will be announced',
    description: 'A Bangalore Chapter Conference on the Future of Training & Employment.',
    status: 'Upcoming',
  },
];

export const MEMBERSHIP: MembershipTier[] = [
  {
    name: 'Individual Member',
    audience: 'For individuals joining ISTD in a professional or personal capacity',
    fee: 'Annual: ₹1,534 / year · Life: ₹9,204 one-time',
    benefits: [
      'Entrance fee: ₹300 for either category',
      'Annual subscription: ₹1,000 (April–March)',
      'Annual GST at 18%: ₹234',
      'Life membership subscription: ₹7,500',
      'Life membership GST at 18%: ₹1,404',
      'Renewal: ₹1,180 / year (₹1,000 subscription + ₹180 GST)',
    ],
  },
  {
    name: 'Associate Member',
    audience: 'For associate members joining ISTD for professional development',
    fee: '₹826 / year (April–March)',
    benefits: [
      'Entrance fee: ₹300',
      'Annual subscription: ₹400',
      'GST at 18%: ₹126',
      'Total annual fees: ₹826',
    ],
  },
  {
    name: 'Institutional Member',
    audience: 'For training institutes, organisations, and corporate L&D departments',
    fee: 'Annual: ₹15,340 · Conversion to life: ₹92,040',
    benefits: [
      'Annual entrance fee: ₹3,000',
      'Annual subscription: ₹10,000 (April–March)',
      'Annual GST at 18%: ₹2,340',
      'Conversion to life membership: ₹75,000 subscription',
      'Conversion GST at 18%: ₹14,040',
      'Renewal: ₹11,800 / year (₹10,000 subscription + ₹1,800 GST)',
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
