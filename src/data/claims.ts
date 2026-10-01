export type Claim = { id: string; text: string; status: 'verified' | 'unverified'; evidence: string; year?: string; title?: string };

export const claims: Claim[] = [
  { id: 'edu-nmims', title: 'B.Tech IT - MPSTME', year: '2023-2027', text: 'Pursuing B.Tech in Information Technology at NMIMS University.', status: 'verified', evidence: 'owner-confirmed from resume' },
  { id: 'internship-ibm', title: 'IBM SkillsBuild Internship', year: '2024', text: 'Designed analytical reports and dashboards for data-driven decision making.', status: 'verified', evidence: 'owner-confirmed from resume' },
  { id: 'hackathon-buildathon', title: 'Buildathon 2026', year: '2026', text: 'Participated in national-level hackathons, developing prototypes under time constraints.', status: 'verified', evidence: 'owner-confirmed from resume' },
  { id: 'comp-sas', title: 'SAS Curiosity Cup', year: '2025', text: 'Competed in a Global Data Analytics Competition, applying problem-solving to real-world challenges.', status: 'verified', evidence: 'owner-confirmed from resume' }
];
