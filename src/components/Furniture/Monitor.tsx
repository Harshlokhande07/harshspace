import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCharacterStore } from '../../store/useCharacterStore';
import { useInteractionStore } from '../../store/useInteractionStore';

/**
 * Dual monitor setup on desk:
 * Left monitor (code editor, cyan emissive tone)
 * Right monitor (angled dashboard, violet/indigo emissive tone)
 * Screens gently brighten when player is seated or PC desktop is active.
 */
export const Monitor: React.FC = () => {
  const leftScreenMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const rightScreenMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const actionState = useCharacterStore.getState().actionState;
    const activeId = useInteractionStore.getState().activeId;

    const isSeatedOrActive = actionState === 'seated' || activeId === 'desk-pc';
    const targetLeft = isSeatedOrActive ? 1.4 : 0.6;
    const targetRight = isSeatedOrActive ? 1.2 : 0.5;

    if (leftScreenMatRef.current) {
      leftScreenMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        leftScreenMatRef.current.emissiveIntensity,
        targetLeft,
        4.0,
        dt
      );
    }

    if (rightScreenMatRef.current) {
      rightScreenMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        rightScreenMatRef.current.emissiveIntensity,
        targetRight,
        4.0,
        dt
      );
    }
  });

  return (
    <group position={[-1.10, 0.74, -2.15]}>
      {/* Heavy metal desk dual-arm mount stand */}
      <mesh position={[0, 0.15, -0.15]}>
        <cylinderGeometry args={[0.02, 0.02, 0.35, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.02, -0.15]}>
        <cylinderGeometry args={[0.1, 0.1, 0.04, 24]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* Horizontal mounting crossbar */}
      <mesh position={[0, 0.3, -0.12]}>
        <boxGeometry args={[1.2, 0.03, 0.04]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Primary Left Monitor: 27" flat display facing player */}
      <group position={[-0.46, 0.32, 0]} rotation={[0, 0.08, 0]}>
        {/* Frame & Bezel */}
        <mesh castShadow>
          <boxGeometry args={[0.78, 0.46, 0.028]} />
          <meshStandardMaterial color="#020617" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Emissive Screen (Code display vibe) */}
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[0.75, 0.43]} />
          <meshStandardMaterial
            ref={leftScreenMatRef}
            color="#082f49"
            emissive="#0284c7"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
        {/* Screen chin logo */}
        <mesh position={[0, -0.21, 0.017]}>
          <planeGeometry args={[0.04, 0.01]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Secondary Right Monitor: angled slightly towards user */}
      <group position={[0.44, 0.32, -0.06]} rotation={[0, -0.26, 0]}>
        {/* Frame & Bezel */}
        <mesh castShadow>
          <boxGeometry args={[0.78, 0.46, 0.028]} />
          <meshStandardMaterial color="#020617" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Emissive Screen (Telemetry / Status vibe) */}
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[0.75, 0.43]} />
          <meshStandardMaterial
            ref={rightScreenMatRef}
            color="#3b0764"
            emissive="#a855f7"
            emissiveIntensity={0.5}
            roughness={0.2}
          />
        </mesh>
        {/* Screen chin logo */}
        <mesh position={[0, -0.21, 0.017]}>
          <planeGeometry args={[0.04, 0.01]} />
          <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
};
