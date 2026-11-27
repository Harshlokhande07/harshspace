export interface EasterEggData {
  id: 'drawer-note' | 'secret-cube' | 'secret-pc-file' | 'celebration-unlock';
  title: string;
  subtitle: string;
  content: string;
}

export const EASTER_EGGS: Record<string, EasterEggData> = {
  'drawer-note': {
    id: 'drawer-note',
    title: 'Hidden Drawer Note',
    subtitle: 'A crumpled handwritten piece of paper found inside the desk drawer',
    content: '[SAMPLE - replace me: "Behind every great application lies countless cups of coffee, broken builds, and the quiet satisfaction of finally making it work. Keep creating."]',
  },
  'secret-cube': {
    id: 'secret-cube',
    title: 'The Glitched Memory Fragment',
    subtitle: 'An enigmatic floating holographic cube found tucked on the high shelf',
    content: '[SAMPLE - replace me: "Coordinate 42.08. You discovered the digital keepsake! When engineering meets art, ordinary boundaries cease to exist."]',
  },
  'secret-pc-file': {
    id: 'secret-pc-file',
    title: 'secret_dev_log.txt',
    subtitle: 'Hidden encrypted file stored in /root/documents/classified',
    content: '[SAMPLE - replace me: "HarshOS Kernel v4.2. Dev Note: If you found this file, you have curiosity and an eye for detail. Feel free to reach out via the Contact Station!"]',
  },
  'celebration-unlock': {
    id: 'celebration-unlock',
    title: 'Master Explorer Unlocked!',
    subtitle: 'All 7 Portfolio Milestones Discovered',
    content: '[SAMPLE - replace me: "Congratulations! You have thoroughly explored every corner of Harsh Space - The Digital World. Thank you for taking the time to discover my projects, skills, and story."]',
  },
};
