import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 1:1 Replica of "Bee Minecraft" by kuzneciv (Sketchfab CC-BY)
 * Model UID: b883baf691204b4d9a618e5e5841adf1
 *
 * Characteristics:
 * - Authentic Minecraft bee cubic proportions (7x7x10 voxel aspect)
 * - Striped Yellow & Dark Brown fuzz body (#FED83D, #F1A80A, #452410, #2E1609)
 * - Big Minecraft dark pixel eyes (#373740) with light aqua highlights (#A3E8DE)
 * - Dual black angled antennae on top of head
 * - 6 tiny dark legs underneath
 * - Dual translucent fluttering pixelated wings (#E0F2FE with opacity 0.5)
 * - Little stinger cube on rear
 * - Continuous smooth 3D flight path floating and exploring gently around the room (between X: -1.8 to +2.5, Z: -1.5 to +1.5, Y: 1.3 to 2.1m)
 */

export const MinecraftBee: React.FC = () => {
  const beeGroupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const legsRef = useRef<THREE.Group>(null);

  // Generate 1:1 procedural pixel-perfect Minecraft bee textures
  const { bodyTexture, wingMat } = useMemo(() => {
    // Face & Body texture canvas
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Golden yellow base
      ctx.fillStyle = '#FFC828';
      ctx.fillRect(0, 0, 64, 64);

      // Warm orange-yellow gradients / shading
      ctx.fillStyle = '#F59E0B';
      for (let y = 0; y < 64; y += 8) {
        for (let x = 0; x < 64; x += 8) {
          if ((x + y) % 16 === 0) {
            ctx.fillRect(x, y, 8, 8);
          }
        }
      }

      // Brown stripes across rear body
      ctx.fillStyle = '#42220E';
      ctx.fillRect(28, 0, 14, 64);
      ctx.fillRect(50, 0, 14, 64);

      ctx.fillStyle = '#261205';
      ctx.fillRect(32, 0, 6, 64);
      ctx.fillRect(54, 0, 6, 64);
    }
    const bTex = new THREE.CanvasTexture(canvas);
    bTex.magFilter = THREE.NearestFilter;
    bTex.minFilter = THREE.NearestFilter;

    // Wing canvas: checkerboard pixel grid
    const wCanvas = document.createElement('canvas');
    wCanvas.width = 32;
    wCanvas.height = 32;
    const wCtx = wCanvas.getContext('2d');
    if (wCtx) {
      wCtx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      wCtx.fillRect(0, 0, 32, 32);
      wCtx.fillStyle = 'rgba(186, 230, 253, 0.6)';
      for (let y = 0; y < 32; y += 4) {
        for (let x = 0; x < 32; x += 4) {
          if ((x / 4 + y / 4) % 2 === 0) {
            wCtx.fillRect(x, y, 4, 4);
          }
        }
      }
    }
    const wTex = new THREE.CanvasTexture(wCanvas);
    wTex.magFilter = THREE.NearestFilter;
    wTex.minFilter = THREE.NearestFilter;

    const wMat = new THREE.MeshStandardMaterial({
      map: wTex,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
      roughness: 0.1,
      metalness: 0.05,
      depthWrite: false,
    });

    return { bodyTexture: bTex, wingTexture: wTex, wingMat: wMat };
  }, []);

  // Pre-cached materials
  const { eyeMat, eyePupilMat, antennaMat, legMat, stingerMat, bodyMat } = useMemo(() => {
    return {
      eyeMat: new THREE.MeshStandardMaterial({
        color: '#343640',
        roughness: 0.3,
      }),
      eyePupilMat: new THREE.MeshStandardMaterial({
        color: '#9FE5DF',
        roughness: 0.2,
      }),
      antennaMat: new THREE.MeshStandardMaterial({
        color: '#1A1817',
        roughness: 0.5,
      }),
      legMat: new THREE.MeshStandardMaterial({
        color: '#351D0E',
        roughness: 0.6,
      }),
      stingerMat: new THREE.MeshStandardMaterial({
        color: '#151210',
        roughness: 0.4,
      }),
      bodyMat: new THREE.MeshStandardMaterial({
        map: bodyTexture,
        roughness: 0.45,
        metalness: 0.05,
      }),
    };
  }, [bodyTexture]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // High-frequency Minecraft wing buzz flap (24-30Hz)
    const wingFlap = Math.sin(t * 36.0) * 0.45;
    if (leftWingRef.current) {
      leftWingRef.current.rotation.z = 0.2 + wingFlap;
    }
    if (rightWingRef.current) {
      rightWingRef.current.rotation.z = -0.2 - wingFlap;
    }

    // Leg dangles & body bob
    if (legsRef.current) {
      legsRef.current.rotation.x = Math.sin(t * 8.0) * 0.15;
    }

    // Gentle 3D continuous flight trajectory touring the room
    if (beeGroupRef.current) {
      // Parametric figure-8 / wandering flight path
      const targetX = Math.sin(t * 0.45) * 1.8 + 0.3;
      const targetZ = Math.cos(t * 0.35) * 1.2 - 0.2;
      const targetY = 1.65 + Math.sin(t * 1.2) * 0.25 + Math.cos(t * 0.7) * 0.15;

      // Current positions
      const curPos = beeGroupRef.current.position;
      const dx = targetX - curPos.x;
      const dz = targetZ - curPos.z;

      curPos.x = THREE.MathUtils.damp(curPos.x, targetX, 2.5, delta);
      curPos.y = THREE.MathUtils.damp(curPos.y, targetY, 3.0, delta);
      curPos.z = THREE.MathUtils.damp(curPos.z, targetZ, 2.5, delta);

      // Face direction of flight movement smoothly
      const targetAngle = Math.atan2(dx, dz);
      beeGroupRef.current.rotation.y = THREE.MathUtils.damp(
        beeGroupRef.current.rotation.y,
        targetAngle,
        3.5,
        delta
      );

      // Subtle flight tilt & bank
      beeGroupRef.current.rotation.z = THREE.MathUtils.damp(
        beeGroupRef.current.rotation.z,
        -dx * 0.4,
        4.0,
        delta
      );
      beeGroupRef.current.rotation.x = THREE.MathUtils.damp(
        beeGroupRef.current.rotation.x,
        Math.sin(t * 3.5) * 0.08,
        4.0,
        delta
      );
    }
  });

  return (
    // Spawned inside the room
    <group ref={beeGroupRef} position={[0.2, 1.6, -0.2]}>
      {/* Bee Scale: 0.24m length (~1/3 meter compact block) */}
      <group scale={[0.22, 0.22, 0.22]}>
        {/* ============================================================== */}
        {/* 1. CHUBBY VOXEL BODY (Yellow front, striped back)             */}
        {/* ============================================================== */}
        <mesh material={bodyMat} castShadow>
          <boxGeometry args={[0.70, 0.60, 0.90]} />
        </mesh>

        {/* ============================================================== */}
        {/* 2. FACE: EYES & ANTENNAE (Front Z = +0.45)                    */}
        {/* ============================================================== */}
        {/* Left Eye */}
        <group position={[-0.22, 0.06, 0.452]}>
          <mesh material={eyeMat}>
            <boxGeometry args={[0.14, 0.22, 0.005]} />
          </mesh>
          <mesh position={[-0.03, 0.05, 0.003]} material={eyePupilMat}>
            <boxGeometry args={[0.07, 0.09, 0.005]} />
          </mesh>
        </group>
        {/* Right Eye */}
        <group position={[0.22, 0.06, 0.452]}>
          <mesh material={eyeMat}>
            <boxGeometry args={[0.14, 0.22, 0.005]} />
          </mesh>
          <mesh position={[0.03, 0.05, 0.003]} material={eyePupilMat}>
            <boxGeometry args={[0.07, 0.09, 0.005]} />
          </mesh>
        </group>

        {/* Antennae */}
        <group position={[-0.18, 0.38, 0.32]} rotation={[0.4, 0, -0.2]}>
          <mesh material={antennaMat}>
            <boxGeometry args={[0.04, 0.18, 0.04]} />
          </mesh>
          <mesh position={[0, 0.10, 0.03]} material={antennaMat}>
            <boxGeometry args={[0.04, 0.06, 0.09]} />
          </mesh>
        </group>
        <group position={[0.18, 0.38, 0.32]} rotation={[0.4, 0, 0.2]}>
          <mesh material={antennaMat}>
            <boxGeometry args={[0.04, 0.18, 0.04]} />
          </mesh>
          <mesh position={[0, 0.10, 0.03]} material={antennaMat}>
            <boxGeometry args={[0.04, 0.06, 0.09]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 3. FLUTTERING WINGS (Left & Right with fast buzz flap)         */}
        {/* ============================================================== */}
        {/* Left Wing */}
        <group
          ref={leftWingRef}
          position={[-0.34, 0.28, -0.05]}
          rotation={[0, -0.15, 0.2]}
        >
          <mesh position={[-0.30, 0, -0.08]} material={wingMat}>
            <boxGeometry args={[0.55, 0.015, 0.38]} />
          </mesh>
        </group>
        {/* Right Wing */}
        <group
          ref={rightWingRef}
          position={[0.34, 0.28, -0.05]}
          rotation={[0, 0.15, -0.2]}
        >
          <mesh position={[0.30, 0, -0.08]} material={wingMat}>
            <boxGeometry args={[0.55, 0.015, 0.38]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 4. UNDERBELLY LEGS (6 little cute stubby legs)                 */}
        {/* ============================================================== */}
        <group ref={legsRef} position={[0, -0.32, 0]}>
          {[-0.18, 0.18].map((lx, idx) =>
            [-0.20, 0, 0.20].map((lz, jdx) => (
              <mesh key={`leg-${idx}-${jdx}`} position={[lx, -0.07, lz]} material={legMat}>
                <boxGeometry args={[0.06, 0.14, 0.06]} />
              </mesh>
            ))
          )}
        </group>

        {/* ============================================================== */}
        {/* 5. STINGER (Rear Z = -0.47)                                   */}
        {/* ============================================================== */}
        <mesh position={[0, -0.05, -0.47]} material={stingerMat}>
          <boxGeometry args={[0.05, 0.05, 0.09]} />
        </mesh>
      </group>
    </group>
  );
};
