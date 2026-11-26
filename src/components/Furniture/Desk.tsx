import React from 'react';
import { ModelLoader, getModelUrl } from '../Room/ModelLoader';
import { FURNITURE_MODELS } from '../../data/models';

/**
 * Premium Modern Workstation Desk (Phase 3 Polish)
 * Features:
 * - Solid natural walnut tabletop (#724F36) with dual-chamfered ergonomic front edge
 * - Dual champagne metal cable grommet pass-throughs (#C5B49E)
 * - Heavy-duty O-frame powder-coated steel legs (#3A3530) with threaded leveling footpads
 * - Under-desk reinforcing spine & perforated cable management raceway
 * - Under-mount headphone hanger with studio over-ear headphones
 * - Desktop accessories: Anodized aluminum pen pot with stylus, inductive phone charging dock
 */
const PrimitiveDesk: React.FC = () => {
  return (
    <group position={[-1.10, 0, -1.90]}>
      {/* 1. Walnut Tabletop: 1.90m wide x 0.90m deep x 0.045m thick */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.90, 0.045, 0.90]} />
        <meshStandardMaterial color="#724F36" roughness={0.38} metalness={0.04} />
      </mesh>

      {/* Ergonomic chamfered front edge (bevel comfort strip) */}
      <mesh position={[0, 0.735, 0.445]} rotation={[0.4, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.88, 0.02, 0.02]} />
        <meshStandardMaterial color="#5E3F29" roughness={0.4} metalness={0.04} />
      </mesh>

      {/* Dual Champagne Metal Cable Grommets */}
      {[-0.65, 0.65].map((gx, idx) => (
        <group key={idx} position={[gx, 0.763, -0.32]}>
          <mesh>
            <cylinderGeometry args={[0.035, 0.035, 0.004, 24]} />
            <meshStandardMaterial color="#C5B49E" roughness={0.3} metalness={0.75} />
          </mesh>
          <mesh position={[0, 0.001, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.006, 24]} />
            <meshStandardMaterial color="#1E1915" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* 2. Powder-Coated Steel Frame & O-Legs (#3A3530) */}
      {/* Left O-Frame Leg */}
      <group position={[-0.85, 0.36, 0]}>
        {/* Front upright */}
        <mesh position={[0, 0, 0.38]} castShadow>
          <boxGeometry args={[0.05, 0.72, 0.05]} />
          <meshStandardMaterial color="#3A3530" roughness={0.45} metalness={0.65} />
        </mesh>
        {/* Rear upright */}
        <mesh position={[0, 0, -0.38]} castShadow>
          <boxGeometry args={[0.05, 0.72, 0.05]} />
          <meshStandardMaterial color="#3A3530" roughness={0.45} metalness={0.65} />
        </mesh>
        {/* Top mounting plate */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.06, 0.02, 0.81]} />
          <meshStandardMaterial color="#3A3530" roughness={0.5} metalness={0.65} />
        </mesh>
        {/* Bottom foot bar */}
        <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.06, 0.02, 0.82]} />
          <meshStandardMaterial color="#3A3530" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Leveling footpads */}
        {[-0.37, 0.37].map((fz, fIdx) => (
          <mesh key={fIdx} position={[0, -0.365, fz]}>
            <cylinderGeometry args={[0.02, 0.025, 0.012, 16]} />
            <meshStandardMaterial color="#1F1D1A" roughness={0.6} metalness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Right O-Frame Leg */}
      <group position={[0.85, 0.36, 0]}>
        {/* Front upright */}
        <mesh position={[0, 0, 0.38]} castShadow>
          <boxGeometry args={[0.05, 0.72, 0.05]} />
          <meshStandardMaterial color="#3A3530" roughness={0.45} metalness={0.65} />
        </mesh>
        {/* Rear upright */}
        <mesh position={[0, 0, -0.38]} castShadow>
          <boxGeometry args={[0.05, 0.72, 0.05]} />
          <meshStandardMaterial color="#3A3530" roughness={0.45} metalness={0.65} />
        </mesh>
        {/* Top mounting plate */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.06, 0.02, 0.81]} />
          <meshStandardMaterial color="#3A3530" roughness={0.5} metalness={0.65} />
        </mesh>
        {/* Bottom foot bar */}
        <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.06, 0.02, 0.82]} />
          <meshStandardMaterial color="#3A3530" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Leveling footpads */}
        {[-0.37, 0.37].map((fz, fIdx) => (
          <mesh key={fIdx} position={[0, -0.365, fz]}>
            <cylinderGeometry args={[0.02, 0.025, 0.012, 16]} />
            <meshStandardMaterial color="#1F1D1A" roughness={0.6} metalness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Heavy central crossbar spine */}
      <mesh position={[0, 0.67, -0.22]}>
        <boxGeometry args={[1.65, 0.04, 0.04]} />
        <meshStandardMaterial color="#2E2A26" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Under-desk cable management net tray */}
      <mesh position={[0, 0.58, -0.25]}>
        <boxGeometry args={[1.30, 0.09, 0.20]} />
        <meshStandardMaterial color="#24211D" roughness={0.8} />
      </mesh>

      {/* 3. Under-Mount Headphone Hanger & Studio Headphones */}
      <group position={[-0.88, 0.68, 0.2]}>
        {/* Aluminum hanger bracket */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.04, 0.08, 0.03]} />
          <meshStandardMaterial color="#C5B49E" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.04, 0.025]}>
          <boxGeometry args={[0.04, 0.01, 0.05]} />
          <meshStandardMaterial color="#C5B49E" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Studio Over-Ear Headphones */}
        <group position={[0, -0.12, 0.035]} rotation={[0, 0, 0.1]}>
          {/* Headband arch */}
          <mesh position={[0, 0.07, 0]}>
            <torusGeometry args={[0.065, 0.008, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#2B2824" roughness={0.6} />
          </mesh>
          {/* Left ear cup */}
          <mesh position={[-0.06, 0.01, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.025, 16]} />
            <meshStandardMaterial color="#3A3530" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Right ear cup */}
          <mesh position={[0.06, 0.01, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.025, 16]} />
            <meshStandardMaterial color="#3A3530" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* 4. Desktop Accessories (Right Side Developer Tools) */}
      {/* Aluminum Cylindrical Pen & Stylus Holder */}
      <group position={[0.62, 0.763, -0.10]}>
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.10, 20]} />
          <meshStandardMaterial color="#333842" roughness={0.35} metalness={0.85} />
        </mesh>
        {/* Stylus / Apple-Pencil angled in cup */}
        <mesh position={[0.01, 0.09, 0.01]} rotation={[0.15, 0.2, 0.2]} castShadow>
          <cylinderGeometry args={[0.004, 0.004, 0.14, 12]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Mechanical Drafting Pen */}
        <mesh position={[-0.012, 0.085, -0.01]} rotation={[-0.18, 0, -0.12]} castShadow>
          <cylinderGeometry args={[0.0045, 0.0045, 0.13, 12]} />
          <meshStandardMaterial color="#C5B49E" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Smartphone on Charging Pad */}
      <group position={[0.74, 0.763, 0.12]} rotation={[0, -0.1, 0]}>
        {/* Dark leatherette coaster charging pad */}
        <mesh position={[0, 0.003, 0]}>
          <boxGeometry args={[0.085, 0.006, 0.15]} />
          <meshStandardMaterial color="#1E222A" roughness={0.6} />
        </mesh>
        {/* Glass Phone */}
        <mesh position={[0, 0.008, 0]}>
          <boxGeometry args={[0.07, 0.007, 0.14]} />
          <meshStandardMaterial color="#0A0C10" roughness={0.15} metalness={0.9} />
        </mesh>
        {/* Soft amber charge indicator glow */}
        <mesh position={[0, 0.012, 0.065]}>
          <circleGeometry args={[0.002, 8]} />
          <meshStandardMaterial color="#000000" emissive="#F59E0B" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
};

export const Desk: React.FC = () => {
  const config = FURNITURE_MODELS.desk;
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
      fallback={<PrimitiveDesk />}
    />
  );
};
