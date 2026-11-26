import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MEMORIES } from '../../data/experiences';
import { WallFrame } from './WallFrame';
import { useInteractionStore } from '../../store/useInteractionStore';
import { useRoomEffectsStore } from '../../store/useRoomEffectsStore';

/**
 * Memory Wall (Event Photographs & Milestones):
 * Wall-mounted on the left wall at X = -5.9, Y = 2.3, Z = 2.5 (between Window and Front Wall).
 * Includes an additive-blended soft spotlight glow and frame emissive rims on proximity.
 */
export const MemoryWall: React.FC = () => {
  const [glow, setGlow] = useState(0);
  const glowRef = useRef(0);
  const spotlightMeshRef = useRef<THREE.Mesh>(null);
  const setMemoryWallGlow = useRoomEffectsStore((s) => s.setMemoryWallGlow);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const nearestId = useInteractionStore.getState().nearestId;
    const activeId = useInteractionStore.getState().activeId;

    const isNear = nearestId === 'memories' || activeId === 'memories';
    const targetGlow = isNear ? 1.0 : 0.0;

    glowRef.current = THREE.MathUtils.damp(glowRef.current, targetGlow, 5.0, dt);

    if (Math.abs(glowRef.current - glow) > 0.02) {
      setGlow(glowRef.current);
      setMemoryWallGlow(glowRef.current);
    }

    if (spotlightMeshRef.current) {
      const mat = spotlightMeshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = glowRef.current * 0.28;
    }
  });

  return (
    <group position={[-2.78, 1.50, 1.15]} rotation={[0, Math.PI / 2, 0]}>
      {/* Soft additive spotlight beam overlay (cheap additive glow plane, 0 real-time lights) */}
      <mesh
        ref={spotlightMeshRef}
        position={[0, 0, 0.005]}
      >
        <planeGeometry args={[3.2, 1.4]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Neat horizontal grid layout of memory photo frames */}
      {MEMORIES.map((memory, idx) => {
        const total = MEMORIES.length;
        const spacing = 0.88;
        const posX = (idx - (total - 1) / 2) * spacing;

        return (
          <group key={memory.id} position={[posX, 0, 0]}>
            <WallFrame
              title={memory.title}
              imageUrl={memory.image}
              width={0.76}
              height={0.54}
              glowIntensity={glow}
              frameColor="#18181b"
            />
          </group>
        );
      })}
    </group>
  );
};
