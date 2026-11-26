import React from 'react';

/**
 * Ceramic potted floor plant with lush stylized leaves in room corner.
 * Adds organic warmth and life to the minimalist charcoal interior.
 */
export const Plant: React.FC = () => {
  return (
    <group position={[-2.35, 0, -2.15]}>
      {/* Ceramic planter pot */}
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.28, 0.2, 0.56, 24]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.54, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.03, 20]} />
        <meshStandardMaterial color="#1c1917" roughness={0.9} />
      </mesh>

      {/* Organic stylized leaves fanning out */}
      {[
        { rot: [0.35, 0, 0.4], pos: [0.08, 0.72, 0.08], scale: [1, 1.3, 1] },
        { rot: [-0.3, 1.2, 0.3], pos: [-0.08, 0.76, 0.12], scale: [0.9, 1.4, 0.9] },
        { rot: [0.4, 2.4, -0.2], pos: [0.1, 0.68, -0.1], scale: [1.1, 1.2, 1] },
        { rot: [-0.35, 3.8, 0.35], pos: [-0.12, 0.74, -0.06], scale: [1, 1.5, 1] },
        { rot: [0.1, 5.0, -0.4], pos: [0.04, 0.82, 0], scale: [1.1, 1.6, 1.1] },
      ].map((leaf, idx) => (
        <group
          key={idx}
          position={leaf.pos as [number, number, number]}
          rotation={leaf.rot as [number, number, number]}
          scale={leaf.scale as [number, number, number]}
        >
          <mesh>
            <boxGeometry args={[0.12, 0.42, 0.015]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? '#15803d' : '#166534'}
              roughness={0.6}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
