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

const PrimitiveBookshelf: React.FC = () => {
  const shelfYOffsets = [0.35, 0.80, 1.25, 1.70];

  // Procedural curated books on shelves
  const books = useMemo(() => {
    const list: Array<{ x: number; y: number; w: number; h: number; color: string }> = [];
    shelfYOffsets.forEach((sy, sIdx) => {
      // Add a set of books on each shelf with varied heights, widths and muted colors
      const startX = -0.45;
      const count = 7 + (sIdx % 3);
      let curX = startX;
      for (let i = 0; i < count; i++) {
        const w = 0.025 + ((i * 7 + sIdx * 3) % 4) * 0.008;
        const h = 0.16 + ((i * 13 + sIdx * 5) % 5) * 0.025;
        const color = BOOK_PALETTES[(i + sIdx * 2) % BOOK_PALETTES.length];
        list.push({ x: curX + w / 2, y: sy + 0.015 + h / 2, w, h, color });
        curX += w + 0.006;
      }
    });
    return list;
  }, []);

  return (
    <group position={[-1.85, 0, 2.35]} rotation={[0, Math.PI, 0]}>
      {/* Outer Cabinet Frame: 1.30m wide x 2.10m tall x 0.35m deep in Medium Walnut (#725138) */}
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
        <mesh key={i} position={[b.x, b.y, 0]} castShadow receiveShadow>
          <boxGeometry args={[b.w, b.h, 0.22]} />
          <meshStandardMaterial color={b.color} roughness={0.75} />
        </mesh>
      ))}
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
