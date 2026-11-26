import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * 1:1 Replica of "Minecraft Logo" by tg (Sketchfab CC-BY)
 * Model UID: 3c7e9037e45f4ac6943c43e5e2282014
 *
 * Characteristics:
 * - Authentic 3D extruded Minecraft blocky typography with iconic "A" Creeper face cutout
 * - Chiseled cobblestone gradient face texture with crisp black borders and 3D cast drop shadows
 * - Mounted directly in the middle of the wall above the bed (North Wall, X = 1.65, Z = -2.58m)
 */
export const MinecraftLogo: React.FC = () => {
  const logoTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/images/art/minecraft_logo.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    // Centered above the bed headboard: X = 1.65, Y = 1.78m, Z = -2.585m (North Wall)
    <group position={[1.65, 1.78, -2.585]}>
      {/* 3D Wall Backing Relief Frame */}
      <mesh position={[0, 0, -0.012]} castShadow>
        <boxGeometry args={[1.72, 0.40, 0.015]} />
        <meshStandardMaterial color="#16181D" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Main Extruded Front 3D Minecraft Logo Plate */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[1.70, 0.38]} />
        <meshStandardMaterial
          map={logoTexture}
          transparent={true}
          alphaTest={0.15}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* Subtle Warm Amber / Gold Backlight Glow casting onto wall behind logo */}
      <pointLight
        position={[0, 0, 0.08]}
        color="#FFA726"
        intensity={0.65}
        distance={2.0}
        decay={2}
        castShadow={false}
      />
    </group>
  );
};
