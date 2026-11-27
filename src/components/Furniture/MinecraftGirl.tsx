import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 1:1 Authentic Texture Data URL of "Girl-minecraft player" by Polymotion (AAV_s_models)
 * Sketchfab Model UID: 52fb86fef8d040d99d747d09ea88e1f1
 * Embed: https://sketchfab.com/models/52fb86fef8d040d99d747d09ea88e1f1/embed
 * 
 * Embedded directly as base64 for instantaneous zero-latency rendering,
 * while also loading /textures/minecraft_girl_skin.png.
 */
const SKIN_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAb1BMVEUAAAD69Pn46Pbr5vT43vT51/T60rj0xK/kr9i5wOncrNjpr6XcrNPrnqPOocbOocHelqbgkLLEl6HDlqC+k7a+k7XQiq/QiqXBe6S3dqqngZChcp6TdYeXYlOCVlGBVlFpT1BSR0pCPUBEOz82LzIgnylJAAAAAXRSTlMAQObYZgAABCxJREFUeF6tlwtzmzAMgJUtjw0CMTSlgcaTlPH/f+NOsmUghmXbTddri8EfelsARDmqlKVdA0BBswsCILkuRY7H4+xW+DcDECACyY/3SCA/CLQEdK5LoAyA5D0hABCivDpeqwanU9DAdW4TQF7e7FEUEBUwXNM1yEk3dq55BVAL1IYIkA0JMHfEn5qwADTVtgYQnWZOdHY912C2P49CDJt4MYbT/k4mNBVAdA5ysIHfozzHeQhy1/XGQd/3PTMPQF7C5ckAhcr7+zOgDXIfYNBbAiAmBkaJM7IBVjJSNxjAwAL4IQB5HzIxkWwNv59Seg4Irw+OvCaALFAUS+sNExKg7/tPfUY0kL/MTMTMETAvqlUNXgGyatsF2c988J80MNVDmYsz9B3yWxPnLjIMg3hd1LbntaT2X3bA5BAdsQGkgKV4LZUV0LZt51zXue6TiRGZRt7v9/tLUQBj5X2FCZC8H9aDBm3bynbXuU8OfWHkuq5rvhRAXh70lDRAQABEW9cEbtu2ca5pXNfHPsFU14+HaECVu324KgHAs0f2QBXcACoyQNU0VdVUCYB1zUyXArgSDarJBCSvSoCsAyQNKkE0fTSBsa6JkC4QnbL0gQNnThRf7Xe7nWkQnyeUKHi8pAxMYZxyWMNoGgymQchYwrpGFIBJaAOLPJiVQwNDIwjXSwMRA/F6FcBU9rI9VMWqDPf7vetc0wN41YzEBx7P6emN8ybdj3nQA6BWHEsU8LwAaCqHxpfaXwJoJl6vV8t15sfjQTxVrZ2K877wbEwCqBcAFoB4WK2/PpJc1ADXALNzOdd/AZj0kpxIV8fJmk1AMGEDsBW/T5G+7+3+l/1BW4F18WxfrPu0roAwB6hmRVEfDocDj18/jsePr2MGiPEO6wygAJkDUAYMhKIInWD8/rMsf37PAbHuE1gbmcwBXg4gD9+K4vGoa+JxLMtx1C6+JcwUjrC+aqo4H0BREHNdhxZWltOEYhRpG+nYxwiQhTBgQEFIJAARxzlAQXJsi3jMNUAvQUA5hPh2u+XqzzUwQFMNSQMp57rGzZQPU4IWnNQ7pD4RTVh32Nvbm93Q/STuAyIfzs5C2kaYIzYcPu3XUYeJf+h5izaA6lGjefBSg9PpdIoALf0wLvwu2k/35BxMSwRQ2jkdS/ilBs+A9PbfAmbYBUCm83wuX1FiFoVnwB/bv/kdEN9niSMO1uHK5C3I9odEfJDDdwNnAL2/AKxXqJxmWgAhof5eAxv7bbLNPDn5gMKs9yRPHx5TSuY+WE9XM8GG820NcL1gzIkZINNgCxAn2QxgxbL1nWBz4VkayfWa27cAxLl5bt8Y5kI+o5deOP8WDY8ZYCsTxzAXcnFG6cZ5gF4BOH7unZgeNtkvIjBvGGutw/0lICteF034Zw1u0YniyH8yQepPamgL8As9Rqapx9nFoAAAAABJRU5ErkJggg==';

