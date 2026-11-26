import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLivingRoomStore } from '../../store/useLivingRoomStore';

/**
 * Ceiling Fan mounted in the room center (X = 0, Y = 3.65, Z = 0).
 * Features:
 * - Ceiling rod & motor hub
 * - 4 aerodynamic blades
 * - Smooth spin-up and spin-down damping
 * - Subtle semi-transparent motion blur disc when spinning fast
 * - Zero collision, zero extra real-time lights
 */
export const CeilingFan: React.FC = () => {
  const bladesGroupRef = useRef<THREE.Group>(null);
  const blurDiscMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const currentSpeed = useRef<number>(1.0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const fanOn = useLivingRoomStore.getState().fanOn;
    const targetSpeed = fanOn ? 1.0 : 0.0;

    // Smooth spin-up and spin-down damping
    currentSpeed.current = THREE.MathUtils.damp(
      currentSpeed.current,
      targetSpeed,
      fanOn ? 1.8 : 0.8,
      dt
    );

    // Rotate blades
    if (bladesGroupRef.current) {
      bladesGroupRef.current.rotation.y += currentSpeed.current * 8.5 * dt;
    }

    // Motion blur disc opacity scales with speed
    if (blurDiscMatRef.current) {
      blurDiscMatRef.current.opacity = Math.max(0, (currentSpeed.current - 0.25) * 0.35);
    }
  });

  return (
    <group position={[0, 2.55, 0]}>
      {/* 1. Ceiling mounting canopy */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.1, 24]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* 2. Downrod from ceiling */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.35, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 3. Motor housing */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.3, 0.24, 0.16, 24]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Center decorative accent cap */}
      <mesh position={[0, -0.19, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* 4. Rotating Blades Group */}
      <group ref={bladesGroupRef} position={[0, -0.12, 0]}>
        {[0, 1, 2, 3].map((index) => {
          const angle = (index * Math.PI) / 2;
          return (
            <group key={index} rotation={[0, angle, 0]}>
              {/* Blade arm bracket */}
              <mesh position={[0.26, 0, 0]}>
                <boxGeometry args={[0.18, 0.015, 0.04]} />
                <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
              </mesh>
              {/* Wooden-tone modern aerodynamic blade */}
              <mesh position={[0.9, 0.005, 0]} rotation={[0.08, 0, 0]}>
                <boxGeometry args={[1.1, 0.012, 0.2]} />
                <meshStandardMaterial
                  color="#1c1917"
                  roughness={0.6}
                  metalness={0.15}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* 5. Faint motion blur disc */}
      <mesh position={[0, -0.125, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 1.45, 32]} />
        <meshBasicMaterial
          ref={blurDiscMatRef}
          color="#0f172a"
          transparent
          opacity={0.2}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
