import React from 'react';
import { ModelLoader, getModelUrl } from '../Room/ModelLoader';
import { FURNITURE_MODELS } from '../../data/models';

/**
 * Luxury Modern Platform Bed
 * Materials:
 * - Base platform: Natural oak / warm walnut (#6B4B35)
 * - Upholstered headboard: Warm beige / light greige (#B8AFA2)
 * - Headboard insert: Soft textured warm linen (#C4BCB0)
 * - Mattress: Crisp off-white (#F8F6F0)
 * - Duvet / bedding: Cream / warm off-white (#EDE6DA) with soft taupe fold (#C5BDB0)
 * - Pillows: Soft cream (#F5F0E6) with an organic sage green accent cushion (#6B8E7B)
 */
const PrimitiveBed: React.FC = () => {
  return (
    <group position={[1.65, 0, -1.35]}>
      {/* Wooden platform base in Natural Oak / Warm Walnut (#6B4B35) */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.60, 0.36, 2.10]} />
        <meshStandardMaterial color="#6B4B35" roughness={0.5} metalness={0.06} />
      </mesh>

      {/* Headboard in Warm Beige (#B8AFA2) */}
      <mesh position={[0, 0.75, -1.00]} castShadow receiveShadow>
        <boxGeometry args={[1.65, 0.85, 0.10]} />
        <meshStandardMaterial color="#B8AFA2" roughness={0.65} metalness={0.04} />
      </mesh>

      {/* Upholstered headboard fabric insert in Soft Linen (#C4BCB0) */}
      <mesh position={[0, 0.78, -0.94]}>
        <boxGeometry args={[1.50, 0.65, 0.04]} />
        <meshStandardMaterial color="#C4BCB0" roughness={0.88} />
      </mesh>

      {/* Mattress in Crisp Off-White (#F8F6F0) */}
      <mesh position={[0, 0.44, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.50, 0.28, 1.95]} />
        <meshStandardMaterial color="#F8F6F0" roughness={0.85} />
      </mesh>

      {/* Cozy duvet / comforter in Cream Warm Off-White (#EDE6DA) */}
      <mesh position={[0, 0.52, 0.25]} castShadow receiveShadow>
        <boxGeometry args={[1.52, 0.16, 1.45]} />
        <meshStandardMaterial color="#EDE6DA" roughness={0.88} />
      </mesh>

      {/* Duvet fold accent line in Soft Taupe (#C5BDB0) */}
      <mesh position={[0, 0.61, -0.45]}>
        <boxGeometry args={[1.48, 0.04, 0.18]} />
        <meshStandardMaterial color="#C5BDB0" roughness={0.85} />
      </mesh>

      {/* Left Pillow in Soft Cream (#F5F0E6) */}
      <mesh position={[-0.38, 0.64, -0.70]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.55, 0.14, 0.4]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.9} />
      </mesh>

      {/* Right Pillow in Soft Cream (#F5F0E6) */}
      <mesh position={[0.38, 0.64, -0.70]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.55, 0.14, 0.4]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.9} />
      </mesh>

      {/* Tasteful Accent Cushion in Natural Sage Green (#6B8E7B) */}
      <mesh position={[0, 0.66, -0.58]} rotation={[0.3, 0.1, -0.05]}>
        <boxGeometry args={[0.38, 0.12, 0.30]} />
        <meshStandardMaterial color="#6B8E7B" roughness={0.9} />
      </mesh>
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
