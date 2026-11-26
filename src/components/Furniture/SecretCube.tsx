import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Floating glitched holographic cube perched on a bookshelf side-ledge (X = 5.35, Y = 2.15, Z = 1.35).
 * Has emissive cyan/magenta glow (0 added lights) and gently oscillates and spins.
 */
export const SecretCube: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const clock = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.x += dt * 0.9;
      meshRef.current.rotation.y += dt * 1.2;
      meshRef.current.position.y = 2.15 + Math.sin(clock * 2.2) * 0.035;
    }
  });

  return (
    <group position={[-1.85, 1.75, 2.30]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.09, 0.09, 0.09]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#c084fc"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>
    </group>
  );
};
