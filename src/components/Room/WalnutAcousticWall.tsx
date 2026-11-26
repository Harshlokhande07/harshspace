import React, { useMemo } from 'react';

interface WalnutAcousticWallProps {
  position?: [number, number, number];
  width?: number;
  height?: number;
}

/**
 * Photorealistic Natural Walnut Acoustic Slat Feature Wall
 * Built with:
 * - Acoustic warm charcoal-brown backing felt (NOT pitch black)
 * - Medium-dark natural walnut wood slats (#68452F)
 * - Warm bronze/champagne edge reveal channels
 */
export const WalnutAcousticWall: React.FC<WalnutAcousticWallProps> = ({
  position = [-1.30, 1.40, -2.585],
  width = 3.0,
  height = 2.80,
}) => {
  // Slat geometry parameters: 27mm wide slats with 15mm gaps, 18mm depth
  const slatWidth = 0.027;
  const slatGap = 0.015;
  const slatDepth = 0.018;
  const pitch = slatWidth + slatGap;
  const count = Math.floor((width - 0.04) / pitch);

  const slats = useMemo(() => {
    const items: number[] = [];
    const startX = -((count - 1) * pitch) / 2;
    for (let i = 0; i < count; i++) {
      items.push(startX + i * pitch);
    }
    return items;
  }, [count, pitch]);

  return (
    <group position={position}>
      {/* 1. Acoustic Felt Backing (Warm charcoal-brown #2E2724, NOT pure black) */}
      <mesh position={[0, 0, -0.005]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color="#2E2724"
          roughness={0.92}
          metalness={0.02}
        />
      </mesh>

      {/* 2. Top & Bottom Architectural Shadow Gap Reveals (Warm bronze-charcoal) */}
      <mesh position={[0, height / 2 - 0.015, 0.005]}>
        <boxGeometry args={[width, 0.03, 0.025]} />
        <meshStandardMaterial color="#4A3C34" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, -height / 2 + 0.015, 0.005]}>
        <boxGeometry args={[width, 0.03, 0.025]} />
        <meshStandardMaterial color="#4A3C34" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* 3. Vertical Medium-Dark Natural Walnut Slats (#68452F) */}
      <group position={[0, 0, slatDepth / 2]}>
        {slats.map((x, idx) => (
          <mesh
            key={idx}
            position={[x, 0, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[slatWidth, height - 0.06, slatDepth]} />
            <meshStandardMaterial
              color="#68452F" // Medium-dark rich natural walnut
              roughness={0.48}
              metalness={0.04}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