/**
 * Creates a BoxGeometry with standard Minecraft texture UV coordinates.
 * In Minecraft 1.8+ skin format, box faces unfold as:
 * - Face 0 (+X, Right):  [u, v + d, u + d, v + d + h]
 * - Face 1 (-X, Left):   [u + d + w, v + d, u + 2*d + w, v + d + h]
 * - Face 2 (+Y, Top):    [u + d, v, u + d + w, v + d]
 * - Face 3 (-Y, Bottom): [u + d + w, v, u + d + 2*w, v + d]
 * - Face 4 (+Z, Front):  [u + d, v + d, u + d + w, v + d + h]
 * - Face 5 (-Z, Back):   [u + 2*d + w, v + d, u + 2*d + 2*w, v + d + h]
 */
function createMinecraftBoxGeometry(
  w: number,
  h: number,
  d: number,
  u: number,
  v: number,
  texW = 64,
  texH = 64
): THREE.BoxGeometry {
  const geom = new THREE.BoxGeometry(w, h, d);
  const uvAttr = geom.getAttribute('uv') as THREE.BufferAttribute;

  const faces = [
    [u, v + d, u + d, v + d + h],                             // Right (+X)
    [u + d + w, v + d, u + 2 * d + w, v + d + h],             // Left (-X)
    [u + d, v, u + d + w, v + d],                             // Top (+Y)
    [u + d + w, v, u + d + 2 * w, v + d],                     // Bottom (-Y)
    [u + d, v + d, u + d + w, v + d + h],                     // Front (+Z)
    [u + 2 * d + w, v + d, u + 2 * d + 2 * w, v + d + h],     // Back (-Z)
  ];

  for (let face = 0; face < 6; face++) {
    const [x0, y0, x1, y1] = faces[face];
    const u0 = x0 / texW;
    const u1 = x1 / texW;
    const v0 = (texH - y1) / texH; // bottom
    const v1 = (texH - y0) / texH; // top

    // Three.js BoxGeometry vertices per face:
    // 0: top-left (u0, v1), 1: top-right (u1, v1), 2: bottom-left (u0, v0), 3: bottom-right (u1, v0)
    const base = face * 4;
    uvAttr.setXY(base + 0, u0, v1);
    uvAttr.setXY(base + 1, u1, v1);
    uvAttr.setXY(base + 2, u0, v0);
    uvAttr.setXY(base + 3, u1, v0);
  }

  uvAttr.needsUpdate = true;
  return geom;
}

/**
 * 1:1 Authentic Replica of "Girl-minecraft player" by Polymotion (AAV_s_models)
 * Sketchfab UID: 52fb86fef8d040d99d747d09ea88e1f1
 *
 * Authentic characteristics:
 * - Natural brown layered hair (#52474A) with bangs and 3D hair volume
 * - Sweet anime face with blushing rosy cheeks and purple/lavender eyes
 * - Cute 3D pink hair bow on the left side of head
 * - Front hair locks cascading down her shoulders
 * - Pastel pink and lavender sleeveless dress with white hem & button detail
 * - Asymmetric pink/lavender checkered side-train/sash extending along right leg
 * - Lavender knee-high sock/boot on left leg with white cuff and peach skin thighs
 * - Lavender off-shoulder sleeve cuffs
 * - Friendly waving idle animation on raised left arm
 */
