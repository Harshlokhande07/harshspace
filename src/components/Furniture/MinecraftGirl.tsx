import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 1:1 Authentic Texture Data URL of "Girl-minecraft player" by Polymotion (AAV_s_models)
 * Sketchfab UID: 52fb86fef8d040d99d747d09ea88e1f1
 * Embed: https://sketchfab.com/models/52fb86fef8d040d99d747d09ea88e1f1/embed
 */
const SKIN_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAb1BMVEUAAAD69Pn46Pbr5vT43vT51/T60rj0xK/kr9i5wOncrNjpr6XcrNPrnqPOocbOocHelqbgkLLEl6HDlqC+k7a+k7XQiq/QiqXBe6S3dqqngZChcp6TdYeXYlOCVlGBVlFpT1BSR0pCPUBEOz82LzIgnylJAAAAAXRSTlMAQObYZgAABCxJREFUeF6tlwtzmzAMgJUtjw0CMTSlgcaTlPH/f+NOsmUghmXbTddri8EfelsARDmqlKVdA0BBswsCILkuRY7H4+xW+DcDECACyY/3SCA/CLQEdK5LoAyA5D0hABCivDpeqwanU9DAdW4TQF7e7FEUEBUwXNM1yEk3dq55BVAL1IYIkA0JMHfEn5qwADTVtgYQnWZOdHY912C2P49CDJt4MYbT/k4mNBVAdA5ysIHfozzHeQhy1/XGQd/3PTMPQF7C5ckAhcr7+zOgDXIfYNBbAiAmBkaJM7IBVjJSNxjAwAL4IQB5HzIxkWwNv59Seg4Irw+OvCaALFAUS+sNExKg7/tPfUY0kL/MTMTMETAvqlUNXgGyatsF2c988J80MNVDmYsz9B3yWxPnLjIMg3hd1LbntaT2X3bA5BAdsQGkgKV4LZUV0LZt51zXue6TiRGZRt7v9/tLUQBj5X2FCZC8H9aDBm3bynbXuU8OfWHkuq5rvhRAXh70lDRAQABEW9cEbtu2ca5pXNfHPsFU14+HaECVu324KgHAs0f2QBXcACoyQNU0VdVUCYB1zUyXArgSDarJBCSvSoCsAyQNKkE0fTSBsa6JkC4QnbL0gQNnThRf7Xe7nWkQnyeUKHi8pAxMYZxyWMNoGgymQchYwrpGFIBJaAOLPJiVQwNDIwjXSwMRA/F6FcBU9rI9VMWqDPf7vetc0wN41YzEBx7P6emN8ybdj3nQA6BWHEsU8LwAaCqHxpfaXwJoJl6vV8t15sfjQTxVrZ2K877wbEwCqBcAFoB4WK2/PpJc1ADXALNzOdd/AZj0kpxIV8fJmk1AMGEDsBW/T5G+7+3+l/1BW4F18WxfrPu0roAwB6hmRVEfDocDj18/jsePr2MGiPEO6wygAJkDUAYMhKIInWD8/rMsf37PAbHuE1gbmcwBXg4gD9+K4vGoa+JxLMtx1C6+JcwUjrC+aqo4H0BREHNdhxZWltOEYhRpG+nYxwiQhTBgQEFIJAARxzlAQXJsi3jMNUAvQUA5hPh2u+XqzzUwQFMNSQMp57rGzZQPU4IWnNQ7pD4RTVh32Nvbm93Q/STuAyIfzs5C2kaYIzYcPu3XUYeJf+h5izaA6lGjefBSg9PpdIoALf0wLvwu2k/35BxMSwRQ2jkdS/ilBs+A9PbfAmbYBUCm83wuX1FiFoVnwB/bv/kdEN9niSMO1uHK5C3I9odEfJDDdwNnAL2/AKxXqJxmWgAhof5eAxv7bbLNPDn5gMKs9yRPHx5TSuY+WE9XM8GG820NcL1gzIkZINNgCxAn2QxgxbL1nWBz4VkayfWa27cAxLl5bt8Y5kI+o5deOP8WDY8ZYCsTxzAXcnFG6cZ5gF4BOH7unZgeNtkvIjBvGGutw/0lICteF034Zw1u0YniyH8yQepPamgL8As9Rqapx9nFoAAAAABJRU5ErkJggg==';

