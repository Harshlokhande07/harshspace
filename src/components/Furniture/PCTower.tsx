import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ModelLoader, getModelUrl } from '../Room/ModelLoader';
import { FURNITURE_MODELS } from '../../data/models';

const PrimitivePCTower: React.FC = () => {
  const rgbMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (rgbMatRef.current) {
      // Smooth RGB rainbow wave
      const r = (Math.sin(t * 1.5) + 1) / 2;
      const g = (Math.sin(t * 1.5 + 2) + 1) / 2;
      const b = (Math.sin(t * 1.5 + 4) + 1) / 2;
      rgbMatRef.current.emissive.setRGB(r, g, b);
    }
  });

  return (
    <group position={[-0.35, 0.74, -1.95]}>
      {/* Main Chassis: High-end Tempered Glass Mid-Tower */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.22, 0.5, 0.46]} />
        <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Front mesh airflow panel with RGB fan backlight */}
      <mesh position={[0, 0.25, 0.231]}>
        <planeGeometry args={[0.18, 0.44]} />
        <meshStandardMaterial color="#020617" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Side tempered glass panel */}
      <mesh position={[0.111, 0.25, 0]}>
        <planeGeometry args={[0.42, 0.46]} />
        <meshPhysicalMaterial
          color="#1e293b"
          roughness={0.1}
          metalness={0.1}
          transmission={0.65}
          thickness={0.02}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Dynamic Animated Internal RGB Lighting Strip */}
      <mesh position={[0.08, 0.25, 0]}>
        <boxGeometry args={[0.015, 0.44, 0.015]} />
        <meshStandardMaterial
          ref={rgbMatRef}
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.8}
          roughness={0.1}
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
