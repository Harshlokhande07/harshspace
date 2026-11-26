import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * "Furniture Pack / Indoor plants and painting" by Eli_ac (Sketchfab d9f4e18bc9b34ef5a875dd102da2d68e)
 * Mounted along the extended East wall (X ~ +4.0m to +4.38m):
 * Features:
 * 1. Modern Light Pastel Teal-Blue 2-Seater Couch (#5B98AB) with tapered oak legs,
 *    cream linen throw pillow and bright chartreuse lumbar cushion.
 * 2. Brass / Bronze Standing Floor Lamp with cylindrical linen drum shade.
 * 3. 4 Modern Framed Abstract Gallery Paintings:
 *    - Painting 1: Abstract organic brown ellipse & delicate architectural line
 *    - Painting 2: Continuous minimalist line art sketch
 *    - Painting 3: Dramatic vertical black ribbon brush stroke
 *    - Painting 4: Modernist color-block geometry (terracotta, navy, slate)
 * 4. Wall Hexagonal Wooden Honeycomb Floating Shelves (trio of interlocking hexagons).
 * 5. 3 Designer Potted Indoor Plants:
 *    - Tall Snake Plant (Sansevieria) in white rectangular planter on 4-legged wooden stand
 *    - Lush Tropical Palm in white faceted ceramic planter
 *    - Compact Succulent in geometric faceted pot
 */
export const LoungeFurniturePack: React.FC = () => {
  // Painting 1 Texture (Abstract Brown Oval & Balance Line on Cream)
  const painting1Texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 340;
    const ctx = canvas.getContext('2d')!;

    // Warm parchment ivory background
    ctx.fillStyle = '#F5EFE6';
    ctx.fillRect(0, 0, 512, 340);

    // Subtle textured wash
    ctx.fillStyle = '#EDE2D4';
    ctx.fillRect(20, 20, 472, 300);

    // Architectural fine lines
    ctx.strokeStyle = '#2B231D';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(180, 20);
    ctx.lineTo(180, 320);
    ctx.stroke();

    ctx.strokeStyle = '#5C4A3E';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(250, 170);
    ctx.lineTo(440, 150);
    ctx.stroke();

    // Earthy brown organic ellipse
    ctx.fillStyle = '#5A3D2E';
    ctx.beginPath();
    ctx.ellipse(230, 170, 95, 55, -0.08, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Painting 2 Texture (Minimalist Continuous Line Art Scribble)
  const painting2Texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 340;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#F5EFE6';
    ctx.fillRect(0, 0, 512, 340);

    // Muted soft grey/tan background blocks
    ctx.fillStyle = '#E5D8C7';
    ctx.fillRect(70, 70, 170, 130);
    ctx.fillStyle = '#D9CBBA';
    ctx.fillRect(200, 110, 230, 150);

    // Flowing continuous looping line sketch
    ctx.strokeStyle = '#1F1B18';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(100, 240);
    ctx.bezierCurveTo(120, 90, 250, 80, 270, 180);
    ctx.bezierCurveTo(290, 270, 180, 280, 190, 160);
    ctx.bezierCurveTo(200, 80, 360, 90, 380, 200);
    ctx.bezierCurveTo(400, 280, 310, 260, 250, 240);
    ctx.bezierCurveTo(180, 210, 150, 130, 240, 140);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // Painting 3 Texture (Vertical Sweeping Bold Black Ribbon Stroke)
  const painting3Texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 340;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#F8F6F0';
    ctx.fillRect(0, 0, 340, 512);

    // Charcoal grey background accent arch
    ctx.strokeStyle = '#DDD5C7';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(170, 260, 120, 0, Math.PI * 1.5);
    ctx.stroke();

    // Bold dynamic calligraphic ribbon stroke
    ctx.strokeStyle = '#18181B';
    ctx.lineWidth = 28;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(80, 100);
    ctx.bezierCurveTo(260, 70, 280, 240, 120, 250);
    ctx.bezierCurveTo(60, 260, 80, 420, 240, 410);
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

    ctx.fillStyle = '#F8F6F0';
    ctx.fillRect(0, 0, 340, 512);

    // Deep Navy vertical block
    ctx.fillStyle = '#2A4365';
    ctx.fillRect(50, 80, 38, 360);

    // Slate Blue horizontal cross block
    ctx.fillStyle = '#64748B';
    ctx.fillRect(70, 270, 140, 32);

    // Terracotta Red accent square
    ctx.fillStyle = '#C53030';
    ctx.fillRect(180, 110, 70, 75);

    // Warm sand ground block
    ctx.fillStyle = '#CBD5E1';
    ctx.fillRect(140, 340, 120, 90);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  return (
    <group position={[4.05, 0, 0.10]} rotation={[0, -Math.PI / 2, 0]}>
      {/* =========================================================================
          1. MODERN LIGHT TEAL-BLUE 2-SEATER SOFA / COUCH
          (Width: 1.82m along Z, Height: 0.82m, Depth: 0.86m along X)
         ========================================================================= */}
      <group position={[0, 0, 0]}>
        {/* Sofa Base Frame */}
        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.74, 0.18, 0.82]} />
          <meshStandardMaterial color="#558C9E" roughness={0.7} />
        </mesh>

        {/* Dual Plush Seat Cushions (Left & Right) */}
        <mesh position={[-0.42, 0.41, 0.04]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.14, 0.72]} />
          <meshStandardMaterial color="#629EB0" roughness={0.75} />
        </mesh>
        <mesh position={[0.42, 0.41, 0.04]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.14, 0.72]} />
          <meshStandardMaterial color="#629EB0" roughness={0.75} />
        </mesh>

        {/* Dual Backrest Cushions */}
        <mesh position={[-0.42, 0.68, -0.28]} rotation={[0.12, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.44, 0.18]} />
          <meshStandardMaterial color="#5B94A6" roughness={0.75} />
        </mesh>
        <mesh position={[0.42, 0.68, -0.28]} rotation={[0.12, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.44, 0.18]} />
          <meshStandardMaterial color="#5B94A6" roughness={0.75} />
        </mesh>

        {/* Curved Armrests (Left & Right) */}
        <mesh position={[-0.90, 0.52, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[0.14, 0.38, 0.84]} />
          <meshStandardMaterial color="#558C9E" roughness={0.7} />
        </mesh>
        <mesh position={[0.90, 0.52, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[0.14, 0.38, 0.84]} />
          <meshStandardMaterial color="#558C9E" roughness={0.7} />
        </mesh>

        {/* Tapered Mid-Century Wooden Legs (#A67C52) */}
        {[
          [-0.78, 0.10, 0.32],
          [0.78, 0.10, 0.32],
          [-0.78, 0.10, -0.32],
          [0.78, 0.10, -0.32],
        ].map((lp, idx) => (
          <mesh
            key={idx}
            position={lp as [number, number, number]}
            rotation={[idx > 1 ? 0.18 : -0.18, 0, idx % 2 === 0 ? 0.18 : -0.18]}
            castShadow
          >
            <cylinderGeometry args={[0.02, 0.035, 0.20, 12]} />
            <meshStandardMaterial color="#A67C52" roughness={0.5} />
          </mesh>
        ))}

        {/* Cream Linen Throw Pillow on Left (#F4EFE6) */}
        <mesh position={[-0.64, 0.54, -0.12]} rotation={[0.2, 0.3, -0.1]} castShadow>
          <boxGeometry args={[0.34, 0.32, 0.12]} />
          <meshStandardMaterial color="#F4EFE6" roughness={0.9} />
        </mesh>

        {/* Chartreuse / Lime Lumbar Cushion on Right (#CCD63D) */}
        <mesh position={[0.55, 0.48, -0.16]} rotation={[0.15, -0.1, 0.05]} castShadow>
          <boxGeometry args={[0.38, 0.20, 0.12]} />
          <meshStandardMaterial color="#CCD63D" roughness={0.85} />
        </mesh>
      </group>

      {/* =========================================================================
          2. STANDING METAL FLOOR LAMP (To the left of sofa: X = -1.25)
         ========================================================================= */}
      <group position={[-1.25, 0, 0.05]}>
        {/* Heavy Circular Brass Floor Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.035, 24]} />
          <meshStandardMaterial color="#6B593C" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Slender Brass Vertical Pole */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 1.46, 16]} />
          <meshStandardMaterial color="#7A6848" roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Top Arm Collar & Bracket */}
        <mesh position={[0, 1.50, 0.06]}>
          <boxGeometry args={[0.03, 0.06, 0.14]} />
          <meshStandardMaterial color="#6B593C" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Cylindrical Drum Linen Shade */}
        <mesh position={[0, 1.38, 0.12]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.26, 24]} />
          <meshStandardMaterial
            color="#FAF7F0"
            emissive="#FEF3C7"
            emissiveIntensity={0.35}
            roughness={0.8}
          />
        </mesh>
      </group>

      {/* =========================================================================
          3. 4 MODERN FRAMED ABSTRACT GALLERY ARTWORKS
          Mounted on the East wall behind sofa (Z = -0.38)
         ========================================================================= */}
      <group position={[0, 1.62, -0.36]}>
        {/* Painting 1: Horizontal Organic Oval Art */}
        <group position={[-0.88, 0.15, 0]}>
          {/* Outer Black Frame */}
          <mesh castShadow>
            <boxGeometry args={[0.68, 0.46, 0.03]} />
            <meshStandardMaterial color="#18181B" roughness={0.4} metalness={0.4} />
          </mesh>
          {/* Canvas */}
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.62, 0.40]} />
            <meshStandardMaterial map={painting1Texture} roughness={0.7} />
          </mesh>
        </group>

        {/* Painting 2: Horizontal Continuous Line Art */}
        <group position={[-0.15, 0.15, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.68, 0.46, 0.03]} />
            <meshStandardMaterial color="#18181B" roughness={0.4} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.62, 0.40]} />
            <meshStandardMaterial map={painting2Texture} roughness={0.7} />
          </mesh>
        </group>

        {/* Painting 3: Vertical Calligraphic Ribbon Art */}
        <group position={[0.48, 0.18, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.44, 0.62, 0.03]} />
            <meshStandardMaterial color="#18181B" roughness={0.4} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.38, 0.56]} />
            <meshStandardMaterial map={painting3Texture} roughness={0.7} />
          </mesh>
        </group>

        {/* Painting 4: Vertical Geometric Color Block Art */}
        <group position={[0.98, 0.18, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.44, 0.62, 0.03]} />
            <meshStandardMaterial color="#18181B" roughness={0.4} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.38, 0.56]} />
            <meshStandardMaterial map={painting4Texture} roughness={0.7} />
          </mesh>
        </group>

        {/* 4. WALL HEXAGONAL WOODEN HONEYCOMB FLOATING SHELVES (X = +1.52) */}
        <group position={[1.52, 0.22, 0.02]}>
          {[
            [0, 0.18, 0],
            [-0.14, -0.06, 0],
            [0.14, -0.06, 0],
          ].map((hp, idx) => (
            <group key={idx} position={hp as [number, number, number]}>
              {/* Outer Hexagon Rim */}
              <mesh rotation={[0, 0, Math.PI / 6]} castShadow receiveShadow>
                <cylinderGeometry args={[0.16, 0.16, 0.12, 6, 1, true]} />
                <meshStandardMaterial color="#A88258" roughness={0.55} side={THREE.DoubleSide} />
              </mesh>
              {/* Back plate */}
              <mesh position={[0, 0, -0.05]} rotation={[0, 0, Math.PI / 6]}>
                <cylinderGeometry args={[0.155, 0.155, 0.01, 6]} />
                <meshStandardMaterial color="#8C663E" roughness={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* =========================================================================
          5. 3 DESIGNER INDOOR POTTED PLANTS (Arranged to right of sofa)
         ========================================================================= */}
      {/* Plant A: Tall Snake Plant (Sansevieria) on 4-Legged Wood Stand (X = +1.28) */}
      <group position={[1.28, 0, 0.12]}>
        {/* 4-Legged Natural Wood Stand */}
        <group position={[0, 0.18, 0]}>
          {/* Wood cross bar */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.26, 0.025, 0.035]} />
            <meshStandardMaterial color="#967046" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.035, 0.025, 0.26]} />
            <meshStandardMaterial color="#967046" roughness={0.5} />
          </mesh>
          {/* 4 Round Legs */}
          {[
            [-0.11, 0, 0.11],
            [0.11, 0, 0.11],
            [-0.11, 0, -0.11],
            [0.11, 0, -0.11],
          ].map((pos, i) => (
            <mesh key={i} position={pos as [number, number, number]} castShadow>
              <cylinderGeometry args={[0.014, 0.014, 0.36, 12]} />
              <meshStandardMaterial color="#967046" roughness={0.5} />
            </mesh>
          ))}
        </group>

        {/* Tall Tapered White Ceramic Planter */}
        <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.38, 0.22]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.35} />
        </mesh>

        {/* Upright Variegated Snake Plant Leaves */}
        {[
          { pos: [0, 0.82, 0], scale: [1, 1.4, 1], rotY: 0.1 },
          { pos: [-0.04, 0.76, 0.03], scale: [0.9, 1.2, 0.9], rotY: -0.4 },
          { pos: [0.04, 0.74, -0.03], scale: [0.85, 1.15, 0.85], rotY: 0.6 },
          { pos: [0.03, 0.72, 0.04], scale: [0.9, 1.1, 0.9], rotY: 1.1 },
          { pos: [-0.03, 0.70, -0.04], scale: [0.8, 1.05, 0.8], rotY: 1.8 },
        ].map((leaf, idx) => (
          <group
            key={idx}
            position={leaf.pos as [number, number, number]}
            rotation={[0, leaf.rotY, 0]}
            scale={leaf.scale as [number, number, number]}
          >
            {/* Dark green sword leaf core */}
            <mesh castShadow>
              <cylinderGeometry args={[0.035, 0.008, 0.44, 4]} />
              <meshStandardMaterial color="#22543D" roughness={0.65} />
            </mesh>
            {/* Gold/Yellow variegation outer margin */}
            <mesh position={[0, 0, 0.002]}>
              <cylinderGeometry args={[0.038, 0.01, 0.42, 4]} />
              <meshStandardMaterial color="#EAB308" roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Plant B: Lush Tropical Fan Palm in White Faceted Planter (X = +1.68) */}
      <group position={[1.68, 0, 0.08]}>
        {/* White Faceted Tapered Planter */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.09, 0.44, 8]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.35} />
        </mesh>

        {/* Spreading Tropical Palm Fronds */}
        {[
          { rot: [0.45, 0.2, 0.3], pos: [0.06, 0.48, 0.04], col: '#2D6A4F' },
          { rot: [-0.4, 1.4, 0.35], pos: [-0.05, 0.50, 0.06], col: '#387A4C' },
          { rot: [0.35, 2.6, -0.25], pos: [0.04, 0.46, -0.05], col: '#40916C' },
          { rot: [-0.3, 3.9, 0.3], pos: [-0.06, 0.49, -0.04], col: '#2D6A4F' },
          { rot: [0.15, 5.2, -0.35], pos: [0.02, 0.54, 0], col: '#52B788' },
        ].map((f, i) => (
          <group
            key={i}
            position={f.pos as [number, number, number]}
            rotation={f.rot as [number, number, number]}
          >
            <mesh castShadow>
              <coneGeometry args={[0.14, 0.38, 5]} />
              <meshStandardMaterial color={f.col} roughness={0.65} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Plant C: Small Succulent in Geometric Hexagonal Planter (X = +1.98) */}
      <group position={[1.98, 0, -0.04]}>
        {/* Geometric Faceted Hexagonal Planter */}
        <mesh position={[0, 0.07, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.05, 0.14, 6]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.4} />
        </mesh>
        {/* Compact Rosette Succulent */}
        <mesh position={[0, 0.16, 0]} castShadow>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshStandardMaterial color="#3D7A5A" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
};
