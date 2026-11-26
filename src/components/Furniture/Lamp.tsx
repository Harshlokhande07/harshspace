import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLivingRoomStore } from '../../store/useLivingRoomStore';
import { useInteractionStore } from '../../store/useInteractionStore';

/**
 * Modern Architect Anglepoise Desk Task Lamp
 * - Brushed Champagne Brass / Warm Titanium finish (#C5A880)
 * - True connected cantilever linkage: Base -> Lower Strut -> Elbow Pivot -> Upper Arm -> Shade
 * - Realistic proportions: sleek cone shade (0.09m dia), perfectly mounted to the tip of upper arm
 * - Warm incandescent / LED bulb with smooth dimming tied to switchboard / lampOn state
 */
export const Lamp: React.FC = () => {
  const bulbMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const glowConeMatRef = useRef<THREE.MeshBasicMaterial>(null);

  // High quality brass and hardware materials
  const { brassMat, darkBrassMat, jointMat, innerReflectorMat } = useMemo(() => {
    return {
      brassMat: new THREE.MeshStandardMaterial({
        color: '#C6A982',
        roughness: 0.28,
        metalness: 0.82,
      }),
      darkBrassMat: new THREE.MeshStandardMaterial({
        color: '#8A704C',
        roughness: 0.35,
        metalness: 0.85,
      }),
      jointMat: new THREE.MeshStandardMaterial({
        color: '#26282E',
        roughness: 0.4,
        metalness: 0.7,
      }),
      innerReflectorMat: new THREE.MeshStandardMaterial({
        color: '#FAF8F5',
        roughness: 0.2,
        metalness: 0.1,
      }),
    };
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const lampOn = useLivingRoomStore.getState().lampOn;
    const activeId = useInteractionStore.getState().activeId;

    if (bulbMatRef.current) {
      let targetEmissive = 0;
      if (lampOn) {
        targetEmissive = activeId === 'notebook' ? 3.0 : 1.8;
      }

      bulbMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
        bulbMatRef.current.emissiveIntensity,
        targetEmissive,
        6.0,
        dt
      );
    }

    if (glowConeMatRef.current) {
      const targetOpacity = lampOn ? (activeId === 'notebook' ? 0.18 : 0.09) : 0;
      glowConeMatRef.current.opacity = THREE.MathUtils.damp(
        glowConeMatRef.current.opacity,
        targetOpacity,
        6.0,
        dt
      );
    }
  });

  return (
    // Base placed cleanly in the left rear quadrant of the desk
    <group position={[-1.75, 0.74, -2.12]}>
      {/* 1. Base Assembly */}
      <group position={[0, 0, 0]}>
        {/* Rubberized non-slip foot pad */}
        <mesh position={[0, 0.003, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.006, 28]} />
          <meshStandardMaterial color="#1A1C20" roughness={0.8} />
        </mesh>
        {/* Heavy stepped brass base plinth */}
        <mesh position={[0, 0.012, 0]} material={brassMat} castShadow>
          <cylinderGeometry args={[0.072, 0.075, 0.012, 28]} />
        </mesh>
        <mesh position={[0, 0.021, 0]} material={brassMat}>
          <cylinderGeometry args={[0.058, 0.070, 0.008, 28]} />
        </mesh>
        {/* Push toggle button on base */}
        <mesh position={[0.03, 0.028, 0.03]} material={darkBrassMat}>
          <cylinderGeometry args={[0.006, 0.007, 0.01, 16]} />
        </mesh>
        {/* Swivel collar turret */}
        <mesh position={[0, 0.030, 0]} material={darkBrassMat}>
          <cylinderGeometry args={[0.016, 0.018, 0.014, 20]} />
        </mesh>
      </group>

      {/* 2. Lower Cantilever Strut (Starts at base [0, 0.035, 0], leans back & right) */}
      <group position={[0, 0.036, 0]} rotation={[0.08, 0, -0.26]}>
        {/* Base pivot pin & tension thumbscrew */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={jointMat}>
          <cylinderGeometry args={[0.010, 0.010, 0.026, 16]} />
        </mesh>
        <mesh position={[0, 0, 0.016]} rotation={[Math.PI / 2, 0, 0]} material={darkBrassMat}>
          <cylinderGeometry args={[0.012, 0.012, 0.006, 16]} />
        </mesh>

        {/* Parallel twin brass rods (length 0.32m) */}
        <mesh position={[-0.007, 0.16, 0]} material={brassMat} castShadow>
          <cylinderGeometry args={[0.0035, 0.0035, 0.32, 12]} />
        </mesh>
        <mesh position={[0.007, 0.16, 0]} material={brassMat} castShadow>
          <cylinderGeometry args={[0.0035, 0.0035, 0.32, 12]} />
        </mesh>
        {/* Mid-span reinforcement bracket */}
        <mesh position={[0, 0.16, 0]} material={jointMat}>
          <boxGeometry args={[0.022, 0.008, 0.010]} />
        </mesh>

        {/* 3. Articulated Elbow Joint (Exactly at top of lower strut: Y = 0.32) */}
        <group position={[0, 0.32, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={jointMat}>
            <cylinderGeometry args={[0.013, 0.013, 0.028, 16]} />
          </mesh>
          <mesh position={[0, 0, 0.018]} rotation={[Math.PI / 2, 0, 0]} material={darkBrassMat}>
            <cylinderGeometry args={[0.014, 0.014, 0.008, 16]} />
          </mesh>

          {/* 4. Upper Cantilever Arm (Reaches forward & down over desk towards laptop/notebook) */}
          <group rotation={[0.20, -0.40, 0.82]}>
            {/* Upper arm brass tube (length 0.28m) */}
            <mesh position={[0, 0.14, 0]} material={brassMat} castShadow>
              <cylinderGeometry args={[0.0045, 0.0045, 0.28, 12]} />
            </mesh>

            {/* 5. Lamp Shade Fixture (At top of upper arm: Y = 0.28) */}
            <group position={[0, 0.28, 0]} rotation={[0.55, 0, -1.25]}>
              {/* Swivel socket hinge */}
              <mesh material={jointMat}>
                <sphereGeometry args={[0.011, 16, 16]} />
              </mesh>
              {/* Socket stem */}
              <mesh position={[0, -0.022, 0]} material={darkBrassMat}>
                <cylinderGeometry args={[0.013, 0.015, 0.028, 20]} />
              </mesh>

              {/* Conical Lampshade (Outer spun brass, scaled nicely: 0.052m radius) */}
              <mesh position={[0, -0.068, 0]} material={brassMat} castShadow>
                <cylinderGeometry args={[0.020, 0.052, 0.085, 24, 1, true]} />
              </mesh>
              {/* Shade rolled edge lip */}
              <mesh position={[0, -0.110, 0]} material={brassMat}>
                <torusGeometry args={[0.052, 0.003, 12, 24]} />
              </mesh>
              {/* Interior white reflector */}
              <mesh position={[0, -0.068, 0]} material={innerReflectorMat}>
                <cylinderGeometry args={[0.019, 0.050, 0.083, 24, 1, true]} />
              </mesh>

              {/* Frosted warm bulb */}
              <mesh position={[0, -0.060, 0]}>
                <sphereGeometry args={[0.016, 16, 16]} />
                <meshStandardMaterial
                  ref={bulbMatRef}
                  color="#FFFBEB"
                  emissive="#FDE68A"
                  emissiveIntensity={1.8}
                  roughness={0.1}
                />
              </mesh>

              {/* Translucent downward illumination cone */}
              <mesh position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.045, 0.18, 0.28, 20, 1, true]} />
                <primitive object={glowConeMatRef} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
