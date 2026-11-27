import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 1:1 Replica of "grammaphone" by Artbor (Sketchfab / Blockbench)
 * Model UID: 3996b96c48664caeb52992e454345ee1
 *
 * Characteristics:
 * - Low-poly Minecraft aesthetic vintage gramophone record player
 * - Rich warm oak turntable body with stepped dark-oak bevel base and rim (#7A4822 / #4E2F1D)
 * - Front vintage control panel: brushed silver needle slot plate (#8E9AA7) and dual rotary/switch dials
 * - Spinning vinyl record disc (#18181B) with iconic red center label (#DC2626) and gold spindle hub (#FACC15)
 * - Articulated tonearm with stylus needle pickup tracking the rotating disc
 * - Segmented polygonal flared brass trumpet horn (#FACC15 / #EAB308 / #CA8A04) angled upwards & forward
 * - Positioned on a stylish matching walnut bedside table beside the bed (X = 2.80, Z = -2.15)
 */
export const Gramophone: React.FC = () => {
  const vinylRef = useRef<THREE.Group>(null);
  const notesRef = useRef<THREE.Points>(null);

  // Materials cached with useMemo
  const {
    tableWoodMat,
    tableLegMat,
    brassMat,
    darkOakMat,
    bodyOakMat,
    metalPanelMat,
    vinylMat,
    labelMat,
    spindleMat,
    tonearmMat,
    hornOuterMat,
    hornInnerMat,
  } = useMemo(() => {
    return {
      tableWoodMat: new THREE.MeshStandardMaterial({
        color: '#5C3D2E',
        roughness: 0.5,
        metalness: 0.05,
      }),
      tableLegMat: new THREE.MeshStandardMaterial({
        color: '#42281D',
        roughness: 0.55,
        metalness: 0.05,
      }),
      brassMat: new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        roughness: 0.25,
        metalness: 0.85,
      }),
      darkOakMat: new THREE.MeshStandardMaterial({
        color: '#4A2E1C',
        roughness: 0.65,
        metalness: 0.05,
      }),
      bodyOakMat: new THREE.MeshStandardMaterial({
        color: '#7D4721',
        roughness: 0.6,
        metalness: 0.05,
      }),
      metalPanelMat: new THREE.MeshStandardMaterial({
        color: '#8E9AA7',
        roughness: 0.35,
        metalness: 0.75,
      }),
      vinylMat: new THREE.MeshStandardMaterial({
        color: '#16171B',
        roughness: 0.3,
        metalness: 0.4,
      }),
      labelMat: new THREE.MeshStandardMaterial({
        color: '#DC2626',
        roughness: 0.5,
      }),
      spindleMat: new THREE.MeshStandardMaterial({
        color: '#FACC15',
        roughness: 0.2,
        metalness: 0.9,
      }),
      tonearmMat: new THREE.MeshStandardMaterial({
        color: '#334155',
        roughness: 0.4,
        metalness: 0.7,
      }),
      hornOuterMat: new THREE.MeshStandardMaterial({
        color: '#FACC15',
        roughness: 0.28,
        metalness: 0.85,
        flatShading: true,
      }),
      hornInnerMat: new THREE.MeshStandardMaterial({
        color: '#92400E',
        roughness: 0.45,
        metalness: 0.6,
        flatShading: true,
      }),
    };
  }, []);

  // Floating gentle musical sparkles / acoustic motes rising from the horn
  const { notePositions, noteSpeeds } = useMemo(() => {
    const count = 16;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 0.18;
      positions[i * 3 + 1] = Math.random() * 0.45;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.18;
      speeds[i] = 0.12 + Math.random() * 0.18;
    }
    return { notePositions: positions, noteSpeeds: speeds };
  }, []);

  useFrame((_, delta) => {
    // Smooth continuous vinyl rotation
    if (vinylRef.current) {
      vinylRef.current.rotation.y += delta * 1.8;
    }

    // Drifting musical sparkle notes
    if (notesRef.current) {
      const posAttr = notesRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      const count = arr.length / 3;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += noteSpeeds[i] * delta;
        arr[i * 3 + 0] += Math.sin(arr[i * 3 + 1] * 8.0 + i) * 0.04 * delta;
        arr[i * 3 + 2] += Math.cos(arr[i * 3 + 1] * 8.0 + i) * 0.04 * delta;
        if (arr[i * 3 + 1] > 0.55) {
          arr[i * 3 + 1] = 0.02;
          arr[i * 3 + 0] = (Math.random() - 0.5) * 0.12;
          arr[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    // Situated beside Bed on the North wall (X = 2.80, Z = -2.15), angled towards room center
    <group position={[2.80, 0, -2.15]} rotation={[0, -0.22, 0]}>
      {/* ============================================================== */}
      {/* 1. SMALL BEDSIDE TABLE (NIGHTSTAND)                            */}
      {/* ============================================================== */}
      {/* Tabletop */}
      <mesh position={[0, 0.52, 0]} material={tableWoodMat} castShadow receiveShadow>
        <boxGeometry args={[0.54, 0.035, 0.50]} />
      </mesh>
      {/* Beveled Top Edge Lip */}
      <mesh position={[0, 0.505, 0]} material={tableWoodMat} castShadow>
        <boxGeometry args={[0.51, 0.025, 0.47]} />
      </mesh>

      {/* 4 Tapered Wooden Legs with Brass End Caps */}
      {[
        [-0.22, 0.25, -0.20],
        [0.22, 0.25, -0.20],
        [-0.22, 0.25, 0.20],
        [0.22, 0.25, 0.20],
      ].map(([lx, ly, lz], idx) => (
        <group key={idx} position={[lx, ly, lz]}>
          <mesh position={[0, 0, 0]} material={tableLegMat} castShadow>
            <cylinderGeometry args={[0.018, 0.024, 0.50, 12]} />
          </mesh>
          {/* Brass Ferrule Tip */}
          <mesh position={[0, -0.22, 0]} material={brassMat}>
            <cylinderGeometry args={[0.02, 0.022, 0.06, 12]} />
          </mesh>
        </group>
      ))}

      {/* Lower Open Shelf */}
      <mesh position={[0, 0.14, 0]} material={tableWoodMat} receiveShadow>
        <boxGeometry args={[0.46, 0.02, 0.42]} />
      </mesh>

      {/* Stacked Vintage Vinyl Sleeves on Lower Shelf */}
      <mesh position={[-0.04, 0.16, 0.02]} rotation={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.26, 0.015, 0.26]} />
        <meshStandardMaterial color="#DC2626" roughness={0.7} />
      </mesh>
      <mesh position={[0.02, 0.178, -0.01]} rotation={[0, -0.08, 0]} castShadow>
        <boxGeometry args={[0.26, 0.015, 0.26]} />
        <meshStandardMaterial color="#2563EB" roughness={0.7} />
      </mesh>

      {/* ============================================================== */}
      {/* 2. AUTHENTIC MINECRAFT GRAMOPHONE (Artbor Sketchfab)          */}
      {/* ============================================================== */}
      <group position={[0, 0.54, 0]}>
        {/* Step 1: Dark Oak Stepped Skirt Base */}
        <mesh position={[0, 0.015, 0]} material={darkOakMat} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.03, 0.34]} />
        </mesh>

        {/* Step 2: Main Warm Oak Jukebox Body Box */}
        <mesh position={[0, 0.065, 0]} material={bodyOakMat} castShadow receiveShadow>
          <boxGeometry args={[0.30, 0.08, 0.30]} />
        </mesh>

        {/* Step 3: Top Stepped Rim Frame */}
        <mesh position={[0, 0.115, 0]} material={darkOakMat} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.025, 0.34]} />
        </mesh>

        {/* Front Panel Controls (Facing +Z) */}
        {/* Horizontal Brushed Metal Nameplate / Slot */}
        <mesh position={[0, 0.065, 0.152]} material={metalPanelMat}>
          <boxGeometry args={[0.16, 0.018, 0.005]} />
        </mesh>
        {/* Dual Retro Dials / Knobs on Left */}
        <mesh position={[-0.10, 0.075, 0.153]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.008, 12]} />
          <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[-0.10, 0.052, 0.153]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.008, 12]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.25} metalness={0.9} />
        </mesh>

        {/* ============================================================== */}
        {/* 3. ROTATING VINYL RECORD DISC & TURNTABLE PLATTER              */}
        {/* ============================================================== */}
        {/* Center Platter Mount */}
        <mesh position={[-0.03, 0.13, 0.01]}>
          <cylinderGeometry args={[0.115, 0.118, 0.008, 24]} />
          <meshStandardMaterial color="#27272A" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Spinning Vinyl Assembly */}
        <group ref={vinylRef} position={[-0.03, 0.136, 0.01]}>
          {/* Black Vinyl Disc */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.11, 0.11, 0.005, 32]} />
            <primitive object={vinylMat} attach="material" />
          </mesh>

          {/* Concentric Vinyl Grooves Ring */}
          <mesh position={[0, 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.045, 0.102, 32]} />
            <meshStandardMaterial color="#0A0A0C" roughness={0.25} metalness={0.5} />
          </mesh>

          {/* Red Square Record Label (Artbor Signature Red Label) */}
          <mesh position={[0, 0.004, 0]} material={labelMat}>
            <boxGeometry args={[0.046, 0.002, 0.046]} />
          </mesh>

          {/* Gold Center Spindle Hub */}
          <mesh position={[0, 0.008, 0]} material={spindleMat}>
            <cylinderGeometry args={[0.006, 0.006, 0.014, 16]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 4. TONEARM & STYLUS NEEDLE                                     */}
        {/* ============================================================== */}
        <group position={[0.10, 0.135, -0.08]}>
          {/* Base Pivot Cylinder */}
          <mesh material={tonearmMat}>
            <cylinderGeometry args={[0.016, 0.018, 0.024, 16]} />
          </mesh>
          {/* Horizontal Arm Bar angled over record */}
          <group position={[0, 0.016, 0]} rotation={[0, -0.75, -0.06]}>
            <mesh position={[0, 0, 0.075]} material={tonearmMat}>
              <boxGeometry args={[0.008, 0.008, 0.15]} />
            </mesh>
            {/* Stylus Head / Cartridge */}
            <mesh position={[0, -0.008, 0.145]}>
              <boxGeometry args={[0.016, 0.014, 0.022]} />
              <meshStandardMaterial color="#E2E8F0" roughness={0.3} metalness={0.8} />
            </mesh>
          </group>
        </group>

        {/* ============================================================== */}
        {/* 5. ICONIC FLARED BRASS TRUMPET HORN (Artbor Signature)         */}
        {/* ============================================================== */}
        <group position={[0.09, 0.14, -0.09]}>
          {/* Dark Steel Support Elbow Bracket */}
          <mesh position={[0, 0.035, 0]} material={tonearmMat}>
            <cylinderGeometry args={[0.012, 0.014, 0.07, 12]} />
          </mesh>
          {/* Elbow curve connector */}
          <mesh position={[-0.01, 0.07, 0.02]} rotation={[0.4, -0.3, 0]} material={tonearmMat}>
            <cylinderGeometry args={[0.013, 0.013, 0.03, 12]} />
          </mesh>

          {/* Main Horn Assembly angled FORWARD & UP towards room / front */}
          <group position={[-0.02, 0.08, 0.03]} rotation={[0.65, -0.45, 0.15]}>
            {/* Lower Throat Tube */}
            <mesh position={[0, 0.04, 0]} material={hornOuterMat} castShadow>
              <cylinderGeometry args={[0.022, 0.016, 0.08, 8]} />
            </mesh>
            {/* Mid Conical Expansion */}
            <mesh position={[0, 0.10, 0]} material={hornOuterMat} castShadow>
              <cylinderGeometry args={[0.052, 0.022, 0.08, 8]} />
            </mesh>
            {/* Upper Expanding Flare */}
            <mesh position={[0, 0.17, 0]} material={hornOuterMat} castShadow>
              <cylinderGeometry args={[0.095, 0.052, 0.09, 8]} />
            </mesh>

            {/* 8 Faceted Brass Bell Petal Segments (The Signature Flower Horn) */}
            <mesh position={[0, 0.23, 0]} material={hornOuterMat} castShadow>
              <cylinderGeometry args={[0.165, 0.095, 0.065, 8]} />
            </mesh>

            {/* Wide Outer Petal Rim */}
            <mesh position={[0, 0.265, 0]} material={hornOuterMat} castShadow>
              <cylinderGeometry args={[0.19, 0.165, 0.02, 8]} />
            </mesh>

            {/* Dark Acoustic Interior Cavity Depth */}
            <mesh position={[0, 0.25, 0]} material={hornInnerMat}>
              <cylinderGeometry args={[0.155, 0.04, 0.08, 8]} />
            </mesh>

            {/* Floating Musical Sparkles / Acoustic Motes emitter */}
            <points ref={notesRef} position={[0, 0.28, 0]}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={notePositions.length / 3}
                  array={notePositions}
                  itemSize={3}
                />
              </bufferGeometry>
              <pointsMaterial
                size={0.03}
                color="#FDE047"
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </points>
          </group>
        </group>
      </group>
    </group>
  );
};
