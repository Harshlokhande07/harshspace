import React, { useMemo } from 'react';
import { ModelLoader, getModelUrl } from '../Room/ModelLoader';
import { FURNITURE_MODELS } from '../../data/models';

const BOOK_PALETTES = [
  '#C25E42', // Terracotta
  '#3E5C76', // Dusty Navy
  '#588157', // Sage Green
  '#E09F3E', // Warm Mustard
  '#EDE0D4', // Cream Ivory
  '#6D597A', // Muted Plum
  '#B56576', // Dusty Rose
  '#2A6F97', // Soft Ocean
];

/**
 * Photorealistic Bookshelf & Knowledge Archive (Phase 3 Polish)
 * Features:
 * - Medium walnut frame with chamfered top cap
 * - Curated procedural technical books with spine colors and tilting
 * - Geometric bronze bookends
 * - Potted shelf succulent in white faceted ceramic
 * - Developer collectible figurine / award trophy
 */
const PrimitiveBookshelf: React.FC = () => {
  const shelfYOffsets = [0.35, 0.80, 1.25, 1.70];

  // Procedural curated books on shelves
  const books = useMemo(() => {
    const list: Array<{ x: number; y: number; w: number; h: number; color: string; rotZ?: number }> = [];

    // Shelf 0: Heavy programming textbooks
    const startX0 = -0.48;
    let curX0 = startX0;
    for (let i = 0; i < 9; i++) {
      const w = 0.035 + (i % 3) * 0.008;
      const h = 0.22 + (i % 4) * 0.015;
      const color = BOOK_PALETTES[(i + 1) % BOOK_PALETTES.length];
      list.push({ x: curX0 + w / 2, y: shelfYOffsets[0] + 0.015 + h / 2, w, h, color });
      curX0 += w + 0.005;
    }

    // Shelf 1: Technical books with 2 leaning books at the end
    const startX1 = -0.46;
    let curX1 = startX1;
    for (let i = 0; i < 7; i++) {
      const w = 0.028 + (i % 3) * 0.006;
      const h = 0.18 + (i % 3) * 0.02;
      const color = BOOK_PALETTES[(i + 3) % BOOK_PALETTES.length];
      list.push({ x: curX1 + w / 2, y: shelfYOffsets[1] + 0.015 + h / 2, w, h, color });
      curX1 += w + 0.004;
    }
    // Leaning books
    list.push({
      x: curX1 + 0.04,
      y: shelfYOffsets[1] + 0.10,
      w: 0.03,
      h: 0.19,
      color: BOOK_PALETTES[0],
      rotZ: -0.22,
    });
    list.push({
      x: curX1 + 0.08,
      y: shelfYOffsets[1] + 0.09,
      w: 0.028,
      h: 0.18,
      color: BOOK_PALETTES[4],
      rotZ: -0.26,
    });

    // Shelf 2: Stack of horizontal books + vertical volume set
    const startX2 = 0.05;
    let curX2 = startX2;
    for (let i = 0; i < 8; i++) {
      const w = 0.026 + (i % 4) * 0.006;
      const h = 0.17 + (i % 3) * 0.022;
      const color = BOOK_PALETTES[(i + 5) % BOOK_PALETTES.length];
      list.push({ x: curX2 + w / 2, y: shelfYOffsets[2] + 0.015 + h / 2, w, h, color });
      curX2 += w + 0.004;
    }

    // Shelf 3: Architecture & design manuals
    const startX3 = -0.45;
    let curX3 = startX3;
    for (let i = 0; i < 6; i++) {
      const w = 0.032 + (i % 3) * 0.007;
      const h = 0.20 + (i % 2) * 0.02;
      const color = BOOK_PALETTES[(i + 2) % BOOK_PALETTES.length];
      list.push({ x: curX3 + w / 2, y: shelfYOffsets[3] + 0.015 + h / 2, w, h, color });
      curX3 += w + 0.005;
    }

    return list;
  }, []);

  return (
    <group position={[-1.85, 0, 2.35]} rotation={[0, Math.PI, 0]}>
      {/* 1. Outer Cabinet Frame: 1.30m wide x 2.10m tall x 0.35m deep in Medium Walnut (#725138) */}
      {/* Left side panel */}
      <mesh position={[-0.63, 1.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.04, 2.10, 0.35]} />
        <meshStandardMaterial color="#725138" roughness={0.45} metalness={0.05} />
      </mesh>
      {/* Right side panel */}
      <mesh position={[0.63, 1.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.04, 2.10, 0.35]} />
        <meshStandardMaterial color="#725138" roughness={0.45} metalness={0.05} />
      </mesh>
      {/* Top cap panel */}
      <mesh position={[0, 2.08, 0]} castShadow>
        <boxGeometry args={[1.30, 0.04, 0.35]} />
        <meshStandardMaterial color="#725138" roughness={0.45} metalness={0.05} />
      </mesh>
      {/* Bottom base panel */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.30, 0.08, 0.35]} />
        <meshStandardMaterial color="#684830" roughness={0.5} metalness={0.05} />
      </mesh>
      {/* Back privacy plate in Warm Taupe (#3D352F) */}
      <mesh position={[0, 1.05, -0.16]} receiveShadow>
        <boxGeometry args={[1.24, 2.02, 0.02]} />
        <meshStandardMaterial color="#3D352F" roughness={0.7} />
      </mesh>

      {/* 4 Horizontal Shelves in Medium Natural Walnut */}
      {shelfYOffsets.map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} receiveShadow>
          <boxGeometry args={[1.22, 0.03, 0.33]} />
          <meshStandardMaterial color="#7A563D" roughness={0.45} metalness={0.05} />
        </mesh>
      ))}

      {/* Curated books on shelves */}
      {books.map((b, i) => (
        <mesh
          key={i}
          position={[b.x, b.y, 0]}
          rotation={[0, 0, b.rotZ || 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[b.w, b.h, 0.22]} />
          <meshStandardMaterial color={b.color} roughness={0.75} />
        </mesh>
      ))}

      {/* 2. Shelf Decor & Storytelling Artifacts */}
      {/* Shelf 1: Bronze Architectural Triangle Bookend */}
      <mesh position={[-0.15, shelfYOffsets[1] + 0.08, 0]} castShadow>
        <coneGeometry args={[0.06, 0.12, 3]} />
        <meshStandardMaterial color="#B89458" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Shelf 2: Horizontal Stack of Tech Architecture Books */}
      <group position={[-0.32, shelfYOffsets[2] + 0.015, 0]}>
        <mesh position={[0, 0.016, 0]} castShadow>
          <boxGeometry args={[0.22, 0.032, 0.24]} />
          <meshStandardMaterial color="#3E5C76" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.046, 0]} castShadow>
          <boxGeometry args={[0.21, 0.028, 0.23]} />
          <meshStandardMaterial color="#C25E42" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.072, 0]} castShadow>
          <boxGeometry args={[0.19, 0.024, 0.22]} />
          <meshStandardMaterial color="#EDE0D4" roughness={0.8} />
        </mesh>
      </group>

      {/* Shelf 2: White Faceted Concrete Succulent Planter */}
      <group position={[-0.10, shelfYOffsets[2] + 0.015, 0]}>
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.035, 0.08, 6]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.6} />
        </mesh>
        {/* Succulent rosettes */}
        <mesh position={[0, 0.09, 0]}>
          <sphereGeometry args={[0.038, 8, 8]} />
          <meshStandardMaterial color="#588157" roughness={0.7} />
        </mesh>
      </group>

      {/* Shelf 3: Developer Collectible Award Trophy / Cube */}
      <group position={[0.25, shelfYOffsets[3] + 0.015, 0]}>
        {/* Marble Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <boxGeometry args={[0.08, 0.04, 0.08]} />
          <meshStandardMaterial color="#2E3440" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Gold Emblem Ribbon */}
        <mesh position={[0, 0.09, 0]} rotation={[0.4, 0.4, 0]} castShadow>
          <octahedronGeometry args={[0.045]} />
          <meshStandardMaterial color="#E5C07B" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

export const Bookshelf: React.FC = () => {
  const config = FURNITURE_MODELS.bookshelf;
  const url = getModelUrl(config.fileName);

  return (
    <ModelLoader
      url={url}
      position={config.position}
      rotation={config.rotation}
      targetSize={config.targetSize}
      verticalOffset={config.verticalOffset}
      castShadow={config.castShadow}
      receiveShadow={config.receiveShadow}
      hasBakedLighting={config.hasBakedLighting}
      fallback={<PrimitiveBookshelf />}
    />
  );
};
