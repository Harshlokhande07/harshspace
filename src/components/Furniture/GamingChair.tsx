import React from 'react';
import { ModelLoader, getModelUrl } from '../Room/ModelLoader';
import { FURNITURE_MODELS } from '../../data/models';

/**
 * Modern Ergonomic Gaming Chair
 * Materials:
 * - Charcoal performance fabric (#3C3F48) with light warm grey panels (#9AA0AA)
 * - Subtle cyan accent piping (#38bdf8)
 * - Satin aluminum hydraulic piston & castors
 */
const PrimitiveGamingChair: React.FC = () => {
  return (
    <group position={[-1.10, 0, -0.95]} rotation={[0, 0, 0]}>
      {/* 5-star wheeled base in warm bronze-charcoal */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.04, 8]} />
        <meshStandardMaterial color="#323338" roughness={0.35} metalness={0.6} />
      </mesh>

      {/* Caster wheels */}
      {[-0.3, 0.3].map((x) =>
        [-0.3, 0.3].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.04, z]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#222428" roughness={0.6} />
          </mesh>
        ))
      )}

      {/* Hydraulic center piston in chrome steel */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.045, 0.28, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Seat cushion in charcoal fabric (#3C3F48) */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.56, 0.1, 0.52]} />
        <meshStandardMaterial color="#3C3F48" roughness={0.75} metalness={0.05} />
      </mesh>

      {/* Side bolsters on seat in light warm grey (#9AA0AA) */}
      <mesh position={[-0.26, 0.46, 0]} rotation={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.48]} />
        <meshStandardMaterial color="#9AA0AA" roughness={0.7} />
      </mesh>
      <mesh position={[0.26, 0.46, 0]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.48]} />
        <meshStandardMaterial color="#9AA0AA" roughness={0.7} />
      </mesh>

      {/* Backrest in charcoal fabric */}
      <group position={[0, 0.82, -0.22]} rotation={[-0.08, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.72, 0.08]} />
          <meshStandardMaterial color="#3C3F48" roughness={0.75} metalness={0.05} />
        </mesh>

        {/* Backrest central lumbar insert in light warm grey (#9AA0AA) */}
        <mesh position={[0, 0.05, 0.038]} castShadow>
          <boxGeometry args={[0.32, 0.48, 0.02]} />
          <meshStandardMaterial color="#9AA0AA" roughness={0.7} />
        </mesh>

        {/* Subtle cyan accent stitching ribbon */}
        <mesh position={[0, 0.05, 0.049]}>
          <boxGeometry args={[0.015, 0.46, 0.004]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.5} />
        </mesh>

        {/* Headrest pillow in charcoal */}
        <mesh position={[0, 0.32, 0.045]} castShadow>
          <boxGeometry args={[0.26, 0.12, 0.05]} />
          <meshStandardMaterial color="#2B2D33" roughness={0.8} />
        </mesh>
      </group>

      {/* Ergonomic 3D armrests in light grey */}
      {[-0.32, 0.32].map((x, i) => (
        <group key={i} position={[x, 0.58, 0]}>
          <mesh position={[0, -0.08, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.2, 12]} />
            <meshStandardMaterial color="#323338" metalness={0.7} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.02, 0.02]} castShadow>
            <boxGeometry args={[0.07, 0.03, 0.24]} />
            <meshStandardMaterial color="#9AA0AA" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export const GamingChair: React.FC = () => {
  const config = FURNITURE_MODELS.chair;
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
      fallback={<PrimitiveGamingChair />}
    />
  );
};
