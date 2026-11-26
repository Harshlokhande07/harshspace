export interface FurnitureModelConfig {
  id: 'desk' | 'chair' | 'bed' | 'pc' | 'bookshelf';
  fileName: string;
  position: [number, number, number];
  rotation: [number, number, number];
  targetSize: [number, number, number]; // [width, height, depth] in meters
  verticalOffset: number; // offset from floor base
  castShadow: boolean;
  receiveShadow: boolean;
  hasBakedLighting?: boolean; // if true, suppresses dynamic directional shadows to prevent double-darkening
}

export const FURNITURE_MODELS: Record<'desk' | 'chair' | 'bed' | 'pc' | 'bookshelf', FurnitureModelConfig> = {
  desk: {
    id: 'desk',
    fileName: 'desk.glb',
    position: [-1.10, 0, -1.90],
    rotation: [0, 0, 0],
    targetSize: [2.00, 0.75, 0.90],
    verticalOffset: 0,
    castShadow: true,
    receiveShadow: true,
  },
  chair: {
    id: 'chair',
    fileName: 'chair.glb',
    position: [-1.10, 0, -0.95],
    rotation: [0, 0, 0],
    targetSize: [0.70, 1.15, 0.70],
    verticalOffset: 0,
    castShadow: true,
    receiveShadow: true,
  },
  bed: {
    id: 'bed',
    fileName: 'bed.glb',
    position: [1.65, 0, -1.35],
    rotation: [0, 0, 0],
    targetSize: [1.60, 0.90, 2.10],
    verticalOffset: 0,
    castShadow: true,
    receiveShadow: true,
  },
  pc: {
    id: 'pc',
    fileName: 'pc.glb',
    position: [-0.35, 0.75, -2.00],
    rotation: [0, 0, 0],
    targetSize: [0.24, 0.48, 0.45],
    verticalOffset: 0.75,
    castShadow: true,
    receiveShadow: true,
  },
  bookshelf: {
    id: 'bookshelf',
    fileName: 'bookshelf.glb',
    position: [-1.85, 0, 2.35],
    rotation: [0, Math.PI, 0],
    targetSize: [1.30, 2.10, 0.35],
    verticalOffset: 0,
    castShadow: true,
    receiveShadow: true,
  },
};
