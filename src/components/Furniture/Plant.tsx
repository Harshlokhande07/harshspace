import React from 'react';

/**
 * Ceramic Potted Floor Plant
 * Materials:
 * - Planter pot: Warm cream stone / terracotta ceramic (#DED4C5)
 * - Foliage: Vibrant natural emerald & forest green leaves (#2D6A4F, #40916C)
 */
export const Plant: React.FC = () => {
  return (
    <group position={[-2.35, 0, -2.15]}>
      {/* Ceramic planter pot in Warm Cream Stone (#DED4C5) */}
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.18, 0.56, 24]} />
        <meshStandardMaterial color="#DED4C5" roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Rich dark organic soil */}
      <mesh position={[0, 0.54, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.03, 20]} />
        <meshStandardMaterial color="#261E1A" roughness={0.95} />
      </mesh>

      {/* Lush stylized leaves in natural green */}
      {[
        { rot: [0.35, 0, 0.4], pos: [0.08, 0.72, 0.08], scale: [1, 1.3, 1], col: '#2D6A4F' },
        { rot: [-0.3, 1.2, 0.3], pos: [-0.08, 0.76, 0.12], scale: [0.9, 1.4, 0.9], col: '#40916C' },
        { rot: [0.4, 2.4, -0.2], pos: [0.1, 0.68, -0.1], scale: [1.1, 1.2, 1], col: '#52B788' },
        { rot: [-0.35, 3.8, 0.35], pos: [-0.12, 0.74, -0.06], scale: [1, 1.5, 1], col: '#2D6A4F' },
        { rot: [0.1, 5.0, -0.4], pos: [0.04, 0.82, 0], scale: [1.1, 1.6, 1.1], col: '#40916C' },
      ].map((leaf, idx) => (
        <group
          key={idx}
          position={leaf.pos as [number, number, number]}
          rotation={leaf.rot as [number, number, number]}
          scale={leaf.scale as [number, number, number]}
        >
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.07, 0.01, 0.48, 6]} />
            <meshStandardMaterial color={leaf.col} roughness={0.65} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
