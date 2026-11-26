import React from 'react';

/**
 * Mechanical gaming keyboard with desk mat and keycap rows.
 */
export const Keyboard: React.FC = () => {
  return (
    <group position={[-1.10, 0.74, -1.68]}>
      {/* XL Desk Mat underneath */}
      <mesh position={[0.2, 0.005, 0]} receiveShadow>
        <boxGeometry args={[0.9, 0.006, 0.4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>

      {/* Desk Mat cyan stitching perimeter */}
      <mesh position={[0.2, 0.007, 0]}>
        <boxGeometry args={[0.904, 0.004, 0.404]} />
        <meshStandardMaterial color="#0369a1" roughness={0.8} />
      </mesh>

      {/* Keyboard Case (Aluminum body) */}
      <mesh position={[0, 0.018, 0]}>
        <boxGeometry args={[0.38, 0.018, 0.14]} />
        <meshStandardMaterial color="#18181b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Keycap bed */}
      <mesh position={[0, 0.029, 0]}>
        <boxGeometry args={[0.36, 0.01, 0.12]} />
        <meshStandardMaterial color="#27272a" roughness={0.7} />
      </mesh>

      {/* Spacebar keycap accent */}
      <mesh position={[0, 0.035, 0.04]}>
        <boxGeometry args={[0.12, 0.008, 0.02]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.4}
          roughness={0.5}
        />
      </mesh>

      {/* Under-glow RGB keyboard backplate (emissive mesh, zero real-time lights) */}
      <mesh position={[0, 0.012, 0]}>
        <boxGeometry args={[0.382, 0.004, 0.142]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#06b6d4"
          emissiveIntensity={0.6}
          roughness={1}
        />
      </mesh>
    </group>
  );
};
