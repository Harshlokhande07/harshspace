import React, { useMemo } from 'react';
import * as THREE from 'three';

interface EaselProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

/**
 * 1:1 Replica of "Easel with blank painting" by Atmo [NebavorN]
 * Model UID: 72eb516b96de46269d339fb4c03da6b8
 * Embed URL: https://sketchfab.com/models/72eb516b96de46269d339fb4c03da6b8/embed
 *
 * Characteristics:
 * - Blockbench low-poly Minecraft-style artist tripod easel
 * - Warm oak A-frame legs with rear stabilizer kickstand
 * - Center vertical mast with adjustable top clamp block and wooden wingnut
 * - Sturdy horizontal canvas tray shelf with front retaining lip
 * - Stretched blank artist canvas primed in warm ivory/linen with clean wood stretcher edges
 * - Wooden artist paintbrushes and brush rests on the tray
 * - Placed in the sunlit artist corner beside the large picture window (X = -2.15, Z = 0.65)
 */
export const Easel: React.FC<EaselProps> = ({
  position = [-2.15, 0, 0.65],
  rotation = [0, Math.PI / 4 + 0.18, 0],
  scale = 1.0,
}) => {
  // 1. Procedural Fine Woven Linen Canvas Texture
  const canvasTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Warm Primed Linen Ivory Base (#F6F3EB)
    ctx.fillStyle = '#F6F3EB';
    ctx.fillRect(0, 0, 256, 256);

    // Subtle canvas fiber weave grid pattern
    ctx.fillStyle = '#EDE8DD';
    for (let x = 0; x < 256; x += 4) {
      for (let y = 0; y < 256; y += 4) {
        if ((x + y) % 8 === 0) {
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }

    // Very gentle artistic vignette on canvas border edges
    ctx.strokeStyle = '#E2DBD0';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 252, 252);

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // 2. Materials
  const {
    oakWoodMat,
    darkOakMat,
    canvasFaceMat,
    canvasEdgeMat,
    brassHardwareMat,
    brushWoodMat,
    brushBristleMat,
  } = useMemo(() => {
    return {
      // Warm Natural Oak Wood Planks (#7A4A28)
      oakWoodMat: new THREE.MeshStandardMaterial({
        color: '#7A4A28',
        roughness: 0.72,
        metalness: 0.04,
      }),
      // Darker Oak for cross-braces & sliding tray (#5C361B)
      darkOakMat: new THREE.MeshStandardMaterial({
        color: '#5C361B',
        roughness: 0.78,
        metalness: 0.04,
      }),
      // Primed Blank White Canvas (#F6F3EB)
      canvasFaceMat: new THREE.MeshStandardMaterial({
        map: canvasTexture,
        roughness: 0.92,
        metalness: 0.01,
      }),
      // Raw pine stretcher frame for canvas back & edges (#9C6E43)
      canvasEdgeMat: new THREE.MeshStandardMaterial({
        color: '#9C6E43',
        roughness: 0.8,
        metalness: 0.02,
      }),
      // Brass adjustment wingnut & fasteners (#D4AF37)
      brassHardwareMat: new THREE.MeshStandardMaterial({
        color: '#C8A038',
        roughness: 0.35,
        metalness: 0.8,
      }),
      // Paintbrush wooden handle (#B37D4D)
      brushWoodMat: new THREE.MeshStandardMaterial({
        color: '#B37D4D',
        roughness: 0.6,
        metalness: 0.05,
      }),
      // Paintbrush bristles (#262626 with subtle paint tip)
      brushBristleMat: new THREE.MeshStandardMaterial({
        color: '#262626',
        roughness: 0.9,
        metalness: 0.0,
      }),
    };
  }, [canvasTexture]);

  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* =========================================================================
          1. TRIPOD FRAME (Oak A-Frame with backward tilt of ~8.5 degrees)
         ========================================================================= */}
      {/* Front A-Frame Group (Tilted back by 8.5 degrees / 0.15 rad) */}
      <group rotation={[-0.15, 0, 0]} position={[0, 0, 0]}>
        {/* Front Left Leg (X = -0.28, slants inward toward top) */}
        <mesh position={[-0.20, 0.80, 0]} rotation={[0, 0, -0.09]} material={oakWoodMat} castShadow receiveShadow>
          <boxGeometry args={[0.045, 1.62, 0.045]} />
        </mesh>

        {/* Front Right Leg (X = +0.28, slants inward toward top) */}
        <mesh position={[0.20, 0.80, 0]} rotation={[0, 0, 0.09]} material={oakWoodMat} castShadow receiveShadow>
          <boxGeometry args={[0.045, 1.62, 0.045]} />
        </mesh>

        {/* Center Vertical Mast Spine (Running from floor Y=0.20 up to Y=1.70) */}
        <mesh position={[0, 0.92, 0.005]} material={oakWoodMat} castShadow receiveShadow>
          <boxGeometry args={[0.05, 1.55, 0.04]} />
        </mesh>

        {/* Lower Horizontal Stabilizer Crossbar (Y = 0.38) */}
        <mesh position={[0, 0.38, 0]} material={darkOakMat} castShadow receiveShadow>
          <boxGeometry args={[0.54, 0.04, 0.035]} />
        </mesh>

        {/* Upper Apex Joiner Block (Y = 1.58) */}
        <mesh position={[0, 1.58, 0.01]} material={darkOakMat} castShadow receiveShadow>
          <boxGeometry args={[0.16, 0.06, 0.055]} />
        </mesh>

        {/* =========================================================================
            2. HORIZONTAL PAINTING TRAY SHELF (Y = 0.80)
            Where the canvas rests; features front retaining lip
           ========================================================================= */}
        <group position={[0, 0.80, 0.05]}>
          {/* Main Shelf Plank */}
          <mesh material={darkOakMat} castShadow receiveShadow>
            <boxGeometry args={[0.82, 0.035, 0.09]} />
          </mesh>

          {/* Front Retaining Lip (prevents canvas from sliding forward) */}
          <mesh position={[0, 0.025, 0.04]} material={darkOakMat} castShadow>
            <boxGeometry args={[0.82, 0.025, 0.015]} />
          </mesh>

          {/* Tray Support Brackets underneath */}
          <mesh position={[-0.18, -0.04, -0.015]} material={oakWoodMat} castShadow>
            <boxGeometry args={[0.04, 0.05, 0.06]} />
          </mesh>
          <mesh position={[0.18, -0.04, -0.015]} material={oakWoodMat} castShadow>
            <boxGeometry args={[0.04, 0.05, 0.06]} />
          </mesh>

          {/* Tray Height Adjustment Wooden Screw Knob */}
          <mesh position={[0, -0.03, -0.04]} material={brassHardwareMat} castShadow>
            <boxGeometry args={[0.025, 0.025, 0.025]} />
          </mesh>

          {/* =========================================================================
              3. ARTIST DETAILS: Paintbrushes resting on the shelf tray
             ========================================================================= */}
          {/* Brush 1 */}
          <group position={[0.26, 0.022, 0.01]} rotation={[0, 0.15, 0]}>
            <mesh material={brushWoodMat} castShadow>
              <boxGeometry args={[0.18, 0.008, 0.008]} />
            </mesh>
            <mesh position={[-0.10, 0, 0]} material={brushBristleMat} castShadow>
              <boxGeometry args={[0.03, 0.012, 0.01]} />
            </mesh>
          </group>

          {/* Brush 2 */}
          <group position={[0.27, 0.022, -0.015]} rotation={[0, -0.08, 0]}>
            <mesh material={brushWoodMat} castShadow>
              <boxGeometry args={[0.16, 0.007, 0.007]} />
            </mesh>
            <mesh position={[-0.09, 0, 0]} material={brushBristleMat} castShadow>
              <boxGeometry args={[0.025, 0.01, 0.008]} />
            </mesh>
          </group>
        </group>

        {/* =========================================================================
            4. THE BLANK PAINTING CANVAS (Width: 0.74m, Height: 0.58m, Depth: 0.03m)
            Stretched canvas primed in warm linen resting securely on the tray
           ========================================================================= */}
        <group position={[0, 1.12, 0.055]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.74, 0.58, 0.03]} />
            {/* [+X, -X, +Y, -Y, +Z (Front Face), -Z (Back Stretcher Frame)] */}
            <meshStandardMaterial attach="material-0" {...canvasEdgeMat} />
            <meshStandardMaterial attach="material-1" {...canvasEdgeMat} />
            <meshStandardMaterial attach="material-2" {...canvasEdgeMat} />
            <meshStandardMaterial attach="material-3" {...canvasEdgeMat} />
            <meshStandardMaterial attach="material-4" {...canvasFaceMat} />
            <meshStandardMaterial attach="material-5" {...canvasEdgeMat} />
          </mesh>

          {/* Back Stretcher Wooden Crossbars */}
          <mesh position={[0, 0, -0.016]} material={canvasEdgeMat}>
            <boxGeometry args={[0.04, 0.56, 0.005]} />
          </mesh>
          <mesh position={[0, 0, -0.016]} material={canvasEdgeMat}>
            <boxGeometry args={[0.72, 0.04, 0.005]} />
          </mesh>
        </group>

        {/* =========================================================================
            5. ADJUSTABLE TOP CLAMP (Holding canvas securely from top)
           ========================================================================= */}
        <group position={[0, 1.43, 0.05]}>
          <mesh material={darkOakMat} castShadow>
            <boxGeometry args={[0.10, 0.04, 0.08]} />
          </mesh>
          {/* Clamp Lower Retaining Notch */}
          <mesh position={[0, -0.025, 0.025]} material={darkOakMat} castShadow>
            <boxGeometry args={[0.10, 0.02, 0.02]} />
          </mesh>
          {/* Brass Wingnut Fastener on Top Clamp */}
          <mesh position={[0, 0.025, -0.02]} material={brassHardwareMat} castShadow>
            <boxGeometry args={[0.03, 0.02, 0.03]} />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          6. REAR TRIPOD STABILIZER LEG
          Hinged at top apex (Y = 1.54) and angled backwards down to floor (Z = -0.48)
         ========================================================================= */}
      <group position={[0, 1.54, -0.01]} rotation={[0.31, 0, 0]}>
        <mesh position={[0, -0.80, 0]} material={oakWoodMat} castShadow receiveShadow>
          <boxGeometry args={[0.045, 1.64, 0.04]} />
        </mesh>
      </group>
    </group>
  );
};
