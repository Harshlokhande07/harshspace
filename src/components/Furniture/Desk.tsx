import React from 'react';
import { ModelLoader, getModelUrl } from '../Room/ModelLoader';
import { FURNITURE_MODELS } from '../../data/models';

/**
 * Premium Modern Workstation Desk
 * Materials:
 * - Tabletop: Natural warm walnut (#724F36) with chamfered warm bronze edge accent (#C5A880)
 * - Frame/Legs: Powder-coated warm bronze-charcoal metal (#3A3530)
 */
const PrimitiveDesk: React.FC = () => {
  return (
    <group position={[-1.10, 0, -1.90]}>
      {/* Tabletop: 1.9m wide x 0.9m deep x 0.05m thick in Natural Warm Walnut */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.90, 0.05, 0.90]} />
        <meshStandardMaterial color="#724F36" roughness={0.42} metalness={0.05} />
      </mesh>

      {/* Chamfered front edge accent: warm champagne bronze (#C5A880) */}
      <mesh position={[0, 0.74, 0.44]}>
        <boxGeometry args={[1.88, 0.03, 0.02]} />
        <meshStandardMaterial color="#C5A880" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Metal Frame & Legs (Warm bronze-charcoal powder-coated steel) */}
      <mesh position={[-0.85, 0.36, 0]} castShadow>
        <boxGeometry args={[0.06, 0.72, 0.80]} />
        <meshStandardMaterial color="#3A3530" roughness={0.45} metalness={0.6} />
      </mesh>
      <mesh position={[0.85, 0.36, 0]} castShadow>
        <boxGeometry args={[0.06, 0.72, 0.80]} />
        <meshStandardMaterial color="#3A3530" roughness={0.45} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.65, -0.25]}>
        <boxGeometry args={[1.70, 0.04, 0.05]} />
        <meshStandardMaterial color="#3A3530" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Cable management net / tray underneath */}
      <mesh position={[0, 0.55, -0.3]}>
        <boxGeometry args={[1.2, 0.08, 0.18]} />
        <meshStandardMaterial color="#2E2822" roughness={0.8} />
      </mesh>
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
