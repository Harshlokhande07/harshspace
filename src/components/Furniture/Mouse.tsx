import React from 'react';

/**
 * Ergonomic wireless gaming mouse placed to the right of keyboard.
 */
export const Mouse: React.FC = () => {
  return (
    <group position={[-0.75, 0.74, -1.68]}>
      {/* Mouse body */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.07, 0.03, 0.12]} />
        <meshStandardMaterial color="#18181b" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Scroll wheel */}
      <mesh position={[0, 0.034, -0.025]}>
        <cylinderGeometry args={[0.008, 0.008, 0.014, 12]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Subtle RGB palm logo */}
      <mesh position={[0, 0.036, 0.025]}>
        <planeGeometry args={[0.02, 0.02]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#a855f7"
          emissiveIntensity={0.8}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
};
