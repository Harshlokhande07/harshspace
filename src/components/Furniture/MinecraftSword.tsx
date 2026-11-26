import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * 1:1 Replica of "Sword Minecraft" by DILLOT (Sketchfab)
 * - Authentic 16x16 Minecraft Diamond Sword pixel grid constructed from extruded voxel blocks
 * - Iconic glowing Cyan / Aqua Diamond blade pixels (#00E5FF / #00B8D4) with emissive vibrancy
 * - Dark Slate border voxels framing the blade contour (#0F2B30)
 * - Deep teal / cyan hilt crossguard with central gem socket (#134E5E / #083344)
 * - Wooden textured sword grip / handle (#854D0E / #5E3A1A) with dark oak pommel
 * - Mounted diagonally at 45° in the center of the acoustic walnut wall above the monitors
 */

export const MinecraftSword: React.FC = () => {
  // Pre-cached materials
  const {
    diamondCoreMat,
    diamondGlowMat,
    darkBorderMat,
    guardMat,
    handleWoodMat,
    pommelMat,
  } = useMemo(() => {
    return {
      diamondCoreMat: new THREE.MeshStandardMaterial({
        color: '#00F0FF',
        roughness: 0.15,
        metalness: 0.2,
        emissive: '#00D9F5',
        emissiveIntensity: 1.4,
      }),
      diamondGlowMat: new THREE.MeshStandardMaterial({
        color: '#5DF8FF',
        roughness: 0.1,
        metalness: 0.1,
        emissive: '#00E5FF',
        emissiveIntensity: 1.6,
      }),
      darkBorderMat: new THREE.MeshStandardMaterial({
        color: '#0A252C',
        roughness: 0.35,
        metalness: 0.5,
      }),
      guardMat: new THREE.MeshStandardMaterial({
        color: '#0E4451',
        roughness: 0.3,
        metalness: 0.4,
      }),
      handleWoodMat: new THREE.MeshStandardMaterial({
        color: '#6E4324',
        roughness: 0.6,
        metalness: 0.05,
      }),
      pommelMat: new THREE.MeshStandardMaterial({
        color: '#0A252C',
        roughness: 0.4,
        metalness: 0.4,
      }),
    };
  }, []);

  // Pixel grid layout for standard 16x16 Minecraft Sword (x: 0..15, y: 0..15)
  // [x, y, materialType]:
  // 'D' = diamond core, 'G' = diamond highlight, 'B' = dark border, 'H' = guard, 'W' = wood handle, 'P' = pommel
  const pixels = useMemo(() => {
    const list: Array<{ x: number; y: number; type: 'D' | 'G' | 'B' | 'H' | 'W' | 'P' }> = [
      // Pommel (Bottom-left corner)
      { x: 1, y: 1, type: 'P' },
      { x: 2, y: 1, type: 'P' },
      { x: 1, y: 2, type: 'P' },
      { x: 2, y: 2, type: 'P' },

      // Wooden Handle / Grip diagonal line
      { x: 2, y: 3, type: 'W' },
      { x: 3, y: 2, type: 'W' },
      { x: 3, y: 4, type: 'W' },
      { x: 4, y: 3, type: 'W' },
      { x: 4, y: 5, type: 'W' },
      { x: 5, y: 4, type: 'W' },

      // Crossguard (Teal / Dark Cyan wings)
      // Left Guard Wing
      { x: 1, y: 6, type: 'B' },
      { x: 2, y: 5, type: 'B' },
      { x: 2, y: 6, type: 'H' },
      { x: 3, y: 6, type: 'H' },
      { x: 2, y: 7, type: 'H' },
      { x: 3, y: 5, type: 'H' },

      // Right Guard Wing
      { x: 6, y: 1, type: 'B' },
      { x: 5, y: 2, type: 'B' },
      { x: 6, y: 2, type: 'H' },
      { x: 6, y: 3, type: 'H' },
      { x: 7, y: 2, type: 'H' },
      { x: 5, y: 3, type: 'H' },

      // Central Guard Cross Joint
      { x: 4, y: 6, type: 'H' },
      { x: 5, y: 5, type: 'H' },
      { x: 6, y: 4, type: 'H' },
      { x: 5, y: 6, type: 'D' }, // Center diamond inlay

      // Outer Blade Borders & Inner Diamond Core Blade (diagonally rising to top-right)
      // Segment 1 (Base of Blade)
      { x: 4, y: 7, type: 'B' },
      { x: 7, y: 4, type: 'B' },
      { x: 5, y: 7, type: 'G' },
      { x: 6, y: 6, type: 'G' },
      { x: 7, y: 5, type: 'D' },

      // Segment 2
      { x: 5, y: 8, type: 'B' },
      { x: 8, y: 5, type: 'B' },
      { x: 6, y: 8, type: 'G' },
      { x: 7, y: 7, type: 'D' },
      { x: 8, y: 6, type: 'D' },

      // Segment 3
      { x: 6, y: 9, type: 'B' },
      { x: 9, y: 6, type: 'B' },
      { x: 7, y: 9, type: 'G' },
      { x: 8, y: 8, type: 'D' },
      { x: 9, y: 7, type: 'D' },

      // Segment 4
      { x: 7, y: 10, type: 'B' },
      { x: 10, y: 7, type: 'B' },
      { x: 8, y: 10, type: 'G' },
      { x: 9, y: 9, type: 'D' },
      { x: 10, y: 8, type: 'D' },

      // Segment 5
      { x: 8, y: 11, type: 'B' },
      { x: 11, y: 8, type: 'B' },
      { x: 9, y: 11, type: 'G' },
      { x: 10, y: 10, type: 'D' },
      { x: 11, y: 9, type: 'D' },

      // Segment 6
      { x: 9, y: 12, type: 'B' },
      { x: 12, y: 9, type: 'B' },
      { x: 10, y: 12, type: 'G' },
      { x: 11, y: 11, type: 'D' },
      { x: 12, y: 10, type: 'D' },

      // Segment 7
      { x: 10, y: 13, type: 'B' },
      { x: 13, y: 10, type: 'B' },
      { x: 11, y: 13, type: 'G' },
      { x: 12, y: 12, type: 'D' },
      { x: 13, y: 11, type: 'D' },

      // Segment 8 (Tip Base)
      { x: 11, y: 14, type: 'B' },
      { x: 14, y: 11, type: 'B' },
      { x: 12, y: 14, type: 'G' },
      { x: 13, y: 13, type: 'D' },
      { x: 14, y: 12, type: 'D' },

      // Sword Tip (Top-Right Peak)
      { x: 12, y: 15, type: 'B' },
      { x: 15, y: 12, type: 'B' },
      { x: 13, y: 15, type: 'G' },
      { x: 14, y: 14, type: 'G' },
      { x: 15, y: 13, type: 'D' },
      { x: 14, y: 15, type: 'B' },
      { x: 15, y: 14, type: 'B' },
      { x: 15, y: 15, type: 'B' },
    ];
    return list;
  }, []);

  const voxelSize = 0.048; // ~0.77m total sword length

  return (
    // Mounted on the walnut acoustic feature wall (X: -1.30, Z: -2.57) at Y: 1.82m (eye-level middle above monitor)
    <group position={[-1.30, 1.82, -2.565]}>
      {/* Wall Mounting Brackets (Dual invisible satin black standoffs) */}
      <mesh position={[-0.12, -0.05, -0.015]}>
        <cylinderGeometry args={[0.008, 0.008, 0.03, 12]} />
        <meshStandardMaterial color="#1E2024" roughness={0.5} />
      </mesh>
      <mesh position={[0.12, 0.08, -0.015]}>
        <cylinderGeometry args={[0.008, 0.008, 0.03, 12]} />
        <meshStandardMaterial color="#1E2024" roughness={0.5} />
      </mesh>

      {/* Minecraft Sword Voxel Model (Centered around origin) */}
      <group position={[-0.38, -0.38, 0]}>
        {pixels.map((p, idx) => {
          let mat = diamondCoreMat;
          let zDepth = voxelSize * 0.85; // 3D voxel extrusion depth

          if (p.type === 'G') {
            mat = diamondGlowMat;
            zDepth = voxelSize * 0.90;
          } else if (p.type === 'B') {
            mat = darkBorderMat;
            zDepth = voxelSize * 0.95;
          } else if (p.type === 'H') {
            mat = guardMat;
            zDepth = voxelSize * 1.05; // Slightly thicker guard
          } else if (p.type === 'W') {
            mat = handleWoodMat;
            zDepth = voxelSize * 0.80;
          } else if (p.type === 'P') {
            mat = pommelMat;
            zDepth = voxelSize * 1.0;
          }

          return (
            <mesh
              key={idx}
              position={[p.x * voxelSize, p.y * voxelSize, 0]}
              material={mat}
              castShadow
            >
              <boxGeometry args={[voxelSize, voxelSize, zDepth]} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};
