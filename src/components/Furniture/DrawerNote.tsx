import React from 'react';

/**
 * Desk drawer handle accent located on the desk pedestal (X = -3.75, Y = 0.38, Z = -3.4).
 * Subtle emissive handle glow so observant visitors can spot it.
 */
export const DrawerNote: React.FC = () => {
  return (
    <group position={[-2.05, 0.38, -1.80]} rotation={[0, Math.PI / 2, 0]}>
      {/* Drawer front faceplate seam */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.42, 0.22, 0.02]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Drawer metallic handle with subtle cyan accent */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.14, 0.02, 0.025]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};
