export interface SkillCategory {
  id: string;
  title: string;
  spineColor: string;
  items: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'education',
    title: 'Education',
    spineColor: '#38bdf8',
    items: [
      '[SAMPLE - replace me] Degree: Computer Science & Engineering',
      '[SAMPLE - replace me] Relevant Coursework: Data Structures & Algorithms',
      '[SAMPLE - replace me] Operating Systems, Computer Networks & DBMS',
      '[SAMPLE - replace me] Software Engineering Methodologies',
    ],
  },
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    spineColor: '#818cf8',
    items: [
      '[SAMPLE - replace me] TypeScript',
      '[SAMPLE - replace me] JavaScript (ESNext)',
      '[SAMPLE - replace me] Python',
      '[SAMPLE - replace me] C++',
    ],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    spineColor: '#a855f7',
    items: [
      '[SAMPLE - replace me] React & Next.js',
      '[SAMPLE - replace me] Three.js & React Three Fiber',
      '[SAMPLE - replace me] Tailwind CSS & CSS Modules',
      '[SAMPLE - replace me] REST APIs & WebSockets',
    ],
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    spineColor: '#f43f5e',
    items: [
      '[SAMPLE - replace me] LLM Agent Orchestration',
      '[SAMPLE - replace me] Prompt Engineering & Embeddings',
      '[SAMPLE - replace me] Multimodal Interfaces',
      '[SAMPLE - replace me] Computer Vision Concepts',
    ],
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    spineColor: '#f97316',
    items: [
      '[SAMPLE - replace me] Supervised & Unsupervised Learning',
      '[SAMPLE - replace me] Model Evaluation & Validation',
      '[SAMPLE - replace me] Data Preprocessing & Feature Engineering',
      '[SAMPLE - replace me] Neural Network Fundamentals',
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    spineColor: '#eab308',
    items: [
      '[SAMPLE - replace me] PostgreSQL',
      '[SAMPLE - replace me] MongoDB',
      '[SAMPLE - replace me] Redis Caching',
      '[SAMPLE - replace me] Prisma ORM / Query Optimization',
    ],
  },
  {
    id: 'development-tools',
    title: 'Development Tools',
    spineColor: '#10b981',
    items: [
      '[SAMPLE - replace me] Git & GitHub Actions (CI/CD)',
      '[SAMPLE - replace me] Vite & Webpack Bundlers',
      '[SAMPLE - replace me] Docker & Containerization',
      '[SAMPLE - replace me] Linux Shell & PowerShell Automation',
    ],
  },
  {
    id: 'technical-interests',
    title: 'Technical Interests',
    spineColor: '#06b6d4',
    items: [
      '[SAMPLE - replace me] Spatial Computing & WebXR',
      '[SAMPLE - replace me] Real-Time 3D Game Engine Architectures',
      '[SAMPLE - replace me] Low-Latency Graphics Shaders',
      '[SAMPLE - replace me] Distributed State Synchronization',
    ],
  },
];
