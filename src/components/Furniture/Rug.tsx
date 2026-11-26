import React from 'react';

/**
 * Cozy Woven Bedroom Area Rug
 * Materials:
 * - Body: Warm textured natural beige / soft oatmeal (#D4CBC0)
 * - Border: Subtle golden terracotta geometric accent ring (#B8976C)
 */
export const Rug: React.FC = () => {
  return (
    <group position={[-0.20, 0.008, -0.40]}>
      {/* Main woven carpet body: 2.4m x 2.0m in Warm Beige Oatmeal (#D4CBC0) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.4, 2.0]} />
        <meshStandardMaterial color="#D4CBC0" roughness={0.88} />
      </mesh>

      {/* Subtle golden terracotta geometric accent line border (#B8976C) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.002]}>
        <ringGeometry args={[0.85, 0.87, 4]} />
        <meshStandardMaterial
          color="#B8976C"
          emissive="#B8976C"
          emissiveIntensity={0.15}
          roughness={0.75}
        />
      </mesh>
    </group>
  );
};
