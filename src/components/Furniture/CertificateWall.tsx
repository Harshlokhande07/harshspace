import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CERTIFICATES } from '../../data/certificates';
import { WallFrame } from './WallFrame';
import { useInteractionStore } from '../../store/useInteractionStore';
import { useRoomEffectsStore } from '../../store/useRoomEffectsStore';

/**
 * Achievement Wall (Certificates & Awards):
 * Wall-mounted on the back wall at X = 0.2, Y = 2.3, Z = -5.92 (between Desk and Bed).
 * Includes an additive-blended soft spotlight glow and frame emissive rims on proximity.
 */
export const CertificateWall: React.FC = () => {
  const [glow, setGlow] = useState(0);
  const glowRef = useRef(0);
  const spotlightMeshRef = useRef<THREE.Mesh>(null);
  const setCertificateWallGlow = useRoomEffectsStore((s) => s.setCertificateWallGlow);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const nearestId = useInteractionStore.getState().nearestId;
    const activeId = useInteractionStore.getState().activeId;

    const isNear = nearestId === 'achievements' || activeId === 'achievements';
    const targetGlow = isNear ? 1.0 : 0.0;

    glowRef.current = THREE.MathUtils.damp(glowRef.current, targetGlow, 5.0, dt);

    if (Math.abs(glowRef.current - glow) > 0.02) {
      setGlow(glowRef.current);
      setCertificateWallGlow(glowRef.current);
    }

    if (spotlightMeshRef.current) {
      const mat = spotlightMeshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = glowRef.current * 0.28;
    }
  });

  return (
    <group position={[-1.10, 1.75, -2.57]}>
      {/* Soft additive spotlight beam overlay (cheap additive glow plane, 0 real-time lights) */}
      <mesh
        ref={spotlightMeshRef}
        position={[0, 0, 0.005]}
      >
        <planeGeometry args={[3.2, 1.4]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Neat horizontal grid layout of certificate frames */}
      {CERTIFICATES.map((cert, idx) => {
        // Lay out frames centered horizontally
        const total = CERTIFICATES.length;
        const spacing = 0.88;
        const posX = (idx - (total - 1) / 2) * spacing;

        return (
          <group key={cert.id} position={[posX, 0, 0]}>
            <WallFrame
              title={cert.title}
              imageUrl={cert.image}
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
