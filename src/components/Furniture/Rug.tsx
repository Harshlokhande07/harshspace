import React from 'react';

/**
 * Cozy woven area rug with subtle geometric border accents
 * placed on the wood floor between the desk and bed.
 */
export const Rug: React.FC = () => {
  return (
    <group position={[-0.20, 0.008, -0.40]}>
      {/* Main woven carpet body: 2.4m x 2.0m */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.4, 2.0]} />
        <meshStandardMaterial color="#18202f" roughness={0.9} />
      </mesh>

      {/* Subtle cyan / violet geometric accent line border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.002]}>
        <ringGeometry args={[0.85, 0.87, 4]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.2}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
};
