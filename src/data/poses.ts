export interface PoseConfig {
  id: 'sit-chair' | 'lie-bed' | 'drink-coffee';
  label: string;
  anchor: [number, number, number]; // [x, y, z] final position
  yaw: number; // in radians
  approachPoint: [number, number, number]; // where the player walks to first
  exitPoint: [number, number, number]; // free floor spot outside colliders
  eyeHeightOffset: number; // relative to character base (standard eye height is ~1.5m)
  fineTune: {
    x: number;
    y: number;
    z: number;
    yaw: number;
  };
}

export const POSES: Record<'sit-chair' | 'lie-bed' | 'drink-coffee', PoseConfig> = {
  'sit-chair': {
    id: 'sit-chair',
    label: 'Gaming Chair',
    // Chair center is [-1.10, 0, -0.95], facing desk at Z = -1.90 (facing North -Z, yaw = Math.PI)
    anchor: [-1.10, 0.45, -0.95],
    yaw: Math.PI,
    approachPoint: [-1.10, 0.02, -0.30],
    exitPoint: [-1.10, 0.70, -0.30],
    eyeHeightOffset: 1.05, // seated eye height
    fineTune: {
      x: 0,
      y: 0,
      z: 0,
      yaw: 0,
    },
  },
  'lie-bed': {
    id: 'lie-bed',
    label: 'Bed',
    // Bed center is [1.65, 0, -1.35], headboard at Z = -2.40, head towards North wall
    anchor: [1.65, 0.65, -1.35],
    yaw: 0,
    approachPoint: [0.45, 0.02, -1.35],
    exitPoint: [0.45, 0.70, -1.35],
    eyeHeightOffset: 0.65, // lying eye height
    fineTune: {
      x: 0,
      y: 0,
      z: 0,
      yaw: 0,
    },
  },
  'drink-coffee': {
    id: 'drink-coffee',
    label: 'Drink Coffee',
    // Coffee mug is on desk at [-1.40, 0.77, -1.75]
    anchor: [-1.40, 0.70, -1.05],
    yaw: Math.PI,
    approachPoint: [-1.40, 0.02, -1.05],
    exitPoint: [-1.40, 0.70, -1.05],
    eyeHeightOffset: 1.5,
    fineTune: {
      x: 0,
      y: 0,
      z: 0,
      yaw: 0,
    },
  },
};
