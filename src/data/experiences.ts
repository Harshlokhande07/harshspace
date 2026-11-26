export type MemoryCategory =
  | 'college'
  | 'hackathon'
  | 'team'
  | 'workshop'
  | 'event'
  | 'project';

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  category: MemoryCategory;
  image: string; // e.g. "/images/memories/team-hackathon.jpg"
}

export const MEMORIES: Memory[] = [
  {
    id: 'memory-1',
    title: '[SAMPLE - replace me] All-Night Hackathon Collaboration',
    description:
      '[SAMPLE - replace me] Intensive 36-hour sprint with the engineering team fine-tuning algorithms and telemetry dashboards.',
    date: '[SAMPLE - replace me] Autumn 2024',
    category: 'hackathon',
    image: '',
  },
  {
    id: 'memory-2',
    title: '[SAMPLE - replace me] Campus Tech Symposium Presentation',
    description:
      '[SAMPLE - replace me] Demonstrating interactive 3D web visualizations to engineering faculty and fellow students.',
    date: '[SAMPLE - replace me] Spring 2024',
    category: 'college',
    image: '',
  },
  {
    id: 'memory-3',
    title: '[SAMPLE - replace me] Team Product Milestone Celebration',
    description:
      '[SAMPLE - replace me] Celebrating the successful launch and deployment of our high-concurrency cloud platform.',
    date: '[SAMPLE - replace me] Winter 2023',
    category: 'team',
    image: '',
  },
];