/**
 * Creates a BoxGeometry with custom pixel UV coordinates for each of the 6 faces:
 * Face 0 (+X, Right)
 * Face 1 (-X, Left)
 * Face 2 (+Y, Top)
 * Face 3 (-Y, Bottom)
 * Face 4 (+Z, Front) -> The front face facing the viewer
 * Face 5 (-Z, Back)
 */
function createBoxWithFaceUVs(
  w: number,
  h: number,
  d: number,
  faces: [
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number]
  ],
  texW = 64,
  texH = 64
): THREE.BoxGeometry {
  const geom = new THREE.BoxGeometry(w, h, d);
  const uvAttr = geom.getAttribute('uv') as THREE.BufferAttribute;

  for (let face = 0; face < 6; face++) {
    const [x0, y0, x1, y1] = faces[face];
    const u0 = x0 / texW;
    const u1 = x1 / texW;
    const v0 = (texH - y1) / texH;
    const v1 = (texH - y0) / texH;

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
 * Features:
 * - Beautiful anime face directly on the front: sparkling eyes with catchlights, rosy cheeks, cute mouth
 * - Natural brown wavy hair with 3D pink ribbon bow
 * - Pastel pink and lavender sleeveless dress with white waistband trim
 * - Peach skin legs with lavender knee-high boots and white cuffs
 * - Off-shoulder sleeve cuffs with peach arms
 * - Friendly waving animation on raised left arm
 * - Correctly positioned beside the Bookshelf facing forward into the room towards the visitor
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

  // Materials
  const { skinMat, bowKnotMat, bowLoopMat, hairStrandMat } = useMemo(() => {
    const skin = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.85,
      metalness: 0.05,
      side: THREE.DoubleSide,
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
      skinMat: skin,
      bowKnotMat: knot,
      bowLoopMat: loop,
      hairStrandMat: hair,
    };
  }, [texture]);

  // Exact geometries tailored to Polymotion's texture atlas
  const geoms = useMemo(() => {
    return {
      // 1. Head (8 x 8 x 8)
      // Front Face (+Z) has the exact face: eyes, pupils, catchlights, rosy cheeks, lips at [56, 32, 64, 40]!
      head: createBoxWithFaceUVs(8, 8, 8, [
        [48, 32, 56, 40], // Right (+X)
        [56, 16, 64, 24], // Left (-X)
        [40, 0, 48, 8],   // Top (+Y)
        [8, 0, 16, 8],    // Bottom (-Y)
        [56, 32, 64, 40], // FRONT (+Z) -> Beautiful Face!
        [48, 16, 56, 24], // Back (-Z)  -> Brown Hair Back
      ]),

      // 2. Torso (8 x 12 x 4)
      // Front Face (+Z) has the pastel pink dress with white waistband trim at [40, 16, 48, 28]!
      torso: createBoxWithFaceUVs(8, 12, 4, [
        [36, 16, 40, 28], // Right (+X)
        [44, 16, 48, 28], // Left (-X)
        [40, 8, 48, 12],  // Top (+Y)
        [40, 24, 48, 28], // Bottom (-Y)
        [40, 16, 48, 28], // FRONT (+Z) -> Pink Dress & Trim!
        [32, 16, 40, 28], // Back (-Z)  -> Back of Dress
      ]),

      // 3. Right Leg (4 x 12 x 4) (Her right)
      rightLeg: createBoxWithFaceUVs(4, 12, 4, [
        [0, 52, 4, 64],
        [0, 52, 4, 64],
        [0, 48, 4, 52],
        [0, 60, 4, 64],
        [0, 52, 4, 64], // FRONT (+Z) -> Peach Skin Leg
        [0, 52, 4, 64],
      ]),

      // 4. Left Leg (4 x 12 x 4) (Her left, with lavender boot & white cuff)
      leftLeg: createBoxWithFaceUVs(4, 12, 4, [
        [4, 48, 8, 60],
        [8, 48, 12, 60],
        [4, 48, 8, 52],
        [8, 48, 12, 52],
        [8, 48, 12, 60], // FRONT (+Z) -> Lavender Knee-high Boot
        [12, 48, 16, 60],
      ]),

      // 5. Right Arm (3 x 12 x 4)
      rightArm: createBoxWithFaceUVs(3, 12, 4, [
        [36, 52, 40, 64],
        [40, 52, 44, 64],
        [36, 48, 39, 52],
        [39, 48, 42, 52],
        [40, 52, 43, 64], // FRONT (+Z) -> Lavender Cuff + Hand
        [43, 52, 46, 64],
      ]),

      // 6. Left Arm (3 x 12 x 4)
      leftArm: createBoxWithFaceUVs(3, 12, 4, [
        [44, 52, 47, 64],
        [40, 52, 43, 64],
        [44, 48, 47, 52],
        [44, 60, 47, 64],
        [44, 52, 47, 64], // FRONT (+Z) -> Waving Arm
        [40, 52, 43, 64],
      ]),

      // 7. Decorative Side Skirt Sash (Right hip)
      sash: createBoxWithFaceUVs(4.6, 8.5, 0.4, [
        [40, 20, 44, 28],
        [40, 20, 44, 28],
        [40, 20, 44, 22],
        [40, 26, 44, 28],
        [40, 20, 44, 28],
        [40, 20, 44, 28],
      ]),
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
    // Situated beside Bookshelf at X = -0.65, Z = 2.15, facing directly into the room towards the visitor
    <group position={[-0.65, 0, 2.15]} rotation={[0, Math.PI - 0.25, 0]}>
      {/* Minecraft standard human scale: 32 pixels tall * 0.056 = ~1.80m tall */}
      <group scale={[0.056, 0.056, 0.056]}>
        {/* ============================================================== */}
        {/* 1. LEGS (Y: 0 to 12)                                          */}
        {/* ============================================================== */}
        {/* Right Leg (Peach skin anime leg) */}
        <mesh position={[2.0, 6, 0]} geometry={geoms.rightLeg} material={skinMat} castShadow receiveShadow />

        {/* Left Leg (Lavender knee-high boot with white cuff) */}
        <mesh position={[-2.0, 6, 0]} geometry={geoms.leftLeg} material={skinMat} castShadow receiveShadow />

        {/* ============================================================== */}
        {/* 2. TORSO / BODY (Y: 12 to 24)                                 */}
        {/* ============================================================== */}
        <group position={[0, 18, 0]}>
          <mesh geometry={geoms.torso} material={skinMat} castShadow receiveShadow />

          {/* Asymmetric Side Skirt Flap / Train on right hip */}
          <mesh
            geometry={geoms.sash}
            material={skinMat}
            position={[2.1, -7.5, 2.2]}
            rotation={[0.06, 0, -0.04]}
            castShadow
          />
        </group>

        {/* ============================================================== */}
        {/* 3. RIGHT ARM (Resting naturally by side)                      */}
        {/* ============================================================== */}
        <group ref={rightArmRef} position={[5.5, 22, 0]}>
          <mesh position={[0, -4, 0]} geometry={geoms.rightArm} material={skinMat} castShadow />
        </group>

        {/* ============================================================== */}
        {/* 4. LEFT ARM (Raised Friendly Waving Pose)                      */}
        {/* ============================================================== */}
        <group ref={waveArmRef} position={[-5.5, 22, 0]} rotation={[0, 0, 2.2]}>
          <mesh position={[0, -4, 0]} geometry={geoms.leftArm} material={skinMat} castShadow />
        </group>

        {/* ============================================================== */}
        {/* 5. HEAD & 3D HAIR DETAILS (Y: 24 to 32)                       */}
        {/* ============================================================== */}
        <group ref={headRef} position={[0, 24, 0]}>
          <group position={[0, 4, 0]}>
            {/* Main Head Cube with the authentic face right on the front (+Z) */}
            <mesh geometry={geoms.head} material={skinMat} castShadow receiveShadow />

            {/* 3D Cute Pink Hair Bow on the side of head */}
            <group position={[-4.3, 3.2, 1.2]} rotation={[0, 0, 0.2]}>
              <mesh material={bowKnotMat}>
                <boxGeometry args={[0.9, 0.9, 0.7]} />
              </mesh>
              <mesh position={[0, 1.0, 0]} material={bowLoopMat}>
                <boxGeometry args={[1.3, 1.2, 0.6]} />
              </mesh>
              <mesh position={[0, -1.0, 0]} material={bowLoopMat}>
                <boxGeometry args={[1.3, 1.2, 0.6]} />
              </mesh>
            </group>

            {/* Cascading front hair locks over shoulders */}
            <mesh position={[-2.8, -4.5, 2.1]} material={hairStrandMat} castShadow>
              <boxGeometry args={[1.2, 5.5, 1.0]} />
            </mesh>
            <mesh position={[2.8, -4.5, 2.1]} material={hairStrandMat} castShadow>
              <boxGeometry args={[1.2, 5.5, 1.0]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
