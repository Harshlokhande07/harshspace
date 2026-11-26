import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 1:1 Replica of "Minecraft Aquarium" by Kazuma (Sketchfab)
 * Visual & Design Details:
 * - Blockbench cubic aesthetic with black rimmed tank canopy & bottom base (#23252A)
 * - Clear Minecraft water & transparent glass tank walls with subtle teal tint
 * - Fine ivory/sand bed (#F5ECD7) with scattered gravel pebble cubes
 * - Dark stepped stone rock formations
 * - Staggered vertical green voxel kelp / seagrass blades (#38A169 / #2F855A)
 * - Animated swimming Minecraft voxel fish:
 *   - Clownfish / tropical orange fish with white stripes
 *   - Bright blue tropical fish with light blue fins
 * - Placed on a matching contemporary walnut & black steel cabinet credenza at the South Wall entryway (X = 2.65, Z = 2.45)
 */

export const MinecraftAquarium: React.FC = () => {
  const orangeFishRef = useRef<THREE.Group>(null);
  const blueFishRef = useRef<THREE.Group>(null);
  const orangeTailRef = useRef<THREE.Group>(null);
  const blueTailRef = useRef<THREE.Group>(null);

  // Materials cached with useMemo
  const {
    tankRimMat,
    glassMat,
    waterMat,
    sandMat,
    stoneMat,
    kelpMat1,
    kelpMat2,
    orangeFishMat,
    whiteStripeMat,
    blueFishMat,
    cyanStripeMat,
    fishEyeMat,
    cabinetWoodMat,
    cabinetFrameMat,
  } = useMemo(() => {
    return {
      tankRimMat: new THREE.MeshStandardMaterial({
        color: '#1F2228',
        roughness: 0.4,
        metalness: 0.2,
      }),
      glassMat: new THREE.MeshPhysicalMaterial({
        color: '#E0F2FE',
        transmission: 0.95,
        roughness: 0.05,
        metalness: 0.1,
        transparent: true,
        opacity: 0.35,
        reflectivity: 0.7,
      }),
      waterMat: new THREE.MeshStandardMaterial({
        color: '#38BDF8',
        transparent: true,
        opacity: 0.22,
        roughness: 0.1,
      }),
      sandMat: new THREE.MeshStandardMaterial({
        color: '#F3E8D2',
        roughness: 0.85,
        metalness: 0.05,
      }),
      stoneMat: new THREE.MeshStandardMaterial({
        color: '#334155',
        roughness: 0.7,
        metalness: 0.2,
      }),
      kelpMat1: new THREE.MeshStandardMaterial({
        color: '#22C55E',
        roughness: 0.5,
      }),
      kelpMat2: new THREE.MeshStandardMaterial({
        color: '#16A34A',
        roughness: 0.5,
      }),
      orangeFishMat: new THREE.MeshStandardMaterial({
        color: '#F97316',
        roughness: 0.35,
      }),
      whiteStripeMat: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.3,
      }),
      blueFishMat: new THREE.MeshStandardMaterial({
        color: '#0284C7',
        roughness: 0.35,
      }),
      cyanStripeMat: new THREE.MeshStandardMaterial({
        color: '#38BDF8',
        roughness: 0.3,
      }),
      fishEyeMat: new THREE.MeshStandardMaterial({
        color: '#0F172A',
        roughness: 0.2,
      }),
      cabinetWoodMat: new THREE.MeshStandardMaterial({
        color: '#5C3E28',
        roughness: 0.4,
        metalness: 0.05,
      }),
      cabinetFrameMat: new THREE.MeshStandardMaterial({
        color: '#262930',
        roughness: 0.35,
        metalness: 0.7,
      }),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth swimming loop for orange fish
    if (orangeFishRef.current) {
      orangeFishRef.current.position.x = Math.sin(t * 0.8) * 0.22 + 0.06;
      orangeFishRef.current.position.z = Math.cos(t * 0.8) * 0.06 - 0.02;
      orangeFishRef.current.position.y = 0.85 + Math.sin(t * 1.6) * 0.025;
      orangeFishRef.current.rotation.y = Math.cos(t * 0.8) > 0 ? 0.3 : Math.PI - 0.3;
    }
    if (orangeTailRef.current) {
      orangeTailRef.current.rotation.y = Math.sin(t * 8.0) * 0.4;
    }

    // Smooth swimming loop for blue fish
    if (blueFishRef.current) {
      blueFishRef.current.position.x = -Math.sin(t * 0.9 + 1.5) * 0.20 - 0.04;
      blueFishRef.current.position.z = Math.cos(t * 0.9 + 1.5) * 0.07 + 0.03;
      blueFishRef.current.position.y = 0.95 + Math.sin(t * 2.0 + 1.0) * 0.03;
      blueFishRef.current.rotation.y = -Math.cos(t * 0.9 + 1.5) > 0 ? 0.2 : Math.PI - 0.2;
    }
    if (blueTailRef.current) {
      blueTailRef.current.rotation.y = Math.sin(t * 9.0 + 1.0) * 0.45;
    }
  });

  return (
    // Mounted along South Wall entryway (X = 2.65, Z = 2.38)
    <group position={[2.65, 0, 2.38]} rotation={[0, Math.PI, 0]}>
      {/* ============================================================== */}
      {/* 1. CONTEMPORARY CABINET STAND CREDENZA (Y = 0 to 0.72)          */}
      {/* ============================================================== */}
      <group position={[0, 0, 0]}>
        {/* Steel Leg Base */}
        {[-0.38, 0.38].map((lx, i) => (
          <group key={`leg-${i}`} position={[lx, 0.10, 0]}>
            <mesh material={cabinetFrameMat} castShadow>
              <boxGeometry args={[0.03, 0.20, 0.40]} />
            </mesh>
            <mesh position={[0, -0.09, 0]} material={cabinetFrameMat}>
              <cylinderGeometry args={[0.015, 0.02, 0.015, 16]} />
            </mesh>
          </group>
        ))}
        {/* Crossbar stretcher */}
        <mesh position={[0, 0.06, 0]} material={cabinetFrameMat}>
          <boxGeometry args={[0.76, 0.02, 0.02]} />
        </mesh>

        {/* Walnut Cabinet Body */}
        <mesh position={[0, 0.44, 0]} material={cabinetWoodMat} castShadow receiveShadow>
          <boxGeometry args={[0.88, 0.48, 0.44]} />
        </mesh>
        {/* Dual Door Reveal Gap */}
        <mesh position={[0, 0.44, 0.221]} material={cabinetFrameMat}>
          <boxGeometry args={[0.006, 0.44, 0.004]} />
        </mesh>
        {/* Door Pull Handles */}
        {[-0.04, 0.04].map((hx, i) => (
          <mesh key={`handle-${i}`} position={[hx, 0.52, 0.23]} material={cabinetFrameMat}>
            <boxGeometry args={[0.012, 0.06, 0.014]} />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 2. MINECRAFT AQUARIUM (Kazuma 1:1 Replica)                     */}
      {/* Base: 0.76m W x 0.36m D x 0.45m H                               */}
      {/* ============================================================== */}
      <group position={[0, 0.68, 0]}>
        {/* Bottom Black Rim Base */}
        <mesh position={[0, 0.025, 0]} material={tankRimMat} castShadow receiveShadow>
          <boxGeometry args={[0.76, 0.05, 0.36]} />
        </mesh>

        {/* Top Black Rim Canopy Hood */}
        <mesh position={[0, 0.425, 0]} material={tankRimMat} castShadow>
          <boxGeometry args={[0.76, 0.05, 0.36]} />
        </mesh>

        {/* Transparent Glass Walls */}
        <mesh position={[0, 0.225, 0]} material={glassMat}>
          <boxGeometry args={[0.72, 0.36, 0.32]} />
        </mesh>

        {/* Interior Water Volume with subtle caustics glow */}
        <mesh position={[0, 0.21, 0]} material={waterMat}>
          <boxGeometry args={[0.70, 0.32, 0.30]} />
        </mesh>

        {/* Minecraft Sand Bed Base */}
        <mesh position={[0, 0.065, 0]} material={sandMat} receiveShadow>
          <boxGeometry args={[0.70, 0.03, 0.30]} />
        </mesh>

        {/* ============================================================== */}
        {/* 3. SCENERY: ROCKS, PEBBLES & VOXEL KELP                       */}
        {/* ============================================================== */}
        {/* Stepped Dark Slate Rocks */}
        <group position={[-0.14, 0.08, 0.02]}>
          <mesh material={stoneMat} castShadow>
            <boxGeometry args={[0.12, 0.05, 0.10]} />
          </mesh>
          <mesh position={[0.01, 0.04, -0.01]} material={stoneMat} castShadow>
            <boxGeometry args={[0.08, 0.04, 0.07]} />
          </mesh>
          <mesh position={[0.02, 0.07, -0.02]} material={stoneMat}>
            <boxGeometry args={[0.05, 0.03, 0.04]} />
          </mesh>
        </group>

        {/* Scattered Sand Gravel Pebbles */}
        {[
          [-0.26, -0.08],
          [-0.22, 0.06],
          [-0.05, -0.09],
          [0.08, -0.06],
          [0.18, 0.08],
          [0.24, -0.04],
          [0.26, 0.05],
          [0.12, 0.09],
        ].map(([px, pz], pIdx) => (
          <mesh key={`pebble-${pIdx}`} position={[px, 0.085, pz]} material={stoneMat}>
            <boxGeometry args={[0.024, 0.016, 0.022]} />
          </mesh>
        ))}

        {/* Minecraft Voxel Kelp / Seagrass Blades (Stepped pixelated stalks) */}
        {[
          { x: -0.25, z: 0.04, h: 6, mat: kelpMat1 },
          { x: -0.22, z: -0.06, h: 8, mat: kelpMat2 },
          { x: -0.08, z: 0.08, h: 9, mat: kelpMat1 },
          { x: -0.03, z: -0.05, h: 7, mat: kelpMat2 },
          { x: 0.04, z: 0.06, h: 8, mat: kelpMat1 },
          { x: 0.14, z: -0.08, h: 10, mat: kelpMat2 },
          { x: 0.20, z: 0.04, h: 7, mat: kelpMat1 },
          { x: 0.26, z: -0.05, h: 9, mat: kelpMat2 },
        ].map((stalk, sIdx) => (
          <group key={`kelp-${sIdx}`} position={[stalk.x, 0.08, stalk.z]}>
            {Array.from({ length: stalk.h }).map((_, blockIdx) => (
              <mesh
                key={blockIdx}
                position={[
                  blockIdx % 2 === 0 ? 0 : 0.006,
                  blockIdx * 0.028 + 0.014,
                  blockIdx % 3 === 0 ? 0.004 : -0.004,
                ]}
                material={stalk.mat}
              >
                <boxGeometry args={[0.024, 0.026, 0.018]} />
              </mesh>
            ))}
          </group>
        ))}

        {/* ============================================================== */}
        {/* 4. ANIMATED MINECRAFT FISH                                     */}
        {/* ============================================================== */}
        {/* Orange Clownfish / Tropical Fish */}
        <group ref={orangeFishRef} position={[0.08, 0.20, 0.02]}>
          {/* Main Fish Body Block */}
          <mesh material={orangeFishMat} castShadow>
            <boxGeometry args={[0.075, 0.045, 0.032]} />
          </mesh>
          {/* White Vertical Stripes */}
          <mesh position={[-0.01, 0, 0]} material={whiteStripeMat}>
            <boxGeometry args={[0.016, 0.046, 0.034]} />
          </mesh>
          <mesh position={[0.02, 0, 0]} material={whiteStripeMat}>
            <boxGeometry args={[0.012, 0.046, 0.034]} />
          </mesh>
          {/* Eye Pixels */}
          <mesh position={[-0.028, 0.008, 0.017]} material={fishEyeMat}>
            <boxGeometry args={[0.008, 0.008, 0.002]} />
          </mesh>
          <mesh position={[-0.028, 0.008, -0.017]} material={fishEyeMat}>
            <boxGeometry args={[0.008, 0.008, 0.002]} />
          </mesh>
          {/* Animated Tail Fin */}
          <group ref={orangeTailRef} position={[0.042, 0, 0]}>
            <mesh position={[0.015, 0, 0]} material={orangeFishMat}>
              <boxGeometry args={[0.028, 0.038, 0.008]} />
            </mesh>
          </group>
        </group>

        {/* Blue Tropical Fish */}
        <group ref={blueFishRef} position={[-0.08, 0.26, -0.02]}>
          {/* Main Fish Body Block */}
          <mesh material={blueFishMat} castShadow>
            <boxGeometry args={[0.065, 0.038, 0.026]} />
          </mesh>
          {/* Cyan Pattern Stripe */}
          <mesh position={[-0.005, 0, 0]} material={cyanStripeMat}>
            <boxGeometry args={[0.015, 0.039, 0.028]} />
          </mesh>
          {/* Eye Pixels */}
          <mesh position={[-0.022, 0.006, 0.014]} material={fishEyeMat}>
            <boxGeometry args={[0.006, 0.006, 0.002]} />
          </mesh>
          <mesh position={[-0.022, 0.006, -0.014]} material={fishEyeMat}>
            <boxGeometry args={[0.006, 0.006, 0.002]} />
          </mesh>
          {/* Animated Tail Fin */}
          <group ref={blueTailRef} position={[0.035, 0, 0]}>
            <mesh position={[0.012, 0, 0]} material={cyanStripeMat}>
              <boxGeometry args={[0.022, 0.030, 0.006]} />
            </mesh>
          </group>
        </group>

        {/* Subtle Underwater Ambient Blue/Cyan Glow (Always gentle) */}
        <pointLight
          position={[0, 0.25, 0]}
          color="#38BDF8"
          intensity={0.65}
          distance={1.6}
          decay={2}
          castShadow={false}
        />
      </group>
    </group>
  );
};