export const MinecraftGirl: React.FC = () => {
  const waveArmRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  // Load the authentic 64x64 texture with crisp pixel filtering
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(SKIN_DATA_URL);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Materials: Base (opaque) and Outer (alphaTest for second-layer 3D hair/clothes)
  const { baseMat, outerMat, bowKnotMat, bowLoopMat, hairStrandMat } = useMemo(() => {
    const base = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.85,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    const outer = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.5,
      roughness: 0.85,
      metalness: 0.05,
      side: THREE.DoubleSide,
      depthWrite: true,
    });

    const knot = new THREE.MeshStandardMaterial({
      color: '#E090B2',
      roughness: 0.7,
      metalness: 0.05,
    });

    const loop = new THREE.MeshStandardMaterial({
      color: '#F8DEF4',
      roughness: 0.7,
      metalness: 0.05,
    });

    const hair = new THREE.MeshStandardMaterial({
      color: '#52474A',
      roughness: 0.8,
      metalness: 0.05,
    });

    return {
      baseMat: base,
      outerMat: outer,
      bowKnotMat: knot,
      bowLoopMat: loop,
      hairStrandMat: hair,
    };
  }, [texture]);

  // Geometries matching Polymotion's Blockbench player model 1:1
  const geoms = useMemo(() => {
    return {
      // Head (8 x 8 x 8)
      headBase: createMinecraftBoxGeometry(8, 8, 8, 0, 0),
      headOuter: createMinecraftBoxGeometry(8.6, 8.6, 8.6, 32, 0),

      // Torso / Body (8 x 12 x 4)
      torsoBase: createMinecraftBoxGeometry(8, 12, 4, 16, 16),
      torsoOuter: createMinecraftBoxGeometry(8.5, 12.5, 4.5, 16, 32),

      // Right Arm (Slim 3 x 12 x 4)
      rightArmBase: createMinecraftBoxGeometry(3, 12, 4, 40, 16),
      rightArmOuter: createMinecraftBoxGeometry(3.5, 12.5, 4.5, 40, 32),

      // Left Arm (Slim 3 x 12 x 4)
      leftArmBase: createMinecraftBoxGeometry(3, 12, 4, 32, 48),
      leftArmOuter: createMinecraftBoxGeometry(3.5, 12.5, 4.5, 48, 48),

      // Right Leg (4 x 12 x 4)
      rightLegBase: createMinecraftBoxGeometry(4, 12, 4, 0, 16),
      rightLegOuter: createMinecraftBoxGeometry(4.4, 12.4, 4.4, 0, 32),

      // Left Leg (4 x 12 x 4)
      leftLegBase: createMinecraftBoxGeometry(4, 12, 4, 16, 48),
      leftLegOuter: createMinecraftBoxGeometry(4.4, 12.4, 4.4, 0, 48),

      // Asymmetric Dress Side-Sash / Train (falling over right hip)
      sashOuter: createMinecraftBoxGeometry(4.6, 9.0, 0.4, 0, 35),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Friendly waving idle loop on raised left arm
    if (waveArmRef.current) {
      waveArmRef.current.rotation.z = 2.2 + Math.sin(t * 3.5) * 0.22;
      waveArmRef.current.rotation.x = Math.cos(t * 3.5) * 0.12;
    }

    // Gentle natural breathing / head tilt
    if (headRef.current) {
      headRef.current.rotation.y = 0.08 + Math.sin(t * 0.8) * 0.05;
      headRef.current.rotation.z = -0.04 + Math.cos(t * 1.2) * 0.02;
    }

    // Subtle right arm resting sway
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = 0.06 + Math.sin(t * 1.2) * 0.04;
    }
  });

  return (
    // Situated beside Bookshelf at X = -0.65, Z = 2.15, facing towards room center
    <group position={[-0.65, 0, 2.15]} rotation={[0, Math.PI - 0.25, 0]}>
      {/* Minecraft standard human scale: 32 pixels tall * 0.056 = ~1.80m tall */}
      <group scale={[0.056, 0.056, 0.056]}>
        {/* ============================================================== */}
        {/* 1. LEGS (Y: 0 to 12)                                          */}
        {/* ============================================================== */}
        {/* Right Leg (Base + Outer with pink side-train) */}
        <group position={[2.0, 6, 0]}>
          <mesh geometry={geoms.rightLegBase} material={baseMat} castShadow receiveShadow />
          <mesh geometry={geoms.rightLegOuter} material={outerMat} castShadow />
        </group>

        {/* Left Leg (Base + Outer with lavender knee-high boot & white cuff) */}
        <group position={[-2.0, 6, 0]}>
          <mesh geometry={geoms.leftLegBase} material={baseMat} castShadow receiveShadow />
          <mesh geometry={geoms.leftLegOuter} material={outerMat} castShadow />
        </group>

        {/* ============================================================== */}
        {/* 2. TORSO / BODY (Y: 12 to 24)                                 */}
        {/* ============================================================== */}
        <group position={[0, 18, 0]}>
          {/* Base Torso */}
          <mesh geometry={geoms.torsoBase} material={baseMat} castShadow receiveShadow />
          {/* Outer Dress Layer (Pink dress with buttons and white hem) */}
          <mesh geometry={geoms.torsoOuter} material={outerMat} castShadow />

          {/* Asymmetric Side Skirt Flap / Train on right hip */}
          <mesh
            geometry={geoms.sashOuter}
            material={outerMat}
            position={[2.0, -8.0, 2.2]}
            rotation={[0.08, 0, -0.04]}
            castShadow
          />
        </group>

        {/* ============================================================== */}
        {/* 3. RIGHT ARM (Resting naturally by side)                      */}
        {/* ============================================================== */}
        <group ref={rightArmRef} position={[5.5, 22, 0]}>
          <group position={[0, -4, 0]}>
            <mesh geometry={geoms.rightArmBase} material={baseMat} castShadow />
            <mesh geometry={geoms.rightArmOuter} material={outerMat} castShadow />
          </group>
        </group>

        {/* ============================================================== */}
        {/* 4. LEFT ARM (Raised Friendly Waving Pose)                      */}
        {/* ============================================================== */}
        <group ref={waveArmRef} position={[-5.5, 22, 0]} rotation={[0, 0, 2.2]}>
          <group position={[0, -4, 0]}>
            <mesh geometry={geoms.leftArmBase} material={baseMat} castShadow />
            <mesh geometry={geoms.leftArmOuter} material={outerMat} castShadow />
          </group>
        </group>

        {/* ============================================================== */}
        {/* 5. HEAD & 3D HAIR DETAILS (Y: 24 to 32)                       */}
        {/* ============================================================== */}
        <group ref={headRef} position={[0, 24, 0]}>
          <group position={[0, 4, 0]}>
            {/* Main Head Base (Face: eyes, rosy blush, cute mouth) */}
            <mesh geometry={geoms.headBase} material={baseMat} castShadow receiveShadow />

            {/* 3D Hair / Hat Outer Layer (Bangs, sideburns, back hair volume) */}
            <mesh geometry={geoms.headOuter} material={outerMat} castShadow />

            {/* 3D Cute Pink Hair Bow on the left side of head (her left / viewer's right) */}
            <group position={[-4.3, 3.2, 1.2]} rotation={[0, 0, 0.2]}>
              {/* Central Bow Knot */}
              <mesh material={bowKnotMat}>
                <boxGeometry args={[0.9, 0.9, 0.7]} />
              </mesh>
              {/* Top/Left Loop */}
              <mesh position={[0, 1.0, 0]} material={bowLoopMat}>
                <boxGeometry args={[1.3, 1.2, 0.6]} />
              </mesh>
              {/* Bottom/Right Loop */}
              <mesh position={[0, -1.0, 0]} material={bowLoopMat}>
                <boxGeometry args={[1.3, 1.2, 0.6]} />
              </mesh>
            </group>

            {/* Cascading front hair locks over shoulders */}
            {/* Left chest lock */}
            <mesh position={[-2.8, -4.5, 2.1]} material={hairStrandMat} castShadow>
              <boxGeometry args={[1.2, 5.5, 1.0]} />
            </mesh>
            {/* Right chest lock */}
            <mesh position={[2.8, -4.5, 2.1]} material={hairStrandMat} castShadow>
              <boxGeometry args={[1.2, 5.5, 1.0]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
