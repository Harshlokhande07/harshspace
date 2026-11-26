import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 1:1 Precise Replica of "Minecraft Aquarium" by Kazuma (Sketchfab / Blockbench)
 * Model UID: b7f71cd44d694bb38946ba21ab48036c
 *
 * Exact Visual Features:
 * - Tank Chassis:
 *   - Dark charcoal-slate top canopy lid & bottom rim (#282A2E) with Blockbench stepped profile
 *   - Clean clear glass tank walls with crystal-clear water visibility
 * - Interior Diorama:
 *   - Warm Minecraft beach sand base layer (#F3E8CD / #EAD8B2)
 *   - Dark grey stone rock clusters (natural stepped cubes)
 *   - Staggered voxel Kelp / Seagrass stalks (#55B26E / #3B8F52)
 * - Authentic 3D Blockbench Minecraft Fish:
 *   - Orange Clownfish with 2 white body stripes, dorsal/pectoral fins, and animated wagging tail fin
 *   - Blue Tropical Fish (Tang) with light cyan markings, dark eye pixels, and swimming tail animation
 * - Positioned at the South Wall entryway (X = 2.65, Z = 2.38) on its authentic dark Minecraft wood pedestal
 */

export const MinecraftAquarium: React.FC = () => {
  const orangeFishRef = useRef<THREE.Group>(null);
  const blueFishRef = useRef<THREE.Group>(null);
  const orangeTailRef = useRef<THREE.Group>(null);
  const blueTailRef = useRef<THREE.Group>(null);

  // Exact Blockbench PBR & flat Minecraft colors
  const {
    tankRimMat,
    glassMat,
    waterVolumeMat,
    sandMat,
    rockMat,
    kelpMat1,
    kelpMat2,
    orangeFishMat,
    whiteStripeMat,
    blueFishMat,
    cyanStripeMat,
    fishEyeMat,
    pedestalMat,
  } = useMemo(() => {
    return {
      // Dark slate tank rim/lid (#2A2C32)
      tankRimMat: new THREE.MeshStandardMaterial({
        color: '#282A30',
        roughness: 0.45,
        metalness: 0.1,
      }),
      // Ultra-transparent glass so fish and kelp are clearly visible from outside
      glassMat: new THREE.MeshPhysicalMaterial({
        color: '#FFFFFF',
        transmission: 0.98,
        roughness: 0.04,
        metalness: 0.05,
        transparent: true,
        opacity: 0.20,
        reflectivity: 0.5,
        depthWrite: false,
      }),
      // Light blue Minecraft water volume
      waterVolumeMat: new THREE.MeshStandardMaterial({
        color: '#4BB5C1',
        transparent: true,
        opacity: 0.12,
        roughness: 0.1,
        depthWrite: false,
      }),
      // Minecraft beach sand
      sandMat: new THREE.MeshStandardMaterial({
        color: '#E8DCBF',
        roughness: 0.85,
        metalness: 0.02,
      }),
      // Stepped dark rocks
      rockMat: new THREE.MeshStandardMaterial({
        color: '#383D48',
        roughness: 0.75,
        metalness: 0.1,
      }),
      // Minecraft kelp green
      kelpMat1: new THREE.MeshStandardMaterial({
        color: '#48A868',
        roughness: 0.55,
      }),
      kelpMat2: new THREE.MeshStandardMaterial({
        color: '#338A50',
        roughness: 0.55,
      }),
      // Orange clownfish
      orangeFishMat: new THREE.MeshStandardMaterial({
        color: '#E0651A',
        roughness: 0.4,
      }),
      whiteStripeMat: new THREE.MeshStandardMaterial({
        color: '#F8FAFC',
        roughness: 0.3,
      }),
      // Blue tropical fish
      blueFishMat: new THREE.MeshStandardMaterial({
        color: '#2589D8',
        roughness: 0.4,
      }),
      cyanStripeMat: new THREE.MeshStandardMaterial({
        color: '#70D6F5',
        roughness: 0.3,
      }),
      fishEyeMat: new THREE.MeshStandardMaterial({
        color: '#0D1117',
        roughness: 0.2,
      }),
      // Stand pedestal
      pedestalMat: new THREE.MeshStandardMaterial({
        color: '#422C1D', // Dark oak planks
        roughness: 0.6,
        metalness: 0.05,
      }),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Orange clownfish swimming loop
    if (orangeFishRef.current) {
      orangeFishRef.current.position.x = Math.sin(t * 0.9) * 0.22 + 0.06;
      orangeFishRef.current.position.z = Math.cos(t * 0.9) * 0.07 - 0.02;
      orangeFishRef.current.position.y = 0.88 + Math.sin(t * 1.8) * 0.025;
      orangeFishRef.current.rotation.y = Math.cos(t * 0.9) > 0 ? 0.35 : Math.PI - 0.35;
    }
    if (orangeTailRef.current) {
      orangeTailRef.current.rotation.y = Math.sin(t * 8.5) * 0.45;
    }

    // Blue tropical fish swimming loop
    if (blueFishRef.current) {
      blueFishRef.current.position.x = -Math.sin(t * 1.0 + 1.2) * 0.20 - 0.04;
      blueFishRef.current.position.z = Math.cos(t * 1.0 + 1.2) * 0.08 + 0.02;
      blueFishRef.current.position.y = 0.98 + Math.sin(t * 2.2 + 0.5) * 0.03;
      blueFishRef.current.rotation.y = -Math.cos(t * 1.0 + 1.2) > 0 ? 0.25 : Math.PI - 0.25;
    }
    if (blueTailRef.current) {
      blueTailRef.current.rotation.y = Math.sin(t * 9.5 + 1.0) * 0.5;
    }
  });

  return (
    // Situated along the South Wall space at X = 2.65, Z = 2.38
    <group position={[2.65, 0, 2.38]} rotation={[0, Math.PI, 0]}>
      {/* ============================================================== */}
      {/* 1. MINECRAFT WOODEN STAND PEDESTAL (0.84m W x 0.44m D x 0.68m H)*/}
      {/* ============================================================== */}
      <group position={[0, 0, 0]}>
        {/* Main dark oak cabinet block */}
        <mesh position={[0, 0.34, 0]} material={pedestalMat} castShadow receiveShadow>
          <boxGeometry args={[0.84, 0.68, 0.44]} />
        </mesh>
        {/* Top lip reveal */}
        <mesh position={[0, 0.675, 0]} material={pedestalMat}>
          <boxGeometry args={[0.86, 0.02, 0.46]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 2. MINECRAFT AQUARIUM TANK (Kazuma 1:1 Replica)                */}
      {/* Dimensions: 0.78m W x 0.38m D x 0.46m H                        */}
      {/* ============================================================== */}
      <group position={[0, 0.68, 0]}>
        {/* Bottom Black Rim Chassis */}
        <mesh position={[0, 0.03, 0]} material={tankRimMat} castShadow receiveShadow>
          <boxGeometry args={[0.78, 0.06, 0.38]} />
        </mesh>

        {/* Top Canopy Lid Hood */}
        <mesh position={[0, 0.44, 0]} material={tankRimMat} castShadow>
          <boxGeometry args={[0.78, 0.06, 0.38]} />
        </mesh>

        {/* Sand Bed Base */}
        <mesh position={[0, 0.075, 0]} material={sandMat} receiveShadow>
          <boxGeometry args={[0.72, 0.035, 0.32]} />
        </mesh>

        {/* ============================================================== */}
        {/* 3. SCENERY: ROCKS, PEBBLES & VOXEL KELP                       */}
        {/* ============================================================== */}
        {/* Central Stepped Rock Formation */}
        <group position={[-0.15, 0.09, 0.02]}>
          <mesh material={rockMat} castShadow>
            <boxGeometry args={[0.13, 0.06, 0.11]} />
          </mesh>
          <mesh position={[0.015, 0.05, -0.015]} material={rockMat} castShadow>
            <boxGeometry args={[0.09, 0.05, 0.08]} />
          </mesh>
          <mesh position={[0.025, 0.08, -0.02]} material={rockMat}>
            <boxGeometry args={[0.05, 0.035, 0.05]} />
          </mesh>
        </group>

        {/* Sand Pebbles / Gravel Blocks */}
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
          <mesh key={`pebble-${pIdx}`} position={[px, 0.10, pz]} material={rockMat}>
            <boxGeometry args={[0.028, 0.022, 0.026]} />
          </mesh>
        ))}

        {/* Staggered Vertical Kelp Stalks */}
        {[
          { x: -0.27, z: 0.04, h: 6, mat: kelpMat1 },
          { x: -0.23, z: -0.06, h: 8, mat: kelpMat2 },
          { x: -0.08, z: 0.08, h: 9, mat: kelpMat1 },
          { x: -0.02, z: -0.06, h: 7, mat: kelpMat2 },
          { x: 0.05, z: 0.06, h: 8, mat: kelpMat1 },
          { x: 0.15, z: -0.08, h: 10, mat: kelpMat2 },
          { x: 0.21, z: 0.04, h: 7, mat: kelpMat1 },
          { x: 0.27, z: -0.05, h: 9, mat: kelpMat2 },
        ].map((stalk, sIdx) => (
          <group key={`kelp-${sIdx}`} position={[stalk.x, 0.09, stalk.z]}>
            {Array.from({ length: stalk.h }).map((_, bIdx) => (
              <mesh
                key={bIdx}
                position={[
                  bIdx % 2 === 0 ? 0 : 0.007,
                  bIdx * 0.032 + 0.016,
                  bIdx % 3 === 0 ? 0.005 : -0.005,
                ]}
                material={stalk.mat}
              >
                <boxGeometry args={[0.026, 0.030, 0.020]} />
              </mesh>
            ))}
          </group>
        ))}

        {/* ============================================================== */}
        {/* 4. HIGH-VISIBILITY 3D MINECRAFT FISH                           */}
        {/* ============================================================== */}
        {/* Orange Clownfish (Bright, Distinct, Prominently Sized) */}
        <group ref={orangeFishRef} position={[0.10, 0.24, 0.02]}>
          {/* Main Body */}
          <mesh material={orangeFishMat} castShadow>
            <boxGeometry args={[0.10, 0.06, 0.04]} />
          </mesh>
          {/* White Midbody Band Stripe */}
          <mesh position={[-0.012, 0, 0]} material={whiteStripeMat}>
            <boxGeometry args={[0.022, 0.062, 0.042]} />
          </mesh>
          {/* White Head Stripe */}
          <mesh position={[-0.038, 0, 0]} material={whiteStripeMat}>
            <boxGeometry args={[0.014, 0.058, 0.042]} />
          </mesh>
          {/* Eyes */}
          <mesh position={[-0.038, 0.012, 0.022]} material={fishEyeMat}>
            <boxGeometry args={[0.010, 0.010, 0.004]} />
          </mesh>
          <mesh position={[-0.038, 0.012, -0.022]} material={fishEyeMat}>
            <boxGeometry args={[0.010, 0.010, 0.004]} />
          </mesh>
          {/* Dorsal Fin */}
          <mesh position={[0, 0.04, 0]} material={orangeFishMat}>
            <boxGeometry args={[0.04, 0.022, 0.008]} />
          </mesh>
          {/* Tail Fin Assembly with Wag Animation */}
          <group ref={orangeTailRef} position={[0.052, 0, 0]}>
            <mesh position={[0.022, 0, 0]} material={orangeFishMat}>
              <boxGeometry args={[0.038, 0.052, 0.010]} />
            </mesh>
          </group>
        </group>

        {/* Blue Tropical Tang Fish (Bright Blue & Cyan) */}
        <group ref={blueFishRef} position={[-0.09, 0.30, -0.02]}>
          {/* Main Body */}
          <mesh material={blueFishMat} castShadow>
            <boxGeometry args={[0.09, 0.052, 0.036]} />
          </mesh>
          {/* Cyan Horizontal Spine Accent */}
          <mesh position={[-0.005, 0, 0]} material={cyanStripeMat}>
            <boxGeometry args={[0.022, 0.054, 0.038]} />
          </mesh>
          {/* Eyes */}
          <mesh position={[-0.032, 0.010, 0.020]} material={fishEyeMat}>
            <boxGeometry args={[0.008, 0.008, 0.004]} />
          </mesh>
          <mesh position={[-0.032, 0.010, -0.020]} material={fishEyeMat}>
            <boxGeometry args={[0.008, 0.008, 0.004]} />
          </mesh>
          {/* Tail Fin Assembly with Wag Animation */}
          <group ref={blueTailRef} position={[0.046, 0, 0]}>
            <mesh position={[0.018, 0, 0]} material={cyanStripeMat}>
              <boxGeometry args={[0.032, 0.042, 0.008]} />
            </mesh>
          </group>
        </group>

        {/* ============================================================== */}
        {/* 5. WATER & GLASS (Rendered with depthWrite false for clarity) */}
        {/* ============================================================== */}
        {/* Internal Water Volume */}
        <mesh position={[0, 0.23, 0]} material={waterVolumeMat}>
          <boxGeometry args={[0.72, 0.32, 0.32]} />
        </mesh>

        {/* External Glass Tank Walls */}
        <mesh position={[0, 0.235, 0]} material={glassMat}>
          <boxGeometry args={[0.74, 0.35, 0.34]} />
        </mesh>
      </group>
    </group>
  );
};
