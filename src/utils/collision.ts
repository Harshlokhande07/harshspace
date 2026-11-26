export interface Box3D {
  min: [number, number, number];
  max: [number, number, number];
  name?: string;
}

// Luxury bedroom boundaries (Extended along East wall for Lounge Suite):
// Interior dimensions: Width 7.2m (X: -2.8 to +4.4), Length 5.2m (Z: -2.6 to +2.6)
// With character capsule radius 0.35m, player center is constrained to:
export const ROOM_BOUNDS = {
  minX: -2.45,
  maxX: 4.05,
  minZ: -2.25,
  maxZ: 2.25,
};

// Furniture obstacle boxes (AABB) calibrated to actual geometry
// Zero overlapping colliders, comfortable corridors (clearance >= 0.95m)
export const FURNITURE_COLLIDERS: Box3D[] = [
  // Desk: center [-1.10, 0, -1.90], size [1.90, 0.90, 0.90]
  {
    min: [-2.05, 0, -2.35],
    max: [-0.15, 1.0, -1.45],
    name: 'Desk',
  },
  // Gaming Chair: center [-1.10, 0, -0.95], size [0.65, 0.90, 0.65]
  // 0.175m clearance to desk collider at Z = -1.45 (zero overlap)
  {
    min: [-1.425, 0, -1.275],
    max: [-0.775, 1.0, -0.625],
    name: 'Chair',
  },
  // Bed: center [1.65, 0, -1.35], size [1.60, 0.85, 2.10]
  // Desk-to-Bed corridor is [-0.15 to +0.85] = 1.00m wide (fits 0.70m character capsule comfortably)
  {
    min: [0.85, 0, -2.40],
    max: [2.45, 1.0, -0.30],
    name: 'Bed',
  },
  // Bookshelf: center [-1.85, 0, 2.35], against South Wall, size [1.30, 2.10, 0.35]
  {
    min: [-2.50, 0, 2.17],
    max: [-1.20, 2.2, 2.53],
    name: 'Bookshelf',
  },
  // Contact Station: center [1.85, 0, 1.30], against East Wall, size [0.70, 1.0, 0.45]
  {
    min: [1.50, 0, 1.05],
    max: [2.20, 1.2, 1.55],
    name: 'ContactStation',
  },
  // Corner Plant: center [-2.35, 0, -2.15], size [0.45, 0.90, 0.45]
  {
    min: [-2.575, 0, -2.375],
    max: [-2.125, 1.0, -1.925],
    name: 'Plant',
  },
  // Lounge Couch (Sketchfab Furniture Pack by Eli_ac): center [4.05, 0, 0.10], size along Z ~ 1.85, along X ~ 0.85
  {
    min: [3.45, 0, -0.85],
    max: [4.35, 0.90, 1.05],
    name: 'LoungeCouch',
  },
  // Lounge Plants & Standing Lamp
  {
    min: [3.70, 0, 1.15],
    max: [4.35, 1.0, 2.25],
    name: 'LoungePlants',
  },
  {
    min: [3.80, 0, -1.40],
    max: [4.35, 1.6, -0.90],
    name: 'LoungeLamp',
  },
];

/**
 * Checks if a circular capsule footprint at (x, z) with radius collides with walls or furniture
 */
export function checkCollision(x: number, z: number, radius = 0.35): boolean {
  // Boundary check against walls (enforcing room perimeter and closed door)
  if (
    x - radius < ROOM_BOUNDS.minX ||
    x + radius > ROOM_BOUNDS.maxX ||
    z - radius < ROOM_BOUNDS.minZ ||
    z + radius > ROOM_BOUNDS.maxZ
  ) {
    return true;
  }

  // Furniture AABB overlap check
  for (const box of FURNITURE_COLLIDERS) {
    const overlapsX = x + radius > box.min[0] && x - radius < box.max[0];
    const overlapsZ = z + radius > box.min[2] && z - radius < box.max[2];

    if (overlapsX && overlapsZ) {
      return true;
    }
  }

  return false;
}
