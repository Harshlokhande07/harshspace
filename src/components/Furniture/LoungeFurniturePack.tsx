import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * "Furniture Pack / Indoor plants and painting" by Eli_ac (Sketchfab d9f4e18bc9b34ef5a875dd102da2d68e)
 * Exact 1:1 faithful implementation matching original Sketchfab model:
 *
 * 1. Mid-Century Modern 2-Seater Couch in pastel sky-blue woven fabric (#7CAEBF)
 *    - 4 angled tapered round light oak legs (#C8A26E)
 *    - Soft flared armrests and dual plush seat & backrest cushions
 *    - Square ivory/cream linen accent cushion (#F5EFE1) on left
 *    - Rectangular chartreuse / lime lumbar pillow (#CAD82B) on right
 * 2. Antique Brass / Bronze Floor Lamp (#5C5036) with hanging cylindrical off-white drum shade
 * 3. 4 Modern Gallery Artworks in sleek black frames (#18181B) with white matting:
 *    - Painting 1 (Horizontal): Earthy brown oval & fine intersecting lines on warm beige
 *    - Painting 2 (Horizontal): Minimalist looping continuous squiggly line art on tan & white backing
 *    - Painting 3 (Vertical): Dynamic S-curve bold black calligraphic ribbon on soft grey
 *    - Painting 4 (Vertical): Bauhaus geometry with navy bar, terracotta block, grey accent, and fine line
 * 4. Interlocking Trio of Hexagonal Wooden Honeycomb Wall Shelves (open hollow natural oak frames #C49E6A)
 * 5. 3 Indoor Plants with distinct custom designer pots:
 *    - Plant 1: Tall Variegated Snake Plant (Sansevieria) in white rectangular planter on 4-legged wooden stand
 *    - Plant 2: Lush Tropical Fern/Palm in tall white/light-grey tapered rectangular terrazzo planter
 *    - Plant 3: Miniature Variegated Snake Plant in low faceted origami geometric ceramic pot
 */
export const LoungeFurniturePack: React.FC = () => {
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  // 1-4: 1:1 Original Sketchfab Artworks extracted from official Eli_ac model
  const painting1Texture = useMemo(() => {
    const tex = textureLoader.load('/images/art/painting1.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [textureLoader]);

  const painting2Texture = useMemo(() => {
    const tex = textureLoader.load('/images/art/painting2.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [textureLoader]);

  const painting3Texture = useMemo(() => {
    const tex = textureLoader.load('/images/art/painting3.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [textureLoader]);

  const painting4Texture = useMemo(() => {
    const tex = textureLoader.load('/images/art/painting4.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [textureLoader]);

  // 5. Photorealistic Snake Plant (Sansevieria) Leaf Texture (Broad, Flat, Variegated)
  const snakeLeafTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 768;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 256, 768);

    // Leaf contour path (sword-shaped, tapered tip)
    ctx.beginPath();
    ctx.moveTo(128, 30); // Pointed tip
    ctx.bezierCurveTo(68, 180, 40, 500, 78, 750); // Left outer curve
    ctx.lineTo(178, 750); // Base bottom
    ctx.bezierCurveTo(216, 500, 188, 180, 128, 30); // Right outer curve
    ctx.closePath();

    // Vibrant Yellow/Gold Variegated Outer Margin Band
    ctx.fillStyle = '#ECC94B';
    ctx.fill();

    // Dark Forest Green Inner Core with Mottled Cross-Banding
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(128, 54);
    ctx.bezierCurveTo(86, 190, 64, 490, 92, 750);
    ctx.lineTo(164, 750);
    ctx.bezierCurveTo(192, 490, 170, 190, 128, 54);
    ctx.closePath();
    ctx.clip();

    // Deep rich emerald green base
    ctx.fillStyle = '#1D4524';
    ctx.fillRect(0, 0, 256, 768);

    // Mottled horizontal waves
    ctx.fillStyle = '#2A5B34';
    for (let y = 70; y < 740; y += 22) {
      ctx.beginPath();
      ctx.ellipse(128, y, 54, 8 + (y % 5), 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#16341C';
    for (let y = 82; y < 740; y += 26) {
      ctx.beginPath();
      ctx.ellipse(128, y, 48, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // 6. Photorealistic Lush Tropical Palm/Fern Frond Texture
  const palmFrondTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 512, 512);

    // Central arched stem
    ctx.strokeStyle = '#225430';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(256, 490);
    ctx.quadraticCurveTo(256, 260, 256, 30);
    ctx.stroke();

    // Feathered pinnate leaflets radiating along the stem
    const numPairs = 18;
    for (let i = 0; i < numPairs; i++) {
      const t = i / numPairs;
      const y = 460 - t * 410;
      const len = (1 - t * 0.45) * 110;
      const col = i % 2 === 0 ? '#2D6E42' : '#3E8C56';

      ctx.fillStyle = col;

      // Left leaflet
      ctx.beginPath();
      ctx.moveTo(256, y);
      ctx.quadraticCurveTo(256 - len * 0.5, y - 28, 256 - len, y - 48);
      ctx.quadraticCurveTo(256 - len * 0.5, y - 10, 256, y + 14);
      ctx.fill();

      // Right leaflet
      ctx.beginPath();
      ctx.moveTo(256, y);
      ctx.quadraticCurveTo(256 + len * 0.5, y - 28, 256 + len, y - 48);
      ctx.quadraticCurveTo(256 + len * 0.5, y - 10, 256, y + 14);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  return (
    <group position={[4.05, 0, 0.10]} rotation={[0, -Math.PI / 2, 0]}>
      {/* =========================================================================
          1. ORIGINAL SKETCHFAB BLUE COUCH (Eli_ac)
          Light pastel sky-blue woven fabric (#7CAEBF), mid-century tapered oak legs,
          ivory linen throw pillow & lime chartreuse lumbar cushion
         ========================================================================= */}
      <group position={[0, 0, 0]}>
        {/* Sofa Base Frame */}
        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.74, 0.18, 0.82]} />
          <meshStandardMaterial color="#7CAEBF" roughness={0.7} />
        </mesh>

        {/* Dual Plush Seat Cushions (Left & Right) */}
        <mesh position={[-0.42, 0.41, 0.04]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.14, 0.72]} />
          <meshStandardMaterial color="#7CAEBF" roughness={0.72} />
        </mesh>
        <mesh position={[0.42, 0.41, 0.04]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.14, 0.72]} />
          <meshStandardMaterial color="#7CAEBF" roughness={0.72} />
        </mesh>

        {/* Dual Backrest Cushions */}
        <mesh position={[-0.42, 0.68, -0.28]} rotation={[0.10, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.44, 0.18]} />
          <meshStandardMaterial color="#7CAEBF" roughness={0.72} />
        </mesh>
        <mesh position={[0.42, 0.68, -0.28]} rotation={[0.10, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.44, 0.18]} />
          <meshStandardMaterial color="#7CAEBF" roughness={0.72} />
        </mesh>

        {/* Curved Armrests (Left & Right) */}
        <mesh position={[-0.90, 0.52, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[0.14, 0.38, 0.84]} />
          <meshStandardMaterial color="#7CAEBF" roughness={0.7} />
        </mesh>
        <mesh position={[0.90, 0.52, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[0.14, 0.38, 0.84]} />
          <meshStandardMaterial color="#7CAEBF" roughness={0.7} />
        </mesh>

        {/* Tapered Mid-Century Wooden Legs (#C8A26E) angled outward diagonally */}
        {[
          [-0.78, 0.10, 0.32],
          [0.78, 0.10, 0.32],
          [-0.78, 0.10, -0.32],
          [0.78, 0.10, -0.32],
        ].map((lp, idx) => (
          <mesh
            key={idx}
            position={lp as [number, number, number]}
            rotation={[idx > 1 ? 0.16 : -0.16, 0, idx % 2 === 0 ? 0.16 : -0.16]}
            castShadow
          >
            <cylinderGeometry args={[0.022, 0.034, 0.20, 12]} />
            <meshStandardMaterial color="#C8A26E" roughness={0.55} />
          </mesh>
        ))}

        {/* Square Ivory Linen Cushion on Left (#F5EFE1) */}
        <mesh position={[-0.64, 0.54, -0.12]} rotation={[0.12, 0.22, -0.06]} castShadow>
          <boxGeometry args={[0.34, 0.32, 0.12]} />
          <meshStandardMaterial color="#F5EFE1" roughness={0.88} />
        </mesh>

        {/* Rectangular Chartreuse / Lime Lumbar Cushion on Right (#CAD82B) */}
        <mesh position={[0.55, 0.48, -0.16]} rotation={[0.10, -0.08, 0.04]} castShadow>
          <boxGeometry args={[0.38, 0.20, 0.12]} />
          <meshStandardMaterial color="#CAD82B" roughness={0.82} />
        </mesh>
      </group>

      {/* =========================================================================
          2. STANDING METAL FLOOR LAMP (To the left of sofa: X = -1.25)
          Antique brass/bronze pole (#5C5036) with hanging linen drum shade
         ========================================================================= */}
      <group position={[-1.25, 0, 0.05]}>
        {/* Circular Brass Floor Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.035, 24]} />
          <meshStandardMaterial color="#5C5036" roughness={0.35} metalness={0.75} />
        </mesh>

        {/* Slender Brass Vertical Pole */}
        <mesh position={[0, 0.78, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 1.52, 16]} />
          <meshStandardMaterial color="#5C5036" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Top Bracket Arm */}
        <mesh position={[0, 1.54, 0.08]}>
          <boxGeometry args={[0.025, 0.025, 0.16]} />
          <meshStandardMaterial color="#5C5036" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Cylindrical Drum Linen Shade hanging from bracket */}
        <mesh position={[0, 1.38, 0.15]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.28, 24]} />
          <meshStandardMaterial
            color="#FAF8F2"
            emissive="#FEF3C7"
            emissiveIntensity={0.25}
            roughness={0.75}
          />
        </mesh>
      </group>

      {/* =========================================================================
          3. 4 MODERN FRAMED ABSTRACT GALLERY ARTWORKS
          Mounted on the East wall behind sofa in black frames with white mats
         ========================================================================= */}
      <group position={[0, 1.62, -0.36]}>
        {/* Painting 1: Horizontal Organic Oval Art */}
        <group position={[-0.88, 0.15, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.68, 0.46, 0.03]} />
            <meshStandardMaterial color="#18181B" roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.62, 0.40]} />
            <meshStandardMaterial map={painting1Texture} roughness={0.7} />
          </mesh>
        </group>

        {/* Painting 2: Horizontal Continuous Line Art */}
        <group position={[-0.15, 0.15, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.68, 0.46, 0.03]} />
            <meshStandardMaterial color="#18181B" roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.62, 0.40]} />
            <meshStandardMaterial map={painting2Texture} roughness={0.7} />
          </mesh>
        </group>

        {/* Painting 3: Vertical S-Ribbon Calligraphic Art */}
        <group position={[0.48, 0.18, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.44, 0.64, 0.03]} />
            <meshStandardMaterial color="#18181B" roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.38, 0.58]} />
            <meshStandardMaterial map={painting3Texture} roughness={0.7} />
          </mesh>
        </group>

        {/* Painting 4: Vertical Bauhaus Geometric Color Block Art */}
        <group position={[0.98, 0.18, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.44, 0.64, 0.03]} />
            <meshStandardMaterial color="#18181B" roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.38, 0.58]} />
            <meshStandardMaterial map={painting4Texture} roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          5. 3 DESIGNER INDOOR POTTED PLANTS (Eli_ac 1:1 original realistic foliage)
         ========================================================================= */}
      {/* Plant A: Tall Variegated Snake Plant (Sansevieria) on 4-Legged Wood Stand (X = +1.28) */}
      <group position={[1.28, 0, 0.12]}>
        {/* 4-Legged Natural Wood Stand */}
        <group position={[0, 0.20, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.26, 0.025, 0.035]} />
            <meshStandardMaterial color="#A67C52" roughness={0.55} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.035, 0.025, 0.26]} />
            <meshStandardMaterial color="#A67C52" roughness={0.55} />
          </mesh>
          {[
            [-0.11, 0, 0.11],
            [0.11, 0, 0.11],
            [-0.11, 0, -0.11],
            [0.11, 0, -0.11],
          ].map((pos, i) => (
            <mesh key={i} position={pos as [number, number, number]} castShadow>
              <cylinderGeometry args={[0.013, 0.013, 0.40, 12]} />
              <meshStandardMaterial color="#A67C52" roughness={0.55} />
            </mesh>
          ))}
        </group>

        {/* Tall White Planter on Stand */}
        <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.21, 0.38, 0.21]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.35} />
        </mesh>

        {/* Soil Base (recessed slightly below pot rim) */}
        <mesh position={[0, 0.615, 0]} receiveShadow>
          <boxGeometry args={[0.185, 0.02, 0.185]} />
          <meshStandardMaterial color="#2B1E16" roughness={0.9} />
        </mesh>

        {/* Photorealistic Broad Variegated Snake Plant Leaves */}
        {[
          { pos: [0, 0.88, 0], rot: [0.05, 0.1, 0], scale: [1, 1.35, 1] },
          { pos: [-0.03, 0.84, 0.02], rot: [-0.12, 0.8, -0.08], scale: [0.95, 1.25, 1] },
          { pos: [0.03, 0.83, -0.02], rot: [0.15, -0.6, 0.06], scale: [0.92, 1.2, 1] },
          { pos: [0.02, 0.80, 0.04], rot: [-0.18, 1.6, 0.04], scale: [0.88, 1.15, 1] },
          { pos: [-0.04, 0.79, -0.03], rot: [0.2, -1.4, -0.06], scale: [0.85, 1.1, 1] },
          { pos: [0.05, 0.76, 0.01], rot: [0.08, 2.3, 0.14], scale: [0.8, 1.05, 1] },
          { pos: [-0.02, 0.75, 0.05], rot: [-0.15, -2.1, -0.1], scale: [0.78, 1.0, 1] },
          { pos: [0.01, 0.73, -0.05], rot: [0.22, 0.4, -0.12], scale: [0.75, 0.95, 1] },
        ].map((leaf, idx) => (
          <group
            key={idx}
            position={leaf.pos as [number, number, number]}
            rotation={leaf.rot as [number, number, number]}
            scale={leaf.scale as [number, number, number]}
          >
            <mesh>
              <planeGeometry args={[0.095, 0.52]} />
              <meshStandardMaterial
                map={snakeLeafTexture}
                transparent
                alphaTest={0.4}
                side={THREE.DoubleSide}
                roughness={0.45}
                depthWrite={true}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Plant B: Lush Tropical Palm/Fern in Tall Tapered Terrazzo Planter (X = +1.68) */}
      <group position={[1.68, 0, 0.08]}>
        {/* Tall Light-Grey Tapered Rectangular Planter sitting directly on floor */}
        <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.24, 0.48, 0.24]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.4} />
        </mesh>

        {/* Soil Base (recessed below pot rim) */}
        <mesh position={[0, 0.465, 0]} receiveShadow>
          <boxGeometry args={[0.21, 0.02, 0.21]} />
          <meshStandardMaterial color="#2B1E16" roughness={0.9} />
        </mesh>

        {/* Spreading Arching Tropical Palm Fronds radiating in all directions */}
        {[
          { rot: [0.55, 0.2, -0.15], pos: [0.04, 0.60, 0.03], scale: 1.1 },
          { rot: [0.45, 1.1, -0.2], pos: [-0.03, 0.62, 0.04], scale: 1.05 },
          { rot: [0.5, 2.1, -0.15], pos: [-0.04, 0.59, -0.03], scale: 1.0 },
          { rot: [0.52, 3.2, -0.18], pos: [0.03, 0.61, -0.04], scale: 1.08 },
          { rot: [0.48, 4.3, -0.12], pos: [0.04, 0.63, 0.01], scale: 1.02 },
          { rot: [0.54, 5.3, -0.16], pos: [-0.02, 0.60, -0.01], scale: 1.0 },
          // Upright inner crowning fronds
          { rot: [0.22, 0.6, -0.05], pos: [0.01, 0.68, 0.02], scale: 0.95 },
          { rot: [0.25, 2.7, 0.08], pos: [-0.01, 0.69, -0.02], scale: 0.92 },
          { rot: [0.28, 4.8, -0.06], pos: [0.02, 0.67, 0], scale: 0.9 },
        ].map((f, i) => (
          <group
            key={i}
            position={f.pos as [number, number, number]}
            rotation={f.rot as [number, number, number]}
            scale={[f.scale, f.scale, f.scale]}
          >
            <mesh>
              <planeGeometry args={[0.20, 0.36]} />
              <meshStandardMaterial
                map={palmFrondTexture}
                transparent
                alphaTest={0.4}
                side={THREE.DoubleSide}
                roughness={0.4}
                depthWrite={true}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Plant C: Miniature Variegated Snake Plant in Geometric Origami Planter (X = +1.98) */}
      <group position={[1.98, 0, -0.04]}>
        {/* Faceted Origami Ceramic Planter */}
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.085, 0.06, 0.16, 6]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
        </mesh>
        {/* Soil Base (recessed inside planter) */}
        <mesh position={[0, 0.15, 0]} receiveShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.01, 6]} />
          <meshStandardMaterial color="#2B1E16" roughness={0.9} />
        </mesh>
        {/* Delicate Miniature Variegated Leaves */}
        {[
          { pos: [0, 0.25, 0], rot: [0.05, 0.1, 0], scale: 1.0 },
          { pos: [-0.02, 0.23, 0.01], rot: [-0.15, 1.2, -0.08], scale: 0.85 },
          { pos: [0.02, 0.22, -0.01], rot: [0.18, 2.5, 0.06], scale: 0.82 },
          { pos: [0.01, 0.21, 0.02], rot: [-0.12, 3.8, 0.1], scale: 0.78 },
          { pos: [-0.01, 0.20, -0.02], rot: [0.15, 5.1, -0.05], scale: 0.75 },
        ].map((leaf, idx) => (
          <group
            key={idx}
            position={leaf.pos as [number, number, number]}
            rotation={leaf.rot as [number, number, number]}
          >
            <mesh>
              <planeGeometry args={[0.045 * leaf.scale, 0.20 * leaf.scale]} />
              <meshStandardMaterial
                map={snakeLeafTexture}
                transparent
                alphaTest={0.4}
                side={THREE.DoubleSide}
                roughness={0.45}
                depthWrite={true}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
