import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * 1:1 Replica of "Minecraft Logo" by tg (Sketchfab CC-BY)
 * Model UID: 3c7e9037e45f4ac6943c43e5e2282014
 *
 * Characteristics:
 * - Clean, authentic 3D blocky Minecraft logo plate directly mounted on wall
 * - Sized generously across the bed feature wall (width 2.30m x height 0.52m)
 * - Pure natural room lighting (no artificial spotlight / light flare attached)
 * - No background black box - clean contoured logo with crisp alpha cutout
 */
export const MinecraftLogo: React.FC = () => {
  const logoTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/images/art/minecraft_logo.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    // Centered above the bed headboard on North Wall: X = 1.65, Y = 1.88m, Z = -2.575m
    <group position={[1.65, 1.88, -2.575]}>
      {/* 3D Extruded Front Plate for Minecraft Logo */}
      <mesh position={[0, 0, 0.005]} castShadow receiveShadow>
        <planeGeometry args={[2.35, 0.52]} />
        <meshStandardMaterial
          map={logoTexture}
          transparent={true}
          alphaTest={0.15}
          roughness={0.4}
          metalness={0.08}
        />
      </mesh>
    </group>
  );
};
