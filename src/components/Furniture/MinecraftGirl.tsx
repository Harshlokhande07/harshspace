import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 1:1 Authentic Replica of "Minecraft girl" by ash1156 (Sketchfab UID: dff1e252dd6d4056948da57d4a14fd29)
 * Embed URL: https://sketchfab.com/models/dff1e252dd6d4056948da57d4a14fd29/embed
 *
 * Characteristics:
 * - Beautiful anime face: warm golden tan skin, large expressive eyes with lavender/purple irises,
 *   navy pupils and sky-blue catchlights, soft rosy blush, and cute berry lips.
 * - Layered dark espresso wavy hair with 3D hair helmet volume, stepped voxel bangs, cascading front
 *   hair locks falling over both shoulders onto the chest.
 * - Distinctive cute 3D pink bow ribbon pinned on top-right of hair.
 * - Off-shoulder royal violet/purple dress with tan collarbone/shoulders, white/lavender waistband trim,
 *   and 3D skirt peplum hem.
 * - Bare tan arms with matching purple off-shoulder sleeve armbands at the shoulders.
 * - Signature Asymmetrical Legs:
 *   * Her Right Leg: Vibrant fuchsia/magenta leggings with darker knee patch & 3D outer fringe tabs.
 *   * Her Left Leg: Bare tan thigh, crisp white/silver knee cuff, and dark burgundy/plum knee-high boot
 *     with 3D outer tabs.
 * - Gentle lifelike idle animation: breathing, subtle head tilt, and natural resting arm posture.
 */
