export interface IntroContent {
  title: string;
  subtitle: string;
  enterButtonText: string;
  welcomeMessage: string;
  instructions: { key: string; desc: string }[];
}

export const INTRO_CONTENT: IntroContent = {
  title: 'HARSH SPACE - THE DIGITAL WORLD',
  subtitle: 'A little world built from my ideas, projects and imagination.',
  enterButtonText: 'ENTER MY WORLD',
  welcomeMessage: 'Welcome to my world. Explore, interact and discover my journey.',
  instructions: [
    { key: 'WASD', desc: 'Walk around' },
    { key: 'Shift', desc: 'Hold to sprint' },
    { key: 'Drag Left Mouse', desc: 'Rotate view' },
    { key: 'Scroll Wheel', desc: 'Zoom in / out' },
    { key: 'V', desc: 'Toggle 1st / 3rd Person' },
    { key: 'E / F', desc: 'Interact with objects' },
    { key: 'Esc', desc: 'Back / Stand up' },
  ],
};
