import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * 1:1 Replica of "Camera in Oppenheimer - Minecraft Style" by Augies1808 (Sketchfab / Blockbench)
 * Model UID: af54039e36f54b5d99d225d7b0bfd1de
 *
 * Characteristics:
 * - Vintage Hollywood/Oppenheimer 65mm IMAX Camera in Blockbench Minecraft voxel style
 * - Iconic butterfly dual-reel film magazine boxes mounted diagonally on top (#2E3138)
 * - Main cast matte black camera body with side adjustment dials and viewfinders
 * - Heavy vintage wooden surveyor/cine tripod with 3 splayed legs (#B08A5E / #8F6942) and aluminum extension collars
 * - Heavy cinema pan-tilt fluid head mounting base
 * - Heavy battery pack on floor with connecting power umbilical cable
 * - Positioned in the corner (East-South corner: X = 4.05, Z = 2.15, angled inward at -135°)
 */
export const MinecraftCamera: React.FC = () => {
  const {
    cameraBodyMat,
    darkSteelMat,
    silverHardwareMat,
    woodLegMat,
    lensGlassMat,
    cableMat,
    magazineMat,
  } = useMemo(() => {
    return {
      cameraBodyMat: new THREE.MeshStandardMaterial({
        color: '#282B33',
        roughness: 0.45,
        metalness: 0.65,
      }),
      darkSteelMat: new THREE.MeshStandardMaterial({
        color: '#1C1E24',
        roughness: 0.4,
        metalness: 0.8,
      }),
      silverHardwareMat: new THREE.MeshStandardMaterial({
        color: '#D1D5DB',
        roughness: 0.25,
        metalness: 0.85,
      }),
      woodLegMat: new THREE.MeshStandardMaterial({
        color: '#B89264',
        roughness: 0.7,
        metalness: 0.05,
      }),
      lensGlassMat: new THREE.MeshPhysicalMaterial({
        color: '#1E3A8A',
        roughness: 0.1,
        metalness: 0.2,
        transmission: 0.6,
        transparent: true,
        opacity: 0.85,
      }),
      cableMat: new THREE.MeshStandardMaterial({
        color: '#111317',
        roughness: 0.8,
      }),
      magazineMat: new THREE.MeshStandardMaterial({
        color: '#323640',
        roughness: 0.5,
        metalness: 0.5,
      }),
    };
  }, []);

  return (
    // Positioned in the East-South corner (X = 4.05, Z = 2.15), angled inward into room towards the lounge & desk
    <group position={[4.05, 0, 2.15]} rotation={[0, -Math.PI * 0.75, 0]}>
      {/* ============================================================== */}
      {/* 1. CINEMA SURVEYOR TRIPOD (3 splayed wooden legs with collars) */}
      {/* ============================================================== */}
      {/* Tripod Crown Hub Mounting Base */}
      <mesh position={[0, 0.96, 0]} material={darkSteelMat} castShadow>
        <boxGeometry args={[0.22, 0.06, 0.22]} />
      </mesh>

      {/* 3 Wooden Legs angled outwards */}
      {/* Leg 1: Front-Left */}
      <group position={[-0.08, 0.94, 0.08]} rotation={[0.22, 0, 0.22]}>
        {/* Upper wooden strut */}
        <mesh position={[0, -0.48, 0]} material={woodLegMat} castShadow>
          <boxGeometry args={[0.045, 1.0, 0.045]} />
        </mesh>
        {/* Silver metal locking clamp collar */}
        <mesh position={[0, -0.22, 0]} material={silverHardwareMat}>
          <boxGeometry args={[0.052, 0.06, 0.052]} />
        </mesh>
        <mesh position={[0, -0.72, 0]} material={silverHardwareMat}>
          <boxGeometry args={[0.052, 0.06, 0.052]} />
        </mesh>
      </group>

      {/* Leg 2: Front-Right */}
      <group position={[0.08, 0.94, 0.08]} rotation={[0.22, 0, -0.22]}>
        <mesh position={[0, -0.48, 0]} material={woodLegMat} castShadow>
          <boxGeometry args={[0.045, 1.0, 0.045]} />
        </mesh>
        <mesh position={[0, -0.22, 0]} material={silverHardwareMat}>
          <boxGeometry args={[0.052, 0.06, 0.052]} />
        </mesh>
        <mesh position={[0, -0.72, 0]} material={silverHardwareMat}>
          <boxGeometry args={[0.052, 0.06, 0.052]} />
        </mesh>
      </group>

      {/* Leg 3: Rear */}
      <group position={[0, 0.94, -0.09]} rotation={[-0.28, 0, 0]}>
        <mesh position={[0, -0.48, 0]} material={woodLegMat} castShadow>
          <boxGeometry args={[0.045, 1.0, 0.045]} />
        </mesh>
        <mesh position={[0, -0.22, 0]} material={silverHardwareMat}>
          <boxGeometry args={[0.052, 0.06, 0.052]} />
        </mesh>
        <mesh position={[0, -0.72, 0]} material={silverHardwareMat}>
          <boxGeometry args={[0.052, 0.06, 0.052]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 2. HEAVY FLUID HEAD & GEARED PAN-TILT BASE                     */}
      {/* ============================================================== */}
      <group position={[0, 1.02, 0]}>
        {/* Pan base cylinder */}
        <mesh material={darkSteelMat}>
          <cylinderGeometry args={[0.08, 0.09, 0.06, 16]} />
        </mesh>
        {/* Tilt cradle mechanism */}
        <mesh position={[0, 0.05, 0]} material={cameraBodyMat}>
          <boxGeometry args={[0.18, 0.06, 0.16]} />
        </mesh>
        {/* Pan bar control handle extending backward */}
        <mesh position={[0.09, 0.04, -0.16]} rotation={[0.2, 0, 0]} material={darkSteelMat}>
          <cylinderGeometry args={[0.008, 0.008, 0.28, 12]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 3. OPPENHEIMER 65mm CAMERA BODY & LARGE LENS                    */}
      {/* ============================================================== */}
      <group position={[0, 1.15, 0]}>
        {/* Main Camera Body (Square blocky chassis) */}
        <mesh position={[0, 0, 0]} material={cameraBodyMat} castShadow>
          <boxGeometry args={[0.22, 0.18, 0.32]} />
        </mesh>

        {/* Heavy Optical Prime Lens (Facing forward Z = +0.16) */}
        <group position={[0, 0.01, 0.18]}>
          {/* Main barrel */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={darkSteelMat} castShadow>
            <cylinderGeometry args={[0.065, 0.075, 0.18, 20]} />
          </mesh>
          {/* Front Matte Box / Sun Hood */}
          <mesh position={[0, 0, 0.11]} material={cameraBodyMat} castShadow>
            <boxGeometry args={[0.18, 0.15, 0.06]} />
          </mesh>
          {/* Front Glass Optical Element */}
          <mesh position={[0, 0, 0.085]} material={lensGlassMat}>
            <circleGeometry args={[0.058, 24]} />
          </mesh>
        </group>

        {/* Side Viewfinder & Optical Eyepiece */}
        <group position={[-0.13, 0.04, -0.04]}>
          <mesh material={darkSteelMat}>
            <boxGeometry args={[0.06, 0.05, 0.18]} />
          </mesh>
          <mesh position={[-0.01, 0, -0.11]} material={silverHardwareMat}>
            <cylinderGeometry args={[0.018, 0.018, 0.05, 16]} />
          </mesh>
        </group>

        {/* Side Dials & Controls */}
        <mesh position={[0.115, 0.02, 0.02]} rotation={[0, 0, Math.PI / 2]} material={silverHardwareMat}>
          <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
        </mesh>
        <mesh position={[0.115, -0.03, -0.06]} rotation={[0, 0, Math.PI / 2]} material={silverHardwareMat}>
          <cylinderGeometry args={[0.025, 0.025, 0.015, 16]} />
        </mesh>

        {/* ============================================================== */}
        {/* 4. BUTTERFLY DUAL-REEL FILM MAGAZINE (Angled V on top)         */}
        {/* ============================================================== */}
        {/* Left Reel Magazine (Angled at -35°) */}
        <group position={[-0.065, 0.18, -0.04]} rotation={[0, 0, 0.62]}>
          <mesh material={magazineMat} castShadow>
            <boxGeometry args={[0.18, 0.18, 0.07]} />
          </mesh>
          <mesh position={[0, 0, 0.038]} material={darkSteelMat}>
            <cylinderGeometry args={[0.04, 0.04, 0.008, 16]} />
          </mesh>
        </group>

        {/* Right Reel Magazine (Angled at +35°) */}
        <group position={[0.065, 0.18, -0.04]} rotation={[0, 0, -0.62]}>
          <mesh material={magazineMat} castShadow>
            <boxGeometry args={[0.18, 0.18, 0.07]} />
          </mesh>
          <mesh position={[0, 0, 0.038]} material={darkSteelMat}>
            <cylinderGeometry args={[0.04, 0.04, 0.008, 16]} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 5. FLOOR BATTERY PACK & POWER CABLE                            */}
      {/* ============================================================== */}
      <group position={[0.08, 0.04, -0.04]}>
        <mesh material={darkSteelMat} castShadow>
          <boxGeometry args={[0.14, 0.08, 0.10]} />
        </mesh>
        {/* Status indicator on battery */}
        <mesh position={[0, 0.042, 0]}>
          <boxGeometry args={[0.04, 0.005, 0.02]} />
          <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={0.8} />
        </mesh>
        {/* Power cable running from battery to camera */}
        <mesh position={[-0.04, 0.48, 0]} material={cableMat}>
          <cylinderGeometry args={[0.006, 0.006, 0.94, 10]} />
        </mesh>
      </group>
    </group>
  );
};
