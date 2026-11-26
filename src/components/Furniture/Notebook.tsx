import React from 'react';

/**
 * Open developer notebook with a metallic ballpoint pen on the desk.
 */
export const Notebook: React.FC = () => {
  return (
    <group position={[-1.55, 0.74, -1.68]} rotation={[0, 0.12, 0]}>
      {/* Notebook Cover (Dark leatherette) */}
      <mesh position={[0, 0.005, 0]} receiveShadow>
        <boxGeometry args={[0.26, 0.01, 0.34]} />
        <meshStandardMaterial color="#1c1917" roughness={0.7} />
      </mesh>

      {/* Left Open Page (Warm ivory paper) */}
      <mesh position={[-0.065, 0.012, 0]} rotation={[0, 0, -0.02]}>
        <boxGeometry args={[0.12, 0.008, 0.31]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.9} />
      </mesh>

      {/* Right Open Page (Warm ivory paper) */}
      <mesh position={[0.065, 0.012, 0]} rotation={[0, 0, 0.02]}>
        <boxGeometry args={[0.12, 0.008, 0.31]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.9} />
      </mesh>

      {/* Center Bookmark Ribbon */}
      <mesh position={[0, 0.016, 0.05]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[0.015, 0.002, 0.22]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.5} />
      </mesh>

      {/* Pen beside notebook */}
      <group position={[0.18, 0.008, 0]} rotation={[0, -0.08, 0]}>
        {/* Pen barrel */}
        <mesh>
          <cylinderGeometry args={[0.005, 0.005, 0.16, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Pen tip */}
        <mesh position={[0, 0.085, 0]}>
          <cylinderGeometry args={[0.001, 0.005, 0.015, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Pen clip accent */}
        <mesh position={[0.006, -0.04, 0]}>
          <boxGeometry args={[0.002, 0.05, 0.003]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};
