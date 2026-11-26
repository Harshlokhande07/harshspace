import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInteractionStore } from '../../store/useInteractionStore';
import { useLivingRoomStore } from '../../store/useLivingRoomStore';
import { getResolvedTimeMode } from '../Lighting/DayNightController';

const _cGlassEmissive = new THREE.Color();

/**
 * Photorealistic Modern Architectural Picture Window
 * Positioned on West wall at [-2.78, 1.425, -0.60] overlooking Tokyo skyline.
 * Materials:
 * - Champagne warm-grey architectural metal casing (#5A524A)
 * - Warm timber/stone window sill (#6C584C)
 * - Clear see-through glass with subtle day/night mist reflections
 */
export const WindowFrame: React.FC = () => {
  const glassRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const activeId = useInteractionStore.getState().activeId;
    const timeMode = useLivingRoomStore.getState().timeMode;
    const resolved = getResolvedTimeMode(timeMode);

    if (glassRef.current) {
      const baseColor =
        resolved === 'day'
          ? '#e2e8f0'
          : resolved === 'evening'
            ? '#ea580c'
            : '#0284c7';

      _cGlassEmissive.set(baseColor);
      glassRef.current.emissive.lerp(_cGlassEmissive, dt * 2.5);

      const targetEmissive =
        activeId === 'window'
          ? resolved === 'day'
            ? 0.4
            : resolved === 'evening'
              ? 0.7
              : 0.6
          : resolved === 'day'
            ? 0.08
            : resolved === 'evening'
              ? 0.22
              : 0.12;

      glassRef.current.emissiveIntensity = THREE.MathUtils.damp(
        glassRef.current.emissiveIntensity,
        targetEmissive,
        3.5,
        dt
      );
    }
  });

  return (
    <group position={[-2.78, 1.425, -0.60]} rotation={[0, Math.PI / 2, 0]}>
      {/* 1. Warm Architectural Timber Sill (#6C584C) */}
      <mesh position={[0, -0.925, 0.05]} receiveShadow>
        <boxGeometry args={[2.24, 0.05, 0.18]} />
        <meshStandardMaterial color="#6C584C" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* 2. Champagne Warm-Grey Outer Aluminum Frame (#5A524A) */}
      {/* Top Header */}
      <mesh position={[0, 0.90, 0.015]} castShadow receiveShadow>
        <boxGeometry args={[2.20, 0.05, 0.09]} />
        <meshStandardMaterial color="#5A524A" roughness={0.35} metalness={0.5} />
      </mesh>
      {/* Bottom Frame */}
      <mesh position={[0, -0.90, 0.015]} receiveShadow>
        <boxGeometry args={[2.20, 0.05, 0.09]} />
        <meshStandardMaterial color="#5A524A" roughness={0.35} metalness={0.5} />
      </mesh>
      {/* Left Frame */}
      <mesh position={[-1.075, 0, 0.015]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 1.85, 0.09]} />
        <meshStandardMaterial color="#5A524A" roughness={0.35} metalness={0.5} />
      </mesh>
      {/* Right Frame */}
      <mesh position={[1.075, 0, 0.015]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 1.85, 0.09]} />
        <meshStandardMaterial color="#5A524A" roughness={0.35} metalness={0.5} />
      </mesh>

      {/* 3. Modern Slim Mullions */}
      <mesh position={[0.25, 0, 0.02]} castShadow>
        <boxGeometry args={[0.035, 1.75, 0.05]} />
        <meshStandardMaterial color="#4A433D" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.40, 0.02]} castShadow>
        <boxGeometry args={[2.10, 0.035, 0.05]} />
        <meshStandardMaterial color="#4A433D" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* 4. See-Through Glass Pane */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.14, 1.79]} />
        <meshStandardMaterial
          ref={glassRef}
          color="#f8fafc"
          emissive="#e2e8f0"
          emissiveIntensity={0.08}
          roughness={0.12}
          metalness={0.1}
          transparent={true}
          opacity={0.25}
        />
      </mesh>
    </group>
  );
};
