import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 1:1 Replica of "Minecraft Girl Skin" by hiyeeter_ (Sketchfab / Blockbench)
 * Model UID: fe82d9ff77cd4451a4062536404836bd
 *
 * Visual Characteristics:
 * - Minecraft Alex standard slim-model proportions (3px arms, 4px legs)
 * - Long black side-braided hair with subtle teal hair ribbons, yellow hairclip, and pink clip
 * - Pale peach skin tone (#FDE2D2 / #F8D3BE)
 * - Soft grey/slate knit sweater jacket (#7D8B99 / #606E7D) with rolled sleeve cuffs
 * - Light sky-blue / cyan denim shorts (#67C5DE / #48A7C2) with white roll-up hems
 * - Grey/cyan slip-on footwear
 * - Playful friendly waving pose (left arm raised waving gently, right arm resting, head tilted slightly)
 * - Positioned on the interaction ring next to the Bookshelf along the South wall (X = -0.65, Z = 2.15)
 */
export const MinecraftGirl: React.FC = () => {
  const waveArmRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  // Materials cached with useMemo
  const {
    skinMat,
    hairMat,
    eyeWhiteMat,
    eyePupilMat,
    blushMat,
    yellowClipMat,
    pinkClipMat,
    tealRibbonMat,
    sweaterMat,
    sweaterLightMat,
    shortsMat,
    shortsHemMat,
    shoeMat,
  } = useMemo(() => {
    return {
      skinMat: new THREE.MeshStandardMaterial({
        color: '#F9D9C8',
        roughness: 0.6,
      }),
      hairMat: new THREE.MeshStandardMaterial({
        color: '#26292E',
        roughness: 0.65,
      }),
      eyeWhiteMat: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.4,
      }),
      eyePupilMat: new THREE.MeshStandardMaterial({
        color: '#2B303A',
        roughness: 0.3,
      }),
      blushMat: new THREE.MeshStandardMaterial({
        color: '#F4A5A5',
        roughness: 0.5,
      }),
      yellowClipMat: new THREE.MeshStandardMaterial({
        color: '#FACC15',
        roughness: 0.3,
      }),
      pinkClipMat: new THREE.MeshStandardMaterial({
        color: '#F472B6',
        roughness: 0.3,
      }),
      tealRibbonMat: new THREE.MeshStandardMaterial({
        color: '#67E8F9',
        roughness: 0.4,
      }),
      sweaterMat: new THREE.MeshStandardMaterial({
        color: '#707F8F',
        roughness: 0.75,
      }),
      sweaterLightMat: new THREE.MeshStandardMaterial({
        color: '#94A3B8',
        roughness: 0.75,
      }),
      shortsMat: new THREE.MeshStandardMaterial({
        color: '#52B8D2',
        roughness: 0.7,
      }),
      shortsHemMat: new THREE.MeshStandardMaterial({
        color: '#BAE6FD',
        roughness: 0.7,
      }),
      shoeMat: new THREE.MeshStandardMaterial({
        color: '#64748B',
        roughness: 0.6,
      }),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Gentle waving loop on raised left arm
    if (waveArmRef.current) {
      waveArmRef.current.rotation.z = 2.1 + Math.sin(t * 3.5) * 0.22;
      waveArmRef.current.rotation.x = Math.cos(t * 3.5) * 0.12;
    }

    // Subtle breathing / head idle tilt
    if (headRef.current) {
      headRef.current.rotation.y = 0.12 + Math.sin(t * 0.8) * 0.05;
      headRef.current.rotation.z = -0.05 + Math.cos(t * 1.2) * 0.02;
    }
  });

  return (
    // Situated beside Bookshelf at X = -0.65, Z = 2.15, facing towards room center
    <group position={[-0.65, 0, 2.15]} rotation={[0, -0.35, 0]}>
      {/* Minecraft scale: total height ~1.8m (Blockbench standard human: 32 pixels tall = 1.80m) */}
      <group scale={[0.056, 0.056, 0.056]}>
        {/* ============================================================== */}
        {/* 1. LEGS & SHOES (Y: 0 to 12)                                   */}
        {/* ============================================================== */}
        {/* Left Leg */}
        <group position={[-2.0, 6, 0]}>
          {/* Leg Base / Skin */}
          <mesh position={[0, -0.5, 0]} material={skinMat} castShadow>
            <boxGeometry args={[4, 11, 4]} />
          </mesh>
          {/* Cyan Shorts Cuff */}
          <mesh position={[0, 4.0, 0]} material={shortsMat}>
            <boxGeometry args={[4.1, 4, 4.1]} />
          </mesh>
          <mesh position={[0, 1.8, 0]} material={shortsHemMat}>
            <boxGeometry args={[4.2, 0.8, 4.2]} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -5.4, 0.2]} material={shoeMat}>
            <boxGeometry args={[4.1, 1.4, 4.4]} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group position={[2.0, 6, 0]}>
          {/* Leg Base / Skin */}
          <mesh position={[0, -0.5, 0]} material={skinMat} castShadow>
            <boxGeometry args={[4, 11, 4]} />
          </mesh>
          {/* Cyan Shorts Cuff */}
          <mesh position={[0, 4.0, 0]} material={shortsMat}>
            <boxGeometry args={[4.1, 4, 4.1]} />
          </mesh>
          <mesh position={[0, 1.8, 0]} material={shortsHemMat}>
            <boxGeometry args={[4.2, 0.8, 4.2]} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -5.4, 0.2]} material={shoeMat}>
            <boxGeometry args={[4.1, 1.4, 4.4]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 2. TORSO & SWEATER JACKET (Y: 12 to 24)                       */}
        {/* ============================================================== */}
        <group position={[0, 18, 0]}>
          {/* Inner Torso / Skin */}
          <mesh material={skinMat} castShadow>
            <boxGeometry args={[8, 12, 4]} />
          </mesh>
          {/* Oversized Grey Knit Sweater Layer */}
          <mesh position={[0, -0.5, 0]} material={sweaterMat}>
            <boxGeometry args={[8.3, 11.5, 4.3]} />
          </mesh>
          {/* Sweater Hem & Front Zipper/Button Fold */}
          <mesh position={[0, 0, 2.18]} material={sweaterLightMat}>
            <boxGeometry args={[1.2, 11.5, 0.1]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 3. RIGHT ARM (Resting / Casual at side)                       */}
        {/* ============================================================== */}
        <group position={[5.5, 22, 0]} rotation={[0.08, 0, -0.06]}>
          {/* Upper Arm Sweater Sleeve */}
          <mesh position={[0, -4, 0]} material={sweaterMat} castShadow>
            <boxGeometry args={[3.2, 8, 4.2]} />
          </mesh>
          {/* Forearm Skin & Hand */}
          <mesh position={[0, -9.5, 0]} material={skinMat}>
            <boxGeometry args={[3, 5, 4]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 4. LEFT ARM (Raised Friendly Waving Pose)                      */}
        {/* ============================================================== */}
        <group ref={waveArmRef} position={[-5.5, 23, 0]} rotation={[0, 0, 2.1]}>
          {/* Sleeve */}
          <mesh position={[0, -4, 0]} material={sweaterMat} castShadow>
            <boxGeometry args={[3.2, 8, 4.2]} />
          </mesh>
          {/* Forearm & Waving Hand */}
          <mesh position={[0, -9.5, 0]} material={skinMat}>
            <boxGeometry args={[3, 5, 4]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 5. HEAD & DETAILED ANIME/MINECRAFT HAIR (Y: 24 to 32)         */}
        {/* ============================================================== */}
        <group ref={headRef} position={[0, 28, 0]}>
          {/* Head Base Cube */}
          <mesh material={skinMat} castShadow>
            <boxGeometry args={[8, 8, 8]} />
          </mesh>

          {/* Eyes (Front Z = 4.02) */}
          {/* Left Eye */}
          <group position={[-2.0, 0.2, 4.02]}>
            <mesh material={eyeWhiteMat}>
              <boxGeometry args={[1.4, 2.4, 0.05]} />
            </mesh>
            <mesh position={[0.2, -0.3, 0.03]} material={eyePupilMat}>
              <boxGeometry args={[0.9, 1.6, 0.05]} />
            </mesh>
          </group>
          {/* Right Eye */}
          <group position={[2.0, 0.2, 4.02]}>
            <mesh material={eyeWhiteMat}>
              <boxGeometry args={[1.4, 2.4, 0.05]} />
            </mesh>
            <mesh position={[-0.2, -0.3, 0.03]} material={eyePupilMat}>
              <boxGeometry args={[0.9, 1.6, 0.05]} />
            </mesh>
          </group>

          {/* Cheerful Blush Pixels */}
          <mesh position={[-2.6, -1.6, 4.02]} material={blushMat}>
            <boxGeometry args={[1.2, 0.6, 0.05]} />
          </mesh>
          <mesh position={[2.6, -1.6, 4.02]} material={blushMat}>
            <boxGeometry args={[1.2, 0.6, 0.05]} />
          </mesh>

          {/* Dark Charcoal Hair Helmet Outer Layer */}
          <mesh position={[0, 0.6, -0.2]} material={hairMat}>
            <boxGeometry args={[8.4, 8.4, 8.5]} />
          </mesh>

          {/* Front Bangs Fringe */}
          <mesh position={[0, 3.2, 4.1]} material={hairMat}>
            <boxGeometry args={[8.4, 2.2, 0.4]} />
          </mesh>

          {/* Left Side Long Braid Plait hanging down over shoulder */}
          <group position={[-3.8, -4.5, 1.5]}>
            <mesh material={hairMat} castShadow>
              <boxGeometry args={[1.8, 12, 2.0]} />
            </mesh>
            {/* Teal Hair Ribbon Band */}
            <mesh position={[0, -5.0, 0]} material={tealRibbonMat}>
              <boxGeometry args={[1.9, 0.8, 2.1]} />
            </mesh>
          </group>

          {/* Hair Clips */}
          {/* Yellow Barrette Clip on Top-Left */}
          <mesh position={[-2.4, 3.5, 4.15]} material={yellowClipMat}>
            <boxGeometry args={[1.6, 0.6, 0.15]} />
          </mesh>
          {/* Pink Hair Clip */}
          <mesh position={[-3.2, 2.4, 4.15]} material={pinkClipMat}>
            <boxGeometry args={[0.8, 0.8, 0.15]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
