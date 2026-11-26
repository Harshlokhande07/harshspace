export interface ProfileData {
  name: string;
  headline: string;
  intro: string;
  educationBackground: string;
  developerJourney: string;
  interests: string[];
  hobbies: string[];
  strengths: string[];
  currentLearningGoals: string[];
  futureAmbitions: string;
}

export const PROFILE: ProfileData = {
  name: 'Harsh',
  headline: '[SAMPLE - replace me] Full-Stack & 3D Interactive Web Developer',
  intro:
    '[SAMPLE - replace me] Passionate developer crafting immersive digital experiences and high-performance interactive applications.',
  educationBackground:
    '[SAMPLE - replace me] Bachelor of Technology / Computer Science details.',
  developerJourney:
    '[SAMPLE - replace me] Started programming through creative curiosity, expanding into full-stack modern web architecture, 3D graphics, and AI integrations.',
  interests: [
    '[SAMPLE - replace me] Interactive 3D Web & Creative Coding',
    '[SAMPLE - replace me] Full-Stack Architecture & Cloud Systems',
    '[SAMPLE - replace me] Real-Time Computer Graphics & Shaders',
    '[SAMPLE - replace me] Human-Computer Interaction & UI Engineering',
  ],
  hobbies: [
    '[SAMPLE - replace me] Mechanical Keyboards & Setup Ergonomics',
    '[SAMPLE - replace me] Gaming & Virtual Worlds Exploration',
    '[SAMPLE - replace me] Sci-Fi Literature & Tech Podcasting',
  ],
  strengths: [
    '[SAMPLE - replace me] Rapid prototyping and component modularity',
    '[SAMPLE - replace me] Performance optimization and 60 FPS rendering',
    '[SAMPLE - replace me] Clean TypeScript architecture and state design',
    '[SAMPLE - replace me] User-centric micro-interactions and animations',
  ],
  currentLearningGoals: [
    '[SAMPLE - replace me] Custom GLSL shader pipelines and post-processing',
    '[SAMPLE - replace me] Spatial audio and WebGPU performance tuning',
    '[SAMPLE - replace me] Distributed systems and edge computing',
  ],
  futureAmbitions:
    '[SAMPLE - replace me] To pioneer world-class immersive 3D digital products that merge artistic storytelling with cutting-edge engineering.',
};
