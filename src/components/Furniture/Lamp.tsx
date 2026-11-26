import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLivingRoomStore } from '../../store/useLivingRoomStore';
import { useInteractionStore } from '../../store/useInteractionStore';

/**
 * Ultra-Detailed Minimalist Architectural Anglepoise Desk Lamp
 * - Brushed Champagne Brass / Warm Titanium finish (#C5A880)
 * - Articulated mechanical joints with knurled adjustment thumb screws
 * - Conical lampshade with realistic interior white reflector and glowing warm tungsten filament / frosted LED bulb
 * - Real-time smooth dimming tied to switchboard / lampOn state
 * - Subtle local illumination cone
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
        color: '#9E825C',
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
    <group position={[-1.85, 0.74, -2.05]}>
      {/* 1. Heavy Stepped Circular Base (#C6A982) */}
      <group position={[0, 0, 0]}>
        {/* Rubberized non-slip foot pad */}
        <mesh position={[0, 0.004, 0]}>
          <cylinderGeometry args={[0.082, 0.082, 0.008, 32]} />
          <meshStandardMaterial color="#1A1C20" roughness={0.8} />
        </mesh>
        {/* Lower brass tier */}
        <mesh position={[0, 0.014, 0]} material={brassMat} castShadow>
          <cylinderGeometry args={[0.08, 0.082, 0.012, 32]} />
        </mesh>
        {/* Upper beveled bevel ring */}
        <mesh position={[0, 0.024, 0]} material={brassMat}>
          <cylinderGeometry args={[0.065, 0.078, 0.01, 32]} />
        </mesh>
        {/* Brass push toggle button on base */}
        <mesh position={[0.035, 0.032, 0.035]} material={darkBrassMat}>
          <cylinderGeometry args={[0.008, 0.009, 0.012, 16]} />
        </mesh>
        {/* Central swivel collar */}
        <mesh position={[0, 0.036, 0]} material={darkBrassMat}>
          <cylinderGeometry args={[0.02, 0.022, 0.018, 24]} />
        </mesh>
      </group>

      {/* 2. Lower Dual-Rod Parallel Struts */}
      <group position={[0, 0.045, 0]} rotation={[0, 0, -0.22]}>
        {/* Base pivot pin */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={jointMat}>
          <cylinderGeometry args={[0.012, 0.012, 0.03, 16]} />
        </mesh>
        {/* Knurled brass tension thumbscrew */}
        <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={darkBrassMat}>
          <cylinderGeometry args={[0.014, 0.014, 0.008, 16]} />
        </mesh>

        {/* Parallel twin brass rods */}
        <mesh position={[-0.008, 0.18, 0]} material={brassMat} castShadow>
          <cylinderGeometry args={[0.004, 0.004, 0.36, 12]} />
        </mesh>
        <mesh position={[0.008, 0.18, 0]} material={brassMat} castShadow>
          <cylinderGeometry args={[0.004, 0.004, 0.36, 12]} />
        </mesh>
        {/* Mid-span stabilizing bracket */}
        <mesh position={[0, 0.18, 0]} material={jointMat}>
          <boxGeometry args={[0.025, 0.01, 0.012]} />
        </mesh>
      </group>

      {/* 3. Articulated Elbow Joint */}
      <group position={[0.082, 0.40, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={jointMat}>
          <cylinderGeometry args={[0.016, 0.016, 0.032, 20]} />
        </mesh>
        {/* Knurled elbow thumbscrew */}
        <mesh position={[0, 0, 0.022]} rotation={[Math.PI / 2, 0, 0]} material={darkBrassMat}>
          <cylinderGeometry args={[0.015, 0.015, 0.009, 16]} />
        </mesh>
      </group>

      {/* 4. Upper Cantilever Arm pointing toward desk center */}
      <group position={[0.082, 0.40, 0]} rotation={[0, -0.32, 0.44]}>
        {/* Main upper brass cantilever tube */}
        <mesh position={[0, 0.16, 0]} material={brassMat} castShadow>
          <cylinderGeometry args={[0.006, 0.006, 0.32, 14]} />
        </mesh>
      </group>

      {/* 5. Lamp Shade & Socket Assembly (Angled down toward desk) */}
      <group position={[0.22, 0.52, 0.06]} rotation={[0.42, -0.15, -0.85]}>
        {/* Socket swivel hinge & mount */}
        <mesh position={[0, 0.07, 0]} material={jointMat}>
          <sphereGeometry args={[0.014, 16, 16]} />
        </mesh>
        <mesh position={[0, 0.045, 0]} material={darkBrassMat}>
          <cylinderGeometry args={[0.018, 0.018, 0.04, 20]} />
        </mesh>

        {/* Sculpted Brass Lampshade (Conical outer shade) */}
        <mesh position={[0, -0.015, 0]} material={brassMat} castShadow>
          <cylinderGeometry args={[0.028, 0.076, 0.11, 28, 1, true]} />
        </mesh>
        {/* Top vent ring on shade */}
        <mesh position={[0, 0.035, 0]} material={darkBrassMat}>
          <cylinderGeometry args={[0.032, 0.032, 0.012, 28]} />
        </mesh>
        {/* Interior high-reflectance white enamel reflector */}
        <mesh position={[0, -0.016, 0]} material={innerReflectorMat}>
          <cylinderGeometry args={[0.026, 0.074, 0.108, 28, 1, true]} />
        </mesh>

        {/* Frosted Warm Tungsten / LED Bulb */}
        <mesh position={[0, -0.02, 0]}>
          <sphereGeometry args={[0.024, 24, 24]} />
          <meshStandardMaterial
            ref={bulbMatRef}
            color="#FFFBEB"
            emissive="#FDE68A"
            emissiveIntensity={1.8}
            roughness={0.1}
          />
        </mesh>

        {/* Translucent Soft Volumetric Light Cone on Desk (Fades when off) */}
        <mesh position={[0, -0.22, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.28, 0.38, 24, 1, true]} />
          <meshBasicMaterial
            ref={glowConeMatRef}
            color="#FEF08A"
            transparent
            opacity={0.09}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
};
