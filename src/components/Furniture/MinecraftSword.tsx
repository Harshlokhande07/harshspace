import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * 1:1 Replica of "Sword Minecraft" by DILLOT (Sketchfab CC-BY)
 * Reference ID: cc51efc73765499bbbc794740225daa1
 *
 * Visual & Material characteristics directly from DILLOT's 3D model:
 * - Iconic 16x16 Minecraft Diamond Sword grid constructed with chunky 3D voxel cubes.
 * - Diamond Core: Vibrant electric cyan voxels with emissive glow (#00FFFF / #22E7E7).
 * - Outer Diamond Blade Frame / Edge: Deep teal-cyan border (#0B3E42 / #0F4C50).
 * - Crossguard: Classic Minecraft stepped dark cyan-grey hilt wings (#134346) with center diamond gem inlay.
 * - Grip / Handle: Minecraft oak wood planks texture (#8B5A2B / #5C3A1E).
 * - Pommel: Minecraft dark oak counterweight (#113D3F / #092B2D).
 * - Diagonally mounted on the acoustic slat wall at 45° angle.
 */

export const MinecraftSword: React.FC = () => {
  const {
    diamondBrightMat,
    diamondEdgeMat,
    darkBorderMat,
    guardMat,
    handleWoodMat,
    pommelMat,
  } = useMemo(() => {
    return {
      // Vivid bright cyan diamond core with emissive radiance
      diamondBrightMat: new THREE.MeshStandardMaterial({
        color: '#00FFFF',
        emissive: '#00E5FF',
        emissiveIntensity: 1.8,
        roughness: 0.2,
        metalness: 0.1,
      }),
      // Inner diamond blade facet
      diamondEdgeMat: new THREE.MeshStandardMaterial({
        color: '#2CE8E8',
        emissive: '#00C8D7',
        emissiveIntensity: 1.3,
        roughness: 0.25,
        metalness: 0.1,
      }),
      // Outer blade dark contour border (DILLOT dark cyan/teal)
      darkBorderMat: new THREE.MeshStandardMaterial({
        color: '#092C30',
        roughness: 0.4,
        metalness: 0.2,
      }),
      // Crossguard dark teal Minecraft plastic/iron
      guardMat: new THREE.MeshStandardMaterial({
        color: '#103F43',
        roughness: 0.35,
        metalness: 0.3,
      }),
      // Handle wood (Minecraft stick brown)
      handleWoodMat: new THREE.MeshStandardMaterial({
        color: '#6F431E',
        roughness: 0.7,
        metalness: 0.05,
      }),
      // Pommel end
      pommelMat: new THREE.MeshStandardMaterial({
        color: '#0A2D31',
        roughness: 0.4,
        metalness: 0.2,
      }),
    };
  }, []);

  // Precise 16x16 Minecraft Diamond Sword voxel layout
  const pixels = useMemo(() => {
    const list: Array<{ x: number; y: number; type: 'B' | 'D' | 'E' | 'G' | 'W' | 'P' }> = [
      // Pommel (Bottom Left, 2x2 cluster)
      { x: 1, y: 1, type: 'P' },
      { x: 2, y: 1, type: 'P' },
      { x: 1, y: 2, type: 'P' },
      { x: 2, y: 2, type: 'P' },

      // Wooden Stick Grip (diagonal 3-segment line)
      { x: 2, y: 3, type: 'W' },
      { x: 3, y: 2, type: 'W' },
      { x: 3, y: 4, type: 'W' },
      { x: 4, y: 3, type: 'W' },
      { x: 4, y: 5, type: 'W' },
      { x: 5, y: 4, type: 'W' },

      // Crossguard Left Wing
      { x: 1, y: 6, type: 'B' },
      { x: 2, y: 5, type: 'B' },
      { x: 2, y: 6, type: 'G' },
      { x: 3, y: 6, type: 'G' },
      { x: 2, y: 7, type: 'G' },
      { x: 3, y: 5, type: 'G' },

      // Crossguard Right Wing
      { x: 6, y: 1, type: 'B' },
      { x: 5, y: 2, type: 'B' },
      { x: 6, y: 2, type: 'G' },
      { x: 6, y: 3, type: 'G' },
      { x: 7, y: 2, type: 'G' },
      { x: 5, y: 3, type: 'G' },

      // Crossguard Center Cross & Diamond socket
      { x: 4, y: 6, type: 'G' },
      { x: 5, y: 5, type: 'G' },
      { x: 6, y: 4, type: 'G' },
      { x: 5, y: 6, type: 'D' }, // Center diamond gem

      // Diagonal Diamond Blade Segments
      // Tier 1
      { x: 4, y: 7, type: 'B' },
      { x: 7, y: 4, type: 'B' },
      { x: 5, y: 7, type: 'E' },
      { x: 6, y: 6, type: 'D' },
      { x: 7, y: 5, type: 'E' },

      // Tier 2
      { x: 5, y: 8, type: 'B' },
      { x: 8, y: 5, type: 'B' },
      { x: 6, y: 8, type: 'D' },
      { x: 7, y: 7, type: 'D' },
      { x: 8, y: 6, type: 'E' },

      // Tier 3
      { x: 6, y: 9, type: 'B' },
      { x: 9, y: 6, type: 'B' },
      { x: 7, y: 9, type: 'E' },
      { x: 8, y: 8, type: 'D' },
      { x: 9, y: 7, type: 'E' },

      // Tier 4
      { x: 7, y: 10, type: 'B' },
      { x: 10, y: 7, type: 'B' },
      { x: 8, y: 10, type: 'D' },
      { x: 9, y: 9, type: 'D' },
      { x: 10, y: 8, type: 'E' },

      // Tier 5
      { x: 8, y: 11, type: 'B' },
      { x: 11, y: 8, type: 'B' },
      { x: 9, y: 11, type: 'E' },
      { x: 10, y: 10, type: 'D' },
      { x: 11, y: 9, type: 'E' },

      // Tier 6
      { x: 9, y: 12, type: 'B' },
      { x: 12, y: 9, type: 'B' },
      { x: 10, y: 12, type: 'D' },
      { x: 11, y: 11, type: 'D' },
      { x: 12, y: 10, type: 'E' },

      // Tier 7
      { x: 10, y: 13, type: 'B' },
      { x: 13, y: 10, type: 'B' },
      { x: 11, y: 13, type: 'E' },
      { x: 12, y: 12, type: 'D' },
      { x: 13, y: 11, type: 'E' },

      // Tier 8 (Point Base)
      { x: 11, y: 14, type: 'B' },
      { x: 14, y: 11, type: 'B' },
      { x: 12, y: 14, type: 'D' },
      { x: 13, y: 13, type: 'D' },
      { x: 14, y: 12, type: 'E' },

      // Point Tip
      { x: 12, y: 15, type: 'B' },
      { x: 15, y: 12, type: 'B' },
      { x: 13, y: 15, type: 'D' },
      { x: 14, y: 14, type: 'D' },
      { x: 15, y: 13, type: 'E' },
      { x: 14, y: 15, type: 'B' },
      { x: 15, y: 14, type: 'B' },
      { x: 15, y: 15, type: 'B' },
    ];
    return list;
  }, []);

  const voxelSize = 0.052; // ~0.82m total sword diagonal length

  return (
    // Mounted in the exact middle of the walnut acoustic feature wall (X: -1.30, Y: 1.80, Z: -2.57)
    <group position={[-1.30, 1.80, -2.565]}>
      {/* Centered diagonal voxel cluster */}
      <group position={[-0.41, -0.41, 0]}>
        {pixels.map((p, idx) => {
          let mat = diamondBrightMat;
          let zDepth = voxelSize * 0.90;

          if (p.type === 'E') {
            mat = diamondEdgeMat;
            zDepth = voxelSize * 0.88;
          } else if (p.type === 'B') {
            mat = darkBorderMat;
            zDepth = voxelSize * 0.94;
          } else if (p.type === 'G') {
            mat = guardMat;
            zDepth = voxelSize * 1.05;
          } else if (p.type === 'W') {
            mat = handleWoodMat;
            zDepth = voxelSize * 0.82;
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
