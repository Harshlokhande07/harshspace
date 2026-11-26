import React from 'react';

interface EntranceDoorProps {
  position?: [number, number, number];
}

/**
 * Static Luxury Architectural Entrance Door
 * Features:
 * - Medium natural walnut door leaf (#6C462C)
 * - Matching warm wood / neutral casing frame (#5C3D26)
 * - Brushed champagne satin steel vertical bar handle (#E2DACB)
 * - Warm brass/aluminum floor threshold transition
 */
export const EntranceDoor: React.FC<EntranceDoorProps> = ({
  position = [1.75, 1.075, 2.585],
}) => {
  return (
    <group position={position} rotation={[0, Math.PI, 0]}>
      {/* 1. Warm Architectural Wood Casing Frame (Width 0.96m, Height 2.18m, Depth 0.14m) */}
      {/* Top Header */}
      <mesh position={[0, 1.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.96, 0.06, 0.14]} />
        <meshStandardMaterial color="#5C3D26" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Left Jamb */}
      <mesh position={[-0.45, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 2.18, 0.14]} />
        <meshStandardMaterial color="#5C3D26" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Right Jamb */}
      <mesh position={[0.45, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 2.18, 0.14]} />
        <meshStandardMaterial color="#5C3D26" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* 2. Warm Brass/Bronze Floor Threshold Strip */}
      <mesh position={[0, -1.065, 0]}>
        <boxGeometry args={[0.96, 0.02, 0.14]} />
        <meshStandardMaterial color="#A38865" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* 3. Flush Door Leaf in Medium Natural Walnut (#6C462C) */}
      <mesh position={[0, 0, -0.015]} castShadow receiveShadow>
        <boxGeometry args={[0.84, 2.10, 0.05]} />
        <meshStandardMaterial
          color="#6C462C" // Medium natural walnut
          roughness={0.45}
          metalness={0.06}
        />
      </mesh>

      {/* 4. Subtle Inlay Groove Accents */}
      <mesh position={[0, 0.45, 0.012]}>
        <boxGeometry args={[0.76, 0.008, 0.004]} />
        <meshStandardMaterial color="#4A2E1C" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.45, 0.012]}>
        <boxGeometry args={[0.76, 0.008, 0.004]} />
        <meshStandardMaterial color="#4A2E1C" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* 5. Modern Brushed Champagne Steel Vertical Bar Handle (#E2DACB) */}
      {/* Handle Stems */}
      <mesh position={[-0.32, 0.22, 0.045]}>
        <boxGeometry args={[0.018, 0.018, 0.06]} />
        <meshStandardMaterial color="#D8CFC2" roughness={0.25} metalness={0.8} />
      </mesh>
      <mesh position={[-0.32, -0.22, 0.045]}>
        <boxGeometry args={[0.018, 0.018, 0.06]} />
        <meshStandardMaterial color="#D8CFC2" roughness={0.25} metalness={0.8} />
      </mesh>
      {/* Vertical Bar */}
      <mesh position={[-0.32, 0, 0.075]} castShadow>
        <boxGeometry args={[0.022, 0.60, 0.022]} />
        <meshStandardMaterial color="#E2DACB" roughness={0.2} metalness={0.85} />
      </mesh>

      {/* 6. Keyhole / Escutcheon Plate */}
      <mesh position={[-0.32, -0.32, 0.012]}>
        <boxGeometry args={[0.04, 0.08, 0.004]} />
        <meshStandardMaterial color="#C5B8A5" roughness={0.3} metalness={0.75} />
      </mesh>
    </group>
  );
};
