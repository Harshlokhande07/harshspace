import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Industrial Ceiling Light 3 (1:1 Replica from Sketchfab by 32cm)
 * - Industrial flanged dark iron / hammered steel dome reflector shade (#23262D)
 * - Cast-aluminum socket housing with cooling ribs & compression cable gland (#5A606D)
 * - Braided steel suspension cable & ceiling anchor rosette drop from ceiling (Y = 2.80m down to Y = 2.10m)
 * - High-luminance warm filament LED bulb with glowing glass envelope
 * - Cast warm volumetric light cone pool illuminating the gaming PC setup below
 * - Constant warm illumination (always active)
 */
export const IndustrialCeilingLight: React.FC = () => {
  // Materials cached for top performance
  const {
    shadeMat,
    innerReflectorMat,
    socketMat,
    cableMat,
    rosetteMat,
    filamentMat,
    bulbGlassMat,
    lightConeMat,
  } = useMemo(() => {
    return {
      shadeMat: new THREE.MeshStandardMaterial({
        color: '#22252C',
        roughness: 0.38,
        metalness: 0.75,
      }),
      innerReflectorMat: new THREE.MeshStandardMaterial({
        color: '#FAF6ED',
        roughness: 0.25,
        metalness: 0.15,
      }),
      socketMat: new THREE.MeshStandardMaterial({
        color: '#555A64',
        roughness: 0.32,
        metalness: 0.85,
      }),
      cableMat: new THREE.MeshStandardMaterial({
        color: '#1A1C20',
        roughness: 0.6,
        metalness: 0.4,
      }),
      rosetteMat: new THREE.MeshStandardMaterial({
        color: '#282B33',
        roughness: 0.4,
        metalness: 0.7,
      }),
      filamentMat: new THREE.MeshStandardMaterial({
        color: '#FFFAF0',
        emissive: '#FFB74D',
        emissiveIntensity: 3.5,
        roughness: 0.1,
      }),
      bulbGlassMat: new THREE.MeshPhysicalMaterial({
        color: '#FFF3E0',
        transmission: 0.92,
        roughness: 0.08,
        metalness: 0.05,
        transparent: true,
        opacity: 0.4,
      }),
      lightConeMat: new THREE.MeshBasicMaterial({
        color: '#FFD59E',
        transparent: true,
        opacity: 0.09,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    };
  }, []);

  return (
    // Positioned directly on the ceiling above the gaming PC setup: X = -0.35, Z = -1.95
    <group position={[-0.35, 2.80, -1.95]}>
      {/* 1. Ceiling Rosette / Canopy Mount (Flush at Y = 2.80m) */}
      <mesh position={[0, -0.012, 0]} material={rosetteMat}>
        <cylinderGeometry args={[0.065, 0.075, 0.024, 24]} />
      </mesh>
      {/* Mounting bolts */}
      {[-0.045, 0.045].map((bx, i) => (
        <mesh key={i} position={[bx, -0.024, 0]} material={socketMat}>
          <cylinderGeometry args={[0.005, 0.005, 0.006, 12]} />
        </mesh>
      ))}

      {/* 2. Steel Suspension Cable & Power Cord dropping down to lamp (length: 0.60m) */}
      <mesh position={[0, -0.33, 0]} material={cableMat}>
        <cylinderGeometry args={[0.004, 0.004, 0.62, 12]} />
      </mesh>

      {/* 3. Industrial Pendant Fixture (Hanging at Y = -0.65m relative to ceiling, world Y = 2.15m) */}
      <group position={[0, -0.65, 0]}>
        {/* Cable gland nut */}
        <mesh position={[0, 0.12, 0]} material={socketMat}>
          <cylinderGeometry args={[0.014, 0.014, 0.025, 16]} />
        </mesh>
        {/* Top cast metal finial hook loop */}
        <mesh position={[0, 0.095, 0]} material={socketMat}>
          <torusGeometry args={[0.015, 0.004, 12, 24]} />
        </mesh>

        {/* Heavy Cast Aluminum Upper Socket Housing with Cooling Ribs */}
        <mesh position={[0, 0.05, 0]} material={socketMat} castShadow>
          <cylinderGeometry args={[0.038, 0.048, 0.08, 24]} />
        </mesh>
        {/* Cooling fin rings */}
        {[0.03, 0.05, 0.07].map((ry, idx) => (
          <mesh key={idx} position={[0, ry, 0]} material={socketMat}>
            <cylinderGeometry args={[0.043, 0.043, 0.006, 24]} />
          </mesh>
        ))}

        {/* Flanged Stepped Transition Collar */}
        <mesh position={[0, 0.005, 0]} material={shadeMat}>
          <cylinderGeometry args={[0.058, 0.078, 0.025, 32]} />
        </mesh>

        {/* Industrial Flanged Deep Dome Reflector Shade (Outer Iron) */}
        <mesh position={[0, -0.07, 0]} material={shadeMat} castShadow>
          <cylinderGeometry args={[0.076, 0.22, 0.13, 36, 1, true]} />
        </mesh>
        {/* Lower Shade Rolled Lip Rim */}
        <mesh position={[0, -0.135, 0]} material={shadeMat}>
          <torusGeometry args={[0.22, 0.008, 16, 36]} />
        </mesh>

        {/* High-Reflectance Enamel White Interior Lining */}
        <mesh position={[0, -0.069, 0]} material={innerReflectorMat}>
          <cylinderGeometry args={[0.074, 0.216, 0.128, 36, 1, true]} />
        </mesh>

        {/* 4. Bulb Assembly */}
        {/* Porcelain Ceramic Socket base */}
        <mesh position={[0, -0.03, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.03, 16]} />
          <meshStandardMaterial color="#EAEAEA" roughness={0.3} />
        </mesh>

        {/* Glowing Warm Filament Core (Always Active Warm Light) */}
        <mesh position={[0, -0.065, 0]} material={filamentMat}>
          <sphereGeometry args={[0.022, 20, 20]} />
        </mesh>

        {/* Vintage Edison/Globe Clear Glass Envelope */}
        <mesh position={[0, -0.068, 0]} material={bulbGlassMat}>
          <sphereGeometry args={[0.036, 24, 24]} />
        </mesh>

        {/* Constant Dedicated Real-Time Warm Spotlight (Always Active) */}
        <pointLight
          position={[0, -0.08, 0]}
          color="#FFA733"
          intensity={2.2}
          distance={3.2}
          decay={2}
          castShadow={false}
        />

        {/* Volumetric Soft Warm Downward Cone Pool onto Gaming PC Desk */}
        <mesh position={[0, -0.68, 0]}>
          <cylinderGeometry args={[0.20, 0.65, 1.15, 32, 1, true]} />
          <primitive object={lightConeMat} />
        </mesh>
      </group>
    </group>
  );
};
