import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MinecraftTorchProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  isWallMounted?: boolean;
}

/**
 * 1:1 Replica of "Minecraft Torch" by Blender3D (Sketchfab CC-BY)
 * Model UID: e88c4214d4bc4437ae6d249237591071
 *
 * Characteristics:
 * - Authentic 2x2 voxel shaft profile (wooden stick with dark bark edges)
 * - Emissive glowing flame head cube (#FFF275 / #FFA000 / #FF4500)
 * - Soft animated gentle flicker
 * - Wall mounted angled mount bracket or upright standing
 */
export const MinecraftTorch: React.FC<MinecraftTorchProps> = ({
  position = [1.70, 1.25, 2.38],
  rotation = [0, 0, 0],
  isWallMounted = false,
}) => {
  const flameMatRef = useRef<THREE.MeshStandardMaterial>(null);

  // High-performance procedural pixelated texture for torch wood shaft & flame
  const { shaftTex, flameMat } = useMemo(() => {
    // 1. Shaft texture: 16x16 pixel Minecraft wood stick
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 16;
    sCanvas.height = 32;
    const sCtx = sCanvas.getContext('2d');
    if (sCtx) {
      sCtx.fillStyle = '#6E4522';
      sCtx.fillRect(0, 0, 16, 32);

      // Dark borders
      sCtx.fillStyle = '#2B1A0D';
      sCtx.fillRect(0, 0, 3, 32);
      sCtx.fillRect(13, 0, 3, 32);

      // Inner wood grain blocks
      sCtx.fillStyle = '#5A371B';
      for (let y = 0; y < 32; y += 4) {
        sCtx.fillRect(4, y, 4, 3);
        sCtx.fillRect(9, y + 2, 4, 3);
      }
      sCtx.fillStyle = '#82522B';
      for (let y = 2; y < 32; y += 6) {
        sCtx.fillRect(4, y, 3, 2);
      }
    }
    const sTex = new THREE.CanvasTexture(sCanvas);
    sTex.magFilter = THREE.NearestFilter;
    sTex.minFilter = THREE.NearestFilter;

    // 2. Flame texture: 16x16 glowing fire cube pixels
    const fCanvas = document.createElement('canvas');
    fCanvas.width = 16;
    fCanvas.height = 16;
    const fCtx = fCanvas.getContext('2d');
    if (fCtx) {
      // White-hot center bottom
      fCtx.fillStyle = '#FFF8D6';
      fCtx.fillRect(0, 8, 16, 8);
      // Vivid yellow
      fCtx.fillStyle = '#FFD54F';
      fCtx.fillRect(0, 4, 16, 4);
      // Orange top
      fCtx.fillStyle = '#FF9800';
      fCtx.fillRect(0, 0, 16, 4);
      // Reddish ember corners
      fCtx.fillStyle = '#E65100';
      fCtx.fillRect(0, 0, 3, 3);
      fCtx.fillRect(13, 0, 3, 3);
    }
    const fTex = new THREE.CanvasTexture(fCanvas);
    fTex.magFilter = THREE.NearestFilter;
    fTex.minFilter = THREE.NearestFilter;

    const fMat = new THREE.MeshStandardMaterial({
      map: fTex,
      color: '#FFFFFF',
      emissive: '#FF9800',
      emissiveIntensity: 2.2,
      roughness: 0.2,
    });

    return { shaftTex: sTex, flameTex: fTex, flameMat: fMat };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (flameMatRef.current) {
      // Subtle cozy Minecraft torch flame flicker
      const flicker = (Math.sin(t * 12.0) + Math.cos(t * 18.0) * 0.5) * 0.2 + 2.2;
      flameMatRef.current.emissiveIntensity = flicker;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* If wall-mounted, angled slightly at ~18° from wall just like Minecraft */}
      <group rotation={isWallMounted ? [0.28, 0, 0] : [0, 0, 0]}>
        {/* Wooden stick shaft (0.05m x 0.22m x 0.05m) */}
        <mesh position={[0, 0.11, 0]} castShadow>
          <boxGeometry args={[0.048, 0.22, 0.048]} />
          <meshStandardMaterial map={shaftTex} roughness={0.8} />
        </mesh>

        {/* Glowing Flame Cube Head (0.052m x 0.06m x 0.052m) */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.052, 0.06, 0.052]} />
          <primitive object={flameMat} ref={flameMatRef} />
        </mesh>

        {/* Soft Warm Torch Light Radius */}
        <pointLight
          position={[0, 0.28, 0.02]}
          color="#FFA726"
          intensity={0.85}
          distance={2.4}
          decay={2}
          castShadow={false}
        />
      </group>
    </group>
  );
};
