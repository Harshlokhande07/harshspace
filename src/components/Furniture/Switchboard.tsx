import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLivingRoomStore } from '../../store/useLivingRoomStore';

/**
 * Modern dual-rocker wall switchboard.
 * Placed on the front wall (X = 1.8, Y = 1.35, Z = 5.88) near the entrance.
 * - Left Rocker: Desk Lamp (rotates based on lampOn, cyan/amber LED)
 * - Right Rocker: Ceiling Fan (rotates based on fanOn, emerald LED)
 * - Has subtle emissive indicator dots
 */
export const Switchboard: React.FC = () => {
  const lampOn = useLivingRoomStore((s) => s.lampOn);
  const fanOn = useLivingRoomStore((s) => s.fanOn);

  const lampRockerRef = useRef<THREE.Group>(null);
  const fanRockerRef = useRef<THREE.Group>(null);
  const lampLedRef = useRef<THREE.MeshStandardMaterial>(null);
  const fanLedRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    // Animate rocker switches tilt angle
    const targetLampRot = lampOn ? -0.22 : 0.22;
    const targetFanRot = fanOn ? -0.22 : 0.22;

    if (lampRockerRef.current) {
      lampRockerRef.current.rotation.x = THREE.MathUtils.damp(
        lampRockerRef.current.rotation.x,
        targetLampRot,
        14,
        dt
      );
    }

    if (fanRockerRef.current) {
      fanRockerRef.current.rotation.x = THREE.MathUtils.damp(
        fanRockerRef.current.rotation.x,
        targetFanRot,
        14,
        dt
      );
    }

    if (lampLedRef.current) {
      lampLedRef.current.emissiveIntensity = THREE.MathUtils.damp(
        lampLedRef.current.emissiveIntensity,
        lampOn ? 1.6 : 0.2,
        10,
        dt
      );
    }

    if (fanLedRef.current) {
      fanLedRef.current.emissiveIntensity = THREE.MathUtils.damp(
        fanLedRef.current.emissiveIntensity,
        fanOn ? 1.6 : 0.2,
        10,
        dt
      );
    }
  });

  return (
    <group position={[1.15, 1.25, 2.585]} rotation={[0, Math.PI, 0]}>
      {/* 1. Base Wall Plate: Sleek matte slate/acrylic faceplate */}
      <mesh receiveShadow>
        <boxGeometry args={[0.32, 0.22, 0.02]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Outer border trim */}
      <mesh position={[0, 0, 0.012]}>
        <boxGeometry args={[0.33, 0.23, 0.005]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* 2. Left Switch (Desk Lamp) */}
      <group position={[-0.07, 0, 0.01]}>
        {/* Switch Bezel Socket */}
        <mesh>
          <boxGeometry args={[0.08, 0.12, 0.01]} />
          <meshStandardMaterial color="#020617" roughness={0.5} />
        </mesh>
        {/* Tilting Rocker */}
        <group ref={lampRockerRef} position={[0, 0, 0.006]}>
          <mesh>
            <boxGeometry args={[0.07, 0.11, 0.015]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.4} />
          </mesh>
          {/* LED indicator dot */}
          <mesh position={[0, 0.035, 0.008]}>
            <circleGeometry args={[0.006, 12]} />
            <meshStandardMaterial
              ref={lampLedRef}
              color="#fde047"
              emissive="#fde047"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      </group>

      {/* 3. Right Switch (Ceiling Fan) */}
      <group position={[0.07, 0, 0.01]}>
        {/* Switch Bezel Socket */}
        <mesh>
          <boxGeometry args={[0.08, 0.12, 0.01]} />
          <meshStandardMaterial color="#020617" roughness={0.5} />
        </mesh>
        {/* Tilting Rocker */}
        <group ref={fanRockerRef} position={[0, 0, 0.006]}>
          <mesh castShadow>
            <boxGeometry args={[0.07, 0.11, 0.015]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.4} />
          </mesh>
          {/* LED indicator dot */}
          <mesh position={[0, 0.035, 0.008]}>
            <circleGeometry args={[0.006, 12]} />
            <meshStandardMaterial
              ref={fanLedRef}
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};
