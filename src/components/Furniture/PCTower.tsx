import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ModelLoader, getModelUrl } from '../Room/ModelLoader';
import { FURNITURE_MODELS } from '../../data/models';

/**
 * Photorealistic Gaming PC Tower (Phase 2 Enhancement)
 * High-end ATX Mid-Tower with:
 * - Anodized matte graphite chassis (#1E222B) with beveled corners & magnetic top dust filter
 * - High-clarity tempered glass side panel with transmission & subtle reflections
 * - Fully detailed interior:
 *   - ATX Motherboard with silver aluminum heatsinks
 *   - Triple-slot High-End GPU with backplate, cooling fins & illuminated side emblem
 *   - 240mm AIO liquid CPU cooler with circular infinity mirror block & braided dual tubing
 *   - Dual RGB RAM heatsinks with soft diffused pastel lighting
 *   - Front dual 140mm intake fans & rear 120mm exhaust fan with subtle ring glow
 */
const PrimitivePCTower: React.FC = () => {
  const gpuLogoMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const aioBlockMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const ramMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const fanRingMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Controlled, tasteful pastel RGB wave (does not overpower the room)
    const r = (Math.sin(t * 1.2) + 1) / 2 * 0.4 + 0.3;
    const g = (Math.sin(t * 1.2 + 2) + 1) / 2 * 0.4 + 0.3;
    const b = (Math.sin(t * 1.2 + 4) + 1) / 2 * 0.4 + 0.5;

    if (gpuLogoMatRef.current) {
      gpuLogoMatRef.current.emissive.setRGB(r * 0.8, g * 0.8, b);
      gpuLogoMatRef.current.emissiveIntensity = 0.9;
    }
    if (aioBlockMatRef.current) {
      aioBlockMatRef.current.emissive.setRGB(r, g * 0.7, b);
      aioBlockMatRef.current.emissiveIntensity = 0.85;
    }
    if (ramMatRef.current) {
      ramMatRef.current.emissive.setRGB(r * 0.6, g * 0.9, b);
      ramMatRef.current.emissiveIntensity = 0.75;
    }
    if (fanRingMatRef.current) {
      fanRingMatRef.current.emissive.setRGB(r * 0.5, g * 0.7, b);
      fanRingMatRef.current.emissiveIntensity = 0.5;
    }
  });

  return (
    <group position={[-0.35, 0.74, -1.95]}>
      {/* 1. Main Outer Chassis: 0.22m W x 0.50m H x 0.46m D in Matte Graphite (#1E222B) */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.22, 0.50, 0.46]} />
        <meshStandardMaterial color="#1E222B" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Top Magnetic Mesh Dust Filter */}
      <mesh position={[0, 0.502, 0]}>
        <boxGeometry args={[0.18, 0.004, 0.38]} />
        <meshStandardMaterial color="#141820" roughness={0.7} metalness={0.4} />
      </mesh>

      {/* Front Perforated Intake Bezel */}
      <mesh position={[0, 0.25, 0.232]}>
        <boxGeometry args={[0.20, 0.48, 0.008]} />
        <meshStandardMaterial color="#12151B" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Front Dual 140mm Intake Fan Rings */}
      {[0.16, 0.34].map((fy, fIdx) => (
        <group key={fIdx} position={[0, fy, 0.233]}>
          <mesh>
            <ringGeometry args={[0.045, 0.058, 24]} />
            <meshStandardMaterial
              ref={fIdx === 0 ? fanRingMatRef : undefined}
              color="#000000"
              emissive="#38bdf8"
              emissiveIntensity={0.5}
              roughness={0.2}
            />
          </mesh>
          {/* Fan center motor hub */}
          <mesh position={[0, 0, -0.002]}>
            <circleGeometry args={[0.02, 16]} />
            <meshStandardMaterial color="#1F242D" roughness={0.4} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* 2. PC Interior Components (viewed through side glass) */}
      <group position={[-0.01, 0, 0]}>
        {/* Motherboard Backplate Tray */}
        <mesh position={[-0.08, 0.26, 0]}>
          <boxGeometry args={[0.01, 0.36, 0.32]} />
          <meshStandardMaterial color="#111317" roughness={0.7} metalness={0.3} />
        </mesh>

        {/* Silver Aluminum VRM & Chipset Heatsinks */}
        <mesh position={[-0.07, 0.39, -0.08]}>
          <boxGeometry args={[0.015, 0.06, 0.05]} />
          <meshStandardMaterial color="#A3ABB8" roughness={0.25} metalness={0.9} />
        </mesh>
        <mesh position={[-0.07, 0.35, -0.12]}>
          <boxGeometry args={[0.015, 0.08, 0.04]} />
          <meshStandardMaterial color="#A3ABB8" roughness={0.25} metalness={0.9} />
        </mesh>

        {/* Triple-Slot High-End GPU with Aluminum Backplate */}
        <group position={[-0.01, 0.22, 0.02]}>
          {/* Main GPU Body */}
          <mesh castShadow position={[0, 0, 0]}>
            <boxGeometry args={[0.13, 0.055, 0.28]} />
            <meshStandardMaterial color="#16181D" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Brushed Metal Top Backplate */}
          <mesh position={[0, 0.029, 0]}>
            <boxGeometry args={[0.128, 0.004, 0.276]} />
            <meshStandardMaterial color="#8B94A0" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Illuminated Side GPU Logo */}
          <mesh position={[0.066, 0.005, 0.04]}>
            <boxGeometry args={[0.004, 0.016, 0.10]} />
            <meshStandardMaterial
              ref={gpuLogoMatRef}
              color="#000000"
              emissive="#38bdf8"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Heatsink fin slats */}
          <mesh position={[0.066, -0.012, -0.04]}>
            <boxGeometry args={[0.004, 0.022, 0.16]} />
            <meshStandardMaterial color="#C5CBD3" roughness={0.2} metalness={0.95} />
          </mesh>
        </group>

        {/* AIO Liquid CPU Cooler Pump Block with Infinity Mirror */}
        <group position={[-0.06, 0.34, -0.04]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.032, 0.032, 0.025, 24]} />
            <meshStandardMaterial color="#16191F" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Illuminated Infinity Ring */}
          <mesh position={[0, 0.013, 0]}>
            <ringGeometry args={[0.016, 0.028, 24]} />
            <meshStandardMaterial
              ref={aioBlockMatRef}
              color="#000000"
              emissive="#38bdf8"
              emissiveIntensity={0.8}
              roughness={0.1}
            />
          </mesh>
          {/* Braided Sleeved Dual Water Tubing */}
          <mesh position={[0, 0.008, 0.03]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.14, 12]} />
            <meshStandardMaterial color="#1E232B" roughness={0.7} />
          </mesh>
        </group>

        {/* Dual High-Performance RGB RAM Modules */}
        {[-0.01, 0.015].map((rz, rIdx) => (
          <group key={rIdx} position={[-0.065, 0.36, 0.02 + rz]}>
            {/* Black Heatsink Spreader */}
            <mesh>
              <boxGeometry args={[0.008, 0.045, 0.04]} />
              <meshStandardMaterial color="#16191F" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Top Light Diffuser Bar */}
            <mesh position={[0, 0.024, 0]}>
              <boxGeometry args={[0.009, 0.006, 0.038]} />
              <meshStandardMaterial
                ref={rIdx === 0 ? ramMatRef : undefined}
                color="#000000"
                emissive="#a855f7"
                emissiveIntensity={0.7}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}

        {/* Rear 120mm Exhaust Fan with Ring Glow */}
        <group position={[-0.05, 0.34, -0.19]} rotation={[0, Math.PI / 2, 0]}>
          <mesh>
            <ringGeometry args={[0.042, 0.054, 20]} />
            <meshStandardMaterial
              color="#000000"
              emissive="#38bdf8"
              emissiveIntensity={0.4}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Power Supply Shroud Chamber */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.19, 0.10, 0.42]} />
          <meshStandardMaterial color="#14171E" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>

      {/* 3. Tempered Glass Left Side Panel (Full-View Seamless Window) */}
      <mesh position={[0.112, 0.25, 0]}>
        <planeGeometry args={[0.44, 0.48]} />
        <meshPhysicalMaterial
          color="#E2E8F0"
          roughness={0.05}
          metalness={0.1}
          transmission={0.88}
          thickness={0.02}
          transparent={true}
          opacity={0.3}
          reflectivity={0.5}
        />
      </mesh>
    </group>
  );
};

export const PCTower: React.FC = () => {
  const config = FURNITURE_MODELS.pc;
  const url = getModelUrl(config.fileName);

  return (
    <ModelLoader
      url={url}
      position={config.position}
      rotation={config.rotation}
      targetSize={config.targetSize}
      verticalOffset={config.verticalOffset}
      castShadow={config.castShadow}
      receiveShadow={config.receiveShadow}
      hasBakedLighting={config.hasBakedLighting}
      fallback={<PrimitivePCTower />}
    />
  );
};
