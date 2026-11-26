import React from 'react';

/**
 * Modern standing cyber-dock contact terminal placed against the right wall at [5.2, 0, 2.8].
 * Features an ergonomic angled console, illuminated holographic screen,
 * and a glowing geometric envelope beacon (emissive mesh, 0 extra real-time lights).
 */
export const ContactStation: React.FC = () => {
  return (
    <group position={[1.85, 0, 1.30]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Heavy base plinth (Dark slate metal) */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.56, 0.08, 0.44]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Base perimeter cyan neon line */}
      <mesh position={[0, 0.082, 0]}>
        <boxGeometry args={[0.54, 0.006, 0.42]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#38bdf8"
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Upright pedestal pillar */}
      <mesh position={[0, 0.48, 0]} castShadow>
        <boxGeometry args={[0.18, 0.82, 0.16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* Pedestal front illuminated vertical accent strip */}
      <mesh position={[0, 0.48, 0.082]}>
        <boxGeometry args={[0.02, 0.74, 0.004]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#a855f7"
          emissiveIntensity={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Angled Console Desktop Terminal (Height ~0.95m, angled 18 deg towards user) */}
      <group position={[0, 0.94, 0.02]} rotation={[-0.32, 0, 0]}>
        {/* Terminal Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.04, 0.36]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Holographic display surface */}
        <mesh position={[0, 0.022, 0]}>
          <planeGeometry args={[0.44, 0.3]} />
          <meshStandardMaterial
            color="#082f49"
            emissive="#0284c7"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>

        {/* 3D Geometric Envelope / @ symbol beacon built from primitives */}
        <group position={[0, 0.04, 0]}>
          {/* Envelope base rectangle */}
          <mesh position={[0, 0.006, 0]}>
            <planeGeometry args={[0.18, 0.12]} />
            <meshStandardMaterial
              color="#000000"
              emissive="#38bdf8"
              emissiveIntensity={1.0}
              roughness={0.2}
            />
          </mesh>

          {/* Envelope top flap triangular lines */}
          <mesh position={[0, 0.008, 0.01]} rotation={[0, 0, 0.42]}>
            <planeGeometry args={[0.11, 0.008]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={1.2}
            />
          </mesh>
          <mesh position={[0, 0.008, 0.01]} rotation={[0, 0, -0.42]}>
            <planeGeometry args={[0.11, 0.008]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={1.2}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};