export const MinecraftGirl: React.FC = () => {
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  // 1. Procedural Face Texture (128x128 pixel-perfect Minecraft canvas)
  const faceTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Golden Peach / Tan Skin Base (#D99B72)
    ctx.fillStyle = '#D99B72';
    ctx.fillRect(0, 0, 128, 128);

    // Subtle skin pixel shading
    ctx.fillStyle = '#C8875E';
    for (let x = 0; x < 128; x += 16) {
      for (let y = 0; y < 128; y += 16) {
        if ((x + y) % 32 === 0) {
          ctx.fillRect(x, y, 16, 16);
        }
      }
    }

    // Hair bangs across forehead (Dark espresso #2B1E1C, #382723)
    ctx.fillStyle = '#2B1E1C';
    ctx.fillRect(0, 0, 128, 28);
    ctx.fillRect(0, 28, 48, 12);
    ctx.fillRect(80, 28, 48, 12);
    // Parting notch at center
    ctx.fillStyle = '#382723';
    ctx.fillRect(48, 24, 32, 8);
    ctx.fillStyle = '#44312C';
    ctx.fillRect(56, 16, 16, 12);

    // Sideburns framing cheeks
    ctx.fillStyle = '#2B1E1C';
    ctx.fillRect(0, 40, 16, 32);
    ctx.fillRect(112, 40, 16, 32);
    ctx.fillStyle = '#382723';
    ctx.fillRect(0, 72, 12, 16);
    ctx.fillRect(116, 72, 12, 16);

    // EYES: Expressive anime Minecraft eyes with lavender/purple irises
    // --- Left Eye (Viewer's Left, X: 20 to 52) ---
    // Dark eyelash top bar
    ctx.fillStyle = '#1C1311';
    ctx.fillRect(20, 48, 32, 6);
    // Eye white / sclera
    ctx.fillStyle = '#F4EDF5';
    ctx.fillRect(20, 54, 32, 16);
    // Sky-blue catchlight (inner corner)
    ctx.fillStyle = '#BAE6FD';
    ctx.fillRect(22, 54, 10, 8);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(24, 55, 6, 5);
    // Deep slate pupil
    ctx.fillStyle = '#282038';
    ctx.fillRect(32, 54, 16, 10);
    // Anime Violet / Lavender Iris across bottom
    ctx.fillStyle = '#B55AA5';
    ctx.fillRect(22, 62, 28, 8);
    ctx.fillStyle = '#9333EA';
    ctx.fillRect(30, 62, 16, 8);

    // --- Right Eye (Viewer's Right, X: 76 to 108) ---
    // Dark eyelash top bar
    ctx.fillStyle = '#1C1311';
    ctx.fillRect(76, 48, 32, 6);
    // Eye white / sclera
    ctx.fillStyle = '#F4EDF5';
    ctx.fillRect(76, 54, 32, 16);
    // Deep slate pupil
    ctx.fillStyle = '#282038';
    ctx.fillRect(80, 54, 16, 10);
    // Sky-blue catchlight (outer corner)
    ctx.fillStyle = '#BAE6FD';
    ctx.fillRect(96, 54, 10, 8);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(98, 55, 6, 5);
    // Anime Violet / Lavender Iris across bottom
    ctx.fillStyle = '#9333EA';
    ctx.fillRect(82, 62, 16, 8);
    ctx.fillStyle = '#B55AA5';
    ctx.fillRect(78, 62, 28, 8);

    // Cute Rosy anime blush under eyes
    ctx.fillStyle = '#E2829E';
    ctx.fillRect(24, 76, 24, 6);
    ctx.fillRect(80, 76, 24, 6);
    ctx.fillStyle = '#F472B6';
    ctx.fillRect(28, 77, 16, 4);
    ctx.fillRect(84, 77, 16, 4);

    // Nose shadow accent
    ctx.fillStyle = '#BE7850';
    ctx.fillRect(60, 78, 8, 4);

    // Cute soft berry lips
    ctx.fillStyle = '#B84E68';
    ctx.fillRect(58, 92, 12, 6);
    ctx.fillStyle = '#D96E8A';
    ctx.fillRect(60, 94, 8, 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // 2. Dark Brown Hair Texture (Sides / Back / Helmet)
  const hairTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#2B1E1C';
    ctx.fillRect(0, 0, 128, 128);

    // Voxel hair strand variations
    ctx.fillStyle = '#382723';
    for (let x = 0; x < 128; x += 16) {
      for (let y = 0; y < 128; y += 16) {
        if ((x + y) % 32 === 0) {
          ctx.fillRect(x, y, 16, 16);
        }
      }
    }

    ctx.fillStyle = '#44312C';
    for (let x = 16; x < 128; x += 32) {
      for (let y = 16; y < 128; y += 32) {
        ctx.fillRect(x, y, 16, 8);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // 3. Torso Front Texture: Off-shoulder Purple Dress with Tan Collarbone & Lilac Trim
  const torsoFrontTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Tan skin upper chest / collarbone
    ctx.fillStyle = '#D99B72';
    ctx.fillRect(0, 0, 128, 32);
    ctx.fillStyle = '#C8875E';
    ctx.fillRect(48, 16, 32, 6); // subtle collarbone notch

    // Royal Violet / Purple Dress Body (#853A7E)
    ctx.fillStyle = '#853A7E';
    ctx.fillRect(0, 32, 128, 76);

    // Center fold shading & highlights
    ctx.fillStyle = '#6E2C68';
    ctx.fillRect(52, 38, 24, 70);
    ctx.fillStyle = '#9B4893';
    ctx.fillRect(16, 40, 20, 60);
    ctx.fillRect(92, 40, 20, 60);

    // Dress neckline contour
    ctx.fillStyle = '#6E2C68';
    ctx.fillRect(0, 30, 128, 3);

    // Waistband trim at bottom (Light pastel lavender / white #DFC6E6)
    ctx.fillStyle = '#DFC6E6';
    ctx.fillRect(0, 108, 128, 20);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 114, 128, 8);
    ctx.fillStyle = '#B794C2';
    ctx.fillRect(0, 108, 128, 3);

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // 4. Torso Back Texture: Purple Dress Back with Lilac Trim
  const torsoBackTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Tan skin upper back
    ctx.fillStyle = '#D99B72';
    ctx.fillRect(0, 0, 128, 24);

    // Purple dress back
    ctx.fillStyle = '#853A7E';
    ctx.fillRect(0, 24, 128, 84);

    // Shading
    ctx.fillStyle = '#6E2C68';
    ctx.fillRect(56, 28, 16, 80);

    // Waistband trim
    ctx.fillStyle = '#DFC6E6';
    ctx.fillRect(0, 108, 128, 20);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 114, 128, 8);

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // 5. Her Right Leg Texture (Front) - Full Fuchsia/Magenta Leggings with Knee Patch
  const rightLegTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Vibrant Magenta / Fuchsia Base (#B33580)
    ctx.fillStyle = '#B33580';
    ctx.fillRect(0, 0, 64, 128);

    // Checkerboard fabric detail
    ctx.fillStyle = '#C43E8F';
    for (let x = 0; x < 64; x += 16) {
      for (let y = 0; y < 112; y += 16) {
        if ((x + y) % 32 === 0) {
          ctx.fillRect(x, y, 16, 16);
        }
      }
    }

    // Iconic darker magenta Knee Patch (#8A2260)
    ctx.fillStyle = '#8A2260';
    ctx.fillRect(12, 48, 40, 32);
    ctx.fillStyle = '#731B4F';
    ctx.fillRect(16, 52, 32, 24);

    // Plum shoe base at bottom
    ctx.fillStyle = '#5A1D44';
    ctx.fillRect(0, 112, 64, 16);
    ctx.fillStyle = '#421432';
    ctx.fillRect(0, 122, 64, 6);

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // 6. Her Left Leg Texture (Front) - Bare Tan Thigh + White Cuff + Plum Boot
  const leftLegTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Bare Tan Thigh (#D99B72)
    ctx.fillStyle = '#D99B72';
    ctx.fillRect(0, 0, 64, 48);
    ctx.fillStyle = '#C8875E';
    ctx.fillRect(0, 36, 64, 12);

    // White / Silver Boot Cuff (#EDE6EE)
    ctx.fillStyle = '#EDE6EE';
    ctx.fillRect(0, 48, 64, 14);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 50, 64, 8);
    ctx.fillStyle = '#D0C4D2';
    ctx.fillRect(0, 60, 64, 2);

    // Deep Burgundy / Plum Boot (#542E44)
    ctx.fillStyle = '#542E44';
    ctx.fillRect(0, 62, 64, 66);

    // Boot shading & heel
    ctx.fillStyle = '#663953';
    ctx.fillRect(16, 68, 32, 40);
    ctx.fillStyle = '#3F2233';
    ctx.fillRect(0, 114, 64, 14);

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // 7. Arm Texture: Off-shoulder Purple Armband Strap + Bare Tan Skin
  const armTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Off-shoulder Purple Sleeve Strap (#853A7E)
    ctx.fillStyle = '#853A7E';
    ctx.fillRect(0, 0, 64, 28);
    ctx.fillStyle = '#6E2C68';
    ctx.fillRect(0, 24, 64, 4);

    // Bare Tan Skin (#D99B72) down to hands
    ctx.fillStyle = '#D99B72';
    ctx.fillRect(0, 28, 64, 100);

    // Subtle shading
    ctx.fillStyle = '#C8875E';
    ctx.fillRect(0, 60, 64, 8); // Elbow crease

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Materials
  const materials = useMemo(() => {
    return {
      skin: new THREE.MeshStandardMaterial({ color: '#D99B72', roughness: 0.8 }),
      hair: new THREE.MeshStandardMaterial({ map: hairTexture, roughness: 0.85 }),
      bowKnot: new THREE.MeshStandardMaterial({ color: '#C7487A', roughness: 0.65 }),
      bowLoop: new THREE.MeshStandardMaterial({ color: '#E275A0', roughness: 0.6 }),
      dressPurple: new THREE.MeshStandardMaterial({ color: '#853A7E', roughness: 0.7 }),
      magentaLeg: new THREE.MeshStandardMaterial({ color: '#B33580', roughness: 0.7 }),
      whiteTrim: new THREE.MeshStandardMaterial({ color: '#EDE6EE', roughness: 0.5 }),
      plumBoot: new THREE.MeshStandardMaterial({ color: '#542E44', roughness: 0.75 }),
      darkHolster: new THREE.MeshStandardMaterial({ color: '#3A2016', roughness: 0.8 }),
    };
  }, [hairTexture]);

  // Subtle natural idle animation loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Gentle breathing
    if (bodyRef.current) {
      bodyRef.current.position.y = 0.68 + Math.sin(t * 1.5) * 0.004;
    }

    // Subtle head tilt
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.8) * 0.04;
      headRef.current.rotation.z = Math.cos(t * 1.1) * 0.015;
    }

    // Subtle arm sway
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = Math.sin(t * 1.2) * 0.03;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = -Math.sin(t * 1.2) * 0.03;
    }
  });

  return (
    // Situated beside Bookshelf at X = -0.65, Z = 2.15, facing directly into the room towards the visitor
    <group position={[-0.65, 0, 2.15]} rotation={[0, Math.PI - 0.25, 0]}>
      {/* Human scale Minecraft boy/girl model: total height ~1.80m */}
      {/* =========================================================================
          1. LEGS (Y: 0 to 0.68m)
          Asymmetric signature design:
          - Her Right Leg (Viewer's Left): Magenta leggings, dark knee patch & 3D tabs
          - Her Left Leg (Viewer's Right): Bare tan thigh, white cuff ring, plum boot
         ========================================================================= */}
      {/* HER RIGHT LEG (Viewer's Left: X = +0.105) */}
      <group position={[0.105, 0.34, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.19, 0.68, 0.19]} />
          <meshStandardMaterial attach="material-0" color="#B33580" roughness={0.7} />
          <meshStandardMaterial attach="material-1" color="#B33580" roughness={0.7} />
          <meshStandardMaterial attach="material-2" color="#B33580" roughness={0.7} />
          <meshStandardMaterial attach="material-3" color="#421432" roughness={0.8} />
          <meshStandardMaterial attach="material-4" map={rightLegTexture} roughness={0.7} />
          <meshStandardMaterial attach="material-5" color="#B33580" roughness={0.7} />
        </mesh>

        {/* 3D Protruding Voxel Fringe Tabs on outer side of magenta leggings */}
        <mesh position={[0.105, 0.15, 0]} material={materials.magentaLeg} castShadow>
          <boxGeometry args={[0.03, 0.07, 0.05]} />
        </mesh>
        <mesh position={[0.105, -0.02, 0]} material={materials.magentaLeg} castShadow>
          <boxGeometry args={[0.03, 0.07, 0.05]} />
        </mesh>
        <mesh position={[0.105, -0.18, 0]} material={materials.magentaLeg} castShadow>
          <boxGeometry args={[0.03, 0.07, 0.05]} />
        </mesh>

        {/* Dark hip holster tab */}
        <mesh position={[0.105, 0.28, 0.04]} material={materials.darkHolster} castShadow>
          <boxGeometry args={[0.025, 0.08, 0.06]} />
        </mesh>
      </group>

      {/* HER LEFT LEG (Viewer's Right: X = -0.105) */}
      <group position={[-0.105, 0.34, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.19, 0.68, 0.19]} />
          <meshStandardMaterial attach="material-0" color="#542E44" roughness={0.7} />
          <meshStandardMaterial attach="material-1" color="#542E44" roughness={0.7} />
          <meshStandardMaterial attach="material-2" color="#D99B72" roughness={0.8} />
          <meshStandardMaterial attach="material-3" color="#3F2233" roughness={0.8} />
          <meshStandardMaterial attach="material-4" map={leftLegTexture} roughness={0.7} />
          <meshStandardMaterial attach="material-5" color="#542E44" roughness={0.7} />
        </mesh>

        {/* 3D White Knee Cuff Ring */}
        <mesh position={[0, 0.02, 0]} material={materials.whiteTrim} castShadow>
          <boxGeometry args={[0.205, 0.04, 0.205]} />
        </mesh>

        {/* 3D Protruding Boot Tabs on outer side */}
        <mesh position={[-0.105, -0.10, 0]} material={materials.plumBoot} castShadow>
          <boxGeometry args={[0.03, 0.07, 0.05]} />
        </mesh>
        <mesh position={[-0.105, -0.22, 0]} material={materials.plumBoot} castShadow>
          <boxGeometry args={[0.03, 0.07, 0.05]} />
        </mesh>
      </group>

      {/* =========================================================================
          2. TORSO & DRESS (Y: 0.68 to 1.28m)
          Off-shoulder violet dress with white waistband trim and flared peplum
         ========================================================================= */}
      <group ref={bodyRef} position={[0, 0.98, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.40, 0.60, 0.20]} />
          <meshStandardMaterial attach="material-0" color="#853A7E" roughness={0.7} />
          <meshStandardMaterial attach="material-1" color="#853A7E" roughness={0.7} />
          <meshStandardMaterial attach="material-2" color="#D99B72" roughness={0.8} /> {/* Shoulders */}
          <meshStandardMaterial attach="material-3" color="#DFC6E6" roughness={0.6} /> {/* Waist base */}
          <meshStandardMaterial attach="material-4" map={torsoFrontTexture} roughness={0.65} /> {/* Front */}
          <meshStandardMaterial attach="material-5" map={torsoBackTexture} roughness={0.65} /> {/* Back */}
        </mesh>

        {/* 3D Flared Skirt Peplum Hem around waist */}
        <mesh position={[0, -0.26, 0]} material={materials.dressPurple} castShadow>
          <boxGeometry args={[0.425, 0.10, 0.225]} />
        </mesh>
        <mesh position={[0, -0.30, 0]} material={materials.whiteTrim} castShadow>
          <boxGeometry args={[0.43, 0.025, 0.23]} />
        </mesh>

        {/* =========================================================================
            3. ARMS (Pivot at shoulders: Y = 0.25)
           ========================================================================= */}
        {/* Her Right Arm (Viewer's Left: X = +0.29) */}
        <group ref={rightArmRef} position={[0.29, 0.25, 0]}>
          <mesh position={[0, -0.26, 0]} castShadow>
            <boxGeometry args={[0.17, 0.58, 0.17]} />
            <meshStandardMaterial attach="material-0" color="#D99B72" roughness={0.8} />
            <meshStandardMaterial attach="material-1" color="#D99B72" roughness={0.8} />
            <meshStandardMaterial attach="material-2" color="#853A7E" roughness={0.7} /> {/* Sleeve top */}
            <meshStandardMaterial attach="material-3" color="#D99B72" roughness={0.8} /> {/* Hand */}
            <meshStandardMaterial attach="material-4" map={armTexture} roughness={0.75} />
            <meshStandardMaterial attach="material-5" map={armTexture} roughness={0.75} />
          </mesh>
        </group>

        {/* Her Left Arm (Viewer's Right: X = -0.29) */}
        <group ref={leftArmRef} position={[-0.29, 0.25, 0]}>
          <mesh position={[0, -0.26, 0]} castShadow>
            <boxGeometry args={[0.17, 0.58, 0.17]} />
            <meshStandardMaterial attach="material-0" color="#D99B72" roughness={0.8} />
            <meshStandardMaterial attach="material-1" color="#D99B72" roughness={0.8} />
            <meshStandardMaterial attach="material-2" color="#853A7E" roughness={0.7} /> {/* Sleeve top */}
            <meshStandardMaterial attach="material-3" color="#D99B72" roughness={0.8} /> {/* Hand */}
            <meshStandardMaterial attach="material-4" map={armTexture} roughness={0.75} />
            <meshStandardMaterial attach="material-5" map={armTexture} roughness={0.75} />
          </mesh>
        </group>

        {/* =========================================================================
            4. HEAD & 3D HAIR LAYERS (Pivot at neck: Y = 0.30)
           ========================================================================= */}
        <group ref={headRef} position={[0, 0.30, 0]}>
          {/* Main Head Block with Anime Face directly on Front (+Z) */}
          <mesh position={[0, 0.20, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.40, 0.40, 0.40]} />
            <meshStandardMaterial attach="material-0" map={hairTexture} roughness={0.85} /> {/* Right */}
            <meshStandardMaterial attach="material-1" map={hairTexture} roughness={0.85} /> {/* Left */}
            <meshStandardMaterial attach="material-2" map={hairTexture} roughness={0.85} /> {/* Top */}
            <meshStandardMaterial attach="material-3" color="#D99B72" roughness={0.8} />      {/* Chin/Neck */}
            <meshStandardMaterial attach="material-4" map={faceTexture} roughness={0.7} />   {/* FRONT (Face) */}
            <meshStandardMaterial attach="material-5" map={hairTexture} roughness={0.85} /> {/* Back */}
          </mesh>

          {/* 3D Hair Helmet Volume (Slightly larger than head for authentic depth) */}
          <mesh position={[0, 0.22, -0.015]} material={materials.hair} castShadow>
            <boxGeometry args={[0.425, 0.41, 0.42]} />
          </mesh>

          {/* Stepped Voxel Hair Bangs extending over forehead */}
          <mesh position={[0, 0.36, 0.21]} material={materials.hair} castShadow>
            <boxGeometry args={[0.41, 0.10, 0.03]} />
          </mesh>
          <mesh position={[0.13, 0.28, 0.21]} material={materials.hair} castShadow>
            <boxGeometry args={[0.14, 0.09, 0.03]} />
          </mesh>
          <mesh position={[-0.13, 0.28, 0.21]} material={materials.hair} castShadow>
            <boxGeometry args={[0.14, 0.09, 0.03]} />
          </mesh>

          {/* Cascading 3D Front Hair Locks resting over shoulders onto chest */}
          {/* Her Right Front Lock */}
          <group position={[0.14, 0.02, 0.16]}>
            <mesh material={materials.hair} castShadow>
              <boxGeometry args={[0.07, 0.24, 0.06]} />
            </mesh>
            <mesh position={[0, -0.15, -0.01]} material={materials.hair} castShadow>
              <boxGeometry args={[0.06, 0.14, 0.05]} />
            </mesh>
          </group>

          {/* Her Left Front Lock */}
          <group position={[-0.14, 0.02, 0.16]}>
            <mesh material={materials.hair} castShadow>
              <boxGeometry args={[0.07, 0.24, 0.06]} />
            </mesh>
            <mesh position={[0, -0.15, -0.01]} material={materials.hair} castShadow>
              <boxGeometry args={[0.06, 0.14, 0.05]} />
            </mesh>
          </group>

          {/* Distinctive 3D Cute Pink Hair Bow pinned on her left hair (Viewer's Right) */}
          <group position={[-0.16, 0.38, 0.20]} rotation={[0, 0, 0.15]}>
            {/* Center knot */}
            <mesh material={materials.bowKnot} castShadow>
              <boxGeometry args={[0.045, 0.045, 0.035]} />
            </mesh>
            {/* Left bow loop */}
            <mesh position={[-0.045, 0.015, 0]} rotation={[0, 0, 0.25]} material={materials.bowLoop} castShadow>
              <boxGeometry args={[0.065, 0.055, 0.03]} />
            </mesh>
            {/* Right bow loop */}
            <mesh position={[0.045, 0.015, 0]} rotation={[0, 0, -0.25]} material={materials.bowLoop} castShadow>
              <boxGeometry args={[0.065, 0.055, 0.03]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
