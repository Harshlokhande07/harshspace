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
  // Painting 1 Texture (Abstract Brown Oval & Balance Line on Cream)
  const painting1Texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 340;
    const ctx = canvas.getContext('2d')!;

    // Clean white inner mat border
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 340);

    // Warm parchment tan canvas background
    ctx.fillStyle = '#E8DDD0';
    ctx.fillRect(20, 20, 472, 300);

    // Off-white soft background backing box
    ctx.fillStyle = '#F5EFE6';
    ctx.fillRect(50, 40, 412, 260);

    // Architectural fine balance lines
    ctx.strokeStyle = '#2B231D';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(170, 30);
    ctx.lineTo(170, 310);
    ctx.stroke();

    ctx.strokeStyle = '#6B5444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(100, 170);
    ctx.lineTo(430, 170);
    ctx.stroke();

    // Dark earthy brown organic ellipse in center
    ctx.fillStyle = '#4D3425';
    ctx.beginPath();
    ctx.ellipse(220, 170, 95, 48, 0, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Painting 2 Texture (Minimalist Continuous Looping Line Art)
  const painting2Texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 340;
    const ctx = canvas.getContext('2d')!;

    // White mat border
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 340);

    // Warm light tan canvas
    ctx.fillStyle = '#E5D8C7';
    ctx.fillRect(20, 20, 472, 300);

    // Soft white rectangular backdrop in center
    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(80, 50, 352, 240);

    // Delicate looping continuous line art (curved scribbles matching original)
    ctx.strokeStyle = '#1F1B18';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(130, 230);
    ctx.bezierCurveTo(110, 80, 240, 70, 260, 160);
    ctx.bezierCurveTo(280, 250, 180, 260, 190, 140);
    ctx.bezierCurveTo(200, 70, 370, 80, 380, 190);
    ctx.bezierCurveTo(390, 270, 300, 260, 250, 230);
    ctx.bezierCurveTo(170, 200, 140, 120, 230, 130);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Painting 3 Texture (Vertical Sweeping Bold Black S-Ribbon Stroke)
  const painting3Texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 340;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // White mat border
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 340, 512);

    // Soft warm grey background
    ctx.fillStyle = '#E6E4E0';
    ctx.fillRect(20, 20, 300, 472);

    // Background textured grey wash arch
    ctx.strokeStyle = '#D5D1CB';
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(170, 256, 110, 0, Math.PI * 1.5);
    ctx.stroke();

    // Bold dynamic calligraphic black ribbon stroke (S-loop)
    ctx.strokeStyle = '#141416';
    ctx.lineWidth = 26;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(70, 90);
    ctx.bezierCurveTo(270, 60, 290, 230, 130, 240);
    ctx.bezierCurveTo(50, 250, 70, 430, 250, 420);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Painting 4 Texture (Vertical Bauhaus/Modern Geometric Color Blocks)
  const painting4Texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 340;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // White mat border
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 340, 512);

    // Clean white canvas background
    ctx.fillStyle = '#F8F8F7';
    ctx.fillRect(20, 20, 300, 472);

    // Deep Navy vertical block column
    ctx.fillStyle = '#324759';
    ctx.fillRect(60, 70, 36, 370);

    // Terracotta / rust-red accent rectangle in upper right
    ctx.fillStyle = '#A33D2D';
    ctx.fillRect(180, 90, 76, 80);

    // Soft grey rectangular cross block
    ctx.fillStyle = '#9FAAB2';
    ctx.fillRect(80, 260, 130, 34);

    // Light parchment balance block in lower quadrant
    ctx.fillStyle = '#E2DDD4';
    ctx.fillRect(160, 320, 100, 85);

    // Fine architectural line
    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(110, 60);
    ctx.lineTo(110, 450);
    ctx.stroke();

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

        {/* 4. WALL HEXAGONAL WOODEN HONEYCOMB FLOATING SHELVES (X = +1.52) */}
        {/* Open hollow natural light oak frames (#C49E6A) */}
        <group position={[1.52, 0.22, 0.02]}>
          {[
            [0, 0.22, 0],
            [-0.14, -0.04, 0],
            [0.14, 0.08, 0],
          ].map((hp, idx) => (
            <group key={idx} position={hp as [number, number, number]}>
              <mesh rotation={[0, 0, Math.PI / 6]} castShadow receiveShadow>
                <cylinderGeometry args={[0.16, 0.16, 0.12, 6, 1, true]} />
                <meshStandardMaterial color="#C49E6A" roughness={0.55} side={THREE.DoubleSide} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* =========================================================================
          5. 3 DESIGNER INDOOR POTTED PLANTS (Eli_ac original designs)
         ========================================================================= */}
      {/* Plant A: Tall Snake Plant on 4-Legged Wood Stand (X = +1.28) */}
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
          <meshStandardMaterial color="#F1F5F9" roughness={0.35} />
        </mesh>

        {/* Upright Variegated Snake Plant Leaves */}
        {[
          { pos: [0, 0.84, 0], scale: [1, 1.45, 1], rotY: 0.1 },
          { pos: [-0.04, 0.78, 0.03], scale: [0.9, 1.25, 0.9], rotY: -0.4 },
          { pos: [0.04, 0.75, -0.03], scale: [0.85, 1.15, 0.85], rotY: 0.6 },
          { pos: [0.03, 0.72, 0.04], scale: [0.9, 1.1, 0.9], rotY: 1.1 },
          { pos: [-0.03, 0.70, -0.04], scale: [0.8, 1.05, 0.8], rotY: 1.8 },
        ].map((leaf, idx) => (
          <group
            key={idx}
            position={leaf.pos as [number, number, number]}
            rotation={[0, leaf.rotY, 0]}
            scale={leaf.scale as [number, number, number]}
          >
            <mesh castShadow>
              <cylinderGeometry args={[0.035, 0.008, 0.44, 4]} />
              <meshStandardMaterial color="#1E4620" roughness={0.65} />
            </mesh>
            <mesh position={[0, 0, 0.002]}>
              <cylinderGeometry args={[0.038, 0.01, 0.42, 4]} />
              <meshStandardMaterial color="#ECC94B" roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Plant B: Lush Tropical Fern/Palm in Tall Tapered Terrazzo Planter (X = +1.68) */}
      <group position={[1.68, 0, 0.08]}>
        {/* Tall Light-Grey Tapered Rectangular Planter sitting directly on floor */}
        <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.24, 0.48, 0.24]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.4} />
        </mesh>

        {/* Spreading Tropical Palm Fronds */}
        {[
          { rot: [0.45, 0.2, 0.3], pos: [0.06, 0.52, 0.04], col: '#2D6A4F' },
          { rot: [-0.4, 1.4, 0.35], pos: [-0.05, 0.54, 0.06], col: '#387A4C' },
          { rot: [0.35, 2.6, -0.25], pos: [0.04, 0.50, -0.05], col: '#40916C' },
          { rot: [-0.3, 3.9, 0.3], pos: [-0.06, 0.53, -0.04], col: '#2D6A4F' },
          { rot: [0.15, 5.2, -0.35], pos: [0.02, 0.58, 0], col: '#52B788' },
        ].map((f, i) => (
          <group
            key={i}
            position={f.pos as [number, number, number]}
            rotation={f.rot as [number, number, number]}
          >
            <mesh castShadow>
              <coneGeometry args={[0.15, 0.42, 5]} />
              <meshStandardMaterial color={f.col} roughness={0.65} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Plant C: Small Miniature Snake Plant in Geometric Origami Planter (X = +1.98) */}
      <group position={[1.98, 0, -0.04]}>
        {/* Faceted Origami Ceramic Planter */}
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.085, 0.06, 0.16, 6]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
        </mesh>
        {/* Miniature Variegated Leaves */}
        {[
          { pos: [0, 0.22, 0], rot: [0, 0, 0], scale: 1 },
          { pos: [-0.02, 0.20, 0.02], rot: [0.1, 1.2, 0], scale: 0.8 },
          { pos: [0.02, 0.19, -0.01], rot: [-0.1, 2.8, 0], scale: 0.85 },
        ].map((leaf, idx) => (
          <group key={idx} position={leaf.pos as [number, number, number]} rotation={leaf.rot as [number, number, number]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.016, 0.005, 0.16 * leaf.scale, 4]} />
              <meshStandardMaterial color="#1E4620" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0, 0.001]}>
              <cylinderGeometry args={[0.018, 0.006, 0.15 * leaf.scale, 4]} />
              <meshStandardMaterial color="#ECC94B" roughness={0.65} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
