import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLivingRoomStore } from '../../store/useLivingRoomStore';
import { useInteractionStore } from '../../store/useInteractionStore';

/**
 * Modern minimalist architectural desk lamp.
 * Wires into useLivingRoomStore lampOn state:
 * - Emissive bulb fades smoothly with lampOn
 * - Maintains Step 6 notebook boost on top of base emissive (only when lamp is on)
 */
export const Lamp: React.FC = () => {
  const bulbMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const lampOn = useLivingRoomStore.getState().lampOn;
    const activeId = useInteractionStore.getState().activeId;

    if (bulbMatRef.current) {
      let targetEmissive = 0;
      if (lampOn) {
        targetEmissive = activeId === 'notebook' ? 2.4 : 1.2;
      }

      bulbMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        bulbMatRef.current.emissiveIntensity,
        targetEmissive,
        6.0,
        dt
      );
    }
  });

  return (
    <group position={[-1.85, 0.74, -2.05]}>
      {/* Heavy circular metal base in Brushed Champagne Brass (#C4A87D) */}
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.03, 24]} />
        <meshStandardMaterial color="#C4A87D" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Lower vertical arm segment */}
      <mesh position={[0, 0.22, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.009, 0.009, 0.42, 12]} />
        <meshStandardMaterial color="#D4BA92" metalness={0.7} roughness={0.25} />
      </mesh>

      {/* Elbow hinge */}
      <mesh position={[0.08, 0.41, 0]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial color="#A38865" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Upper cantilever arm segment pointing towards desk center */}
      <mesh position={[0.22, 0.45, 0.08]} rotation={[0, -0.3, 0.4]}>
        <cylinderGeometry args={[0.008, 0.008, 0.32, 12]} />
        <meshStandardMaterial color="#D4BA92" metalness={0.7} roughness={0.25} />
      </mesh>

      {/* Lamp Head (cone / hood) in Brushed Champagne Brass */}
      <group position={[0.34, 0.48, 0.14]} rotation={[0.4, 0, -0.8]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.07, 0.1, 16]} />
          <meshStandardMaterial color="#C4A87D" roughness={0.28} metalness={0.7} />
        </mesh>
        {/* Emissive bulb lens */}
        <mesh position={[0, -0.045, 0]}>
          <circleGeometry args={[0.065, 16]} />
          <meshStandardMaterial
            ref={bulbMatRef}
            color="#fffbeb"
            emissive="#fde68a"
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};
