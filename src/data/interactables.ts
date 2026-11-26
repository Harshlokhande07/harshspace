export interface InteractableObject {
  id: string;
  label: string;
  promptText: string;
  position: [number, number, number];
  radius: number;
  sectionId:
    | 'projects'
    | 'about'
    | 'skills'
    | 'vision'
    | 'achievements'
    | 'memories'
    | 'contact'
    | 'chair'
    | 'bed'
    | 'switchboard'
    | 'ac-switch'
    | 'coffee'
    | 'drawer-note'
    | 'secret-cube';
  kind?: 'panel' | 'action';
  isPortfolioItem?: boolean;
}

export const INTERACTABLES: InteractableObject[] = [
  {
    id: 'desk-pc',
    label: 'PC Setup',
    promptText: 'Explore Projects',
    position: [-0.60, 0.02, -1.10], // Stand in front of PC on open floor, clear of chair and desk
    radius: 1.4,
    sectionId: 'projects',
    kind: 'panel',
    isPortfolioItem: true,
  },
  {
    id: 'notebook',
    label: 'Developer Notebook',
    promptText: 'Open Notebook',
    position: [-1.60, 0.02, -1.10], // Stand in front of notebook on desk, left of chair
    radius: 1.4,
    sectionId: 'about',
    kind: 'panel',
    isPortfolioItem: true,
  },
  {
    id: 'bookshelf',
    label: 'Bookshelf',
    promptText: 'Discover My Skills',
    position: [-1.85, 0.02, 1.80], // Approach position facing south bookshelf
    radius: 1.4,
    sectionId: 'skills',
    kind: 'panel',
    isPortfolioItem: true,
  },
  {
    id: 'window',
    label: 'Tokyo Vista Window',
    promptText: 'Look at Rainy Tokyo',
    position: [-2.15, 0.02, -0.60], // Near window overlooking Tokyo high-rise skyline
    radius: 1.4,
    sectionId: 'vision',
    kind: 'panel',
    isPortfolioItem: true,
  },
  {
    id: 'achievements',
    label: 'Achievement Wall',
    promptText: 'View Achievements',
    position: [-1.10, 0.02, -0.40], // Approach on open rug facing feature wall
    radius: 2.3,
    sectionId: 'achievements',
    kind: 'panel',
    isPortfolioItem: true,
  },
  {
    id: 'memories',
    label: 'Memory Wall',
    promptText: 'Relive My Journey',
    position: [-2.15, 0.02, 0.85], // Facing memory frames on West wall
    radius: 1.4,
    sectionId: 'memories',
    kind: 'panel',
    isPortfolioItem: true,
  },
  {
    id: 'contact',
    label: 'Contact Station',
    promptText: 'Connect With Me',
    position: [1.10, 0.02, 1.30], // In front of station with 0.40m buffer to collider
    radius: 1.4,
    sectionId: 'contact',
    kind: 'panel',
    isPortfolioItem: true,
  },
  {
    id: 'chair',
    label: 'Gaming Chair',
    promptText: 'Sit Down',
    position: [-1.10, 0.02, -0.30], // Approach point in front of chair
    radius: 1.3,
    sectionId: 'chair',
    kind: 'action',
    isPortfolioItem: false,
  },
  {
    id: 'bed',
    label: 'Bed',
    promptText: 'Lie Down',
    position: [0.45, 0.02, -1.35], // Beside bed with 0.40m clearance to bed collider
    radius: 1.4,
    sectionId: 'bed',
    kind: 'action',
    isPortfolioItem: false,
  },
  {
    id: 'switchboard',
    label: 'Switchboard',
    promptText: 'Use Switchboard',
    position: [1.15, 0.02, 1.95], // Wall switch next to entrance
    radius: 1.3,
    sectionId: 'switchboard',
    kind: 'action',
    isPortfolioItem: false,
  },
  {
    id: 'ac-switch',
    label: 'AC Thermostat',
    promptText: 'Control Air Conditioner',
    position: [-0.10, 0.02, 2.05], // Approach position facing AC & Wall Thermostat
    radius: 1.4,
    sectionId: 'ac-switch',
    kind: 'action',
    isPortfolioItem: false,
  },
  {
    id: 'coffee',
    label: 'Coffee Mug',
    promptText: 'Drink Coffee',
    position: [-1.40, 0.02, -1.05], // Beside desk mug
    radius: 1.3,
    sectionId: 'coffee',
    kind: 'action',
    isPortfolioItem: false,
  },
  {
    id: 'drawer-note',
    label: 'Desk Drawer',
    promptText: 'Open Secret Drawer',
    position: [-1.90, 0.02, -1.05], // In front of desk left drawer
    radius: 1.3,
    sectionId: 'drawer-note',
    kind: 'action',
    isPortfolioItem: false,
  },
  {
    id: 'secret-cube',
    label: 'Glitched Artifact',
    promptText: 'Inspect Glitched Cube',
    position: [-1.85, 0.02, 1.80], // In front of bookshelf top shelf
    radius: 1.3,
    sectionId: 'secret-cube',
    kind: 'action',
    isPortfolioItem: false,
  },
];

export const PORTFOLIO_INTERACTABLES = INTERACTABLES.filter(
  (item) => item.isPortfolioItem === true
);
