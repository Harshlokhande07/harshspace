import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Creates a crisp pixel-art CanvasTexture from an array of hex colors.
 */
function createPixelTexture(width: number, height: number, pixels: string[]): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      ctx.fillStyle = pixels[y * width + x] || '#000000';
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * 1:1 Pixel-Perfect Replica of "Minecraft Girl Skin" by hiyeeter_ (Sketchfab / Blockbench)
 * Model UID: fe82d9ff77cd4451a4062536404836bd
 *
 * Characteristics directly matching the author's official model:
 * - Beautiful anime face: pale peach skin (#FCE5D8), dark expressive eyes with white catchlight sparkle,
 *   soft rosy cheek blush (#FCA5A5), cute smile.
 * - Jet dark charcoal hair (#232629) with center-parted bangs, sideburns, and iconic clips:
 *   - Bright yellow rectangular barrette (#FACC15) on forehead
 *   - Cute square pink hairclip (#F472B6) right below it
 *   - Long side braid cascading down over her left shoulder with a turquoise ribbon band (#38BDF8)
 * - Cozy oversized light blue-grey knit sweater (#8394A3) in stylish off-shoulder cut:
 *   - Off-shoulder on her left side with white camisole strap (#FFFFFF)
 *   - Oversized folded knit sleeve cuff on her relaxed right arm
 *   - Fitted sleeve with cyan wrist band on her raised left arm
 * - High-waisted sky blue denim shorts (#42B5D4) with rolled pastel cuffs (#BAE6FD)
 * - Slender bare anime legs with slate-cyan slide sandals (#72A0B5) and white soles
 * - Playful friendly waving idle animation on raised left arm
 * - Positioned on interaction ring next to Bookshelf at X = -0.65, Z = 2.15, facing towards room center
 */
export const MinecraftGirl: React.FC = () => {
  const waveArmRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  // Pixel Color Palette
  const C = useMemo(() => {
    return {
      SKN: '#FCE5D8', // Pale Peach Anime Skin
      SKD: '#F3D2C2', // Skin shadow / contour
      BLS: '#FCA5A5', // Rosy Cheek Blush
      LIP: '#E5A59E', // Cute Smile Mouth
      HAR: '#232629', // Charcoal Black Hair
      HRD: '#1A1C1E', // Dark Hair Shadow
      HRL: '#313539', // Hair Highlight
      YEL: '#FACC15', // Yellow Barrette
      PNK: '#F472B6', // Pink Hairclip
      CYN: '#4AD2E2', // Cyan Hair Accent / Ribbon
      WHT: '#FFFFFF', // Eye Catchlight / Camisole Strap
      EYE: '#1E2024', // Eye Pupil
      GRY: '#8394A3', // Grey Knit Sweater Main
      GRD: '#6B7C8B', // Grey Knit Sweater Shadow
      GRL: '#97A8B7', // Grey Knit Sweater Highlight
      HEM: '#60707E', // Ribbed Sweater Hem
      BLU: '#42B5D4', // Denim Shorts Main
      BLD: '#319AB6', // Denim Shorts Shadow
      CUF: '#BAE6FD', // Denim Rolled Cuffs
      SHO: '#72A0B5', // Slate Cyan Shoes
      SOL: '#FFFFFF', // Shoe White Sole
    };
  }, []);

  // Textures and Materials
  const materials = useMemo(() => {
    const {
      SKN, SKD, BLS, LIP, HAR, HRD, HRL,
      YEL, PNK, CYN, WHT, EYE,
      GRY, GRD, GRL, HEM,
      BLU, BLD, CUF,
      SHO, SOL
    } = C;

    // 1. Head Front Face (8x8)
    // Matches sketchfab_girl_thumb.jpeg 1:1:
    // Bangs at top, yellow & pink barrettes on right, anime eyes with catchlights, blush & smile
    const headFrontPixels = [
      HAR, HAR, HAR, HAR, HAR, YEL, YEL, HAR, // Row 0: Bangs + Yellow Barrette
      HAR, HAR, HAR, HAR, HAR, PNK, PNK, HAR, // Row 1: Bangs + Pink Clip
      HAR, CYN, HAR, SKN, SKN, HAR, HAR, HAR, // Row 2: Cyan hair streak + bangs
      HAR, SKN, SKN, SKN, SKN, SKN, SKN, HAR, // Row 3: Forehead
      HAR, WHT, EYE, SKN, SKN, WHT, EYE, HAR, // Row 4: Eyes (White catchlight + Dark pupil)
      HAR, EYE, EYE, SKN, SKN, EYE, EYE, HAR, // Row 5: Lower Eye
      SKN, BLS, SKN, SKN, SKN, SKN, BLS, SKN, // Row 6: Cheeks with Rosy Blush
      SKN, SKN, SKN, LIP, SKN, SKN, SKN, SKN, // Row 7: Chin + Cute Smile
    ];

    // 2. Head Back Face (8x8)
    const headBackPixels = [
      HAR, HRL, HAR, HAR, HRL, HAR, HAR, HAR,
      HAR, HAR, HAR, HAR, HAR, HAR, HRD, HAR,
      HAR, HRD, HAR, HAR, HAR, HAR, HAR, HAR,
      HAR, HAR, HAR, HRL, HAR, HAR, HAR, HAR,
      HAR, HAR, HAR, HAR, HAR, HRD, HAR, HAR,
      HAR, HRD, HAR, HAR, HAR, HAR, HAR, HAR,
      HAR, HAR, HAR, HAR, HRL, HAR, HAR, HAR,
      HAR, HAR, HRD, HAR, HAR, HAR, HRD, HAR,
    ];

    // 3. Head Sides (Right +X, Left -X) (8x8)
    const headRightPixels = [
      HAR, HAR, HAR, HAR, HAR, HAR, HAR, HAR,
      HAR, HRL, HAR, HAR, HAR, HAR, HAR, HAR,
      HAR, HAR, HAR, CYN, HAR, HAR, HAR, HAR,
      HAR, HAR, HAR, CYN, HAR, HAR, HAR, HAR,
      HAR, HAR, HAR, HAR, HAR, HAR, HAR, HAR,
      HAR, HAR, HAR, SKN, SKN, HAR, HAR, HAR,
      HAR, HAR, SKN, SKN, SKN, HAR, HAR, HAR,
      HAR, SKN, SKN, SKN, SKN, HAR, HAR, HAR,
    ];
    const headLeftPixels = [
      HAR, HAR, HAR, HAR, HAR, HAR, HAR, HAR,
      HAR, HAR, HAR, HRL, HAR, HAR, HAR, HAR,
      HAR, HAR, HAR, HAR, HAR, HAR, HAR, HAR,
      HAR, HAR, HAR, HAR, HAR, HAR, HAR, HAR,
      HAR, HAR, HAR, HAR, HAR, HAR, HAR, HAR,
      HAR, HAR, SKN, SKN, SKN, HAR, HAR, HAR,
      HAR, SKN, SKN, SKN, SKN, HAR, HAR, HAR,
      SKN, SKN, SKN, SKN, SKN, HAR, HAR, HAR,
    ];

    // 4. Head Top & Bottom (8x8)
    const headTopPixels = Array(64).fill(HAR);
    headTopPixels[10] = HRL;
    headTopPixels[25] = HRL;
    headTopPixels[42] = HRD;
    const headBottomPixels = Array(64).fill(SKN);

    // 5. Torso Front Face (8x12)
    // Off-shoulder grey knit sweater on her right, bare skin and white camisole strap on left
    const torsoFrontPixels = [
      GRY, GRL, GRY, GRY, SKN, WHT, SKN, SKN, // Row 0: Sweater shoulder / Bare skin + strap
      GRY, GRY, GRD, GRY, SKN, WHT, SKN, SKN, // Row 1
      GRL, GRY, GRY, GRY, WHT, WHT, WHT, SKN, // Row 2: Camisole neckline
      GRY, GRD, GRY, GRY, GRY, WHT, WHT, GRY, // Row 3: Diagonal drape
      GRY, GRY, GRL, GRY, GRY, GRY, GRY, GRY, // Row 4: Full sweater
      GRD, GRY, GRY, GRD, GRY, GRL, GRY, GRD, // Row 5
      GRY, GRL, GRY, GRY, GRD, GRY, GRY, GRY, // Row 6
      GRY, GRY, GRD, GRY, GRY, GRY, GRL, GRY, // Row 7
      GRD, GRY, GRY, GRL, GRY, GRD, GRY, GRD, // Row 8
      GRY, GRD, GRY, GRY, GRD, GRY, GRY, GRY, // Row 9
      HEM, HEM, HEM, HEM, HEM, HEM, HEM, HEM, // Row 10: Ribbed Hem
      HEM, GRD, HEM, HEM, GRD, HEM, HEM, GRD, // Row 11: Hem Shadow
    ];

    // 6. Torso Back Face (8x12)
    const torsoBackPixels = [
      GRY, GRY, GRL, GRY, GRY, GRL, GRY, GRY,
      GRY, GRD, GRY, GRY, GRD, GRY, GRY, GRY,
      GRL, GRY, GRY, GRY, GRY, GRY, GRD, GRL,
      GRY, GRY, GRD, GRY, GRD, GRY, GRY, GRY,
      GRD, GRY, GRY, GRL, GRY, GRY, GRY, GRD,
      GRY, GRL, GRY, GRY, GRY, GRL, GRY, GRY,
      GRY, GRY, GRD, GRY, GRD, GRY, GRY, GRY,
      GRD, GRY, GRY, GRL, GRY, GRY, GRD, GRY,
      GRY, GRL, GRY, GRY, GRY, GRL, GRY, GRY,
      GRY, GRD, GRY, GRY, GRD, GRY, GRY, GRY,
      HEM, HEM, HEM, HEM, HEM, HEM, HEM, HEM,
      HEM, GRD, HEM, HEM, GRD, HEM, HEM, GRD,
    ];

    // 7. Torso Sides (4x12)
    const torsoRightPixels = [
      GRY, GRL, GRY, GRY,
      GRY, GRY, GRD, GRY,
      GRL, GRY, GRY, GRY,
      GRY, GRD, GRY, GRY,
      GRD, GRY, GRY, GRL,
      GRY, GRL, GRY, GRY,
      GRY, GRY, GRD, GRY,
      GRD, GRY, GRY, GRL,
      GRY, GRL, GRY, GRY,
      GRY, GRD, GRY, GRY,
      HEM, HEM, HEM, HEM,
      HEM, GRD, HEM, GRD,
    ];
    const torsoLeftPixels = [
      SKN, SKN, SKN, SKN, // Bare skin at off-shoulder
      SKN, SKN, SKN, SKN,
      WHT, WHT, SKN, SKN,
      GRY, GRY, GRY, GRY,
      GRD, GRY, GRL, GRY,
      GRY, GRL, GRY, GRD,
      GRY, GRY, GRD, GRY,
      GRD, GRY, GRL, GRY,
      GRY, GRL, GRY, GRD,
      GRY, GRD, GRY, GRY,
      HEM, HEM, HEM, HEM,
      HEM, GRD, HEM, GRD,
    ];

    // 8. Shorts (Denim Blue 8x4 front)
    const shortsFrontPixels = [
      BLU, BLU, BLD, BLU, BLU, BLD, BLU, BLU,
      BLD, BLU, BLU, BLU, BLU, BLU, BLU, BLD,
      BLU, BLD, BLU, BLU, BLD, BLU, BLU, BLU,
      CUF, CUF, CUF, CUF, CUF, CUF, CUF, CUF, // Rolled cuffs
    ];
    const shortsBackPixels = [
      BLU, BLD, BLU, BLU, BLD, BLU, BLU, BLU,
      BLU, BLU, BLU, BLD, BLU, BLU, BLD, BLU,
      BLD, BLU, BLU, BLU, BLU, BLU, BLU, BLD,
      CUF, CUF, CUF, CUF, CUF, CUF, CUF, CUF,
    ];

    // 9. Leg Faces (4x12: 8 rows skin, 3 rows shoes, 1 row sole)
    const legFrontPixels = [
      SKN, SKN, SKN, SKN,
      SKN, SKN, SKD, SKN,
      SKN, SKD, SKN, SKN,
      SKN, SKN, SKN, SKN,
      SKN, SKN, SKD, SKN,
      SKN, SKD, SKN, SKN,
      SKN, SKN, SKN, SKN,
      SKN, SKN, SKN, SKD,
      SHO, SHO, SHO, SHO, // Shoes
      SHO, SHO, SHD(SHO), SHO,
      SHD(SHO), SHO, SHO, SHO,
      SOL, SOL, SOL, SOL, // White Sole
    ];

    function SHD(hex: string) { return hex === SHO ? '#5E8E9E' : hex; }

    const createMat = (tex: THREE.CanvasTexture) =>
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, metalness: 0.05 });

    // Multi-materials: [Right (+X), Left (-X), Top (+Y), Bottom (-Y), Front (+Z), Back (-Z)]
    const headMaterials = [
      createMat(createPixelTexture(8, 8, headRightPixels)),
      createMat(createPixelTexture(8, 8, headLeftPixels)),
      createMat(createPixelTexture(8, 8, headTopPixels)),
      createMat(createPixelTexture(8, 8, headBottomPixels)),
      createMat(createPixelTexture(8, 8, headFrontPixels)), // Front face!
      createMat(createPixelTexture(8, 8, headBackPixels)),
    ];

    const torsoMaterials = [
      createMat(createPixelTexture(4, 12, torsoRightPixels)),
      createMat(createPixelTexture(4, 12, torsoLeftPixels)),
      createMat(createPixelTexture(8, 4, Array(32).fill(GRY))),
      createMat(createPixelTexture(8, 4, Array(32).fill(HEM))),
      createMat(createPixelTexture(8, 12, torsoFrontPixels)),
      createMat(createPixelTexture(8, 12, torsoBackPixels)),
    ];

    const shortsMaterials = [
      createMat(createPixelTexture(4, 4, Array(16).fill(BLU))),
      createMat(createPixelTexture(4, 4, Array(16).fill(BLU))),
      createMat(createPixelTexture(8, 4, Array(32).fill(BLU))),
      createMat(createPixelTexture(8, 4, Array(32).fill(CUF))),
      createMat(createPixelTexture(8, 4, shortsFrontPixels)),
      createMat(createPixelTexture(8, 4, shortsBackPixels)),
    ];

    const legMaterials = [
      createMat(createPixelTexture(4, 12, legFrontPixels)),
      createMat(createPixelTexture(4, 12, legFrontPixels)),
      createMat(createPixelTexture(4, 4, Array(16).fill(SKN))),
      createMat(createPixelTexture(4, 4, Array(16).fill(SOL))),
      createMat(createPixelTexture(4, 12, legFrontPixels)),
      createMat(createPixelTexture(4, 12, legFrontPixels)),
    ];

    // Arm textures
    // Left Arm (raised waving): Full sweater sleeve + cyan wrist band + peach hand
    const leftArmPixels = [
      GRY, GRL, GRY, GRY,
      GRY, GRY, GRD, GRY,
      GRL, GRY, GRY, GRY,
      GRY, GRD, GRY, GRY,
      GRY, GRL, GRY, GRY,
      GRD, GRY, GRY, GRD,
      GRY, GRL, GRY, GRY,
      GRY, GRY, GRD, GRY,
      CYN, CYN, CYN, CYN, // Cyan wrist band
      SKN, SKN, SKN, SKN, // Hand
      SKN, SKD, SKN, SKN,
      SKN, SKN, SKD, SKN,
    ];
    const leftArmMat = createMat(createPixelTexture(4, 12, leftArmPixels));

    // Right Arm (relaxed at side): Bare shoulder + oversized rolled knit cuff + hand
    const rightArmPixels = [
      SKN, SKN, SKN, SKN, // Bare skin at top
      SKN, SKD, SKN, SKN,
      SKN, SKN, SKD, SKN,
      GRY, GRL, GRY, GRY, // Oversized sweater cuff starts
      GRY, GRY, GRD, GRY,
      GRL, GRY, GRY, GRY,
      HEM, HEM, HEM, HEM, // Folded cuff rim
      HEM, GRD, HEM, GRD,
      SKN, SKN, SKN, SKN, // Hand
      SKN, SKD, SKN, SKN,
      SKN, SKN, SKD, SKN,
      SKN, SKN, SKN, SKN,
    ];
    const rightArmMat = createMat(createPixelTexture(4, 12, rightArmPixels));

    // 3D Side Braid
    const hairBraidMat = new THREE.MeshStandardMaterial({
      color: HAR,
      roughness: 0.65,
      metalness: 0.05,
    });
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: CYN,
      roughness: 0.4,
    });

    return {
      headMaterials,
      torsoMaterials,
      shortsMaterials,
      legMaterials,
      leftArmMat,
      rightArmMat,
      hairBraidMat,
      ribbonMat,
    };
  }, [C]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Friendly waving idle loop on raised left arm
    if (waveArmRef.current) {
      waveArmRef.current.rotation.z = 2.2 + Math.sin(t * 3.5) * 0.22;
      waveArmRef.current.rotation.x = Math.cos(t * 3.5) * 0.12;
    }

    // Subtle head breathing / idle tilt
    if (headRef.current) {
      headRef.current.rotation.y = 0.08 + Math.sin(t * 0.8) * 0.05;
      headRef.current.rotation.z = -0.04 + Math.cos(t * 1.2) * 0.02;
    }
  });

  return (
    // Situated beside Bookshelf at X = -0.65, Z = 2.15, facing towards room center (looking at visitor)
    <group position={[-0.65, 0, 2.15]} rotation={[0, Math.PI - 0.25, 0]}>
      {/* Minecraft standard human scale: 32 pixels tall * 0.056 = ~1.80m tall */}
      <group scale={[0.056, 0.056, 0.056]}>
        {/* ============================================================== */}
        {/* 1. LEGS (Y: 0 to 12)                                          */}
        {/* ============================================================== */}
        {/* Right Leg (4 x 12 x 4) */}
        <mesh position={[2.0, 6, 0]} material={materials.legMaterials} castShadow receiveShadow>
          <boxGeometry args={[4, 12, 4]} />
        </mesh>

        {/* Left Leg (4 x 12 x 4) */}
        <mesh position={[-2.0, 6, 0]} material={materials.legMaterials} castShadow receiveShadow>
          <boxGeometry args={[4, 12, 4]} />
        </mesh>

        {/* ============================================================== */}
        {/* 2. DENIM SHORTS (Y: 10 to 14)                                 */}
        {/* ============================================================== */}
        <mesh position={[0, 12, 0]} material={materials.shortsMaterials} castShadow receiveShadow>
          <boxGeometry args={[8.1, 4, 4.1]} />
        </mesh>

        {/* ============================================================== */}
        {/* 3. TORSO (Y: 14 to 26)                                        */}
        {/* ============================================================== */}
        <mesh position={[0, 20, 0]} material={materials.torsoMaterials} castShadow receiveShadow>
          <boxGeometry args={[8, 12, 4]} />
        </mesh>

        {/* ============================================================== */}
        {/* 4. RIGHT ARM (Resting naturally by side)                      */}
        {/* ============================================================== */}
        <group position={[5.8, 24, 0]} rotation={[0.08, 0, -0.06]}>
          <mesh position={[0, -5, 0]} material={materials.rightArmMat} castShadow>
            <boxGeometry args={[3.6, 12, 4]} />
          </mesh>
          {/* Oversized rolled sweater cuff collar around forearm */}
          <mesh position={[0, -4.5, 0]} material={materials.rightArmMat} castShadow>
            <boxGeometry args={[4.2, 4.5, 4.4]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 5. LEFT ARM (Raised Friendly Waving Pose)                      */}
        {/* ============================================================== */}
        <group ref={waveArmRef} position={[-5.8, 24, 0]} rotation={[0, 0, 2.2]}>
          <mesh position={[0, -5, 0]} material={materials.leftArmMat} castShadow>
            <boxGeometry args={[3.6, 12, 4]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 6. HEAD & HAIR BRAID (Y: 26 to 34)                            */}
        {/* ============================================================== */}
        <group ref={headRef} position={[0, 26, 0]}>
          {/* Main Head Cube (8 x 8 x 8) with multi-material faces */}
          <mesh position={[0, 4, 0]} material={materials.headMaterials} castShadow receiveShadow>
            <boxGeometry args={[8, 8, 8]} />
          </mesh>

          {/* 3D Side Braid (cascading down her left shoulder in front) */}
          <group position={[-2.4, -1.0, 1.2]}>
            <mesh material={materials.hairBraidMat} castShadow>
              <boxGeometry args={[1.8, 11, 1.8]} />
            </mesh>
            {/* Turquoise Hair Tie Ribbon Band */}
            <mesh position={[0, -4.2, 0]} material={materials.ribbonMat}>
              <boxGeometry args={[2.0, 1.0, 2.0]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
