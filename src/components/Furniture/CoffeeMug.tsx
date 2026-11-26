import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLivingRoomStore } from '../../store/useLivingRoomStore';

/**
 * Ceramic coffee mug on the desk (X = -2.2, Y = 0.77, Z = -3.7).
 * Features:
 * - Ceramic mug body with handle
 * - Liquid coffee level that lowers as coffeeLevel decreases
 * - Rising steam made of semi-transparent billboard planes that drift and oscillate
 * - Steam fades as coffeeLevel approaches 0
 * - Mug lifts slightly when isDrinking is true (drinking placeholder animation)
 * - Refill animation when refilling
 */
export const CoffeeMug: React.FC = () => {
  const mugGroupRef = useRef<THREE.Group>(null);
  const liquidMeshRef = useRef<THREE.Mesh>(null);
  const steamGroupRef = useRef<THREE.Group>(null);
  const steamMats = useRef<THREE.MeshBasicMaterial[]>([]);

  const liftHeight = useRef<number>(0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const clock = state.clock.getElapsedTime();
    const { coffeeLevel, isDrinking, isRefilling } = useLivingRoomStore.getState();

    // 1. Placeholder drinking lift animation
    const targetLift = isDrinking ? 0.22 : 0.0;
    liftHeight.current = THREE.MathUtils.damp(liftHeight.current, targetLift, 5, dt);

    if (mugGroupRef.current) {
      mugGroupRef.current.position.y = 0.77 + liftHeight.current;
      // Slight tilt when drinking
      const targetTilt = isDrinking ? -0.15 : 0;
      mugGroupRef.current.rotation.x = THREE.MathUtils.damp(
        mugGroupRef.current.rotation.x,
        targetTilt,
        5,
        dt
      );
    }

    // 2. Adjust liquid height based on coffeeLevel
    if (liquidMeshRef.current) {
      // Full cup: y ~ 0.08, Empty cup: y ~ 0.015
      const liquidY = THREE.MathUtils.lerp(0.015, 0.082, coffeeLevel);
      liquidMeshRef.current.position.y = THREE.MathUtils.damp(
        liquidMeshRef.current.position.y,
        liquidY,
        isRefilling ? 2.5 : 8,
        dt
      );
    }

    // 3. Steam billboard animation (drifting upward, oscillating side to side)
    if (steamGroupRef.current) {
      const steamChildren = steamGroupRef.current.children;
      const baseOpacity = Math.min(1, coffeeLevel * 1.5) * 0.28;

      for (let i = 0; i < steamChildren.length; i++) {
        const mesh = steamChildren[i] as THREE.Mesh;
        const offset = i * 1.6;
        // Float upwards cyclically
        const cycle = ((clock * 0.45 + offset) % 2.0) / 2.0; // 0 to 1
        mesh.position.y = 0.09 + cycle * 0.28;
        mesh.position.x = Math.sin(clock * 1.5 + offset) * 0.018;
        mesh.position.z = Math.cos(clock * 1.2 + offset) * 0.018;
        mesh.scale.setScalar(0.7 + cycle * 0.9);

        // Fade in at bottom, fade out at top
        const fade = Math.sin(cycle * Math.PI);
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = baseOpacity * fade;
        }
      }
    }
  });

  return (
    <group ref={mugGroupRef} position={[-0.60, 0.74, -1.72]}>
      {/* 1. Outer Ceramic Mug Body */}
      <mesh receiveShadow position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.048, 0.042, 0.1, 24, 1, true]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.25} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Mug Bottom Base */}
      <mesh position={[0, 0.005, 0]} receiveShadow>
        <cylinderGeometry args={[0.042, 0.042, 0.01, 24]} />
        <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* 3. Handle */}
      <mesh position={[0.054, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.026, 0.007, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#0284c7" roughness={0.25} metalness={0.1} />
      </mesh>

      {/* 4. Coffee Liquid Surface */}
      <mesh ref={liquidMeshRef} position={[0, 0.082, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.044, 24]} />
        <meshStandardMaterial
          color="#38220f"
          roughness={0.2}
          metalness={0.15}
        />
      </mesh>

      {/* 5. Subtle Steam Planes (3 billboards) */}
      <group ref={steamGroupRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, 0.1, 0]}>
            <planeGeometry args={[0.06, 0.12]} />
            <meshBasicMaterial
              ref={(el) => {
                if (el) steamMats.current[i] = el;
              }}
              color="#f8fafc"
              transparent
              opacity={0.2}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
