import React from 'react';

/**
 * Modern Standing Cyber-Dock Contact Terminal
 * Materials:
 * - Natural walnut wood pedestal (#684A35) with brushed champagne metal trim (#C5B49E)
 * - Ergonomic angled console with subtle cyan holographic terminal display
 */
export const ContactStation: React.FC = () => {
  return (
    <group position={[1.85, 0, 1.30]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Heavy base plinth in Medium Walnut (#684A35) */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.56, 0.08, 0.44]} />
        <meshStandardMaterial color="#684A35" roughness={0.45} metalness={0.05} />
      </mesh>

      {/* Base perimeter champagne metal accent line */}
      <mesh position={[0, 0.082, 0]}>
        <boxGeometry args={[0.54, 0.006, 0.42]} />
        <meshStandardMaterial
          color="#C5B49E"
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Upright pedestal pillar in Brushed Champagne Bronze (#4A433D) */}
      <mesh position={[0, 0.48, 0]} castShadow>
        <boxGeometry args={[0.18, 0.82, 0.16]} />
        <meshStandardMaterial color="#4A433D" roughness={0.45} metalness={0.5} />
      </mesh>

      {/* Pedestal front illuminated vertical accent strip */}
      <mesh position={[0, 0.48, 0.082]}>
        <boxGeometry args={[0.02, 0.74, 0.004]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#38bdf8"
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Angled Console Desktop Terminal in Walnut (#684A35) */}
      <group position={[0, 0.94, 0.02]} rotation={[-0.32, 0, 0]}>
        {/* Terminal Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.04, 0.36]} />
          <meshStandardMaterial color="#684A35" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Holographic display surface */}
        <mesh position={[0, 0.022, 0]}>
          <planeGeometry args={[0.44, 0.3]} />
          <meshStandardMaterial
            color="#082f49"
            emissive="#0284c7"
            emissiveIntensity={0.5}
            roughness={0.2}
          />
        </mesh>

        {/* Floating Holographic Contact Glyph */}
        <group position={[0, 0.04, 0]}>
          {/* Base glyph outline */}
          <mesh position={[0, 0.006, 0]}>
            <planeGeometry args={[0.12, 0.08]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={1.0}
              roughness={0.2}
              wireframe={true}
            />
          </mesh>
          {/* Holographic envelope flap folds */}
          <mesh position={[0, 0.008, 0.01]} rotation={[0, 0, 0.42]}>
            <planeGeometry args={[0.07, 0.004]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.0} />
          </mesh>
          <mesh position={[0, 0.008, 0.01]} rotation={[0, 0, -0.42]}>
            <planeGeometry args={[0.07, 0.004]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.0} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
