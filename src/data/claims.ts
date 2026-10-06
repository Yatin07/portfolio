export type Claim = { 
  id: string; 
  text: string; 
  status: 'verified' | 'unverified'; 
  evidence: string; 
  year?: string; 
  title?: string;
  projectName?: string;
  github?: string;
  tags?: string[];
  image?: string;
  gallery?: string[];
};

export const claims: Claim[] = [
  { 
    id: 'hackathon-sih-2025', 
    title: 'Smart India Hackathon 2025', 
    projectName: 'UrbanVoice Mobile App',
    github: 'https://github.com/Yatin07/Buildathon',
    year: '2025', 
    text: 'Developed UrbanVoice — an AI-powered civic issue reporting mobile app featuring Gemini AI auto-categorization, location-based department routing, live tracking, and community upvoting.', 
    tags: ['Flutter', 'Firebase', 'Gemini AI', 'Android APK'],
    status: 'verified', 
    evidence: 'owner-confirmed',
    image: '/moments/sih_2025.jpg'
  },
  { 
    id: 'expo-mobile-app-2026', 
    title: 'Mobile App Development Expo', 
    projectName: 'App Showcase & Faculty Pitch',
    github: 'https://github.com/Yatin07/Buildathon',
    year: '2026', 
    text: 'Demonstrated live mobile app innovations during expert evaluation sessions at MPSTME, presenting architecture, UI/UX design, and real-time backend integrations.', 
    tags: ['Mobile Expo', 'Flutter', 'Live Pitch', 'UI/UX Demo'],
    status: 'verified', 
    evidence: 'owner-confirmed',
    image: '/moments/mobile_app_expo_1.jpg',
    gallery: ['/moments/mobile_app_expo_1.jpg', '/moments/mobile_app_expo_2.jpg']
  },
  { 
    id: 'hackathon-nmfiesta-2025', 
    title: 'NMIMS Tech Fiesta 2025', 
    projectName: 'HealthSphere Portal',
    github: 'https://github.com/Yatin07/CodePlay',
    year: '2025', 
    text: 'Built HealthSphere — a doctor-patient healthcare portal with Electronic Health Records (EHR) management, video consultation interface, appointment scheduling, and secure messaging.', 
    tags: ['Node.js', 'Firebase DB', 'EHR', 'WebRTC'],
    status: 'verified', 
    evidence: 'owner-confirmed',
    image: '/moments/nmfiesta_2025_group.jpg',
    gallery: ['/moments/nmfiesta_2025_group.jpg', '/moments/nmfiesta_2025_team.jpg']
  },
  { 
    id: 'edu-nmims', 
    title: 'B.Tech IT - MPSTME', 
    projectName: 'Information Technology Degree',
    year: '2023-2027', 
    text: 'Pursuing B.Tech in Information Technology at NMIMS University with a focus on UI/UX design, software architecture, and machine learning.', 
    tags: ['Algorithms', 'UI/UX', 'Full-Stack', 'Data Structures'],
    status: 'verified', 
    evidence: 'owner-confirmed from resume' 
  },
  { 
    id: 'internship-ibm', 
    title: 'IBM SkillsBuild Internship', 
    projectName: 'Data Analytics & Dashboards',
    year: '2024', 
    text: 'Designed analytical reports and data-driven dashboards for executive decision making, synthesizing complex metrics into intuitive visual reports.', 
    tags: ['Data Visualization', 'Dashboards', 'Analytics', 'UX Reports'],
    status: 'verified', 
    evidence: 'owner-confirmed from resume' 
  },
  { 
    id: 'hackathon-buildathon', 
    title: 'Buildathon 2026', 
    projectName: 'Rapid Prototype Challenge',
    github: 'https://github.com/Yatin07/Buildathon',
    year: '2026', 
    text: 'Participated in national-level hackathons, designing and developing full-stack prototypes under high-pressure time constraints.', 
    tags: ['Prototyping', 'React', 'Rapid MVP', 'Team Lead'],
    status: 'verified', 
    evidence: 'owner-confirmed from resume' 
  },
  { 
    id: 'comp-sas', 
    title: 'SAS Curiosity Cup', 
    projectName: 'Global Analytics Competition',
    year: '2025', 
    text: 'Competed in a Global Data Analytics Competition, applying statistical problem-solving to real-world datasets and user research.', 
    tags: ['Data Science', 'SAS', 'Global Competition', 'Analytics'],
    status: 'verified', 
    evidence: 'owner-confirmed from resume' 
  }
];
