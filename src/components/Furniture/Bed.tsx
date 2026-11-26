import React from 'react';
import { ModelLoader, getModelUrl } from '../Room/ModelLoader';
import { FURNITURE_MODELS } from '../../data/models';

/**
 * Luxury Modern Platform Bed (Phase 3 Polish)
 * Materials:
 * - Base platform: Natural oak / warm walnut (#6B4B35)
 * - Upholstered headboard: Warm beige / light greige (#B8AFA2) with vertical channel seams
 * - Headboard insert: Soft textured warm linen (#C4BCB0)
 * - Mattress: Crisp off-white (#F8F6F0) with deep plush comfort top
 * - Duvet / bedding: Cream / warm off-white (#EDE6DA) with layered soft taupe folds (#C5BDB0)
 * - Pillows: Soft cream (#F5F0E6) with an organic sage green accent cushion (#6B8E7B)
 * - Integrated Floating Bedside Wing Shelf:
 *   - Minimalist glass water carafe and tumbler
 *   - Smartphone on wireless charging dock with soft green LED
 *   - Architectural warm reading light
 */
const PrimitiveBed: React.FC = () => {
  return (
    <group position={[1.65, 0, -1.35]}>
      {/* 1. Wooden platform base in Natural Oak / Warm Walnut (#6B4B35) */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.60, 0.36, 2.10]} />
        <meshStandardMaterial color="#6B4B35" roughness={0.5} metalness={0.06} />
      </mesh>

      {/* 2. Headboard in Warm Beige (#B8AFA2) */}
      <mesh position={[0, 0.75, -1.00]} castShadow receiveShadow>
        <boxGeometry args={[1.65, 0.85, 0.10]} />
        <meshStandardMaterial color="#B8AFA2" roughness={0.65} metalness={0.04} />
      </mesh>

      {/* Upholstered headboard fabric insert with channel seams in Soft Linen (#C4BCB0) */}
      <mesh position={[0, 0.78, -0.94]}>
        <boxGeometry args={[1.50, 0.65, 0.04]} />
        <meshStandardMaterial color="#C4BCB0" roughness={0.88} />
      </mesh>
      {/* Vertical channel stitching accents */}
      {[-0.5, -0.25, 0, 0.25, 0.5].map((cx, idx) => (
        <mesh key={idx} position={[cx, 0.78, -0.918]}>
          <boxGeometry args={[0.005, 0.63, 0.003]} />
          <meshStandardMaterial color="#9E9486" roughness={0.9} />
        </mesh>
      ))}

      {/* 3. Mattress in Crisp Off-White (#F8F6F0) */}
      <mesh position={[0, 0.44, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.50, 0.28, 1.95]} />
        <meshStandardMaterial color="#F8F6F0" roughness={0.85} />
      </mesh>

      {/* 4. Cozy duvet / comforter in Cream Warm Off-White (#EDE6DA) */}
      <mesh position={[0, 0.52, 0.25]} castShadow receiveShadow>
        <boxGeometry args={[1.52, 0.16, 1.45]} />
        <meshStandardMaterial color="#EDE6DA" roughness={0.88} />
      </mesh>

      {/* Duvet tiered fold accent lines in Soft Taupe (#C5BDB0) */}
      <mesh position={[0, 0.61, -0.45]}>
        <boxGeometry args={[1.48, 0.04, 0.18]} />
        <meshStandardMaterial color="#C5BDB0" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.59, -0.32]}>
        <boxGeometry args={[1.50, 0.03, 0.10]} />
        <meshStandardMaterial color="#D6CEBF" roughness={0.85} />
      </mesh>

      {/* 5. Pillows in Soft Cream (#F5F0E6) */}
      <mesh position={[-0.38, 0.64, -0.70]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.55, 0.14, 0.40]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.9} />
      </mesh>
      <mesh position={[0.38, 0.64, -0.70]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.55, 0.14, 0.40]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.9} />
      </mesh>

      {/* Accent Cushion in Natural Sage Green (#6B8E7B) */}
      <mesh position={[0, 0.66, -0.58]} rotation={[0.3, 0.1, -0.05]} castShadow>
        <boxGeometry args={[0.38, 0.12, 0.30]} />
        <meshStandardMaterial color="#6B8E7B" roughness={0.9} />
      </mesh>

      {/* 6. Integrated Bedside Shelf Table on Left Corridor Wing (X = -0.70, Z = -0.80) */}
      <group position={[-0.68, 0.36, -0.82]}>
        {/* Floating Walnut Shelf */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.24, 0.04, 0.34]} />
          <meshStandardMaterial color="#6B4B35" roughness={0.45} metalness={0.06} />
        </mesh>
        {/* Champagne Metal Edge Strip */}
        <mesh position={[-0.12, 0, 0]}>
          <boxGeometry args={[0.005, 0.042, 0.342]} />
          <meshStandardMaterial color="#C5B49E" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Minimal Glass Water Carafe */}
        <mesh position={[0.04, 0.10, -0.06]} castShadow>
          <cylinderGeometry args={[0.035, 0.04, 0.16, 16]} />
          <meshPhysicalMaterial
            color="#E2E8F0"
            transmission={0.88}
            roughness={0.08}
            metalness={0.1}
            transparent={true}
            opacity={0.5}
          />
        </mesh>
        {/* Glass Tumbler */}
        <mesh position={[-0.04, 0.06, -0.06]}>
          <cylinderGeometry args={[0.025, 0.02, 0.08, 16]} />
          <meshPhysicalMaterial
            color="#E2E8F0"
            transmission={0.88}
            roughness={0.08}
            metalness={0.1}
            transparent={true}
            opacity={0.5}
          />
        </mesh>

        {/* Smartphone on Inductive Charging Dock with Soft Green LED */}
        <group position={[0, 0.025, 0.07]}>
          {/* Charger Pad */}
          <mesh>
            <cylinderGeometry args={[0.04, 0.045, 0.008, 20]} />
            <meshStandardMaterial color="#1E232E" roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Phone Body */}
          <mesh position={[0, 0.008, 0]}>
            <boxGeometry args={[0.068, 0.008, 0.135]} />
            <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.85} />
          </mesh>
          {/* Subtle Green Battery Status LED */}
          <mesh position={[0, 0.013, -0.06]}>
            <boxGeometry args={[0.004, 0.002, 0.004]} />
            <meshStandardMaterial
              color="#000000"
              emissive="#22c55e"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export const Bed: React.FC = () => {
  const config = FURNITURE_MODELS.bed;
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
      fallback={<PrimitiveBed />}
    />
  );
};
