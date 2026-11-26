import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { INTERACTABLES } from '../../data/interactables';
import { useInteractionStore } from '../../store/useInteractionStore';

/**
 * Floor glowing ring indicators at each interaction anchor.
 * Subtle and dim normally, brighter and pulsing when it is the nearest anchor.
 * Uses meshBasicMaterial without extra real-time lights for maximum performance.
 */
export const InteractionIndicator: React.FC = () => {
  const nearestId = useInteractionStore((s) => s.nearestId);
  const materialsRef = useRef<Map<string, THREE.MeshBasicMaterial>>(new Map());

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pulse = 0.75 + 0.25 * Math.sin(time * 3.5);

    materialsRef.current.forEach((mat, id) => {
      const isNearest = id === nearestId;
      mat.opacity = isNearest ? pulse : 0.22;
      mat.color.set(isNearest ? '#38bdf8' : '#818cf8');
    });
  });

  return (
    <group>
      {INTERACTABLES.map((item) => (
        <group key={item.id} position={item.position}>
          {/* Subtle outer floor ring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.38, 0.48, 32]} />
            <meshBasicMaterial
              ref={(mat) => {
                if (mat) materialsRef.current.set(item.id, mat);
              }}
              color="#818cf8"
              transparent
              opacity={0.22}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Central subtle marker dot */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.07, 16]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={nearestId === item.id ? 0.9 : 0.3}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
