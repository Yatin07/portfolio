export type Claim = { 
  id: string; 
  text: string; 
  status: 'verified' | 'unverified'; 
  evidence: string; 
  year?: string; 
  title?: string;
  image?: string;
  gallery?: string[];
};

export const claims: Claim[] = [
  { 
    id: 'hackathon-sih-2025', 
    title: 'Smart India Hackathon 2025', 
    year: '2025', 
    text: 'Participated in SIH 2025, tackling real-world challenge statements with innovative software solutions and collaborative engineering.', 
    status: 'verified', 
    evidence: 'owner-confirmed',
    image: '/moments/sih_2025.jpg'
  },
  { 
    id: 'hackathon-nmfiesta-2025', 
    title: 'NMIMS Tech Fiesta 2025', 
    year: '2025', 
    text: 'Competed in the 24-Hour Innovation Challenge at NMIMS Tech Fiesta 2025, prototyping high-impact solutions under pressure.', 
    status: 'verified', 
    evidence: 'owner-confirmed',
    image: '/moments/nmfiesta_2025_group.jpg',
    gallery: ['/moments/nmfiesta_2025_group.jpg', '/moments/nmfiesta_2025_team.jpg']
  },
  { 
    id: 'edu-nmims', 
    title: 'B.Tech IT - MPSTME', 
    year: '2023-2027', 
    text: 'Pursuing B.Tech in Information Technology at NMIMS University.', 
    status: 'verified', 
    evidence: 'owner-confirmed from resume' 
  },
  { 
    id: 'internship-ibm', 
    title: 'IBM SkillsBuild Internship', 
    year: '2024', 
    text: 'Designed analytical reports and dashboards for data-driven decision making.', 
    status: 'verified', 
    evidence: 'owner-confirmed from resume' 
  },
  { 
    id: 'hackathon-buildathon', 
    title: 'Buildathon 2026', 
    year: '2026', 
    text: 'Participated in national-level hackathons, developing prototypes under time constraints.', 
    status: 'verified', 
    evidence: 'owner-confirmed from resume' 
  },
  { 
    id: 'comp-sas', 
    title: 'SAS Curiosity Cup', 
    year: '2025', 
    text: 'Competed in a Global Data Analytics Competition, applying problem-solving to real-world challenges.', 
    status: 'verified', 
    evidence: 'owner-confirmed from resume' 
  }
];
