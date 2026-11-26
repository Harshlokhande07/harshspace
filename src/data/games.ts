export interface GameConfig {
  id: 'snake' | 'target-shooting';
  title: string;
  tagline: string;
  icon: string;
  instructions: string[];
  settings: {
    gridSize?: number;
    initialSpeedMs?: number;
    gameDurationSec?: number;
    targetLifespanMs?: number;
  };
}

export const GAMES_DATA: Record<'snake' | 'target-shooting', GameConfig> = {
  snake: {
    id: 'snake',
    title: 'Cyber Snake',
    tagline: 'Classic arcade grid navigation with responsive touch & keyboard controls',
    icon: '🐍',
    instructions: [
      'Use Arrow keys or WASD to navigate the snake.',
      'On touch/mobile devices, swipe or use the on-screen D-Pad.',
      'Eat glowing energy pellets to grow your length and increase score.',
      'Crashing into walls or your own tail triggers Game Over.',
    ],
    settings: {
      gridSize: 20, // 20x20 grid
      initialSpeedMs: 110,
    },
  },
  'target-shooting': {
    id: 'target-shooting',
    title: 'Target Reflex',
    tagline: 'Fast-paced precision aim challenge under a 30-second time pressure',
    icon: '🎯',
    instructions: [
      'Click or tap on appearing holo-targets before they expire.',
      'Each accurate hit grants points.',
      'Survive the 30-second countdown and aim for the top score.',
      'Targets spawn dynamically within bounds and disappear quickly.',
    ],
    settings: {
      gameDurationSec: 30,
      targetLifespanMs: 1400,
    },
  },
};
